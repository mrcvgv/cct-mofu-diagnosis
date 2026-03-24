// ============================================================
// CCTモフ診断 — サイト・運営者設定
// ============================================================
// 特商法ページに直接表示されます。本番前に TODO を必ず埋めてください。
// ============================================================

export const SITE_CONFIG = {
  siteName: "CCTモフ診断",

  // ── 法的表示名（特商法 主軸） ────────────────────────────
  /** 個人事業主の場合は戸籍上の氏名。法人の場合は登記商号。 */
  operatorLegalName: "TODO: [本名]",
  /** 屋号 / ブランド名 */
  operatorTradeName: "Cream",

  // ── 住所・連絡先 ─────────────────────────────────────────
  address: "",  // TODO: 住所（空欄の場合は請求時開示と表示）
  phone: null as string | null,  // TODO: 電話番号（null = 請求時開示）
  disclosePhoneOnRequest: true,
  contactEmail: "TODO: contact@example.com",

  // ── サービス ─────────────────────────────────────────────
  siteUrl: "https://cct-mofu-diagnosis.vercel.app",
  businessCategory: "情報提供サービス / キャラクター診断・デジタルコンテンツ配信",
  serviceDescription:
    "CCTモフ診断は、CANDYCONTOWN IPのキャラクター診断サービスです。" +
    "診断機能は無料で提供し、有料プレミアムコンテンツ（占いコンテンツ・住人プラン）を提供します。",

  // ── 料金・決済 ───────────────────────────────────────────
  pricingOverview:
    "診断機能は無料。有料プラン: 単発占い ¥490（買い切り）、" +
    "住人プラン ¥980/月または ¥9,800/年（サブスクリプション）",
  extraFees: "なし。表示価格はすべて消費税込みです。",
  paymentMethods: [
    "クレジット・デビットカード（Visa、Mastercard、American Express）",
    "Apple Pay",
    "Google Pay",
  ],
  paymentTiming: "購入時またはサブスクリプション開始時に課金されます。",
  deliveryTiming: "デジタルコンテンツは決済完了後すぐにご利用いただけます。",

  // ── ポリシー ─────────────────────────────────────────────
  refundPolicy:
    "デジタルコンテンツの性質上、アクセス付与後の返金は原則として承っておりません。" +
    "サービスの不具合等が弊社起因の場合は、購入から7日以内にご連絡いただければ対応いたします。",
  subscriptionPolicy: {
    billingCycle: "月額プラン: 毎月、年額プラン: 毎年",
    renewalCondition: "解約手続きを行わない限り、自動的に更新されます。",
    cancellationPolicy:
      "いつでもマイページまたはご連絡により解約可能です。" +
      "解約後は次回更新日以降の請求は発生しません。",
  },

  // ── 法的管轄 ─────────────────────────────────────────────
  country: "日本",
  jurisdiction: "東京都",
  governingLaw: "日本法",
  court: "東京地方裁判所",

  // ── サポート ─────────────────────────────────────────────
  supportResponseWindow: "3営業日以内",

  // ── プライバシー ─────────────────────────────────────────
  analyticsServices: ["Vercel Analytics"],
  paymentProcessors: ["Stripe"],
} as const;
