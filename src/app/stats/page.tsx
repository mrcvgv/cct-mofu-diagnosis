import type { Metadata } from "next";
import { getStats } from "@/lib/stats";
import { TYPE_PROFILES } from "@/data/typeProfiles";

export const metadata: Metadata = {
  title: "診断統計 | CCTモフ診断",
};

export const revalidate = 60; // refresh every 60 seconds

const TYPE_COLORS: Record<string, string> = {
  fuwa:   "from-pink-400 to-rose-400",
  bun:    "from-yellow-400 to-orange-400",
  kira:   "from-violet-400 to-purple-400",
  non:    "from-teal-400 to-cyan-400",
  guru:   "from-blue-400 to-indigo-400",
};

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="w-full bg-white/10 rounded-full h-2 mt-1">
      <div
        className={`bg-gradient-to-r ${color} h-2 rounded-full transition-all`}
        style={{ width: `${Math.max(pct, 0.5)}%` }}
      />
    </div>
  );
}

export default async function StatsPage() {
  const stats = await getStats();

  return (
    <div
      className="min-h-screen p-4 pb-16"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
    >
      <div className="max-w-lg mx-auto">
        <div className="pt-8 mb-8">
          <p className="text-white/35 text-xs tracking-widest mb-2">CANDYCONTOWN</p>
          <h1 className="text-2xl font-black text-white mb-1">診断統計</h1>
          <p className="text-white/35 text-xs">
            {stats ? `累計診断数: ${stats.total.toLocaleString()}回` : "データ準備中"}
          </p>
        </div>

        {!stats ? (
          <div className="bg-white/8 rounded-2xl p-8 text-center">
            <p className="text-white/40 text-sm">統計データはまだ収集されていません。</p>
          </div>
        ) : stats.total === 0 ? (
          <div className="bg-white/8 rounded-2xl p-8 text-center">
            <p className="text-white/40 text-sm">まだ診断データがありません。</p>
          </div>
        ) : (
          <>
            {/* ── 系別分布 ── */}
            <section className="mb-8">
              <h2 className="text-white font-bold text-base mb-4 border-l-2 border-violet-400 pl-3">
                系別分布
              </h2>
              <div className="space-y-4">
                {stats.typeCounts.map((t) => {
                  const profile = TYPE_PROFILES.find((p) => p.id === t.id);
                  const color = TYPE_COLORS[t.id] ?? "from-white/40 to-white/20";
                  return (
                    <div key={t.id} className="bg-white/6 rounded-xl px-4 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium">{t.name}</span>
                        <div className="text-right">
                          <span className="text-white font-bold text-sm">{t.pct.toFixed(1)}%</span>
                          <span className="text-white/35 text-xs ml-2">({t.count.toLocaleString()})</span>
                        </div>
                      </div>
                      <Bar pct={t.pct} color={color} />
                      {profile?.description && (
                        <p className="text-white/35 text-xs mt-1.5 leading-snug">{profile.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── モフ別分布（上位10） ── */}
            <section className="mb-8">
              <h2 className="text-white font-bold text-base mb-4 border-l-2 border-violet-400 pl-3">
                モフ別分布（人気順）
              </h2>
              <div className="space-y-3">
                {stats.morphCounts.map((m, i) => (
                  <div key={m.id} className="flex items-center gap-3 bg-white/6 rounded-xl px-4 py-3">
                    <span className="text-white/30 text-xs w-5 text-right shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium truncate">{m.name}</span>
                        <div className="text-right shrink-0 ml-2">
                          <span className="text-white font-bold text-sm">{m.pct.toFixed(1)}%</span>
                          <span className="text-white/35 text-xs ml-1.5">({m.count.toLocaleString()})</span>
                        </div>
                      </div>
                      <Bar pct={m.pct} color="from-violet-400 to-pink-400" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <div className="mt-4 text-center">
          <a href="/" className="text-white/35 text-xs hover:text-white/60 transition-colors">
            ← 診断してみる
          </a>
        </div>
      </div>
    </div>
  );
}
