"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { MORPH_MAP } from "@/data/morphProfiles";
import { FORTUNE_MAP, FORTUNE_MONTH } from "@/data/fortunes";

function StarScore({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`text-base ${i <= score ? "text-yellow-400" : "text-white/20"}`}>★</span>
      ))}
    </div>
  );
}

function SuccessContent() {
  const params = useSearchParams();
  const morphId = params.get("morph") ?? "pan";
  const sessionId = params.get("session_id");
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // session_id があれば決済確認済みとして扱う（本番ではAPIで検証推奨）
    setVerified(!!sessionId);
  }, [sessionId]);

  const morph = MORPH_MAP[morphId] ?? MORPH_MAP["pan"];
  const fortune = FORTUNE_MAP[morphId] ?? FORTUNE_MAP["pan"];

  if (verified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/50 text-sm">確認中…</p>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-400 text-sm mb-4">決済の確認ができませんでした。</p>
          <a href={`/fortune?morph=${morphId}`} className="text-white/50 text-sm underline">戻る</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">

        {/* 完了メッセージ */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40
            flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-emerald-400" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-white/40 text-xs tracking-widest mb-1">CANDYCONTOWN</p>
          <h1 className="text-2xl font-black text-white">{morph.name} の占い</h1>
          <p className="text-white/45 text-sm mt-1">{FORTUNE_MONTH} 完全版</p>
        </div>

        {/* 今月のテーマ */}
        <div className="rounded-2xl border border-violet-400/30 px-5 py-4 mb-4 text-center"
          style={{ background: "rgba(124,58,237,0.15)" }}>
          <p className="text-white/50 text-xs mb-1">今月のテーマ</p>
          <p className="text-violet-200 font-black text-2xl">「{fortune.theme}」</p>
        </div>

        {/* 3運勢 */}
        <div className="rounded-2xl overflow-hidden border border-white/15 mb-4"
          style={{ background: "rgba(255,255,255,0.05)" }}>

          {[
            { label: "恋愛運", data: fortune.love, icon: "💕" },
            { label: "仕事運", data: fortune.work, icon: "⚡" },
            { label: "対人運", data: fortune.social, icon: "💬" },
          ].map(({ label, data, icon }, i) => (
            <div key={label} className={`px-5 py-4 ${i < 2 ? "border-b border-white/10" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{icon}</span>
                  <p className="text-white/70 text-sm font-medium">{label}</p>
                </div>
                <StarScore score={data.score} />
              </div>
              <p className="text-white font-semibold text-sm mb-1.5">{data.headline}</p>
              <p className="text-white/65 text-xs leading-relaxed">{data.text}</p>
            </div>
          ))}
        </div>

        {/* ラッキー情報 */}
        <div className="rounded-2xl border border-white/15 px-5 py-4 mb-4"
          style={{ background: "rgba(255,255,255,0.05)" }}>
          <p className="text-white/50 text-xs mb-3">今月のラッキー</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "カラー", value: fortune.lucky.color },
              { label: "アイテム", value: fortune.lucky.item },
              { label: "ナンバー", value: String(fortune.lucky.number) },
              { label: "デイ", value: fortune.lucky.day },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/8 rounded-xl p-3">
                <p className="text-white/40 text-xs">{label}</p>
                <p className="text-white font-bold text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 今月のアドバイス */}
        <div className="rounded-2xl border border-amber-400/20 px-5 py-4 mb-6"
          style={{ background: "rgba(245,158,11,0.10)" }}>
          <p className="text-amber-300/70 text-xs mb-1">今月の一言</p>
          <p className="text-white font-semibold text-sm leading-relaxed">
            「{fortune.advice}」
          </p>
        </div>

        {/* 住人プランへ誘導 */}
        <div className="rounded-2xl border border-violet-400/20 px-5 py-4 mb-4"
          style={{ background: "rgba(124,58,237,0.10)" }}>
          <p className="text-white/60 text-sm mb-1 font-semibold">来月も見たいなら…</p>
          <p className="text-white/45 text-xs mb-3">
            住人プランなら毎月自動更新 + 相性マップ + デジタル住民票
          </p>
          <a href={`/resident?morph=${morphId}`}
            className="block w-full py-3 rounded-xl text-center text-white font-bold text-sm
              active:scale-95 transition-all"
            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)" }}>
            住人プランに登録する  ¥980/月
          </a>
        </div>

        <div className="text-center">
          <a href="/" className="text-white/30 text-xs hover:text-white/60 transition-colors">
            ← 診断に戻る
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FortuneSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
