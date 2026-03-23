import { Question } from "../types";

// ============================================================
// 質問データ (55問)
// ============================================================
// 回答スケール: 1〜5 リッカート尺度
//   1=まったく当てはまらない / 2=あまり / 3=どちらでもない
//   4=やや / 5=とても当てはまる
//
// 軸ごとの設問数:
//   action:5 / social:5 / logic:4 / creativity:5 / stability:4
//   empathy:5 / charisma:4 / curiosity:5 / purpose:4
//   chaos:5 / competition:4 + 横断設問5 = 計55問
// ============================================================

export const QUESTIONS: Question[] = [

  // ========================================================
  // 行動力 (action) — 5問
  // ========================================================
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
  {
    id: "q_action_04",
    category: "action",
    text: "計画より先に動いて、後から軌道修正することが多い。",
    weights: { action: 0.7, chaos: 0.3 },
  },
  {
    id: "q_action_05",
    category: "action",
    text: "「とりあえずやってみる」という言葉が好きだ。",
    weights: { action: 0.8, curiosity: 0.2 },
  },

  // ========================================================
  // 社交性 (social) — 5問
  // ========================================================
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
  {
    id: "q_social_04",
    category: "social",
    text: "誰かと話していると、時間が経つのを忘れることがある。",
    weights: { social: 0.7, empathy: 0.2 },
  },
  {
    id: "q_social_05",
    category: "social",
    text: "パーティーや大勢の集まりは、疲れるよりも楽しいと感じる方だ。",
    weights: { social: 0.8, charisma: 0.2 },
  },

  // ========================================================
  // 論理性 (logic) — 4問
  // ========================================================
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
  {
    id: "q_logic_03",
    category: "logic",
    text: "議論のとき、相手の気持ちよりも論理が通っているかを重視する。",
    weights: { logic: 0.7, empathy: -0.4 },
  },
  {
    id: "q_logic_04",
    category: "logic",
    text: "手順や手続きをきちんと確認してから動く方だ。",
    weights: { logic: 0.5, stability: 0.4 },
  },

  // ========================================================
  // 創造性 (creativity) — 5問
  // ========================================================
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
  {
    id: "q_creativity_03",
    category: "creativity",
    text: "0から何かを作り上げることに、強い喜びを感じる。",
    weights: { creativity: 0.8, purpose: 0.2 },
  },
  {
    id: "q_creativity_04",
    category: "creativity",
    text: "人と違う視点や考え方を持っていると思う。",
    weights: { creativity: 0.6, chaos: 0.3 },
  },
  {
    id: "q_creativity_05",
    category: "creativity",
    text: "既存のルールや慣習を疑ってかかることがある。",
    weights: { creativity: 0.5, chaos: 0.4, stability: -0.3 },
  },

  // ========================================================
  // 安定志向 (stability) — 4問
  // ========================================================
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
  {
    id: "q_stability_03",
    category: "stability",
    text: "急な予定変更はなるべく避けたいと思う。",
    weights: { stability: 0.7, chaos: -0.3 },
  },
  {
    id: "q_stability_04",
    category: "stability",
    text: "「いつもの」場所や流れが好きで、新しいものをすすんで試すのは苦手だ。",
    weights: { stability: 0.7, curiosity: -0.4 },
  },

  // ========================================================
  // 共感性 (empathy) — 5問
  // ========================================================
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
  {
    id: "q_empathy_03",
    category: "empathy",
    text: "相手の気持ちを察してあげることが得意だ。",
    weights: { empathy: 0.8, social: 0.2 },
  },
  {
    id: "q_empathy_04",
    category: "empathy",
    text: "自分よりも、周囲の人が幸せかどうかを先に気にしてしまう。",
    weights: { empathy: 0.7, purpose: -0.2 },
  },
  {
    id: "q_empathy_05",
    category: "empathy",
    text: "誰かに冷たくされると、ひどく気になってしまう方だ。",
    weights: { empathy: 0.6, stability: -0.2 },
  },

  // ========================================================
  // 影響力 (charisma) — 4問
  // ========================================================
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
  {
    id: "q_charisma_03",
    category: "charisma",
    text: "「あなたはリーダーだね」と言われたことがある。",
    weights: { charisma: 0.7, competition: 0.3 },
  },
  {
    id: "q_charisma_04",
    category: "charisma",
    text: "自分を表現すること（発信・ファッション・趣味など）に積極的だ。",
    weights: { charisma: 0.6, creativity: 0.3 },
  },

  // ========================================================
  // 好奇心 (curiosity) — 5問
  // ========================================================
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
  {
    id: "q_curiosity_03",
    category: "curiosity",
    text: "「なぜそうなるのか」を自分で調べたくなることが多い。",
    weights: { curiosity: 0.7, logic: 0.3 },
  },
  {
    id: "q_curiosity_04",
    category: "curiosity",
    text: "本・動画・音楽など、ジャンルを問わず色々なものを見てしまう。",
    weights: { curiosity: 0.8, creativity: 0.2 },
  },
  {
    id: "q_curiosity_05",
    category: "curiosity",
    text: "自分でも把握しきれないほど、興味の幅が広い。",
    weights: { curiosity: 0.8, chaos: 0.2 },
  },

  // ========================================================
  // 幸福↔目的 (purpose) — 4問
  // ========================================================
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
  {
    id: "q_purpose_03",
    category: "purpose",
    text: "自分には果たすべき「使命」や「役割」があると感じている。",
    weights: { purpose: 0.8, charisma: 0.2 },
  },
  {
    id: "q_purpose_04",
    category: "purpose",
    text: "遠い将来のことより、今この瞬間を大事にしたい。",
    weights: { purpose: -0.6, chaos: 0.2 },
  },

  // ========================================================
  // 秩序↔カオス (chaos) — 5問
  // ========================================================
  {
    id: "q_chaos_01",
    category: "chaos",
    text: "ルール通りに進めるより、その場の流れに任せる方が楽しい。",
    weights: { chaos: 0.7, stability: -0.4 },
  },
  {
    id: "q_chaos_02",
    category: "chaos",
    text: "少々混乱していても、「なんとかなる」と思える方だ。",
    weights: { chaos: 0.6, action: 0.2 },
  },
  {
    id: "q_chaos_03",
    category: "chaos",
    text: "整理整頓が得意で、物の置き場所が決まっていないと気になる。",
    weights: { chaos: -0.7, stability: 0.4 },
  },
  {
    id: "q_chaos_04",
    category: "chaos",
    text: "突然のハプニングやサプライズが、むしろ楽しいと思える。",
    weights: { chaos: 0.7, curiosity: 0.3 },
  },
  {
    id: "q_chaos_05",
    category: "chaos",
    text: "会話や作業が脱線しても、それはそれで面白いと感じる方だ。",
    weights: { chaos: 0.6, curiosity: 0.3 },
  },

  // ========================================================
  // 平和↔競争 (competition) — 4問
  // ========================================================
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
  {
    id: "q_competition_03",
    category: "competition",
    text: "「負けたくない」という気持ちが行動の原動力になることが多い。",
    weights: { competition: 0.8, purpose: 0.2 },
  },
  {
    id: "q_competition_04",
    category: "competition",
    text: "同じ目標を持つライバルがいると、モチベーションが上がる。",
    weights: { competition: 0.6, social: 0.2, purpose: 0.2 },
  },

  // ========================================================
  // 横断設問 — 5問（複数軸を複合的に計測）
  // ========================================================
  {
    id: "q_cross_01",
    category: "cross",
    text: "一度やると決めたら、最後まで諦めない粘り強さがある。",
    weights: { purpose: 0.5, stability: 0.4, action: 0.3 },
  },
  {
    id: "q_cross_02",
    category: "cross",
    text: "昔から「変わっている」と言われることがある。",
    weights: { creativity: 0.5, chaos: 0.5 },
  },
  {
    id: "q_cross_03",
    category: "cross",
    text: "集中すると周りが見えなくなるほど、物事にのめり込む。",
    weights: { purpose: 0.6, social: -0.3, curiosity: 0.3 },
  },
  {
    id: "q_cross_04",
    category: "cross",
    text: "チームの中では、引っ張るよりもサポート役が好きだ。",
    weights: { competition: -0.5, empathy: 0.5, social: 0.2 },
  },
  {
    id: "q_cross_05",
    category: "cross",
    text: "自分のこだわりのためなら、効率を多少犠牲にしてもいいと思う。",
    weights: { creativity: 0.5, chaos: 0.3, logic: -0.3 },
  },
];

export const QUESTION_MAP: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q])
);
