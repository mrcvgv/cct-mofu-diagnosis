import { MORPH_PROFILES } from "@/data/morphProfiles";
import { TYPE_PROFILES } from "@/data/typeProfiles";
import { rankTypes } from "@/engine/typeMatcher";
import type { MorphProfile, TypeProfile } from "@/types";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "モフ図鑑 | CCTモフ診断",
  description: "CANDYCONTOWNの全20モフキャラクターを紹介。あなたに合うモフを探してみよう。",
};

function getMorphType(morph: MorphProfile): TypeProfile {
  return rankTypes(morph.axes, TYPE_PROFILES)[0].type;
}

const TYPE_STYLES: Record<string, { grad: string; border: string; badge: string }> = {
  fuwa:     { grad: "from-pink-500/25 to-rose-500/15",    border: "border-pink-400/25",    badge: "text-pink-300" },
  bunbun:   { grad: "from-orange-500/25 to-amber-500/15", border: "border-orange-400/25",  badge: "text-orange-300" },
  kira:     { grad: "from-violet-500/25 to-purple-500/15",border: "border-violet-400/25",  badge: "text-violet-300" },
  nonnon:   { grad: "from-emerald-500/25 to-teal-500/15", border: "border-emerald-400/25", badge: "text-emerald-300" },
  guruguru: { grad: "from-cyan-500/25 to-blue-500/15",    border: "border-cyan-400/25",    badge: "text-cyan-300" },
};

export default function MorphsPage() {
  const grouped = TYPE_PROFILES.map((type) => ({
    type,
    morphs: MORPH_PROFILES.filter((m) => getMorphType(m).id === type.id),
  }));

  return (
    <div
      className="min-h-screen p-4 pb-16"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
    >
      <div className="max-w-lg mx-auto">
        {/* ヘッダー */}
        <div className="text-center pt-6 mb-8">
          <p className="text-purple-300/60 text-xs tracking-[0.25em] mb-2">CANDYCONTOWN</p>
          <h1 className="text-3xl font-black text-white mb-2">モフ図鑑</h1>
          <p className="text-white/40 text-sm">全20種類のモフキャラクター</p>
        </div>

        {/* 系ごとのセクション */}
        <div className="space-y-8">
          {grouped.map(({ type, morphs }) => {
            const style = TYPE_STYLES[type.id] ?? { grad: "from-white/10 to-white/5", border: "border-white/20", badge: "text-white/60" };
            return (
              <div key={type.id}>
                <div className="mb-3">
                  <span className={`text-sm font-bold tracking-wide ${style.badge}`}>{type.name}</span>
                  <span className="text-white/25 text-xs ml-2">{type.description}</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {morphs.map((morph) => (
                    <div
                      key={morph.id}
                      className={`rounded-2xl overflow-hidden border bg-gradient-to-br ${style.grad} ${style.border}`}
                    >
                      <div className="p-4">
                        {/* アイコン */}
                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15
                          flex items-center justify-center mb-3">
                          <span className="text-white/40 font-black text-xl">{morph.name[0]}</span>
                        </div>

                        {/* モフ名 */}
                        <p className="text-white font-black text-base leading-tight mb-1">
                          {morph.name}
                        </p>

                        {/* キャッチフレーズ */}
                        {morph.catchphrase && (
                          <p className="text-white/50 text-xs mb-2 leading-snug">{morph.catchphrase}</p>
                        )}

                        {/* タグ */}
                        {morph.tags && morph.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {morph.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs bg-white/10 text-white/45 px-2 py-0.5 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 診断CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm mb-4">あなたのモフタイプは？</p>
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-2xl text-white font-bold text-base
              bg-gradient-to-r from-pink-500 to-violet-600
              hover:from-pink-400 hover:to-violet-500 active:scale-95 transition-all
              shadow-lg shadow-purple-900/50"
          >
            診断してみる
          </Link>
        </div>
      </div>
    </div>
  );
}
