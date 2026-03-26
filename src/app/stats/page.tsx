import type { Metadata } from "next";
import { getStats } from "@/lib/stats";
import { TYPE_PROFILES } from "@/data/typeProfiles";

export const metadata: Metadata = { title: "診断統計 | CCTモフ診断" };
export const revalidate = 60;

const TYPE_COLORS: Record<string, string> = {
  fuwa: "from-pink-400 to-rose-400",
  bun:  "from-yellow-400 to-orange-400",
  kira: "from-violet-400 to-purple-400",
  non:  "from-teal-400 to-cyan-400",
  guru: "from-blue-400 to-indigo-400",
};

function Bar({ pct, color = "from-violet-400 to-pink-400" }: { pct: number; color?: string }) {
  return (
    <div className="w-full bg-white/10 rounded-full h-2 mt-1">
      <div className={`bg-gradient-to-r ${color} h-2 rounded-full`} style={{ width: `${Math.max(pct, 0.5)}%` }} />
    </div>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white/6 rounded-xl px-4 py-3 text-center">
      <p className="text-white/40 text-xs mb-1">{label}</p>
      <p className="text-white font-black text-xl leading-none">{value}</p>
      {sub && <p className="text-white/30 text-xs mt-1">{sub}</p>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-white font-bold text-base mb-4 border-l-2 border-violet-400 pl-3">{title}</h2>
      {children}
    </section>
  );
}

const SHARE_LABELS: Record<string, string> = {
  share_x: "X (Twitter)", share_line: "LINE", share_copy: "URLコピー", share_og: "OG画像",
};
const CTA_LABELS: Record<string, string> = {
  cta_resident: "住人プラン", cta_fortune: "単発占い",
};
const PAGE_LABELS: Record<string, string> = {
  page_view_fortune: "/fortune", page_view_resident: "/resident", page_view_morphs: "/morphs",
};

function fmt(n: number | null | undefined, unit = ""): string {
  if (n == null) return "—";
  return `${n.toLocaleString()}${unit}`;
}

export default async function StatsPage() {
  const s = await getStats();

  if (!s) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
        <p className="text-white/40 text-sm">統計データはまだ収集されていません。</p>
      </div>
    );
  }

  const avgTimeSec = s.avgTimeMs != null ? (s.avgTimeMs / 1000).toFixed(0) : null;

  return (
    <div className="min-h-screen p-4 pb-16"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
      <div className="max-w-lg mx-auto">

        <div className="pt-8 mb-8">
          <p className="text-white/35 text-xs tracking-widest mb-2">CANDYCONTOWN</p>
          <h1 className="text-2xl font-black text-white mb-1">診断統計</h1>
          <p className="text-white/35 text-xs">累計: {s.total.toLocaleString()}回 / 直近7日: {s.recent7d.toLocaleString()}回</p>
        </div>

        {s.total === 0 ? (
          <div className="bg-white/8 rounded-2xl p-8 text-center">
            <p className="text-white/40 text-sm">まだデータがありません。</p>
          </div>
        ) : (
          <>
            {/* ── ファネル ── */}
            <Section title="ファネル">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <MetricCard label="クイズ開始" value={fmt(s.quizStarts)} />
                <MetricCard label="診断完了率" value={s.completionRate != null ? `${s.completionRate}%` : "—"} sub="開始→完了" />
                <MetricCard label="シェア率" value={`${s.shareRate}%`} sub="完了→シェア" />
                <MetricCard label="CTA率" value={`${s.ctaRate}%`} sub="完了→CTAタップ" />
                <MetricCard label="購入率" value={`${s.purchaseRate}%`} sub="完了→購入" />
                <MetricCard label="平均回答時間" value={avgTimeSec ? `${avgTimeSec}秒` : "—"} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <MetricCard label="モバイル率" value={`${s.mobileRate}%`} />
                <MetricCard label="リテイク平均" value={s.avgRetakes != null ? `${s.avgRetakes}回` : "—"} />
              </div>
            </Section>

            {/* ── シェア内訳 ── */}
            {Object.keys(s.byShare).length > 0 && (
              <Section title="シェア内訳">
                <div className="space-y-2">
                  {Object.entries(s.byShare).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between bg-white/6 rounded-xl px-4 py-2.5">
                      <span className="text-white/70 text-sm">{SHARE_LABELS[k] ?? k}</span>
                      <span className="text-white font-bold text-sm">{v.toLocaleString()}回</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* ── CTA・購入内訳 ── */}
            {(Object.keys(s.byCta).length > 0 || Object.keys(s.byPurchase).length > 0) && (
              <Section title="CTA・購入内訳">
                <div className="space-y-2">
                  {Object.entries(s.byCta).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between bg-white/6 rounded-xl px-4 py-2.5">
                      <span className="text-white/70 text-sm">{CTA_LABELS[k] ?? k} タップ</span>
                      <span className="text-white font-bold text-sm">{v.toLocaleString()}回</span>
                    </div>
                  ))}
                  {Object.entries(s.byPurchase).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between bg-emerald-500/15 border border-emerald-400/20 rounded-xl px-4 py-2.5">
                      <span className="text-emerald-300 text-sm">
                        {k === "purchase_fortune" ? "単発占い 購入" : k === "purchase_resident" ? "住人プラン 購入" : k}
                      </span>
                      <span className="text-emerald-300 font-bold text-sm">{v.toLocaleString()}件</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* ── ページ遷移 ── */}
            {Object.keys(s.byPageView).length > 0 && (
              <Section title="ページ遷移">
                <div className="space-y-2">
                  {Object.entries(s.byPageView).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between bg-white/6 rounded-xl px-4 py-2.5">
                      <span className="text-white/70 text-sm">{PAGE_LABELS[k] ?? k}</span>
                      <span className="text-white font-bold text-sm">{v.toLocaleString()}PV</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* ── 系別分布 ── */}
            <Section title="系別分布">
              <div className="space-y-3">
                {s.typeCounts.map((t) => {
                  const profile = TYPE_PROFILES.find((p) => p.id === t.id);
                  return (
                    <div key={t.id} className="bg-white/6 rounded-xl px-4 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium">{t.name}</span>
                        <div className="text-right">
                          <span className="text-white font-bold text-sm">{t.pct.toFixed(1)}%</span>
                          <span className="text-white/35 text-xs ml-2">({t.count.toLocaleString()})</span>
                        </div>
                      </div>
                      <Bar pct={t.pct} color={TYPE_COLORS[t.id]} />
                      {profile?.description && (
                        <p className="text-white/30 text-xs mt-1.5 leading-snug">{profile.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* ── モフ別分布（メイン1位） ── */}
            <Section title="モフ別分布（1位）">
              <div className="space-y-2">
                {s.morphCounts.map((m, i) => (
                  <div key={m.id} className="flex items-center gap-3 bg-white/6 rounded-xl px-4 py-3">
                    <span className="text-white/30 text-xs w-5 text-right shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium truncate">{m.name}</span>
                        <div className="text-right shrink-0 ml-2">
                          <span className="text-white font-bold text-sm">{m.pct.toFixed(1)}%</span>
                          <span className="text-white/35 text-xs ml-1.5">({m.count.toLocaleString()})</span>
                        </div>
                      </div>
                      <Bar pct={m.pct} />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── サブモフ分布（2位・3位に出たモフ） ── */}
            {s.subMorphCounts.length > 0 && (
              <Section title="サブ候補分布（2・3位の合計）">
                <div className="space-y-2">
                  {s.subMorphCounts.slice(0, 10).map((m, i) => (
                    <div key={m.id} className="flex items-center gap-3 bg-white/6 rounded-xl px-4 py-2.5">
                      <span className="text-white/30 text-xs w-5 text-right shrink-0">{i + 1}</span>
                      <span className="text-white/70 text-sm flex-1 truncate">{m.name}</span>
                      <span className="text-white font-bold text-sm shrink-0">{m.count.toLocaleString()}回</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* ── モフ別コンバージョン ── */}
            <Section title="モフ別 シェア・CTA・購入">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-white/35">
                      <th className="text-left pb-2 pr-2">モフ</th>
                      <th className="text-right pb-2 px-1">診断</th>
                      <th className="text-right pb-2 px-1">シェア</th>
                      <th className="text-right pb-2 px-1">CTA</th>
                      <th className="text-right pb-2 pl-1">購入</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {s.morphCounts.filter((m) => m.count > 0).map((m) => (
                      <tr key={m.id}>
                        <td className="py-2 pr-2 text-white/70 truncate max-w-[80px]">{m.name}</td>
                        <td className="py-2 px-1 text-right text-white/60">{m.count}</td>
                        <td className="py-2 px-1 text-right text-white/60">{m.shares}</td>
                        <td className="py-2 px-1 text-right text-white/60">{m.ctas}</td>
                        <td className="py-2 pl-1 text-right text-emerald-400">{m.purchases}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          </>
        )}

        <div className="mt-4 text-center">
          <a href="/" className="text-white/35 text-xs hover:text-white/60 transition-colors">← 診断してみる</a>
        </div>
      </div>
    </div>
  );
}
