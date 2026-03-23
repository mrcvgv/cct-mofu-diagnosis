// ============================================================
// サンプル実行: 診断エンジンの動作確認
// ============================================================
// 実行方法:
//   npx ts-node src/sample.ts
// ============================================================

import { diagnose, formatResultText } from "./index";
import { QUESTIONS } from "./data/questions";
import { MORPH_PROFILES } from "./data/morphProfiles";
import { TYPE_PROFILES } from "./data/typeProfiles";

// --- サンプル回答 A: 論理的・目標志向・クール系 ---
const answersA: Record<string, number> = {
  q_action_01: 4,
  q_action_02: 4,
  q_action_03: 3,
  q_social_01: 2,
  q_social_02: 4,
  q_social_03: 2,
  q_logic_01:  5,
  q_logic_02:  5,
  q_creativity_01: 4,
  q_creativity_02: 4,
  q_stability_01:  4,
  q_stability_02:  5,
  q_empathy_01:    2,
  q_empathy_02:    2,
  q_charisma_01:   3,
  q_charisma_02:   3,
  q_curiosity_01:  4,
  q_curiosity_02:  3,
  q_purpose_01:    5,
  q_purpose_02:    1,
  q_chaos_01:      2,
  q_chaos_02:      2,
  q_competition_01: 3,
  q_competition_02: 2,
};

// --- サンプル回答 B: 社交的・行動力高め・カリスマ ---
const answersB: Record<string, number> = {
  q_action_01: 5,
  q_action_02: 5,
  q_action_03: 5,
  q_social_01: 5,
  q_social_02: 1,
  q_social_03: 5,
  q_logic_01:  2,
  q_logic_02:  2,
  q_creativity_01: 5,
  q_creativity_02: 5,
  q_stability_01:  2,
  q_stability_02:  2,
  q_empathy_01:    4,
  q_empathy_02:    5,
  q_charisma_01:   5,
  q_charisma_02:   5,
  q_curiosity_01:  5,
  q_curiosity_02:  5,
  q_purpose_01:    3,
  q_purpose_02:    4,
  q_chaos_01:      5,
  q_chaos_02:      5,
  q_competition_01: 4,
  q_competition_02: 3,
};

// --- サンプル回答 C: 穏やか・共感重視・平和主義 ---
const answersC: Record<string, number> = {
  q_action_01: 2,
  q_action_02: 2,
  q_action_03: 2,
  q_social_01: 4,
  q_social_02: 3,
  q_social_03: 5,
  q_logic_01:  2,
  q_logic_02:  2,
  q_creativity_01: 3,
  q_creativity_02: 3,
  q_stability_01:  5,
  q_stability_02:  4,
  q_empathy_01:    5,
  q_empathy_02:    5,
  q_charisma_01:   3,
  q_charisma_02:   3,
  q_curiosity_01:  3,
  q_curiosity_02:  2,
  q_purpose_01:    1,
  q_purpose_02:    5,
  q_chaos_01:      2,
  q_chaos_02:      2,
  q_competition_01: 1,
  q_competition_02: 5,
};

function runSample(label: string, answers: Record<string, number>) {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`  ${label}`);
  console.log("=".repeat(50));

  const result = diagnose(
    { answers },
    QUESTIONS,
    MORPH_PROFILES,
    TYPE_PROFILES,
    { subResultCount: 2 }
  );

  console.log(formatResultText(result));
}

runSample("サンプルA: 論理的・目標志向", answersA);
runSample("サンプルB: 社交的・カリスマ", answersB);
runSample("サンプルC: 穏やか・共感重視", answersC);
