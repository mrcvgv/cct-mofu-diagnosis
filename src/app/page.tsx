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

type Phase = "start" | "quiz" | "result";

const LABELS = [
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
        <div className="mb-8">
          <p className="text-purple-300 text-sm tracking-widest mb-2">CANDYCONTOWN</p>
          <h1 className="text-5xl font-bold text-white mb-3">モフ診断</h1>
          <p className="text-purple-200 text-lg">あなたはどのモフ？</p>
        </div>

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
  question,
  current,
  total,
  onAnswer,
}: {
  question: Question;
  current: number;
  total: number;
  onAnswer: (score: number) => void;
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
                {LABELS[score - 1]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ================================================================
// Share Section
// ================================================================
function ShareSection({
  morphName,
  typeName,
  description,
}: {
  morphName: string;
  typeName: string;
  description: string;
}) {
  const [copied, setCopied] = useState(false);

  const tweetText = buildTweetText(morphName, typeName, description);
  const tweetUrl = buildTwitterShareUrl(tweetText);
  const lineUrl = buildLineShareUrl(morphName, typeName);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `CCTモフ診断をやってみた！わたしは【${morphName}】(${typeName})だった🌟 あなたもやってみて👇\nhttps://cct-mofu-diagnosis.vercel.app`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-4">
      <p className="text-white font-bold text-sm mb-1">結果をシェアする</p>
      <p className="text-white/50 text-xs mb-4">
        友達のモフタイプも気になる…？
      </p>

      <div className="grid grid-cols-3 gap-2">
        {/* X (Twitter) */}
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 py-3 rounded-xl
            bg-black/50 hover:bg-black/70 active:scale-95
            transition-all border border-white/10 text-white"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-xs font-medium">Xでシェア</span>
        </a>

        {/* LINE */}
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 py-3 rounded-xl
            bg-green-600/70 hover:bg-green-600/90 active:scale-95
            transition-all border border-green-400/20 text-white"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          <span className="text-xs font-medium">LINEで送る</span>
        </a>

        {/* URL コピー */}
        <button
          onClick={handleCopy}
          className={`flex flex-col items-center gap-1.5 py-3 rounded-xl
            active:scale-95 transition-all border text-white
            ${copied
              ? "bg-emerald-600/70 border-emerald-400/20"
              : "bg-white/15 hover:bg-white/25 border-white/10"
            }`}
        >
          {copied ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          )}
          <span className="text-xs font-medium">{copied ? "コピー済" : "URLコピー"}</span>
        </button>
      </div>
    </div>
  );
}

// ================================================================
// Community Section（主目的 — CCTコミュニティ参加）
// ================================================================
function CommunitySection({ morphName }: { morphName: string }) {
  return (
    <div className="rounded-2xl overflow-hidden mb-4
      bg-gradient-to-br from-violet-600/30 to-pink-600/30
      border border-violet-400/30">

      {/* ヘッダー */}
      <div className="px-5 pt-5 pb-3">
        <p className="text-white/50 text-xs tracking-wider mb-1">CANDYCONTOWN</p>
        <h3 className="text-white font-bold text-lg leading-tight">
          {morphName}と出会える場所へ
        </h3>
        <p className="text-white/60 text-sm mt-1">
          全モフが集まるコミュニティで、あなたのモフをもっと深く知ろう。
        </p>
      </div>

      {/* CTAボタン群 */}
      <div className="px-5 pb-5 space-y-2 mt-2">

        {/* Discord — メインCTA */}
        <a
          href={LINKS.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl
            bg-indigo-500 hover:bg-indigo-400 active:scale-95
            transition-all text-white font-bold"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.022.015.04.032.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          <span className="flex-1 text-left">Discordコミュニティに参加する</span>
          <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* LINE公式 — サブCTA */}
        <a
          href={LINKS.line_official}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl
            bg-white/10 hover:bg-white/20 active:scale-95
            transition-all border border-white/20 text-white font-medium"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          <span className="flex-1 text-left">LINE公式アカウントをフォローする</span>
          <svg className="w-4 h-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

      </div>
    </div>
  );
}

// ================================================================
// Premium Section（有料導線 — 詳細占い・相性診断）
// ================================================================
function PremiumSection({ morphName }: { morphName: string }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden mb-4">

      <div className="px-5 pt-5 pb-3">
        <p className="text-white font-bold text-sm">
          {morphName}についてもっと知る
        </p>
        <p className="text-white/50 text-xs mt-0.5">
          詳細な占いと相性は、プレミアム診断で
        </p>
      </div>

      <div className="px-5 pb-5 space-y-2">

        {/* 詳細占い */}
        <a
          href={LINKS.fortune}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 px-4 py-3.5 rounded-xl
            bg-gradient-to-r from-amber-500/20 to-yellow-500/20
            border border-amber-400/30 hover:border-amber-400/60
            active:scale-95 transition-all group"
        >
          <div className="text-2xl leading-none">🔮</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-white font-semibold text-sm">詳細占いを見る</p>
              <span className="text-xs bg-amber-500/50 text-amber-200 px-2 py-0.5 rounded-full shrink-0">
                有料
              </span>
            </div>
            <p className="text-white/50 text-xs">今月の運勢・仕事運・恋愛運</p>
          </div>
          <svg className="w-4 h-4 text-white/30 group-hover:text-white/60 shrink-0 transition-colors"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* 相性診断 */}
        <a
          href={LINKS.compatibility}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 px-4 py-3.5 rounded-xl
            bg-gradient-to-r from-pink-600/20 to-rose-600/20
            border border-pink-400/30 hover:border-pink-400/60
            active:scale-95 transition-all group"
        >
          <div className="text-2xl leading-none">💞</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-white font-semibold text-sm">相性診断をする</p>
              <span className="text-xs bg-pink-500/50 text-pink-200 px-2 py-0.5 rounded-full shrink-0">
                有料
              </span>
            </div>
            <p className="text-white/50 text-xs">
              {morphName}と相性のいいモフは？
            </p>
          </div>
          <svg className="w-4 h-4 text-white/30 group-hover:text-white/60 shrink-0 transition-colors"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

      </div>
    </div>
  );
}

// ================================================================
// Result Screen
// ================================================================
function ResultScreen({
  result,
  onReset,
}: {
  result: DiagnosisResult;
  onReset: () => void;
}) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">

        {/* ===== Main Result ===== */}
        <div className="bg-gradient-to-br from-pink-500/30 to-violet-600/30 backdrop-blur
          border border-white/20 rounded-3xl p-8 mb-4 text-center">

          <p className="text-white/50 text-sm mb-3">あなたのモフは…</p>

          <h2 className="text-5xl font-black text-white mb-3 tracking-tight">
            {result.main.morph.name}
          </h2>

          <div className="flex justify-center mb-5">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium
              bg-white/20 text-white/90 border border-white/30">
              {result.main.type.name}
            </span>
          </div>

          <p className="text-white/40 text-xs mb-5 tracking-wider">
            {result.main.fullName}
          </p>

          {result.main.morph.description && (
            <p className="text-white/80 text-sm leading-relaxed bg-white/10 rounded-xl p-4 text-left">
              {result.main.morph.description}
            </p>
          )}

          {result.main.morph.tags && result.main.morph.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {result.main.morph.tags.map((tag) => (
                <span key={tag} className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ===== シェア ===== */}
        <ShareSection
          morphName={result.main.morph.name}
          typeName={result.main.type.name}
          description={result.main.morph.description ?? result.main.fullName}
        />

        {/* ===== CCTコミュニティ（主目的） ===== */}
        <CommunitySection morphName={result.main.morph.name} />

        {/* ===== 有料導線（詳細占い・相性） ===== */}
        <PremiumSection morphName={result.main.morph.name} />

        {/* ===== サブ候補 ===== */}
        {result.sub.length > 0 && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-4">
            <p className="text-white/50 text-xs mb-3">こちらのモフも近いかも</p>
            <div className="space-y-2">
              {result.sub.map((s, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                  <span className="text-white/30 text-xs w-4">{i + 1}</span>
                  <div>
                    <span className="text-white font-semibold text-sm">{s.morph.name}</span>
                    <span className="text-white/40 text-xs ml-2">{s.type.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== 系・軸スコア（折りたたみ） ===== */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-4">
          <p className="text-white/50 text-xs mb-3">系スコア</p>
          {result.details.typeRanking.map((r) => (
            <div key={r.type.id} className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/80">{r.type.name}</span>
                <span className="text-white/40">{r.score.toFixed(1)}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-pink-400 to-violet-500 h-1.5 rounded-full"
                  style={{ width: `${(r.score / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}

          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full mt-4 text-white/40 text-xs hover:text-white/70 transition-colors"
          >
            {showDetail ? "▲ 11軸スコアを閉じる" : "▼ 11軸スコアを見る"}
          </button>

          {showDetail && (
            <div className="mt-3 pt-3 border-t border-white/10">
              {AXIS_DEFINITIONS.map((axis) => {
                const score = result.axisScores[axis.id];
                return (
                  <div key={axis.id} className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">{axis.name}</span>
                      <span className="text-white/40">{score.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1">
                      <div
                        className="bg-violet-400/60 h-1 rounded-full"
                        style={{ width: `${((score - 1) / 9) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={onReset}
          className="w-full py-3 rounded-xl text-white/60 font-medium
            border border-white/20 hover:bg-white/10 active:scale-95 transition-all"
        >
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
      const diagResult = diagnose(
        { answers: newAnswers },
        QUESTIONS,
        MORPH_PROFILES,
        TYPE_PROFILES,
        { subResultCount: 2 }
      );
      setResult(diagResult);
      setPhase("result");
    } else {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
    }
  };

  const reset = () => {
    setPhase("start");
    setCurrentQ(0);
    setAnswers({});
    setResult(null);
  };

  if (phase === "start") return <StartScreen onStart={() => setPhase("quiz")} />;
  if (phase === "quiz") return <QuizScreen question={QUESTIONS[currentQ]} current={currentQ + 1} total={QUESTIONS.length} onAnswer={handleAnswer} />;
  return <ResultScreen result={result!} onReset={reset} />;
}
