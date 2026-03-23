import { Question } from "../types";

// ============================================================
// 質問データ
// ============================================================
//
// 回答スケール: 1〜5 リッカート尺度
//   1 = まったく当てはまらない
//   2 = あまり当てはまらない
//   3 = どちらでもない
//   4 = やや当てはまる
//   5 = とても当てはまる
//
// weights の設計指針:
//   - 1設問につき 1〜3軸に影響させる（多すぎると解像度が落ちる）
//   - 同じ軸を複数設問でカバーして信頼性を上げる
//   - 正の重み: 「あてはまる」→ 軸スコアが上がる方向
//   - 負の重み: 「あてはまる」→ 軸スコアが下がる方向
//
// category は将来の設問グループ表示・ランダム選択に使う
// ============================================================

export const QUESTIONS: Question[] = [
  // ------ 行動力 ------
  {
    id: "q_action_01",
    category: "action",
    text: "気になることがあると、考える前にまず試してしまう方だ。",
    weights: { action: 0.8, curiosity: 0.3 },
  },
  {
    id: "q_action_02",
    category: "action",
    text: "やるべきことはあとまわしにせず、すぐ取りかかれる。",
    weights: { action: 0.7, stability: 0.2 },
  },
  {
    id: "q_action_03",
    category: "action",
    text: "「完璧になってから動こう」より「動きながら直せばいい」タイプだ。",
    weights: { action: 0.6, chaos: 0.3 },
  },

  // ------ 社交性 ------
  {
    id: "q_social_01",
    category: "social",
    text: "初めて会う人とも、自然と話せる方だ。",
    weights: { social: 0.8, charisma: 0.2 },
  },
  {
    id: "q_social_02",
    category: "social",
    text: "大人数でいるよりも、1人か少人数でいる方が落ち着く。",
    weights: { social: -0.7, stability: 0.2 },
  },
  {
    id: "q_social_03",
    category: "social",
    text: "友人や仲間と過ごす時間がエネルギーの源になっている。",
    weights: { social: 0.7, empathy: 0.2 },
  },

  // ------ 論理性 ------
  {
    id: "q_logic_01",
    category: "logic",
    text: "物事を決めるとき、直感よりも根拠やデータを重視する。",
    weights: { logic: 0.8, empathy: -0.2 },
  },
  {
    id: "q_logic_02",
    category: "logic",
    text: "感情に流されず、冷静に判断できる自信がある。",
    weights: { logic: 0.6, empathy: -0.3 },
  },

  // ------ 創造性 ------
  {
    id: "q_creativity_01",
    category: "creativity",
    text: "ありきたりな方法より、自分なりのアプローチを試したくなる。",
    weights: { creativity: 0.7, curiosity: 0.4 },
  },
  {
    id: "q_creativity_02",
    category: "creativity",
    text: "アイデアが頭の中でどんどん浮かんでくる方だ。",
    weights: { creativity: 0.8, chaos: 0.2 },
  },

  // ------ 安定志向 ------
  {
    id: "q_stability_01",
    category: "stability",
    text: "変化よりも、安定した日常の方が心地よい。",
    weights: { stability: 0.8, chaos: -0.4 },
  },
  {
    id: "q_stability_02",
    category: "stability",
    text: "計画を立ててから動く方が、行き当たりばったりよりも好きだ。",
    weights: { stability: 0.5, logic: 0.3, chaos: -0.3 },
  },

  // ------ 共感性 ------
  {
    id: "q_empathy_01",
    category: "empathy",
    text: "誰かが悲しんでいると、自分もつらい気持ちになる。",
    weights: { empathy: 0.8, competition: -0.2 },
  },
  {
    id: "q_empathy_02",
    category: "empathy",
    text: "困っている人を見ると、何かしてあげたくなる。",
    weights: { empathy: 0.7, social: 0.2 },
  },

  // ------ 影響力 ------
  {
    id: "q_charisma_01",
    category: "charisma",
    text: "人前で話すのが好きで、自分の意見を発信するのが苦にならない。",
    weights: { charisma: 0.7, social: 0.4, competition: 0.2 },
  },
  {
    id: "q_charisma_02",
    category: "charisma",
    text: "自分の言動が周りに影響を与えていると感じることがある。",
    weights: { charisma: 0.8, social: 0.2 },
  },

  // ------ 好奇心 ------
  {
    id: "q_curiosity_01",
    category: "curiosity",
    text: "知らない分野の話を聞くと、もっと知りたくなる。",
    weights: { curiosity: 0.8, creativity: 0.3 },
  },
  {
    id: "q_curiosity_02",
    category: "curiosity",
    text: "慣れた環境より、新しい場所や出会いにワクワクする。",
    weights: { curiosity: 0.7, action: 0.2, stability: -0.3 },
  },

  // ------ 幸福↔目的 ------
  {
    id: "q_purpose_01",
    category: "purpose",
    text: "楽しいかどうかより、意味や目的があることを優先したい。",
    weights: { purpose: 0.8, logic: 0.2 },
  },
  {
    id: "q_purpose_02",
    category: "purpose",
    text: "今が楽しいかどうかの方が、将来の目標よりも大切だ。",
    weights: { purpose: -0.7, empathy: 0.2 },
  },

  // ------ 秩序↔カオス ------
  {
    id: "q_chaos_01",
    category: "chaos",
    text: "ルール通りに進めるより、その場の流れに任せる方が楽しい。",
    weights: { chaos: 0.7, stability: -0.4 },
  },
  {
    id: "q_chaos_02",
    category: "chaos",
    text: "少々混乱していても、なんとかなると思える方だ。",
    weights: { chaos: 0.6, action: 0.2 },
  },

  // ------ 平和↔競争 ------
  {
    id: "q_competition_01",
    category: "competition",
    text: "競争や勝負事になると、いつもより燃える。",
    weights: { competition: 0.8, action: 0.3 },
  },
  {
    id: "q_competition_02",
    category: "competition",
    text: "誰かに勝つよりも、全員が幸せな結果が一番だと思う。",
    weights: { competition: -0.6, empathy: 0.3 },
  },
];

/** IDから質問を取得するマップ */
export const QUESTION_MAP: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q])
);
