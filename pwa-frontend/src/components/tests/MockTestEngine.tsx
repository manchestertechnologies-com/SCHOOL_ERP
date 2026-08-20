'use client';

import React, { useState, useEffect } from 'react';
import { QuestionData } from '@/lib/curriculum';
import { LaTeXRenderer } from '@/components/math/LaTeXRenderer';
import { Clock, CheckCircle2, XCircle, AlertCircle, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface MockTestEngineProps {
  title: string;
  durationMinutes: number;
  questions: QuestionData[];
  onFinish?: (results: any) => void;
}

export const MockTestEngine: React.FC<MockTestEngineProps> = ({ title, durationMinutes, questions, onFinish }) => {
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [qId: string]: any }>({});
  const [markedForReview, setMarkedForReview] = useState<{ [qId: string]: boolean }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    if (isSubmitted || secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, isSubmitted]);

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (ans: any) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [currentQ.id]: ans });
  };

  const toggleMarkForReview = () => {
    setMarkedForReview({ ...markedForReview, [currentQ.id]: !markedForReview[currentQ.id] });
  };

  const handleFinalSubmit = () => {
    setIsSubmitted(true);
    setShowSubmitModal(false);

    // Calculate score
    let totalScore = 0;
    let maxScore = 0;
    let correctCount = 0;
    let wrongCount = 0;

    questions.forEach((q) => {
      maxScore += q.marks;
      const userAns = answers[q.id];
      if (userAns !== undefined && userAns !== null) {
        if (String(userAns).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
          totalScore += q.marks;
          correctCount += 1;
        } else {
          wrongCount += 1;
        }
      }
    });

    const resultPayload = {
      title,
      totalScore,
      maxScore,
      correctCount,
      wrongCount,
      unattemptedCount: questions.length - (correctCount + wrongCount),
      percentage: Math.round((totalScore / maxScore) * 100),
    };

    onFinish?.(resultPayload);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isSubmitted) {
    let totalScore = 0;
    let maxScore = 0;
    let correctCount = 0;
    let wrongCount = 0;

    questions.forEach((q) => {
      maxScore += q.marks;
      const userAns = answers[q.id];
      if (userAns !== undefined && userAns !== null) {
        if (String(userAns).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
          totalScore += q.marks;
          correctCount += 1;
        } else {
          wrongCount += 1;
        }
      }
    });

    const percentage = Math.round((totalScore / maxScore) * 100);

    return (
      <div className="space-y-6 max-w-4xl mx-auto py-6">
        <div className="mt-card p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-mt-gold/10 text-mt-gold-bright border border-mt-gold/20 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8 text-mt-gold-bright" />
          </div>
          <h2 className="text-2xl font-bold text-mt-text">Test Submitted Successfully!</h2>
          <p className="text-xs text-mt-muted">{title}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-4 bg-mt-elevated rounded-xl border border-mt-border">
              <span className="text-[10px] font-semibold text-mt-muted uppercase tracking-wider">Score</span>
              <p className="text-2xl font-bold text-mt-gold-bright">{totalScore} / {maxScore}</p>
            </div>

            <div className="p-4 bg-mt-elevated rounded-xl border border-mt-border">
              <span className="text-[10px] font-semibold text-mt-muted uppercase tracking-wider">Percentage</span>
              <p className="text-2xl font-bold text-mt-text">{percentage}%</p>
            </div>

            <div className="p-4 bg-mt-elevated rounded-xl border border-mt-border">
              <span className="text-[10px] font-semibold text-mt-muted uppercase tracking-wider">Correct</span>
              <p className="text-2xl font-bold text-emerald-400">{correctCount}</p>
            </div>

            <div className="p-4 bg-mt-elevated rounded-xl border border-mt-border">
              <span className="text-[10px] font-semibold text-mt-muted uppercase tracking-wider">Incorrect</span>
              <p className="text-2xl font-bold text-rose-400">{wrongCount}</p>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/tests" className="mt-btn-primary text-xs px-6 py-2.5">
              Back to Tests Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Test Timer Bar */}
      <div className="mt-card p-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-sm text-mt-text">{title}</h2>
          <span className="text-xs text-mt-muted">Question {currentIndex + 1} of {questions.length}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-mt-elevated px-4 py-2 rounded-xl border border-mt-gold/30 text-mt-gold-bright font-bold font-mono text-sm">
            <Clock className="w-4 h-4 text-mt-gold" /> {formatTime(secondsLeft)}
          </div>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 bg-rose-600/90 hover:bg-rose-600 text-white font-semibold text-xs rounded-xl transition-all duration-premium"
          >
            Submit Test
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Question Panel */}
        <div className="lg:col-span-2 mt-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-mt-border pb-3 text-xs font-medium text-mt-muted">
            <span className="text-mt-gold-bright uppercase tracking-wider">{currentQ.type} • {currentQ.marks} Marks</span>
            <button
              onClick={toggleMarkForReview}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all duration-premium ${
                markedForReview[currentQ.id]
                  ? 'bg-mt-elevated text-mt-gold-bright border-mt-gold/30'
                  : 'bg-mt-card text-mt-muted border-mt-border hover:text-mt-text'
              }`}
            >
              {markedForReview[currentQ.id] ? '★ Marked for Review' : '☆ Mark for Review'}
            </button>
          </div>

          <h3 className="text-base font-semibold text-mt-text">
            <LaTeXRenderer content={currentQ.question} />
          </h3>

          {/* Options */}
          {currentQ.options && (
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectAnswer(opt.id)}
                    className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all duration-premium ${
                      isSelected
                        ? 'border-mt-gold bg-mt-elevated text-mt-text font-semibold shadow-gold'
                        : 'border-mt-border bg-mt-card hover:bg-mt-elevated text-mt-text-secondary'
                    }`}
                  >
                    <LaTeXRenderer content={opt.text} />
                  </button>
                );
              })}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-mt-border">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="mt-btn-secondary text-xs px-4 py-2 disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex === questions.length - 1}
              className="mt-btn-primary text-xs px-5 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Right Col: Question Navigation Palette */}
        <div className="mt-card p-6 space-y-4">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-mt-muted">Question Palette</h4>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const isAnswered = answers[q.id] !== undefined;
              const isMarked = markedForReview[q.id];

              let bg = 'bg-mt-elevated text-mt-muted border border-mt-border';
              if (isAnswered) bg = 'bg-mt-gold-bright text-mt-bg font-bold border border-mt-gold-bright';
              if (isMarked) bg = 'bg-mt-card text-mt-gold-bright font-bold border border-mt-gold/40';
              if (isCurrent) bg += ' ring-2 ring-mt-gold';

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-9 h-9 rounded-xl text-xs flex items-center justify-center transition-all duration-premium ${bg}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="space-y-1.5 pt-4 text-[11px] text-mt-muted border-t border-mt-border font-medium">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-mt-gold-bright inline-block"></span> Answered</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-mt-card border border-mt-gold/40 inline-block"></span> Marked for Review</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-mt-elevated border border-mt-border inline-block"></span> Unattempted</div>
          </div>
        </div>
      </div>

      {/* SUBMIT CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-mt-bg-secondary border border-mt-gold/30 w-full max-w-md rounded-card p-6 shadow-card-hover space-y-4 text-center">
            <h3 className="text-lg font-bold text-mt-text">Are you sure you want to submit?</h3>
            <p className="text-xs text-mt-muted">
              Answered: {Object.keys(answers).length} / {questions.length} questions.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="mt-btn-secondary text-xs px-4 py-2"
              >
                Continue Test
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl transition-all duration-premium"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
