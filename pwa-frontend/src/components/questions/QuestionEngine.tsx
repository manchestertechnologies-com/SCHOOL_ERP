'use client';

import React, { useState } from 'react';
import { QuestionData } from '@/lib/curriculum';
import { LaTeXRenderer } from '@/components/math/LaTeXRenderer';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Lightbulb, Bookmark, AlertCircle, BookOpen, Layers } from 'lucide-react';
import { saveQuestionAttempt, saveBookmark, addMistake } from '@/lib/db';

interface QuestionEngineProps {
  questions: QuestionData[];
  onComplete?: (score: number) => void;
}

export const QuestionEngine: React.FC<QuestionEngineProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = questions[currentIndex];

  if (!currentQ) return null;

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(optionId);
  };

  const handleBookmarkToggle = async () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      await saveBookmark({
        id: currentQ.id,
        chapterId: currentQ.chapterId,
        topicId: currentQ.topicId,
        questionText: currentQ.question,
        savedAt: Date.now(),
      });
    }
  };

  const handleSubmitAnswer = async () => {
    if (isSubmitted) return;

    let isCorrect = false;

    if (currentQ.type === 'mcq' || currentQ.type === 'true_false' || currentQ.type === 'assertion_reason') {
      isCorrect = selectedAnswer === currentQ.correctAnswer;
    } else if (currentQ.type === 'fill_blank' || currentQ.type === 'numerical') {
      isCorrect =
        String(selectedAnswer).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();
    } else {
      isCorrect = true; // Subjective / derivation view confirmed
    }

    if (isCorrect) {
      setScore((prev) => prev + currentQ.marks);
    } else {
      // Add to Mistake Notebook
      await addMistake({
        id: currentQ.id,
        chapterId: currentQ.chapterId,
        topicId: currentQ.topicId,
        questionText: currentQ.question,
        userAnswer: selectedAnswer,
        correctAnswer: currentQ.correctAnswer,
        explanation: currentQ.explanation,
        attemptedAt: Date.now(),
        retryCount: 0,
        resolved: false,
      });
    }

    setIsSubmitted(true);

    await saveQuestionAttempt({
      attemptId: `att-${Date.now()}`,
      questionId: currentQ.id,
      chapterId: currentQ.chapterId,
      topicId: currentQ.topicId,
      answer: selectedAnswer,
      isCorrect,
      timestamp: Date.now(),
      synced: navigator.onLine,
    });
  };

  const handleNextQuestion = () => {
    setIsSubmitted(false);
    setSelectedAnswer(null);
    setShowHint(false);
    setIsBookmarked(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete?.(score);
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Header & Meta Bar */}
      <div className="flex items-center justify-between border-b border-mt-border pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-mt-elevated text-mt-gold-bright border border-mt-gold/20 rounded-full font-medium">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="px-2.5 py-1 bg-mt-card text-mt-text-secondary border border-mt-border rounded-full font-medium uppercase">
            {currentQ.type} • {currentQ.marks} {currentQ.marks === 1 ? 'Mark' : 'Marks'}
          </span>
        </div>

        <button
          onClick={handleBookmarkToggle}
          className={`p-2 rounded-xl border transition-all duration-premium ${
            isBookmarked
              ? 'bg-mt-elevated text-mt-gold-bright border-mt-gold/30'
              : 'bg-mt-card text-mt-muted border-mt-border hover:text-mt-text'
          }`}
          title="Bookmark Question"
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* QUESTION TEXT */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold text-mt-text leading-relaxed">
          <LaTeXRenderer content={currentQ.question} />
        </h3>
        {currentQ.commonMistake && (
          <p className="text-xs text-mt-gold-bright bg-mt-card p-3 rounded-xl border border-mt-gold/20">
            ⚠️ <strong className="font-semibold">Watch Out:</strong> {currentQ.commonMistake}
          </p>
        )}
      </div>

      {/* MCQ / ASSERTION-REASON OPTIONS */}
      {(currentQ.type === 'mcq' || currentQ.type === 'assertion_reason' || currentQ.type === 'true_false') && currentQ.options && (
        <div className="grid grid-cols-1 gap-3">
          {currentQ.options.map((opt) => {
            const isSelected = selectedAnswer === opt.id;
            const isCorrect = isSubmitted && opt.id === currentQ.correctAnswer;
            const isWrong = isSubmitted && isSelected && opt.id !== currentQ.correctAnswer;

            let borderStyle = 'border-mt-border bg-mt-card hover:bg-mt-elevated text-mt-text-secondary';
            if (isSelected) borderStyle = 'border-mt-gold bg-mt-elevated text-mt-text font-semibold shadow-gold';
            if (isCorrect) borderStyle = 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300 font-semibold';
            if (isWrong) borderStyle = 'border-rose-500/40 bg-rose-950/20 text-rose-300 font-semibold';

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isSubmitted}
                className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-all duration-premium min-h-touch ${borderStyle}`}
              >
                <span><LaTeXRenderer content={opt.text} /></span>
                {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />}
                {isWrong && <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}

      {/* NUMERICAL QUESTION STEP-BY-STEP RENDERER */}
      {currentQ.type === 'numerical' && (
        <div className="space-y-4">
          {currentQ.givenData && (
            <div className="p-4 bg-mt-card rounded-card border border-mt-border space-y-2">
              <h4 className="text-xs font-semibold text-mt-gold uppercase tracking-wider">Given Parameters</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {currentQ.givenData.map((g, i) => (
                  <div key={i} className="p-2.5 bg-mt-elevated rounded-xl border border-mt-border text-mt-text-secondary">
                    <strong className="text-mt-text font-semibold"><LaTeXRenderer content={g.label} />:</strong> <LaTeXRenderer content={String(g.value)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold text-mt-text-secondary block">Enter Calculated Answer ({currentQ.finalAnswerUnit}):</label>
            <input
              type="text"
              value={selectedAnswer || ''}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={isSubmitted}
              placeholder="e.g. 10.79"
              className="mt-input"
            />
          </div>
        </div>
      )}

      {/* DERIVATION STEP-BY-STEP RENDERER */}
      {currentQ.type === 'derivation' && (
        <div className="space-y-4">
          {currentQ.startingPrinciple && (
            <div className="p-4 bg-mt-card border border-mt-gold/20 rounded-card space-y-1">
              <span className="text-xs font-semibold text-mt-gold-bright uppercase tracking-wider">Starting Principle</span>
              <p className="text-xs text-mt-text-secondary"><LaTeXRenderer content={currentQ.startingPrinciple} /></p>
            </div>
          )}

          {isSubmitted && currentQ.derivationSteps && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold text-mt-gold uppercase tracking-wider">Step-by-Step Derivation Proof</h4>
              {currentQ.derivationSteps.map((step) => (
                <div key={step.stepNumber} className="p-4 bg-mt-card rounded-card border border-mt-border space-y-1.5">
                  <span className="text-xs font-semibold text-mt-gold-bright">Step {step.stepNumber}: {step.title}</span>
                  <LaTeXRenderer content={step.latex} block />
                  <p className="text-xs text-mt-text-secondary"><LaTeXRenderer content={step.explanation} /></p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* EXPLANATION AND DETAILED STEPS AFTER SUBMIT */}
      {isSubmitted && (
        <div className="p-5 bg-mt-card border border-mt-border rounded-card space-y-2">
          <h4 className="text-xs font-semibold text-mt-gold uppercase tracking-wider">Solution & Explanation</h4>
          <p className="text-xs sm:text-sm text-mt-text-secondary leading-relaxed">
            <LaTeXRenderer content={currentQ.explanation} />
          </p>
        </div>
      )}

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-between pt-2 border-t border-mt-border">
        {!isSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer && currentQ.type !== 'derivation'}
            className="mt-btn-primary disabled:opacity-50 text-xs px-6 py-2.5"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="mt-btn-primary text-xs px-6 py-2.5"
          >
            Next Question <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
