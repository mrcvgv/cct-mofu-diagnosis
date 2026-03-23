import { AxisId, AxisScores, Question } from "../types";
import { ALL_AXIS_IDS } from "../data/axes";

// ============================================================
// スコア計算器 — 質問回答 → 11軸スコア
// ============================================================
//
// アルゴリズム:
//   1. 回答 (1〜5) を [0, 1] に正規化: (answer - 1) / 4
//   2. 各設問の軸重みに対して寄与量を計算
//      - 正の重み: normalized × |weight|  （高回答 → 軸が高くなる）
//      - 負の重み: (1 - normalized) × |weight|（高回答 → 軸が低くなる = 逆方向加算）
//   3. 軸ごとに寄与量を合計し、重みの絶対値合計で割って正規化
//   4. [0, 1] → [1, 10] に変換: raw × 9 + 1
//
// 回答がない軸はデフォルト 5.5（中間値）になる
// ============================================================

const DEFAULT_AXIS_SCORE = 5.5;

/** 回答がない場合のデフォルト軸スコア群 */
function buildDefaultScores(): AxisScores {
  return Object.fromEntries(
    ALL_AXIS_IDS.map((id) => [id, DEFAULT_AXIS_SCORE])
  ) as AxisScores;
}

/**
 * 質問への回答から 11軸スコアを算出する
 *
 * @param answers  questionId → リッカート回答 (1〜5)
 * @param questions 質問データ（weights 付き）
 * @returns 各軸 1〜10 のスコア
 */
export function calculateAxisScores(
  answers: Record<string, number>,
  questions: Question[]
): AxisScores {
  // 寄与量の累積
  const contributions: Partial<Record<AxisId, number>> = {};
  // 重みの絶対値の累積（正規化用）
  const weightSums: Partial<Record<AxisId, number>> = {};

  for (const question of questions) {
    const rawAnswer = answers[question.id];
    if (rawAnswer === undefined || rawAnswer === null) continue;

    // 1〜5 を [0, 1] に正規化（reversedフラグで反転）
    const clampedAnswer = Math.max(1, Math.min(5, rawAnswer));
    const normalized = question.reversed
      ? 1 - (clampedAnswer - 1) / 4
      : (clampedAnswer - 1) / 4;

    for (const [axisIdStr, weight] of Object.entries(question.weights)) {
      if (weight === undefined || weight === 0) continue;
      const axisId = axisIdStr as AxisId;

      // 正の重み: high answer → axis up
      // 負の重み: low answer → axis up（軸を下げる設問）
      const contribution =
        weight >= 0
          ? normalized * weight
          : (1 - normalized) * Math.abs(weight);

      contributions[axisId] = (contributions[axisId] ?? 0) + contribution;
      weightSums[axisId] = (weightSums[axisId] ?? 0) + Math.abs(weight);
    }
  }

  // 正規化して 1〜10 に変換
  const scores = buildDefaultScores();
  for (const axisId of ALL_AXIS_IDS) {
    const wSum = weightSums[axisId];
    if (wSum && wSum > 0) {
      const raw = (contributions[axisId] ?? 0) / wSum; // [0, 1]
      const scaled = raw * 9 + 1; // [1, 10]
      scores[axisId] = Math.round(scaled * 10) / 10; // 小数第1位
    }
  }

  return scores;
}

/**
 * 軸スコアの簡易サマリー（デバッグ・表示用）
 */
export function summarizeAxisScores(scores: AxisScores): string {
  return ALL_AXIS_IDS.map((id) => `${id}: ${scores[id].toFixed(1)}`).join(
    " | "
  );
}
