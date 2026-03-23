// ============================================================
// CCTモフ診断 — 相性データ
// 軸距離ベースで計算 + 特別ペアに固有テキスト
// ============================================================

import { MORPH_PROFILES } from "./morphProfiles";
import type { MorphProfile } from "../types";

export interface CompatibilityResult {
  morphA: string;
  morphB: string;
  /** 0〜100（高いほど相性良） */
  score: number;
  rank: "最高" | "良い" | "普通" | "難しい";
  headline: string;
  description: string;
}

// 軸距離から相性スコアを計算（最大距離を100として正規化し反転）
function calcScore(a: MorphProfile, b: MorphProfile): number {
  const axes = Object.keys(a.axes) as (keyof typeof a.axes)[];
  const maxPerAxis = 9; // 1〜10の最大差
  const maxTotal = maxPerAxis * axes.length;
  const dist = axes.reduce((sum, ax) => sum + Math.abs(a.axes[ax] - b.axes[ax]), 0);
  return Math.round((1 - dist / maxTotal) * 100);
}

function rankFromScore(score: number): CompatibilityResult["rank"] {
  if (score >= 80) return "最高";
  if (score >= 65) return "良い";
  if (score >= 50) return "普通";
  return "難しい";
}

// 特別ペアの固有テキスト（双方向で使用）
const SPECIAL_PAIRS: Record<string, { headline: string; description: string }> = {
  "usa-inu":     { headline: "最強の癒しコンビ", description: "お互いの優しさが共鳴し、いるだけで場が温かくなる。どちらも与えることが好きなため、関係が自然と豊かになっていく。" },
  "raio-chii":   { headline: "王者と疾走者の最強タッグ", description: "ライオモフの統率力とちーモフのスピードが合わさると無敵。目標に向かって一直線の最強ペア。" },
  "neko-kurousa":{ headline: "孤高の者同士が共鳴する", description: "言葉少なでも通じ合える不思議な相性。お互いの孤独を尊重し、干渉しすぎない関係が長続きする秘訣。" },
  "saru-robo":   { headline: "天才コンビ、議論が止まらない", description: "発想力と論理力が激突する。意見は真逆でも、二人の議論から生まれるアイデアは最高傑作になりうる。" },
  "pan-zou":     { headline: "のんびりと深く、時間をかけた信頼", description: "急がない二人が、長い時間をかけて揺るがない絆を作る。焦らないことが二人の一番の共通点。" },
  "hai-kotori":  { headline: "祭りの中心で輝く最高の相棒", description: "どちらも場を盛り上げることが大好き。一緒にいるだけで自然とパーティーが生まれる最強の組み合わせ。" },
  "nin-wol":     { headline: "影と深海が出会う場所", description: "言葉より沈黙で通じ合う。二人の間には説明不要の空気感がある。深く信頼できる数少ない相手。" },
  "resa-saru":   { headline: "探検家と発明家の冒険コンビ", description: "好奇心が同じ方向を向いた時、二人は最高の旅に出る。飽きっぽい同士でも、お互いが刺激になって続けられる。" },
  "pen-zou":     { headline: "誠実さと記憶力が作る不変の絆", description: "真面目な二人が積み上げる信頼は、時間とともに磁石のように強くなる。長期的な関係で最も輝くペア。" },
  "kou-kurousa": { headline: "闇の中で輝く二つの星", description: "独自の世界観を持つ者同士が、お互いの異質さを認め合う。理解者が少ない者同士が見つけ合う奇跡の相性。" },
};

function getSpecialKey(idA: string, idB: string): string | undefined {
  const k1 = `${idA}-${idB}`;
  const k2 = `${idB}-${idA}`;
  return SPECIAL_PAIRS[k1] ? k1 : SPECIAL_PAIRS[k2] ? k2 : undefined;
}

const HEADLINES_BY_RANK: Record<CompatibilityResult["rank"], string[]> = {
  最高: ["最高の組み合わせ", "運命的な相性", "自然と引き合う二人", "一緒にいると加速する"],
  良い: ["相性の良いパートナー", "お互いを高め合える関係", "バランスのとれた二人"],
  普通: ["個性の違いが刺激になる", "補い合えれば強くなれる", "理解し合えば仲良くなれる"],
  難しい: ["衝突から学べる関係", "お互いを成長させる試練", "違いを受け入れれば可能性がある"],
};

function defaultDescription(score: number, a: MorphProfile, b: MorphProfile): string {
  if (score >= 80) return `${a.name}と${b.name}は多くの軸で共鳴している。一緒にいることでお互いの良さが自然と引き出される理想的な関係。`;
  if (score >= 65) return `似たような価値観を持つ二人。${a.name}の${a.catchphrase ?? "個性"}と${b.name}の${b.catchphrase ?? "個性"}が良いバランスを生む。`;
  if (score >= 50) return `それぞれの個性が強いため最初は戸惑うかもしれないが、お互いの違いが学びになる関係。`;
  return `価値観や行動パターンが大きく異なる二人。衝突も多いが、乗り越えることで互いに大きく成長できる。`;
}

// 全20モフの相性マップを生成
export function getCompatibilityMap(targetMorphId: string): CompatibilityResult[] {
  const target = MORPH_PROFILES.find((m) => m.id === targetMorphId);
  if (!target) return [];

  return MORPH_PROFILES
    .filter((m) => m.id !== targetMorphId)
    .map((other) => {
      const score = calcScore(target, other);
      const rank = rankFromScore(score);
      const specialKey = getSpecialKey(target.id, other.id);
      const special = specialKey ? SPECIAL_PAIRS[specialKey] : null;

      const headlinePool = HEADLINES_BY_RANK[rank];
      const defaultHeadline = headlinePool[Math.floor((score % headlinePool.length))];

      return {
        morphA: target.id,
        morphB: other.id,
        score,
        rank,
        headline: special?.headline ?? defaultHeadline,
        description: special?.description ?? defaultDescription(score, target, other),
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function getTopCompatibility(morphId: string, top = 3): CompatibilityResult[] {
  return getCompatibilityMap(morphId).slice(0, top);
}

export function getBottomCompatibility(morphId: string, bottom = 1): CompatibilityResult[] {
  const all = getCompatibilityMap(morphId);
  return all.slice(all.length - bottom);
}
