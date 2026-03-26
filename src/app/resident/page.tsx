"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { MORPH_MAP } from "@/data/morphProfiles";
import { getSessionId } from "@/lib/session";

const PLAN_FEATURES = [
  { icon: "🏠", label: "デジタル住民票", detail: "あなただけの住民No.付き住民証（シェア可能）" },
  { icon: "🔮", label: "毎月の占い（全内容）", detail: "恋愛・仕事・対人 + ラッキー情報、毎月自動更新" },
  { icon: "💞", label: "全モフ相性マップ", detail: "20モフ全員との相性スコアと詳細解説" },
  { icon: "🎮", label: "Discord 住人専用ch", detail: "住人限定チャンネルへのアクセス権" },
  { icon: "🎁", label: "限定デジタル特典", detail: "住人バッジ・壁紙（毎月更新）" },
  { icon: "📢", label: "先行情報", detail: "新キャラ・イベント・コラボの先行受取" },
];

function ResidentContent() {
  const params = useSearchParams();
  const morphId = params.get("morph") ?? "pan";
  const canceled = params.get("canceled") === "1";
  const [loading, setLoading] = useState<"monthly" | "yearly" | null>(null);
  const [notReady, setNotReady] = useState(false);

  const morph = MORPH_MAP[morphId] ?? MORPH_MAP["pan"];

  useEffect(() => {
    fetch("/api/stats/interact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType: "page_view_resident", sessionId: getSessionId(), morphId }),
    }).catch(() => {});
  }, [morphId]);

  const handlePurchase = async (plan: "monthly" | "yearly") => {
    setLoading(plan);
    setNotReady(false);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "resident", morphId, sessionId: getSessionId(), plan }),
    });
    const data = await res.json();
    if (data.error === "payment_not_configured") {
      setNotReady(true);
      setLoading(null);
      return;
    }
    if (data.url) window.location.href = data.url;
    else setLoading(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">

        {/* ヘッダー */}
        <div className="text-center mb-6">
          <p className="text-white/35 text-xs tracking-widest mb-1">CANDYCONTOWN</p>
          <h1 className="text-3xl font-black text-white leading-tight">住人プラン</h1>
          <p className="text-white/50 text-sm mt-2">
            {morph.name}として、CANDYCONTOWNに住もう。
          </p>
        </div>

        {canceled && (
          <div className="bg-amber-500/15 border border-amber-400/30 rounded-2xl px-4 py-3 mb-4 text-amber-200 text-sm text-center">
            決済がキャンセルされました。
          </div>
        )}

        {/* 特典リスト */}
        <div className="rounded-2xl overflow-hidden border border-white/15 mb-5"
          style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="px-5 py-3 border-b border-white/10">
            <p className="text-white/50 text-xs">住人になるとできること</p>
          </div>
          <div className="divide-y divide-white/8">
            {PLAN_FEATURES.map(({ icon, label, detail }) => (
              <div key={label} className="flex items-start gap-3 px-5 py-3.5">
                <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-white/45 text-xs mt-0.5">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {notReady && (
          <div className="bg-amber-500/15 border border-amber-400/30 rounded-2xl px-4 py-3 mb-4 text-amber-200 text-sm text-center">
            決済機能は現在準備中です。もうしばらくお待ちください。
          </div>
        )}

        {/* 月額プラン */}
        <button
          onClick={() => handlePurchase("monthly")}
          disabled={!!loading}
          className="w-full rounded-2xl overflow-hidden mb-3 active:scale-95 transition-all
            disabled:opacity-60 text-left"
          style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)" }}
        >
          <div className="px-5 py-5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-white font-black text-lg">月額プラン</p>
              <div className="text-right">
                <p className="text-white font-black text-2xl leading-none">¥980</p>
                <p className="text-white/60 text-xs">/ 月</p>
              </div>
            </div>
            <p className="text-white/65 text-xs">いつでもキャンセル可能</p>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-white/0 text-xs"> </p>
              <span className="flex items-center gap-1.5 bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-full">
                {loading === "monthly" ? "処理中…" : "登録する"}
              </span>
            </div>
          </div>
        </button>

        {/* 年額プラン */}
        <button
          onClick={() => handlePurchase("yearly")}
          disabled={!!loading}
          className="w-full rounded-2xl overflow-hidden mb-5 active:scale-95 transition-all
            disabled:opacity-60 text-left border-2 border-amber-400/40"
          style={{ background: "rgba(245,158,11,0.12)" }}
        >
          <div className="px-5 py-5">
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="text-xs bg-amber-400/30 text-amber-200 px-2.5 py-0.5 rounded-full mr-2">
                  2ヶ月分お得
                </span>
                <p className="text-white font-black text-lg mt-1">年額プラン</p>
              </div>
              <div className="text-right">
                <p className="text-white font-black text-2xl leading-none">¥9,800</p>
                <p className="text-white/60 text-xs">/ 年</p>
              </div>
            </div>
            <p className="text-white/65 text-xs">¥980 × 12ヶ月分が ¥9,800</p>
            <div className="mt-3 flex items-center justify-end">
              <span className="flex items-center gap-1.5 bg-amber-500/40 text-amber-100 text-sm font-bold px-4 py-2 rounded-full">
                {loading === "yearly" ? "処理中…" : "年払いで登録する"}
              </span>
            </div>
          </div>
        </button>

        {/* 単発占いへの逃げ道 */}
        <div className="text-center mb-4">
          <p className="text-white/35 text-xs mb-2">まずは試してみたい方</p>
          <a href={`/fortune?morph=${morphId}`}
            className="inline-block text-white/60 text-sm font-medium
              border border-white/20 px-5 py-2.5 rounded-full
              hover:bg-white/8 active:scale-95 transition-all">
            単発占いを試す  ¥490
          </a>
        </div>

        <div className="text-center">
          <a href="/" className="text-white/25 text-xs hover:text-white/50 transition-colors">
            ← 診断に戻る
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ResidentPage() {
  return (
    <Suspense>
      <ResidentContent />
    </Suspense>
  );
}
