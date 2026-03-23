// ============================================================
// CANDYCONTOWN — 外部リンク設定
// ここだけ編集すれば全ページに反映される
// ============================================================

export const SITE_URL = "https://cct-mofu-diagnosis.vercel.app";

export const LINKS = {
  /** Discord コミュニティ招待リンク */
  discord: "https://discord.gg/example", // TODO: 実URLに変更

  /** LINE公式アカウント */
  line_official: "https://lin.ee/example", // TODO: 実URLに変更

  /** 詳細占い（有料）*/
  fortune: "https://example.com/fortune", // TODO: 実URLに変更

  /** 相性診断（有料）*/
  compatibility: "https://example.com/compat", // TODO: 実URLに変更

  /** グッズショップ */
  shop: "https://example.com/shop", // TODO: 実URLに変更
} as const;

/** Xシェア用のツイートテキストを生成 */
export function buildTweetText(
  morphName: string,
  typeName: string,
  description: string
): string {
  return [
    `CCTモフ診断をやってみた🌟`,
    ``,
    `わたしのモフは【${morphName}】`,
    `${typeName}`,
    ``,
    `"${description}"`,
    ``,
    `あなたのモフは何？👇`,
    SITE_URL,
    ``,
    `#CCTモフ診断 #CANDYCONTOWN`,
  ].join("\n");
}

/** LINEシェア用URLを生成 */
export function buildLineShareUrl(morphName: string, typeName: string): string {
  const text = `CCTモフ診断をやってみた！わたしは【${morphName}】(${typeName})だった🌟 あなたもやってみて👇`;
  return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent(text)}`;
}

/** Xシェア用URLを生成 */
export function buildTwitterShareUrl(tweetText: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
}
