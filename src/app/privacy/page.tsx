import type { Metadata } from "next";
import { SITE_CONFIG as C } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "プライバシーポリシー | CCTモフ診断",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-white font-bold text-base mb-3 border-l-2 border-violet-400 pl-3">{title}</h2>
      <div className="text-white/65 text-sm leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div
      className="min-h-screen p-4 pb-16"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
    >
      <div className="max-w-lg mx-auto">
        <div className="pt-8 mb-8">
          <p className="text-white/35 text-xs tracking-widest mb-2">CANDYCONTOWN</p>
          <h1 className="text-2xl font-black text-white mb-1">プライバシーポリシー</h1>
          <p className="text-white/35 text-xs">最終更新: 2026年3月25日</p>
        </div>

        <Section title="1. 事業者情報">
          <p>
            {C.operatorTradeName}（販売業者: {C.operatorLegalName}）は、
            {C.siteName}（以下「本サービス」）における個人情報の取り扱いについて、
            以下のとおりプライバシーポリシーを定めます。
          </p>
        </Section>

        <Section title="2. 取得する情報">
          <p>本サービスでは、以下の情報を取得する場合があります。</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>診断回答データ（端末内で処理され、サーバーへの保存は行いません）</li>
            <li>決済情報（Stripeが取得・管理。当社は保持しません）</li>
            <li>アクセスログ（IPアドレス、ブラウザ情報、閲覧ページ等）</li>
            <li>Cookieおよびローカルストレージ（セッション管理・UX向上のため）</li>
          </ul>
        </Section>

        <Section title="3. 利用目的">
          <ul className="list-disc list-inside space-y-1">
            <li>本サービスの提供・運営・改善</li>
            <li>決済処理・注文管理</li>
            <li>お問い合わせへの対応</li>
            <li>サービス利用状況の分析（匿名・集計）</li>
            <li>法令の遵守および不正利用の防止</li>
          </ul>
        </Section>

        <Section title="4. 第三者への提供">
          <p>
            取得した情報は、以下の場合を除き第三者へ提供しません。
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>法令に基づく場合</li>
            <li>人の生命・身体・財産の保護のために必要な場合</li>
          </ul>
        </Section>

        <Section title="5. 外部サービスの利用">
          <p>本サービスは以下の外部サービスを利用しています。各社のプライバシーポリシーをご確認ください。</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            {C.analyticsServices.map((s) => <li key={s}>{s}（アクセス解析）</li>)}
            {C.paymentProcessors.map((s) => <li key={s}>{s}（決済処理）</li>)}
          </ul>
        </Section>

        <Section title="6. Cookie の利用">
          <p>
            本サービスはCookieを使用します。ブラウザの設定でCookieを無効にすることができますが、
            一部機能が正常に動作しない場合があります。
          </p>
        </Section>

        <Section title="7. 情報の保存期間">
          <p>
            取得した情報は、利用目的の達成に必要な期間、または法令で定める期間を超えて保存しません。
          </p>
        </Section>

        <Section title="8. 開示・訂正・削除">
          <p>
            ご自身の個人情報の開示・訂正・削除を希望される場合は、下記お問い合わせ先までご連絡ください。
            本人確認の上、合理的な期間内に対応いたします。
          </p>
        </Section>

        <Section title="9. 安全管理">
          <p>
            個人情報への不正アクセス・紛失・破損・改ざん・漏洩を防ぐため、適切なセキュリティ対策を講じます。
          </p>
        </Section>

        <Section title="10. お問い合わせ">
          <p>
            個人情報の取り扱いに関するお問い合わせは下記までご連絡ください。
          </p>
          <p className="mt-2">
            メール:{" "}
            <a href={`mailto:${C.contactEmail}`} className="underline hover:text-white transition-colors">
              {C.contactEmail}
            </a>
            <br />
            対応時間の目安: {C.supportResponseWindow}
          </p>
        </Section>

        <Section title="11. ポリシーの変更">
          <p>
            本ポリシーは必要に応じて変更する場合があります。
            重要な変更がある場合は本サービス上でお知らせします。
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
