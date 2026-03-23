import { AxisId, AxisScores, MorphProfile, RankedMorphResult } from "../types";
import { ALL_AXIS_IDS } from "../data/axes";

// ============================================================
// モフマッチャー — ユーザー軸スコア → モフ判定
// ============================================================
//
// デフォルト: 重み付きユークリッド距離
//   distance = sqrt( Σ w_i × (userScore_i - morphScore_i)^2 )
//
// axisWeights で軸ごとの影響度を調整できる。
// 省略した軸は weight=1.0 として扱う。
//
// 将来の代替手法:
//   - マンハッタン距離: |userScore_i - morphScore_i| の合計
//   - コサイン類似度: ベクトルの角度（絶対値より方向を重視）
// ============================================================

export interface MorphMatcherOptions {
  /** 軸ごとの距離計算重み (省略 = 全軸 1.0) */
  axisWeights?: Partial<Record<AxisId, number>>;
  /** 返す候補数 (省略 = 全モフ) */
  topN?: number;
}

/**
 * 重み付きユークリッド距離
 */
function weightedEuclidean(
  a: AxisScores,
  b: AxisScores,
  axisWeights: Partial<Record<AxisId, number>>
): number {
  let sum = 0;
  for (const axisId of ALL_AXIS_IDS) {
    const diff = a[axisId] - b[axisId];
    const w = axisWeights[axisId] ?? 1;
    sum += w * diff * diff;
  }
  return Math.sqrt(sum);
}

/**
 * マンハッタン距離（オルタナティブ実装）
 */
export function manhattanDistance(
  a: AxisScores,
  b: AxisScores,
  axisWeights: Partial<Record<AxisId, number>> = {}
): number {
  let sum = 0;
  for (const axisId of ALL_AXIS_IDS) {
    const diff = Math.abs(a[axisId] - b[axisId]);
    const w = axisWeights[axisId] ?? 1;
    sum += w * diff;
  }
  return sum;
}

/**
 * ユーザーの軸スコアに近い順にモフをランキングして返す
 */
export function rankMorphs(
  userScores: AxisScores,
  morphProfiles: MorphProfile[],
  options: MorphMatcherOptions = {}
): RankedMorphResult[] {
  const { axisWeights = {}, topN = morphProfiles.length } = options;

  const ranked = morphProfiles
    .map((morph) => ({
      morph,
      distance: weightedEuclidean(userScores, morph.axes, axisWeights),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, topN)
    .map((r, i) => ({ ...r, rank: i + 1 }));

  return ranked;
}
