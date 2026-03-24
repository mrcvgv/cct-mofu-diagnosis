"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { MORPH_MAP } from "@/data/morphProfiles";
import { FORTUNE_MAP, FORTUNE_MONTH } from "@/data/fortunes";

function StarScore({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`text-sm ${i <= score ? "text-yellow-400" : "text-white/20"}`}>★</span>
      ))}
    </div>
  );
}

function FortuneContent() {
  const params = useSearchParams();
  const morphId = params.get("morph") ?? "pan";
  const canceled = params.get("canceled") === "1";
  const [loading, setLoading] = useState(false);
  const [notReady, setNotReady] = useState(false);

  const morph = MORPH_MAP[morphId] ?? MORPH_MAP["pan"];
  const fortune = FORTUNE_MAP[morphId] ?? FORTUNE_MAP["pan"];

  const handlePurchase = async () => {
    setLoading(true);
    setNotReady(false);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "fortune", morphId }),
    });
    const data = await res.json();
    if (data.error === "payment_not_configured") {
      setNotReady(true);
      setLoading(false);
      return;
    }
    if (data.url) window.location.href = data.url;
    else setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">

        {/* ヘッダー */}
        <div className="text-center mb-6">
          <p className="text-white/35 text-xs tracking-widest mb-1">CANDYCONTOWN</p>
          <h1 className="text-2xl font-black text-white">{morph.name} の占い</h1>
          <p className="text-white/45 text-sm mt-1">{FORTUNE_MONTH}</p>
        </div>

        {canceled && (
          <div className="bg-amber-500/15 border border-amber-400/30 rounded-2xl px-4 py-3 mb-4 text-amber-200 text-sm text-center">
            決済がキャンセルされました。もう一度試すことができます。
          </div>
        )}

        {/* 無料プレビュー（一部表示） */}
        <div className="rounded-2xl overflow-hidden border border-white/15 mb-4"
          style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="px-5 py-4 border-b border-white/10">
            <p className="text-white font-bold text-sm">今月のテーマ</p>
            <p className="text-violet-300 font-black text-xl mt-1">「{fortune.theme}」</p>
          </div>

          {/* 恋愛運（無料で一部表示） */}
          <div className="px-5 py-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm font-medium">恋愛運</p>
              <StarScore score={fortune.love.score} />
            </div>
            <p className="text-white font-semibold text-sm mb-1">{fortune.love.headline}</p>
            <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
              {fortune.love.text.slice(0, 30)}…
            </p>
          </div>

          {/* 仕事運（ロック） */}
          <div className="px-5 py-4 border-b border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm font-medium">仕事運</p>
              <span className="text-white/30 text-sm">🔒</span>
            </div>
            <div className="blur-sm select-none pointer-events-none">
              <p className="text-white/30 font-semibold text-sm mb-1">{fortune.work.headline}</p>
              <p className="text-white/20 text-xs leading-relaxed">{fortune.work.text}</p>
            </div>
          </div>

          {/* 対人運（ロック） */}
          <div className="px-5 py-4 border-b border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm font-medium">対人運</p>
              <span className="text-white/30 text-sm">🔒</span>
            </div>
            <div className="blur-sm select-none pointer-events-none">
              <p className="text-white/30 font-semibold text-sm mb-1">{fortune.social.headline}</p>
              <p className="text-white/20 text-xs leading-relaxed">{fortune.social.text}</p>
            </div>
          </div>

          {/* ラッキー情報（ロック） */}
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm font-medium">ラッキー情報</p>
              <span className="text-white/30 text-sm">🔒</span>
            </div>
            <div className="blur-sm select-none pointer-events-none grid grid-cols-2 gap-2">
              {["ラッキーカラー", "ラッキーアイテム", "ラッキーナンバー", "ラッキーデイ"].map((label) => (
                <div key={label} className="bg-white/5 rounded-xl p-2.5">
                  <p className="text-white/20 text-xs">{label}</p>
                  <p className="text-white/15 text-sm font-bold">●●●</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {notReady && (
          <div className="bg-amber-500/15 border border-amber-400/30 rounded-2xl px-4 py-3 mb-4 text-amber-200 text-sm text-center">
            決済機能は現在準備中です。もうしばらくお待ちください。
          </div>
        )}

        {/* 購入CTA */}
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-black text-white text-base
            active:scale-95 transition-all disabled:opacity-60
            shadow-xl shadow-violet-900/40"
          style={{ background: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)" }}
        >
          {loading ? "処理中…" : `今すぐ全部見る  ¥490`}
        </button>
        <p className="text-white/30 text-xs text-center mt-2">
          買い切り・カード / Apple Pay 対応
        </p>

        {/* 住人プランへの誘導 */}
        <div className="mt-4 p-4 rounded-2xl border border-violet-400/20 bg-violet-500/10">
          <p className="text-white/60 text-xs text-center mb-3">
            毎月更新 + 住民票 + 相性マップ全部 なら住人プランがお得
          </p>
          <a href={`/resident?morph=${morphId}`}
            className="block w-full py-3 rounded-xl text-center text-white/80 font-semibold text-sm
              border border-white/20 hover:bg-white/10 active:scale-95 transition-all">
            住人プランを見る  ¥980/月
          </a>
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-white/30 text-xs hover:text-white/60 transition-colors">
            ← 診断に戻る
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FortunePage() {
  return (
    <Suspense>
      <FortuneContent />
    </Suspense>
  );
}
