import { AxisScores, DiagnosisResult, RankedMorphResult, RankedTypeResult } from "../types";
import { AXIS_DEFINITIONS } from "../data/axes";

// ============================================================
// 結果フォーマッター — 診断結果の整形・表示用ユーティリティ
// ============================================================

/**
 * 診断結果を人間が読めるテキスト形式に変換
 * （ターミナル確認・Discord出力などに使う）
 */
export function formatResultText(result: DiagnosisResult): string {
  const lines: string[] = [];

  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("  CCTモフ診断 — 結果");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("");
  lines.push(`  あなたは… 【 ${result.main.fullName} 】`);
  lines.push(`  モフ: ${result.main.morph.name}  /  系: ${result.main.type.name}`);
  if (result.main.morph.description) {
    lines.push(`  "${result.main.morph.description}"`);
  }
  lines.push("");

  if (result.sub.length > 0) {
    lines.push("  ── サブ候補 ──────────────────");
    result.sub.forEach((s, i) => {
      lines.push(`  ${i + 1}位: ${s.fullName}`);
    });
    lines.push("");
  }

  lines.push("  ── 11軸スコア ─────────────────");
  lines.push(formatAxisScoresText(result.axisScores));
  lines.push("");

  lines.push("  ── モフ上位5件 ─────────────────");
  result.details.morphRanking.slice(0, 5).forEach((r) => {
    lines.push(formatMorphRankLine(r));
  });
  lines.push("");

  lines.push("  ── 系スコア ────────────────────");
  result.details.typeRanking.forEach((r) => {
    lines.push(formatTypeRankLine(r));
  });
  lines.push("");

  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  return lines.join("\n");
}

/**
 * 11軸スコアをバー表示で整形
 */
export function formatAxisScoresText(scores: AxisScores): string {
  return AXIS_DEFINITIONS.map((axis) => {
    const score = scores[axis.id];
    const barLength = Math.round(score); // 1〜10 → バーの長さ
    const bar = "█".repeat(barLength) + "░".repeat(10 - barLength);
    return `  ${axis.name.padEnd(8)} [${bar}] ${score.toFixed(1)}`;
  }).join("\n");
}

function formatMorphRankLine(r: RankedMorphResult): string {
  const distStr = r.distance.toFixed(2).padStart(6);
  return `  ${r.rank}位 ${r.morph.name.padEnd(10)} (距離: ${distStr})`;
}

function formatTypeRankLine(r: RankedTypeResult): string {
  const scoreStr = r.score.toFixed(2).padStart(5);
  const barLength = Math.round(r.score);
  const bar = "█".repeat(barLength) + "░".repeat(10 - barLength);
  return `  ${r.rank}位 ${r.type.name.padEnd(9)} [${bar}] ${scoreStr}`;
}

/**
 * JSON シリアライズ用の軽量な結果オブジェクト
 * （API レスポンス・localStorage 保存などに使う）
 */
export function serializeResult(result: DiagnosisResult): object {
  return {
    main: {
      morphId: result.main.morph.id,
      morphName: result.main.morph.name,
      typeId: result.main.type.id,
      typeName: result.main.type.name,
      fullName: result.main.fullName,
      morphDescription: result.main.morph.description,
      morphTags: result.main.morph.tags,
    },
    sub: result.sub.map((s) => ({
      morphId: s.morph.id,
      morphName: s.morph.name,
      typeId: s.type.id,
      typeName: s.type.name,
      fullName: s.fullName,
    })),
    axisScores: result.axisScores,
    typeRanking: result.details.typeRanking.map((r) => ({
      typeId: r.type.id,
      typeName: r.type.name,
      score: Math.round(r.score * 10) / 10,
      rank: r.rank,
    })),
    morphRanking: result.details.morphRanking.slice(0, 5).map((r) => ({
      morphId: r.morph.id,
      morphName: r.morph.name,
      distance: Math.round(r.distance * 100) / 100,
      rank: r.rank,
    })),
  };
}
