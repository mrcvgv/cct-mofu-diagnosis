// ============================================================
// CCTモフ診断エンジン — 公開API
// ============================================================
//
// Next.js / Node.js / React どこからでもこれだけ import すれば動く
//
// 使い方:
//   import { diagnose, MORPH_PROFILES, TYPE_PROFILES, QUESTIONS } from "@/lib/cct-mofu"
//   const result = diagnose({ answers }, QUESTIONS, MORPH_PROFILES, TYPE_PROFILES)
// ============================================================

// 型
export * from "./types";

// データ
export { AXIS_DEFINITIONS, ALL_AXIS_IDS, AXIS_MAP } from "./data/axes";
export { MORPH_PROFILES, MORPH_MAP } from "./data/morphProfiles";
export { TYPE_PROFILES, TYPE_MAP } from "./data/typeProfiles";
export { QUESTIONS, QUESTION_MAP } from "./data/questions";

// エンジン
export { diagnose } from "./engine/diagnosisEngine";
export { calculateAxisScores, summarizeAxisScores } from "./engine/scoreCalculator";
export { rankMorphs } from "./engine/morphMatcher";
export { rankTypes } from "./engine/typeMatcher";

// ユーティリティ
export {
  formatResultText,
  formatAxisScoresText,
  serializeResult,
} from "./utils/formatResult";
