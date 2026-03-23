import { MorphProfile } from "../types";

// ============================================================
// 20モフ — キャラクタープロフィール
// ============================================================
//
// characterName: CANDYCONTOWNのキャラクター名（例: "エイプ"）
//   → 結果カードで「エイプ (CANDYCONTOWN)」と表示
//   → TODO: 各キャラクターの正式名称に更新してください
//
// imageUrl: キャラクター画像のパス
//   → /public/characters/{morphId}.png に画像を配置するだけで反映
//   → 画像未配置の場合はモフ名の頭文字アイコンで代替表示
// ============================================================

export const MORPH_PROFILES: MorphProfile[] = [
  {
    id: "usa",
    name: "うさモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/usa.png",
    catchphrase: "やさしさの守護者",
    loveType: "献身タイプ",
    weakness: "尽くしすぎること",
    description: "ふわふわで優しい。共感力が高く、穏やかな癒し系。",
    tags: ["癒し", "共感", "穏やか"],
    axes: { action:4, social:6, logic:4, creativity:5, stability:8, empathy:9, charisma:5, curiosity:5, purpose:3, chaos:2, competition:2 },
  },
  {
    id: "kurousa",
    name: "黒うさモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/kurousa.png",
    catchphrase: "静かなる共鳴者",
    loveType: "謎めいた魅力タイプ",
    weakness: "心を開かないこと",
    description: "ミステリアスで独自の世界観を持つ。クールな共感者。",
    tags: ["ミステリアス", "独特", "クール"],
    axes: { action:5, social:3, logic:6, creativity:7, stability:5, empathy:6, charisma:7, curiosity:7, purpose:6, chaos:6, competition:3 },
  },
  {
    id: "kotori",
    name: "ことりモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/kotori.png",
    catchphrase: "自由な歌い手",
    loveType: "自由恋愛タイプ",
    weakness: "飽きっぽいこと",
    description: "自由で明るく、どこへでも飛んでいける。社交的な楽天家。",
    tags: ["自由", "明るい", "社交的"],
    axes: { action:7, social:9, logic:3, creativity:7, stability:3, empathy:7, charisma:7, curiosity:8, purpose:3, chaos:6, competition:3 },
  },
  {
    id: "resa",
    name: "れさモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/resa.png",
    catchphrase: "永遠の探検家",
    loveType: "好奇心旺盛タイプ",
    weakness: "集中力が続かないこと",
    description: "好奇心旺盛でいつも楽しいことを探している。遊び心いっぱい。",
    tags: ["好奇心", "遊び心", "愉快"],
    axes: { action:6, social:6, logic:4, creativity:7, stability:4, empathy:6, charisma:5, curiosity:9, purpose:3, chaos:7, competition:4 },
  },
  {
    id: "nezu",
    name: "ねずモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/nezu.png",
    catchphrase: "小さな戦略家",
    loveType: "計算高いタイプ",
    weakness: "疑い深すぎること",
    description: "機敏で機転が利く。小さいけれど頭の回転が速い現実主義者。",
    tags: ["機敏", "頭脳派", "現実的"],
    axes: { action:7, social:5, logic:7, creativity:5, stability:5, empathy:4, charisma:4, curiosity:7, purpose:7, chaos:5, competition:6 },
  },
  {
    id: "pen",
    name: "ペンモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/pen.png",
    catchphrase: "誠実な職人",
    loveType: "真面目一途タイプ",
    weakness: "融通が利かないこと",
    description: "真面目で誠実。礼儀正しく、きちんとやり遂げるタイプ。",
    tags: ["誠実", "真面目", "礼儀正しい"],
    axes: { action:6, social:5, logic:7, creativity:4, stability:8, empathy:5, charisma:5, curiosity:4, purpose:8, chaos:2, competition:5 },
  },
  {
    id: "pen2",
    name: "ペンモフ2",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/pen2.png",
    catchphrase: "つなぐチームの要",
    loveType: "みんなに好かれるタイプ",
    weakness: "八方美人になりがちなこと",
    description: "フォーマルだけど意外と社交的。チームの潤滑油タイプ。",
    tags: ["社交的", "バランス型", "チームワーク"],
    axes: { action:5, social:8, logic:6, creativity:5, stability:6, empathy:7, charisma:6, curiosity:5, purpose:6, chaos:3, competition:4 },
  },
  {
    id: "neko",
    name: "ねこモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/neko.png",
    catchphrase: "孤高のカリスマ",
    loveType: "ツンデレタイプ",
    weakness: "素直になれないこと",
    description: "我が道を行く。優雅で気まぐれ、でも独特の魅力がある。",
    tags: ["独立心", "優雅", "気まぐれ"],
    axes: { action:5, social:3, logic:6, creativity:7, stability:6, empathy:4, charisma:9, curiosity:8, purpose:4, chaos:5, competition:3 },
  },
  {
    id: "raio",
    name: "ライオモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/raio.png",
    catchphrase: "生まれながらの王",
    loveType: "引き寄せるタイプ",
    weakness: "周りが見えなくなること",
    description: "生まれつきのリーダー。強いカリスマと目標への情熱を持つ。",
    tags: ["リーダー", "カリスマ", "情熱"],
    axes: { action:9, social:7, logic:5, creativity:5, stability:6, empathy:5, charisma:10, curiosity:5, purpose:8, chaos:4, competition:9 },
  },
  {
    id: "chii",
    name: "ちーモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/chii.png",
    catchphrase: "最速の覇者",
    loveType: "勝負恋愛タイプ",
    weakness: "急ぎすぎること",
    description: "圧倒的なスピードと集中力。勝負事で燃える究極の競争者。",
    tags: ["高速", "競争", "集中力"],
    axes: { action:10, social:5, logic:6, creativity:4, stability:4, empathy:3, charisma:7, curiosity:6, purpose:9, chaos:3, competition:10 },
  },
  {
    id: "hai",
    name: "ハイモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/hai.png",
    catchphrase: "天下無敵の宴会部長",
    loveType: "波乱万丈タイプ",
    weakness: "疲れを認めないこと",
    description: "エネルギッシュで群れるのが好き。にぎやかな場を作り出す。",
    tags: ["エネルギッシュ", "群れ好き", "にぎやか"],
    axes: { action:8, social:9, logic:4, creativity:6, stability:3, empathy:4, charisma:7, curiosity:7, purpose:5, chaos:8, competition:7 },
  },
  {
    id: "zou",
    name: "ぞうモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/zou.png",
    catchphrase: "記憶する賢者",
    loveType: "長期戦タイプ",
    weakness: "変化を嫌うこと",
    description: "記憶力と洞察力が抜群。安定感があり、みんなに信頼される長老タイプ。",
    tags: ["安定", "洞察", "信頼"],
    axes: { action:4, social:6, logic:8, creativity:4, stability:9, empathy:8, charisma:7, curiosity:5, purpose:7, chaos:2, competition:3 },
  },
  {
    id: "saru",
    name: "さるモフ",
    characterName: "エイプ",
    imageUrl: "/characters/saru.png",
    catchphrase: "天才型ムードメーカー",
    loveType: "策略家タイプ",
    weakness: "考えすぎること",
    description: "頭が切れて社交的。アイデアと行動力で周りを巻き込む発明家タイプ。",
    tags: ["頭脳派", "発明", "社交的"],
    axes: { action:8, social:9, logic:7, creativity:9, stability:3, empathy:5, charisma:7, curiosity:9, purpose:5, chaos:7, competition:6 },
  },
  {
    id: "bafu",
    name: "ばふモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/bafu.png",
    catchphrase: "不動の守護者",
    loveType: "安定重視タイプ",
    weakness: "保守的すぎること",
    description: "どっしりと力強い。頼もしさと粘り強さで周りを支える縁の下の力持ち。",
    tags: ["頼もしい", "粘り強い", "安定"],
    axes: { action:6, social:5, logic:5, creativity:3, stability:9, empathy:6, charisma:5, curiosity:3, purpose:8, chaos:2, competition:5 },
  },
  {
    id: "inu",
    name: "いぬモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/inu.png",
    catchphrase: "永遠の親友",
    loveType: "全力純愛タイプ",
    weakness: "依存しがちなこと",
    description: "忠実でみんなに愛される。共感力と行動力を兼ね備えた親友タイプ。",
    tags: ["忠実", "友情", "元気"],
    axes: { action:7, social:9, logic:4, creativity:4, stability:7, empathy:9, charisma:6, curiosity:6, purpose:6, chaos:3, competition:4 },
  },
  {
    id: "wol",
    name: "ウォルモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/wol.png",
    catchphrase: "深海の哲学者",
    loveType: "深みにはまるタイプ",
    weakness: "孤立しすぎること",
    description: "深海のような深みと静けさを持つ。孤高の哲学者。",
    tags: ["深み", "哲学的", "孤高"],
    axes: { action:3, social:3, logic:9, creativity:6, stability:8, empathy:5, charisma:6, curiosity:7, purpose:8, chaos:3, competition:2 },
  },
  {
    id: "kou",
    name: "こうモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/kou.png",
    catchphrase: "闇に輝く異端児",
    loveType: "インパクト残すタイプ",
    weakness: "理解されにくいこと",
    description: "夜に輝く独創家。誰も思いつかないアイデアを闇から生み出す。",
    tags: ["独創的", "夜型", "ユニーク"],
    axes: { action:6, social:4, logic:5, creativity:9, stability:4, empathy:5, charisma:6, curiosity:9, purpose:4, chaos:9, competition:3 },
  },
  {
    id: "pan",
    name: "パンモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/pan.png",
    catchphrase: "世界が愛する存在",
    loveType: "包まれるタイプ",
    weakness: "流されやすいこと",
    description: "のんびりしていて愛されキャラ。マイペースで平和主義の癒し担当。",
    tags: ["のんびり", "愛され", "平和主義"],
    axes: { action:3, social:7, logic:4, creativity:5, stability:8, empathy:8, charisma:8, curiosity:5, purpose:2, chaos:4, competition:2 },
  },
  {
    id: "robo",
    name: "ロボモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/robo.png",
    catchphrase: "完全無欠の論理者",
    loveType: "論理的恋愛タイプ",
    weakness: "感情を無視しがちなこと",
    description: "完璧な論理と精密さを持つ。感情よりデータを信じる超合理主義者。",
    tags: ["論理", "精密", "合理主義"],
    axes: { action:4, social:3, logic:10, creativity:6, stability:8, empathy:3, charisma:5, curiosity:7, purpose:9, chaos:2, competition:3 },
  },
  {
    id: "nin",
    name: "にんモフ",
    characterName: "TODO: キャラクター名",   // TODO
    imageUrl: "/characters/nin.png",
    catchphrase: "影の実力者",
    loveType: "秘密主義タイプ",
    weakness: "信頼しないこと",
    description: "影から動く戦略家。冷静な判断と卓越したスキルで使命を遂行する。",
    tags: ["戦略家", "スキル重視", "クール"],
    axes: { action:8, social:3, logic:7, creativity:7, stability:6, empathy:3, charisma:5, curiosity:7, purpose:9, chaos:5, competition:7 },
  },
];

export const MORPH_MAP: Record<string, MorphProfile> = Object.fromEntries(
  MORPH_PROFILES.map((m) => [m.id, m])
);
