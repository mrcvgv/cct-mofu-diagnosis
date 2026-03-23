import { TypeProfile } from "../types";

// ============================================================
// 5系 — 軸重み設定
// ============================================================
//
// weights の符号の意味:
//   正の値: その軸スコアが高いほど、この系スコアが上がる
//   負の値: その軸スコアが低いほど、この系スコアが上がる
//
// 重みの絶対値は影響度。合計が1になる必要はない（内部で正規化する）。
// この設定ファイルだけを編集することで系判定を調整できる。
// ============================================================

export const TYPE_PROFILES: TypeProfile[] = [
  {
    id: "fuwa",
    name: "ふわふわ系",
    description: "優しさ・癒し・共感。心が温かく、人の痛みに寄り添える存在。",
    weights: {
      empathy:     0.5,   // 共感力が高い
      stability:   0.2,   // 安定した穏やかさ
      purpose:    -0.3,   // 楽しさ・幸福重視（使命よりも今）
      competition: -0.3,  // 争いを好まない
      social:      0.1,   // 社交的
    },
  },
  {
    id: "bunbun",
    name: "ぶんぶん系",
    description: "行動・推進力・元気。エネルギーがあふれ、先頭に立って突き進む。",
    weights: {
      action:      0.4,   // 行動的
      competition: 0.3,   // 競争が好き
      social:      0.3,   // みんなを巻き込む
      stability:  -0.2,   // 安定より変化を好む
      chaos:       0.1,   // 多少カオスも楽しめる
    },
  },
  {
    id: "kira",
    name: "きらきら系",
    description: "魅力・華・影響力。自然と注目を集め、周りをインスパイアする存在。",
    weights: {
      charisma:    0.4,   // カリスマ性が高い
      creativity:  0.3,   // 独自の発想
      social:      0.3,   // 人を惹きつける社交性
      purpose:     0.1,   // 目標や夢を掲げる
    },
  },
  {
    id: "nonnon",
    name: "のんのん系",
    description: "落ち着き・安定・マイペース。自分のリズムを大切にする安定のエース。",
    weights: {
      stability:   0.4,   // 安定志向
      chaos:      -0.3,   // 秩序を好む
      action:     -0.2,   // ゆっくり動く
      competition: -0.2,  // 争いを好まない
      empathy:     0.1,   // 他者への気遣い
    },
  },
  {
    id: "guruguru",
    name: "ぐるぐる系",
    description: "発想・独創・カオス・変わり者。常識を超えたアイデアを生み出す異端の天才。",
    weights: {
      creativity:  0.4,   // 独創性が高い
      curiosity:   0.3,   // 好奇心旺盛
      chaos:       0.3,   // カオスを受け入れる
      stability:  -0.1,   // 変化を歓迎
      logic:      -0.1,   // 感覚・直感重視
    },
  },
];

/** IDから系プロフィールを取得するマップ */
export const TYPE_MAP: Record<string, TypeProfile> = Object.fromEntries(
  TYPE_PROFILES.map((t) => [t.id, t])
);
