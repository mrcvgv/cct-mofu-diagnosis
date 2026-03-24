"use client";

import { useState } from "react";
import { QUESTIONS } from "@/data/questions";
import { MORPH_PROFILES } from "@/data/morphProfiles";
import { TYPE_PROFILES } from "@/data/typeProfiles";
import { diagnose } from "@/engine/diagnosisEngine";
import { AXIS_DEFINITIONS } from "@/data/axes";
import {
  LINKS,
  buildTweetText,
  buildTwitterShareUrl,
  buildLineShareUrl,
} from "@/config/links";
import type { DiagnosisResult, Question } from "@/types";
import { getTopCompatibility, getBottomCompatibility } from "@/data/compatibility";

type Phase = "start" | "quiz" | "result";

const ANSWER_LABELS = [
  "まったく\nあてはまらない",
  "あまり\nあてはまらない",
  "どちらでも\nない",
  "やや\nあてはまる",
  "とても\nあてはまる",
];

// ================================================================
// Start Screen
// ================================================================
function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <p className="text-purple-300 text-sm tracking-widest mb-2">CANDYCONTOWN</p>
        <h1 className="text-5xl font-bold text-white mb-3">モフ診断</h1>
        <p className="text-purple-200 text-lg mb-8">あなたはどのモフ？</p>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-8 text-left">
          <p className="text-white/80 text-sm leading-relaxed">
            全 <span className="text-yellow-300 font-bold">{QUESTIONS.length}問</span> の質問に答えると、
            <span className="text-yellow-300 font-bold"> 20モフ × 5系 = 100タイプ</span> の中から
            あなたにぴったりのモフを診断します。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["ふわふわ系", "ぶんぶん系", "きらきら系", "のんのん系", "ぐるぐる系"].map((t) => (
              <span key={t} className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl text-white font-bold text-xl
            bg-gradient-to-r from-pink-500 to-violet-600
            hover:from-pink-400 hover:to-violet-500
            active:scale-95 transition-all shadow-lg shadow-purple-900/50"
        >
          診断スタート
        </button>
      </div>
    </div>
  );
}

// ================================================================
// Quiz Screen
// ================================================================
function QuizScreen({
  question, current, total, onAnswer,
}: {
  question: Question; current: number; total: number; onAnswer: (s: number) => void;
}) {
  const progress = ((current - 1) / total) * 100;
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-6">
          <div className="flex justify-between text-white/60 text-sm mb-2">
            <span>Q{current} / {total}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-pink-500 to-violet-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-6">
          <p className="text-white text-xl font-medium leading-relaxed text-center">
            {question.text}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              onClick={() => onAnswer(score)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl
                bg-white/10 hover:bg-white/25 active:scale-95
                transition-all border border-white/20 hover:border-white/50"
            >
              <span className="text-2xl font-bold text-white">{score}</span>
              <span className="text-white/60 text-xs text-center leading-tight whitespace-pre-line">
                {ANSWER_LABELS[score - 1]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ================================================================
// Share Card（スクリーンショット用メインカード）
// ================================================================
function ShareCard({ result }: { result: DiagnosisResult }) {
  const { morph, type } = result.main;
  const [imgError, setImgError] = useState(false);
  const hasImage = !!morph.imageUrl && !imgError;
  const showCharName = morph.characterName && !morph.characterName.startsWith("TODO");

  return (
    <div
      className="relative overflow-hidden rounded-3xl mb-1
        bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]
        border border-white/20"
      style={{ boxShadow: "0 0 60px rgba(139,92,246,0.25)" }}
    >
      {/* 背景の光彩 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64
          bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48
          bg-pink-500/15 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 px-8 pt-8 pb-7 text-center">
        {/* ブランド */}
        <p className="text-white/30 text-xs tracking-[0.25em] mb-5">CANDYCONTOWN モフ診断</p>

        {/* ── キャラクター画像ゾーン ── */}
        <div className="flex flex-col items-center mb-5">
          {hasImage ? (
            <img
              src={morph.imageUrl!}
              alt={morph.characterName ?? morph.name}
              onError={() => setImgError(true)}
              className="w-48 h-48 object-contain drop-shadow-2xl"
            />
          ) : (
            /* 画像未設置時のフォールバック */
            <div className="w-40 h-40 rounded-full bg-white/8 border border-white/15
              flex items-center justify-center mb-1">
              <span className="text-5xl text-white/25 select-none">{morph.name[0]}</span>
            </div>
          )}

          {/* キャラクター名 + CANDYCONTOWN */}
          {showCharName && (
            <div className="mt-3">
              <p className="text-white font-bold text-lg tracking-wide">
                {morph.characterName}
              </p>
              <p className="text-white/35 text-xs tracking-widest">
                (CANDYCONTOWN)
              </p>
            </div>
          )}
        </div>

        {/* 系バッジ */}
        <div className="flex justify-center mb-3">
          <span className="px-5 py-1.5 rounded-full text-sm font-medium
            bg-white/15 border border-white/25 text-white/90">
            {type.name}
          </span>
        </div>

        {/* モフ名（最大） */}
        <h2 className="text-6xl font-black text-white tracking-tight leading-none mb-3">
          {morph.name}
        </h2>

        {/* キャッチフレーズ（一言ラベル） */}
        {morph.catchphrase && (
          <p className="text-white/70 text-lg font-medium mb-5">
            — {morph.catchphrase} —
          </p>
        )}

        {/* 説明文 */}
        {morph.description && (
          <p className="text-white/60 text-sm leading-relaxed
            bg-white/8 rounded-2xl px-5 py-4 text-left mb-5">
            {morph.description}
          </p>
        )}

        {/* タグ */}
        {morph.tags && morph.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {morph.tags.map((tag) => (
              <span key={tag} className="text-xs bg-white/15 text-white/70
                px-3 py-1 rounded-full border border-white/10">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* フルネーム（小さく） */}
        <p className="text-white/25 text-xs tracking-widest">
          {result.main.fullName}
        </p>
      </div>
    </div>
  );
}

// ================================================================
// Share Buttons
// ================================================================
function ShareButtons({ result }: { result: DiagnosisResult }) {
  const [copied, setCopied] = useState(false);
  const { morph, type } = result.main;

  const tweetUrl = buildTwitterShareUrl(
    buildTweetText(morph.name, type.name, morph.description ?? morph.catchphrase ?? "")
  );
  const lineUrl = buildLineShareUrl(morph.name, type.name);

  const ogImageUrl = `/api/og?morph=${encodeURIComponent(morph.name)}&type=${encodeURIComponent(type.name)}&cp=${encodeURIComponent(morph.catchphrase ?? "")}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `CCTモフ診断をやってみた！わたしは【${morph.name}】(${type.name})だった🌟 あなたもやってみて👇\nhttps://cct-mofu-diagnosis.vercel.app`
    ).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mb-6">
      {/* 背後のグロー */}
      <div className="absolute inset-0 rounded-3xl blur-xl animate-pulse"
        style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.5) 0%, rgba(139,92,246,0.5) 100%)" }} />

      <div className="relative rounded-3xl overflow-hidden border-2 border-pink-400/50"
        style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(139,92,246,0.18) 100%)" }}>

        {/* ヘッダー */}
        <div className="px-5 pt-5 pb-4 text-center">
          <p className="text-white font-black text-xl tracking-tight leading-tight">
            友達のモフタイプも診断してみて！
          </p>
          <p className="text-white/55 text-xs mt-1.5">スクショ or リンクでシェア</p>
        </div>

        {/* X と LINE — 大きめ2列 */}
        <div className="px-4 pb-3 grid grid-cols-2 gap-3">
          <a href={tweetUrl} target="_blank" rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2.5 py-5 rounded-2xl
              bg-black hover:bg-zinc-800 active:scale-95
              transition-all shadow-xl shadow-black/50 text-white">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-sm font-bold tracking-wide">Xでシェア</span>
          </a>

          <a href={lineUrl} target="_blank" rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2.5 py-5 rounded-2xl
              active:scale-95 transition-all shadow-xl shadow-green-900/50 text-white"
            style={{ backgroundColor: "#06C755" }}>
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            <span className="text-sm font-bold tracking-wide">LINEで送る</span>
          </a>
        </div>

        {/* OG画像を開く */}
        <div className="px-4 pb-2">
          <a href={ogImageUrl} target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl
              bg-white/10 hover:bg-white/18 active:scale-95
              transition-all border border-white/20 text-white font-medium text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            シェア用画像を開く（長押しで保存）
          </a>
        </div>

        {/* URLコピー — 全幅 */}
        <div className="px-4 pb-5">
          <button onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl
              active:scale-95 transition-all font-bold text-sm tracking-wide
              ${copied
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/40"
                : "bg-white/15 hover:bg-white/25 border-2 border-white/30 text-white"
              }`}>
            {copied ? (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                コピーしました！
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                リンクをコピーする
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ================================================================
// Community Section
// ================================================================
function CommunitySection({ morphName }: { morphName: string }) {
  const VALUE_PROPS = [
    "同じモフの仲間と話せる専用チャンネル",
    "相性抜群モフの住人を見つけて仲良くなれる",
    "毎月の限定イベント・先行コンテンツ",
    "新キャラ・新機能のいち早い情報",
  ];

  return (
    <div className="rounded-2xl overflow-hidden mb-4 border border-indigo-400/25"
      style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.18) 0%, rgba(124,58,237,0.12) 100%)" }}>
      <div className="px-5 pt-5 pb-3">
        <p className="text-indigo-300 text-xs tracking-widest mb-1">CANDYCONTOWN COMMUNITY</p>
        <h3 className="text-white font-black text-lg leading-tight">
          {morphName}の仲間と出会う場所
        </h3>
        <p className="text-white/50 text-sm mt-1">無料でいつでも参加できます</p>
      </div>

      <div className="px-5 pb-5 space-y-3">
        <div className="bg-white/8 rounded-xl px-4 py-3 space-y-2">
          {VALUE_PROPS.map((v) => (
            <div key={v} className="flex items-start gap-2">
              <span className="text-indigo-300 text-xs mt-0.5 shrink-0">✓</span>
              <p className="text-white/65 text-xs leading-snug">{v}</p>
            </div>
          ))}
        </div>

        <a href={LINKS.discord} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full px-4 py-4 rounded-xl
            bg-indigo-500 hover:bg-indigo-400 active:scale-95
            transition-all text-white font-bold text-sm shadow-lg shadow-indigo-900/40">
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.022.015.04.032.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          <span>Discordに無料参加する</span>
        </a>

        <a href={LINKS.line_official} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full px-4 py-3 rounded-xl
            bg-white/10 hover:bg-white/18 active:scale-95
            transition-all border border-white/20 text-white font-medium text-sm">
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          <span>LINE公式アカウントをフォロー</span>
        </a>
      </div>
    </div>
  );
}

// ================================================================
// Locked Item（ブラー表示の共通コンポーネント）
// ================================================================
function LockedItem({
  icon, label, blurText, accent = false,
}: {
  icon: string; label: string; blurText: string; accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <div className="flex items-center gap-3">
        <span className="text-base">{icon}</span>
        <div>
          <p className="text-white/50 text-xs">{label}</p>
          <p className={`text-sm font-medium blur-sm select-none ${accent ? "text-amber-200/50" : "text-white/30"}`}>
            {blurText}
          </p>
        </div>
      </div>
      <span className="text-white/20 text-sm">🔒</span>
    </div>
  );
}

// ================================================================
// Premium Teaser（FOMO + 住人登録導線）
// ================================================================
function PremiumTeaser({ result }: { result: DiagnosisResult }) {
  const { morph } = result.main;

  const topCompat   = getTopCompatibility(morph.id, 1)[0];
  const bottomCompat = getBottomCompatibility(morph.id, 1)[0];
  const topMorph    = topCompat    ? MORPH_PROFILES.find((m) => m.id === topCompat.morphB)    : null;
  const bottomMorph = bottomCompat ? MORPH_PROFILES.find((m) => m.id === bottomCompat.morphB) : null;

  return (
    <div className="mb-4 space-y-3">

      {/* ── FOMO ブロック ── */}
      <div className="rounded-2xl overflow-hidden border border-amber-400/25"
        style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(245,158,11,0.05) 100%)" }}>
        <div className="px-5 py-4 border-b border-white/8">
          <p className="text-amber-300/80 text-xs tracking-widest mb-0.5">UNLOCK YOUR FULL PROFILE</p>
          <p className="text-white font-black text-base leading-snug">
            あなたの{morph.name}には<br />まだ続きがある
          </p>
          <p className="text-white/40 text-xs mt-1">以下の情報はロックされています</p>
        </div>

        <div className="bg-white/3 divide-y divide-white/6">
          <LockedItem icon="💕" label="あなたの恋愛タイプ"         blurText={morph.loveType   ?? "●●●タイプ"} />
          <LockedItem icon="⚡" label="あなたの弱点・落とし穴"      blurText={morph.weakness    ?? "●●●こと"} />
          <LockedItem icon="💞" label="相性1位のモフ"               blurText={topMorph?.name    ?? "？？？モフ"} accent />
          <LockedItem icon="💔" label="相性ワーストのモフ"          blurText={bottomMorph?.name  ?? "？？？モフ"} />
          <LockedItem icon="🔮" label={`今月の${morph.name}のテーマ`} blurText="●●と●●の境界線" />
          <LockedItem icon="📈" label="今月の恋愛・仕事・対人運"   blurText="運勢スコア＋詳細テキスト" />
          <LockedItem icon="🏠" label="デジタル住民票"               blurText={`${morph.name}住人 No.●●●●●`} />
        </div>
      </div>

      {/* ── Plan A: 住人プラン（メインCTA） ── */}
      <a href={`${LINKS.resident}?morph=${morph.id}`}
        className="relative block rounded-2xl overflow-hidden active:scale-95 transition-all"
        style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />
        <div className="relative px-5 py-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-white/65 text-xs tracking-widest mb-0.5">CANDYCONTOWN</p>
              <p className="text-white font-black text-lg leading-tight">住人プランに登録する</p>
              <p className="text-white/55 text-xs mt-0.5">上記7項目すべてアンロック</p>
            </div>
            <div className="text-right shrink-0 ml-3">
              <p className="text-white font-black text-2xl leading-none">¥980</p>
              <p className="text-white/55 text-xs">/ 月</p>
            </div>
          </div>
          <ul className="space-y-1.5 mb-4">
            {[
              "恋愛タイプ・弱点・相性マップ（全20モフ）",
              "詳細占い毎月更新（恋愛・仕事・対人）",
              "デジタル住民票（住民番号付き）",
              "Discord 住人専用チャンネル",
              "限定壁紙・バッジ（月替わり）",
              "新キャラ・イベントの先行情報",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-white/85 text-xs">
                <span className="text-white/50">✓</span>{item}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <p className="text-white/50 text-xs">年払い ¥9,800（2ヶ月分お得）</p>
            <span className="flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              今すぐ登録
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </a>

      {/* ── Plan B: 単発占い（サブCTA） ── */}
      <a href={`${LINKS.fortune}?morph=${morph.id}`}
        className="flex items-center justify-between w-full px-5 py-4 rounded-2xl
          bg-white/8 hover:bg-white/12 active:scale-95
          transition-all border border-white/15">
        <div className="flex items-center gap-3">
          <span className="text-xl">🔮</span>
          <div className="text-left">
            <p className="text-white font-semibold text-sm">まずは今月の占いだけ見る</p>
            <p className="text-white/40 text-xs mt-0.5">恋愛・仕事・対人運 + ラッキー情報（買い切り）</p>
          </div>
        </div>
        <div className="text-right shrink-0 ml-3">
          <p className="text-white font-bold text-lg leading-none">¥490</p>
          <p className="text-white/35 text-xs">1回きり</p>
        </div>
      </a>

    </div>
  );
}

// ================================================================
// Result Screen
// ================================================================
function ResultScreen({ result, onReset }: { result: DiagnosisResult; onReset: () => void }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">

        {/* ① シェアカード（主役） */}
        <ShareCard result={result} />
        <p className="text-white/25 text-xs text-center mb-4">
          📱 スクリーンショットしてシェアもできます
        </p>

        {/* ② シェアボタン */}
        <ShareButtons result={result} />

        {/* ③ プレミアムティーザー（FOMO → 欲求生成） */}
        <PremiumTeaser result={result} />

        {/* ④ コミュニティ */}
        <CommunitySection morphName={result.main.morph.name} />

        {/* ⑤ モフ図鑑リンク */}
        <a href="/morphs"
          className="flex items-center justify-between w-full px-5 py-4 rounded-2xl mb-4
            bg-white/6 hover:bg-white/10 active:scale-95
            transition-all border border-white/12">
          <div className="flex items-center gap-3">
            <span className="text-xl">📖</span>
            <div className="text-left">
              <p className="text-white font-semibold text-sm">モフ図鑑を見る</p>
              <p className="text-white/40 text-xs mt-0.5">全20種類のモフキャラクターを探索</p>
            </div>
          </div>
          <svg className="w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* ⑥ サブ候補 */}
        {result.sub.length > 0 && (
          <div className="bg-white/8 rounded-2xl p-5 mb-4">
            <p className="text-white/45 text-xs mb-3">こちらのモフも近いかも</p>
            <div className="space-y-2">
              {result.sub.map((s, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/8 rounded-xl p-3">
                  <span className="text-white/25 text-xs w-4">{i + 1}</span>
                  <span className="text-white font-semibold text-sm">{s.morph.name}</span>
                  <span className="text-white/35 text-xs">{s.type.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ⑦ スコア詳細（折りたたみ） */}
        <div className="bg-white/8 rounded-2xl p-5 mb-4">
          <p className="text-white/45 text-xs mb-3">系スコア</p>
          {result.details.typeRanking.map((r) => (
            <div key={r.type.id} className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/70">{r.type.name}</span>
                <span className="text-white/35">{r.score.toFixed(1)}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-pink-400 to-violet-500 h-1.5 rounded-full"
                  style={{ width: `${(r.score / 10) * 100}%` }} />
              </div>
            </div>
          ))}

          <button onClick={() => setShowDetail(!showDetail)}
            className="w-full mt-4 text-white/35 text-xs hover:text-white/60 transition-colors">
            {showDetail ? "▲ 11軸スコアを閉じる" : "▼ 11軸スコアを見る"}
          </button>

          {showDetail && (
            <div className="mt-3 pt-3 border-t border-white/10">
              {AXIS_DEFINITIONS.map((axis) => {
                const score = result.axisScores[axis.id];
                return (
                  <div key={axis.id} className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60">{axis.name}</span>
                      <span className="text-white/35">{score.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1">
                      <div className="bg-violet-400/60 h-1 rounded-full"
                        style={{ width: `${((score - 1) / 9) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button onClick={onReset}
          className="w-full py-3 rounded-xl text-white/50 font-medium
            border border-white/15 hover:bg-white/8 active:scale-95 transition-all">
          もう一度診断する
        </button>
      </div>
    </div>
  );
}

// ================================================================
// Main Page
// ================================================================
export default function Home() {
  const [phase, setPhase] = useState<Phase>("start");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleAnswer = (score: number) => {
    const question = QUESTIONS[currentQ];
    const newAnswers = { ...answers, [question.id]: score };
    if (currentQ + 1 >= QUESTIONS.length) {
      setResult(diagnose({ answers: newAnswers }, QUESTIONS, MORPH_PROFILES, TYPE_PROFILES, { subResultCount: 2 }));
      setPhase("result");
    } else {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
    }
  };

  const reset = () => { setPhase("start"); setCurrentQ(0); setAnswers({}); setResult(null); };

  if (phase === "start") return <StartScreen onStart={() => setPhase("quiz")} />;
  if (phase === "quiz") return <QuizScreen question={QUESTIONS[currentQ]} current={currentQ + 1} total={QUESTIONS.length} onAnswer={handleAnswer} />;
  return <ResultScreen result={result!} onReset={reset} />;
}
