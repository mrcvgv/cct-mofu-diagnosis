// ============================================================
// 収益化・外部リンク設定
// ============================================================
// ここだけ編集すれば全ページに反映される

export const SITE_URL = "https://cct-mofu-diagnosis.vercel.app";

export const LINKS = {
  /** グッズショップ (BOOTH / BASE / Amazon等) */
  shop: "https://example.com/shop", // TODO: 実URLに変更

  /** Discord招待リンク */
  discord: "https://discord.gg/example", // TODO: 実URLに変更

  /** LINE公式アカウント */
  line_official: "https://lin.ee/example", // TODO: 実URLに変更

  /** 詳細レポート / 有料診断ページ */
  premium: "https://example.com/premium", // TODO: 実URLに変更

  /** X (Twitter) アカウント */
  twitter_account: "https://x.com/example", // TODO: 実URLに変更
} as const;

/** Xシェア用のツイートテキストを生成 */
export function buildTweetText(
  morphName: string,
  typeName: string,
  description: string
): string {
  return [
    `🎯 CCTモフ診断の結果は…`,
    ``,
    `【${morphName}】`,
    `${typeName}`,
    ``,
    `"${description}"`,
    ``,
    `あなたのモフは何？👇`,
    SITE_URL,
    ``,
    `#CCTモフ診断 #モフ診断`,
  ].join("\n");
}

/** LINEシェア用URLを生成 */
export function buildLineShareUrl(morphName: string, typeName: string): string {
  const text = `CCTモフ診断で【${morphName}】(${typeName})でした！あなたは？ ${SITE_URL}`;
  return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent(text)}`;
}

/** Xシェア用URLを生成 */
export function buildTwitterShareUrl(tweetText: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
}
