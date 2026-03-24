import type { Metadata } from "next";
import { SITE_CONFIG as C } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | CCTモフ診断",
};

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row border-b border-white/8 py-4 gap-1 sm:gap-4">
      <dt className="text-white/45 text-xs shrink-0 sm:w-40">{label}</dt>
      <dd className="text-white/80 text-sm leading-relaxed">{value}</dd>
    </div>
  );
}

export default function LegalPage() {
  return (
    <div
      className="min-h-screen p-4 pb-16"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
    >
      <div className="max-w-lg mx-auto">
        <div className="pt-8 mb-8">
          <p className="text-white/35 text-xs tracking-widest mb-2">CANDYCONTOWN</p>
          <h1 className="text-2xl font-black text-white mb-1">特定商取引法に基づく表記</h1>
          <p className="text-white/35 text-xs">最終更新: 2026年3月25日</p>
        </div>

        <dl className="divide-y divide-white/8 border-t border-white/8">
          <Row label="販売業者（正式名称）" value={C.operatorLegalName} />
          <Row label="屋号 / ブランド名" value={C.operatorTradeName} />
          <Row
            label="所在地"
            value={
              C.address
                ? C.address
                : "請求があり次第、遅滞なく開示いたします。下記メールアドレスよりご連絡ください。"
            }
          />
          <Row
            label="電話番号"
            value={
              C.phone
                ? C.phone
                : C.disclosePhoneOnRequest
                ? "請求があり次第、遅滞なく開示いたします。下記メールアドレスよりご連絡ください。"
                : "—"
            }
          />
          <Row
            label="メールアドレス"
            value={
              <a href={`mailto:${C.contactEmail}`} className="underline hover:text-white transition-colors">
                {C.contactEmail}
              </a>
            }
          />
          <Row label="運営責任者" value={C.operatorLegalName} />
          <Row label="販売URL" value={C.siteUrl} />
          <Row label="業務の内容" value={C.businessCategory} />
          <Row label="販売商品・サービス" value={C.serviceDescription} />
          <Row label="販売価格" value={C.pricingOverview} />
          <Row label="販売価格以外の費用" value={C.extraFees} />
          <Row label="支払方法" value={C.paymentMethods.join("、")} />
          <Row label="支払時期" value={C.paymentTiming} />
          <Row label="サービス提供時期" value={C.deliveryTiming} />
          <Row label="返品・キャンセルポリシー" value={C.refundPolicy} />
          <Row
            label="定期課金（サブスクリプション）"
            value={
              <>
                <p>{C.subscriptionPolicy.billingCycle}</p>
                <p className="mt-1">{C.subscriptionPolicy.renewalCondition}</p>
                <p className="mt-1">{C.subscriptionPolicy.cancellationPolicy}</p>
              </>
            }
          />
          <Row label="動作環境" value="最新のChrome・Safari・Firefox・Edge（インターネット接続必須）" />
          <Row label="準拠法" value={C.governingLaw} />
          <Row label="管轄裁判所" value={C.court} />
        </dl>

        <div className="mt-8 text-center">
          <a href="/" className="text-white/35 text-xs hover:text-white/60 transition-colors">
            ← トップへ戻る
          </a>
        </div>
      </div>
    </div>
  );
}
