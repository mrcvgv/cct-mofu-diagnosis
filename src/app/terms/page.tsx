import type { Metadata } from "next";
import { SITE_CONFIG as C } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "利用規約 | CCTモフ診断",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-white font-bold text-base mb-3 border-l-2 border-violet-400 pl-3">{title}</h2>
      <div className="text-white/65 text-sm leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div
      className="min-h-screen p-4 pb-16"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
    >
      <div className="max-w-lg mx-auto">
        <div className="pt-8 mb-8">
          <p className="text-white/35 text-xs tracking-widest mb-2">CANDYCONTOWN</p>
          <h1 className="text-2xl font-black text-white mb-1">利用規約</h1>
          <p className="text-white/35 text-xs">最終更新: 2026年3月25日</p>
        </div>

        <Section title="第1条（適用）">
          <p>
            本規約は、{C.operatorTradeName}（以下「当社」）が提供する{C.siteName}（以下「本サービス」）の
            利用に関する条件を定めるものです。ユーザーは本規約に同意した上でご利用ください。
          </p>
        </Section>

        <Section title="第2条（利用資格）">
          <p>本サービスは、以下の条件を満たす方がご利用いただけます。</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>本規約に同意していること</li>
            <li>未成年の方は保護者の同意を得ていること</li>
            <li>過去に本サービスの利用を禁止されていないこと</li>
          </ul>
        </Section>

        <Section title="第3条（サービス内容）">
          <p>{C.serviceDescription}</p>
        </Section>

        <Section title="第4条（料金・決済）">
          <p>{C.pricingOverview}</p>
          <p className="mt-2">決済は{C.paymentProcessors.join("・")}を通じて行われます。</p>
          <p className="mt-2">{C.paymentTiming}</p>
        </Section>

        <Section title="第5条（サブスクリプション）">
          <p>{C.subscriptionPolicy.billingCycle}</p>
          <p className="mt-2">{C.subscriptionPolicy.renewalCondition}</p>
          <p className="mt-2">{C.subscriptionPolicy.cancellationPolicy}</p>
        </Section>

        <Section title="第6条（返金）">
          <p>{C.refundPolicy}</p>
        </Section>

        <Section title="第7条（禁止事項）">
          <p>ユーザーは以下の行為を行ってはなりません。</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>本サービスのコンテンツの無断複製・転載・二次配布</li>
            <li>他のユーザーまたは第三者への迷惑行為</li>
            <li>本サービスへの不正アクセスまたはシステムへの負荷をかける行為</li>
            <li>法令または公序良俗に違反する行為</li>
            <li>当社の許可なく営利目的で本サービスを利用する行為</li>
          </ul>
        </Section>

        <Section title="第8条（知的財産権）">
          <p>
            本サービス上のコンテンツ（テキスト・画像・診断ロジック等）の著作権その他知的財産権は
            当社または正当な権利者に帰属します。ユーザーはこれらを当社の事前の書面による許可なく
            使用することはできません。
          </p>
        </Section>

        <Section title="第9条（サービスの変更・停止）">
          <p>
            当社は、事前通知なく本サービスの内容を変更または停止する場合があります。
            これによりユーザーに損害が生じた場合でも、当社は責任を負わないものとします。
          </p>
        </Section>

        <Section title="第10条（免責事項）">
          <p>
            当社は、本サービスのコンテンツの正確性・完全性を保証しません。
            本サービスの利用により生じた損害について、当社の故意または重過失による場合を除き、
            当社は責任を負わないものとします。
          </p>
        </Section>

        <Section title="第11条（準拠法・管轄）">
          <p>
            本規約は{C.governingLaw}に準拠し、{C.court}を第一審の専属的合意管轄裁判所とします。
          </p>
        </Section>

        <Section title="第12条（お問い合わせ）">
          <p>
            本規約に関するお問い合わせは下記までご連絡ください。
          </p>
          <p className="mt-2">
            メール:{" "}
            <a href={`mailto:${C.contactEmail}`} className="underline hover:text-white transition-colors">
              {C.contactEmail}
            </a>
          </p>
        </Section>

        <div className="mt-8 text-center">
          <a href="/" className="text-white/35 text-xs hover:text-white/60 transition-colors">
            ← トップへ戻る
          </a>
        </div>
      </div>
    </div>
  );
}
