import { AxisId, AxisScores, RankedTypeResult, TypeProfile } from "../types";

// ============================================================
// 系マッチャー — ユーザー軸スコア → 系判定
// ============================================================
//
// アルゴリズム:
//   各系について「系スコア」を算出し、最も高い系を選ぶ。
//
//   系スコアの計算:
//     正の重み w > 0: contribution = (userScore - 1) / 9 × w  （1→0, 10→w）
//     負の重み w < 0: contribution = (10 - userScore) / 9 × |w|（1→|w|, 10→0）
//     → どちらも "この系にどれだけ適合しているか" を [0, |w|] で表す
//
//   系スコア = Σ(寄与量) / Σ(|重み|) × 10  → [0, 10]
//
// typeProfile.weights だけを編集することで判定を調整できる。
// ============================================================

/**
 * 単一の系に対する適合スコアを計算 (0〜10)
 */
function calculateTypeScore(
  userScores: AxisScores,
  typeProfile: TypeProfile
): number {
  let weightedSum = 0;
  let weightAbsSum = 0;

  for (const [axisIdStr, weight] of Object.entries(typeProfile.weights)) {
    if (weight === undefined || weight === 0) continue;
    const axisId = axisIdStr as AxisId;
    const userScore = userScores[axisId];

    // 正規化: userScore (1〜10) → [0, 1]
    const normalized = (userScore - 1) / 9;

    const contribution =
      weight >= 0
        ? normalized * weight           // 高スコア → この系らしい
        : (1 - normalized) * Math.abs(weight); // 低スコア → この系らしい

    weightedSum += contribution;
    weightAbsSum += Math.abs(weight);
  }

  if (weightAbsSum === 0) return 0;
  return (weightedSum / weightAbsSum) * 10; // → [0, 10]
}

/**
 * 全系のスコアをランキングして返す
 */
export function rankTypes(
  userScores: AxisScores,
  typeProfiles: TypeProfile[]
): RankedTypeResult[] {
  return typeProfiles
    .map((type) => ({
      type,
      score: calculateTypeScore(userScores, type),
    }))
    .sort((a, b) => b.score - a.score)
    .map((r, i) => ({ ...r, rank: i + 1 }));
}
