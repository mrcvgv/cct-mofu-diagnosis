"use client";

import { useState } from "react";
import { QUESTIONS } from "@/data/questions";
import { MORPH_PROFILES } from "@/data/morphProfiles";
import { TYPE_PROFILES } from "@/data/typeProfiles";
import { diagnose } from "@/engine/diagnosisEngine";
import { AXIS_DEFINITIONS } from "@/data/axes";
import type { DiagnosisResult, Question } from "@/types";

type Phase = "start" | "quiz" | "result";

const LABELS = ["まったく\nあてはまらない", "あまり\nあてはまらない", "どちらでも\nない", "やや\nあてはまる", "とても\nあてはまる"];

// ---- Start Screen ----
function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <p className="text-purple-300 text-sm tracking-widest mb-2">CCT OFFICIAL</p>
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

// ---- Quiz Screen ----
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
        {/* Progress */}
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

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-6">
          <p className="text-white text-xl font-medium leading-relaxed text-center">
            {question.text}
          </p>
        </div>

        {/* Answer Buttons */}
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

// ---- Result Screen ----
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
        {/* Main Result */}
        <div className="bg-gradient-to-br from-pink-500/30 to-violet-600/30 backdrop-blur
          border border-white/20 rounded-3xl p-8 mb-4 text-center">
          <p className="text-white/60 text-sm mb-2">あなたのモフタイプは…</p>
          <h2 className="text-4xl font-bold text-white mb-1">
            {result.main.fullName}
          </h2>
          <p className="text-purple-200 text-sm mb-4">
            {result.main.type.name} / {result.main.morph.name}
          </p>
          {result.main.morph.description && (
            <p className="text-white/80 text-sm leading-relaxed bg-white/10 rounded-xl p-4">
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

        {/* Sub Results */}
        {result.sub.length > 0 && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-4">
            <p className="text-white/60 text-xs mb-3">サブ候補</p>
            <div className="space-y-2">
              {result.sub.map((s, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                  <span className="text-white/40 text-xs w-4">{i + 1}</span>
                  <span className="text-white font-medium">{s.fullName}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 系スコア */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-4">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full flex items-center justify-between text-white/60 text-xs mb-2"
          >
            <span>系スコア詳細</span>
            <span>{showDetail ? "▲" : "▼"}</span>
          </button>
          {result.details.typeRanking.map((r) => (
            <div key={r.type.id} className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/80">{r.type.name}</span>
                <span className="text-white/50">{r.score.toFixed(1)}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-pink-400 to-violet-500 h-1.5 rounded-full"
                  style={{ width: `${(r.score / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}

          {showDetail && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-white/50 text-xs mb-3">11軸スコア</p>
              {AXIS_DEFINITIONS.map((axis) => {
                const score = result.axisScores[axis.id];
                return (
                  <div key={axis.id} className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">{axis.name}</span>
                      <span className="text-white/50">{score.toFixed(1)}</span>
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

        {/* Reset */}
        <button
          onClick={onReset}
          className="w-full py-3 rounded-xl text-white/70 font-medium
            border border-white/20 hover:bg-white/10 active:scale-95 transition-all"
        >
          もう一度診断する
        </button>
      </div>
    </div>
  );
}

// ---- Main Page ----
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
