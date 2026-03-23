"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { MORPH_MAP } from "@/data/morphProfiles";
import { FORTUNE_MAP, FORTUNE_MONTH } from "@/data/fortunes";
import { getTopCompatibility, getBottomCompatibility } from "@/data/compatibility";

// セッションIDから住民番号を生成（クライアント専用・再現性あり）
function generateResidentNo(sessionId: string, morphId: string): string {
  let hash = 0;
  const str = sessionId + morphId;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return String(Math.abs(hash) % 90000 + 10000);
}

function ResidentCard({
  morphName, morphId, residentNo, joinDate,
}: {
  morphName: string; morphId: string; residentNo: string; joinDate: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/25 p-6"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        boxShadow: "0 0 40px rgba(139,92,246,0.3)",
      }}
    >
      {/* 背景光 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48
        bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/30 text-xs tracking-[0.3em]">CANDYCONTOWN</p>
            <p className="text-white/30 text-xs tracking-widest">RESIDENT CARD</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20
            flex items-center justify-center">
            <span className="text-sm text-white/50">🏠</span>
          </div>
        </div>

        {/* モフ名（主役） */}
        <div className="mb-4">
          <p className="text-white/40 text-xs mb-1">MORPH TYPE</p>
          <p className="text-white font-black text-3xl tracking-tight">{morphName}</p>
        </div>

        {/* 住民番号 */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white/30 text-xs mb-0.5">RESIDENT No.</p>
            <p className="text-violet-300 font-mono font-bold text-xl tracking-widest">
              #{residentNo}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/30 text-xs mb-0.5">SINCE</p>
            <p className="text-white/50 text-sm font-medium">{joinDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessContent() {
  const params = useSearchParams();
  const morphId = params.get("morph") ?? "pan";
  const sessionId = params.get("session_id") ?? "demo";
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    setVerified(!!sessionId);
  }, [sessionId]);

  const morph = MORPH_MAP[morphId] ?? MORPH_MAP["pan"];
  const fortune = FORTUNE_MAP[morphId] ?? FORTUNE_MAP["pan"];
  const topCompat = useMemo(() => getTopCompatibility(morphId, 3), [morphId]);
  const bottomCompat = useMemo(() => getBottomCompatibility(morphId, 1), [morphId]);

  const residentNo = useMemo(() => generateResidentNo(sessionId, morphId), [sessionId, morphId]);
  const joinDate = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });

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
          <a href={`/resident?morph=${morphId}`} className="text-white/50 text-sm underline">戻る</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">

        {/* ウェルカム */}
        <div className="text-center mb-6">
          <p className="text-violet-300 text-sm font-bold tracking-widest mb-1">ようこそ</p>
          <h1 className="text-3xl font-black text-white">CANDYCONTOWNへ</h1>
          <p className="text-white/45 text-sm mt-1">住人登録が完了しました</p>
        </div>

        {/* デジタル住民票 */}
        <div className="mb-2">
          <p className="text-white/35 text-xs mb-2 text-center">あなたの住民票</p>
          <ResidentCard
            morphName={morph.name}
            morphId={morphId}
            residentNo={residentNo}
            joinDate={joinDate}
          />
        </div>
        <p className="text-white/25 text-xs text-center mb-6">
          スクリーンショットして保存 / シェアできます
        </p>

        {/* 今月の占い */}
        <div className="rounded-2xl overflow-hidden border border-white/15 mb-4"
          style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="px-5 py-3 border-b border-white/10">
            <p className="text-white font-bold text-sm">{FORTUNE_MONTH}の占い</p>
          </div>
          <div className="px-5 py-4 border-b border-white/10">
            <p className="text-white/40 text-xs mb-1">今月のテーマ</p>
            <p className="text-violet-200 font-black text-xl">「{fortune.theme}」</p>
          </div>
          {[
            { label: "恋愛運", data: fortune.love, icon: "💕" },
            { label: "仕事運", data: fortune.work, icon: "⚡" },
            { label: "対人運", data: fortune.social, icon: "💬" },
          ].map(({ label, data, icon }, i) => (
            <div key={label} className={`px-5 py-3.5 ${i < 2 ? "border-b border-white/10" : ""}`}>
              <div className="flex items-center gap-2 mb-1">
                <span>{icon}</span>
                <p className="text-white/60 text-xs">{label}</p>
                <div className="flex gap-0.5 ml-auto">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className={`text-xs ${s <= data.score ? "text-yellow-400" : "text-white/15"}`}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-white text-sm font-semibold">{data.headline}</p>
              <p className="text-white/55 text-xs leading-relaxed mt-0.5">{data.text}</p>
            </div>
          ))}
        </div>

        {/* 相性マップ */}
        <div className="rounded-2xl overflow-hidden border border-white/15 mb-4"
          style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="px-5 py-3 border-b border-white/10">
            <p className="text-white font-bold text-sm">相性マップ</p>
          </div>
          <div className="px-5 py-4 border-b border-white/10">
            <p className="text-white/45 text-xs mb-2">相性が良いモフ TOP3</p>
            <div className="space-y-2">
              {topCompat.map((c, i) => {
                const other = MORPH_MAP[c.morphB];
                return (
                  <div key={c.morphB} className="flex items-center gap-3">
                    <span className="text-white/30 text-xs w-4">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-white text-sm font-semibold">{other?.name ?? c.morphB}</p>
                        <p className="text-violet-300 text-xs font-bold">{c.score}%</p>
                      </div>
                      <p className="text-white/40 text-xs">{c.headline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="px-5 py-4">
            <p className="text-white/45 text-xs mb-2">最も個性が違うモフ</p>
            {bottomCompat.map((c) => {
              const other = MORPH_MAP[c.morphB];
              return (
                <div key={c.morphB} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-white text-sm font-semibold">{other?.name ?? c.morphB}</p>
                      <p className="text-rose-300 text-xs font-bold">{c.score}%</p>
                    </div>
                    <p className="text-white/40 text-xs">{c.headline}</p>
                    <p className="text-white/35 text-xs mt-0.5">{c.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ラッキー */}
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

        {/* アドバイス */}
        <div className="rounded-2xl border border-amber-400/20 px-5 py-4 mb-6"
          style={{ background: "rgba(245,158,11,0.10)" }}>
          <p className="text-amber-300/60 text-xs mb-1">今月の一言</p>
          <p className="text-white font-semibold text-sm leading-relaxed">「{fortune.advice}」</p>
        </div>

        <div className="text-center">
          <a href="/" className="text-white/25 text-xs hover:text-white/50 transition-colors">
            ← 診断トップに戻る
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ResidentSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
