// ============================================================
// CCTモフ診断 — 型定義
// ============================================================

// ------ 11共通軸 ID ------

export type AxisId =
  | "action"      // 行動力      1=慎重     / 10=行動的
  | "social"      // 社交性      1=単独     / 10=社交
  | "logic"       // 論理性      1=感覚     / 10=論理
  | "creativity"  // 創造性      1=現実     / 10=発想
  | "stability"   // 安定志向    1=変化     / 10=安定
  | "empathy"     // 共感性      1=ドライ   / 10=優しい
  | "charisma"    // 影響力      1=控えめ   / 10=カリスマ
  | "curiosity"   // 好奇心      1=保守     / 10=探索
  | "purpose"     // 幸福↔目的  1=楽しさ重視 / 10=使命重視
  | "chaos"       // 秩序↔カオス 1=秩序     / 10=カオス
  | "competition";// 平和↔競争  1=平和     / 10=競争

export type AxisScores = Record<AxisId, number>;

// ------ 軸の定義 ------

export interface AxisDefinition {
  id: AxisId;
  name: string;
  lowLabel: string;
  highLabel: string;
}

// ------ 質問 ------

export interface Question {
  id: string;
  text: string;
  /**
   * 軸への重み
   *   正の重み: 高回答 → 軸スコア上昇
   *   負の重み: 高回答 → 軸スコア下降（反転加算）
   */
  weights: Partial<Record<AxisId, number>>;
  /**
   * true にすると回答全体を反転 (5→高い軸に寄る設問を逆にする)
   * weightsのマイナス表現と組み合わせは避けること
   */
  reversed?: boolean;
  /** 設問カテゴリ (将来の設問グループ管理用) */
  category?: string;
}

// ------ 20モフ ------

export interface MorphProfile {
  id: string;
  name: string;
  /** 各軸の理想値 (1〜10) */
  axes: AxisScores;
  description?: string;
  /** 一言ラベル: "天才型ムードメーカー" など */
  catchphrase?: string;
  /**
   * CANDYCONTOWNキャラクター名（例: "エイプ"）
   * 結果カードで「エイプ (CANDYCONTOWN)」と表示される
   */
  characterName?: string;
  /**
   * キャラクター画像のパス（例: "/characters/saru.png"）
   * /public/characters/ 以下に画像を配置する
   */
  imageUrl?: string;
  /** 恋愛タイプ（プレミアムティーザー用） */
  loveType?: string;
  /** 弱点（プレミアムティーザー用） */
  weakness?: string;
  tags?: string[];
}

// ------ 5系 ------

export interface TypeProfile {
  id: string;
  name: string;
  /**
   * 軸の重みづけ
   *   正: その軸が高いほど系スコアが上がる
   *   負: その軸が低いほど系スコアが上がる
   */
  weights: Partial<Record<AxisId, number>>;
  description?: string;
}

// ------ 診断入力 ------

export interface DiagnosisInput {
  /** questionId → リッカート回答 (1〜5) */
  answers: Record<string, number>;
}

// ------ 診断オプション ------

export interface DiagnosisOptions {
  /** サブ候補の数 (default: 2) */
  subResultCount?: number;
  /**
   * モフ距離計算時の軸ごとの重み
   * 省略した軸は weight=1 として扱う
   */
  morphAxisWeights?: Partial<Record<AxisId, number>>;
  /**
   * 将来拡張: 「今日の運勢」など時間軸対応用
   * エンジン側でシード値やオフセットに使う
   */
  date?: Date;
}

// ------ 診断結果 ------

export interface RankedMorphResult {
  morph: MorphProfile;
  distance: number;
  rank: number;
}

export interface RankedTypeResult {
  type: TypeProfile;
  score: number;
  rank: number;
}

export interface DiagnosisResultItem {
  morph: MorphProfile;
  type: TypeProfile;
  /** 例: "きらきら系ロボモフ" */
  fullName: string;
}

export interface DiagnosisResult {
  axisScores: AxisScores;
  main: DiagnosisResultItem;
  sub: DiagnosisResultItem[];
  details: {
    morphRanking: RankedMorphResult[];
    typeRanking: RankedTypeResult[];
  };
}
