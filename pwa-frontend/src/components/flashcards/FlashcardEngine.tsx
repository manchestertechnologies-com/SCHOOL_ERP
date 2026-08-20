'use client';

import React, { useState } from 'react';
import { RotateCw, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { LaTeXRenderer } from '@/components/math/LaTeXRenderer';

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface FlashcardEngineProps {
  cards: Flashcard[];
}

export const FlashcardEngine: React.FC<FlashcardEngineProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardStats, setCardStats] = useState<{ [id: string]: 'know' | 'hard' | 'again' }>({});

  if (!cards || cards.length === 0) return null;

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const markCard = (status: 'know' | 'hard' | 'again') => {
    setCardStats((prev) => ({ ...prev, [currentCard.id]: status }));
    handleNext();
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-xl mx-auto w-full py-4 px-2">
      {/* Counter */}
      <div className="flex items-center justify-between w-full text-xs font-medium text-mt-muted">
        <span>Flashcard {currentIndex + 1} of {cards.length}</span>
        <span className="text-mt-gold-bright">Tap card to flip</span>
      </div>

      {/* 3D Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-72 cursor-pointer perspective"
      >
        <div
          className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Side */}
          <div className="absolute inset-0 w-full h-full bg-mt-card text-mt-text rounded-card p-6 shadow-card border border-mt-gold/30 flex flex-col justify-between backface-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-semibold tracking-widest bg-mt-elevated text-mt-gold-bright px-3 py-1 rounded-full border border-mt-gold/20">
                Question / Front
              </span>
              <RotateCw className="w-4 h-4 text-mt-gold" />
            </div>
            <div className="text-center my-auto">
              <h3 className="text-lg md:text-xl font-semibold tracking-wide leading-relaxed">
                <LaTeXRenderer content={currentCard.front} />
              </h3>
            </div>
            <p className="text-center text-xs text-mt-muted font-medium">Tap to reveal answer</p>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 w-full h-full bg-mt-elevated text-mt-text rounded-card p-6 shadow-card-hover border border-mt-gold/40 flex flex-col justify-between backface-hidden rotate-y-180">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-semibold tracking-widest bg-mt-card text-mt-gold-bright px-3 py-1 rounded-full border border-mt-gold/20">
                Answer / Back
              </span>
              <RotateCw className="w-4 h-4 text-mt-gold" />
            </div>
            <div className="text-center my-auto">
              <div className="text-lg md:text-xl font-semibold text-mt-gold-bright leading-relaxed">
                <LaTeXRenderer content={currentCard.back} />
              </div>
            </div>
            <p className="text-center text-xs text-mt-muted font-medium">Ratings tailor spaced revision</p>
          </div>
        </div>
      </div>

      {/* Response Action Buttons */}
      <div className="flex items-center justify-center gap-3 w-full">
        <button
          onClick={() => markCard('again')}
          className="flex-1 py-3 px-2 bg-mt-card hover:bg-mt-elevated text-mt-text-secondary hover:text-rose-400 border border-mt-border rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 min-h-touch active:scale-95 transition-all duration-premium"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Again
        </button>
        <button
          onClick={() => markCard('hard')}
          className="flex-1 py-3 px-2 bg-mt-card hover:bg-mt-elevated text-mt-gold-bright border border-mt-gold/30 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 min-h-touch active:scale-95 transition-all duration-premium"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Hard
        </button>
        <button
          onClick={() => markCard('know')}
          className="flex-1 py-3 px-2 bg-mt-gold-bright hover:brightness-110 text-mt-bg border border-mt-gold-bright rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 min-h-touch active:scale-95 transition-all duration-premium"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Know
        </button>
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center justify-between w-full pt-2">
        <button
          onClick={handlePrev}
          className="mt-btn-secondary text-xs px-4 py-2"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Previous
        </button>
        <button
          onClick={handleNext}
          className="mt-btn-secondary text-xs px-4 py-2"
        >
          Next <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
