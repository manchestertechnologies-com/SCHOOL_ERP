'use client';

import React from 'react';
import Link from 'next/link';
import { DEMO_CONCEPT } from '@/lib/seedData';
import { FlashcardEngine } from '@/components/flashcards/FlashcardEngine';
import { Repeat, Zap, BookOpen, FileText } from 'lucide-react';
import { LaTeXRenderer } from '@/components/math/LaTeXRenderer';

export default function RevisionPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="mt-card p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-mt-elevated text-mt-gold-bright border border-mt-gold/30 flex items-center justify-center font-bold text-xl">
            <Repeat className="w-6 h-6 text-mt-gold-bright" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-mt-gold uppercase tracking-wider block">
              Active Study Deck
            </span>
            <h1 className="text-2xl font-bold text-mt-text">Spaced Repetition & Revision</h1>
            <p className="text-xs text-mt-muted mt-0.5">
              Review high-yield flashcards, formula sheets, and target weak concept nodes.
            </p>
          </div>
        </div>
      </div>

      {/* Flashcard Deck */}
      <div className="mt-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-mt-border pb-3">
          <h3 className="text-base font-bold text-mt-text flex items-center gap-2">
            <Zap className="w-4 h-4 text-mt-gold-bright fill-mt-gold-bright" /> Active Flashcard Review Deck
          </h3>
          <span className="text-xs text-mt-gold-bright font-bold bg-mt-elevated px-3 py-1 rounded-xl border border-mt-gold/20">
            {DEMO_CONCEPT.flashcards.length} Cards
          </span>
        </div>
        <FlashcardEngine cards={DEMO_CONCEPT.flashcards} />
      </div>

      {/* Formula Bank */}
      <div className="mt-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-mt-border pb-3">
          <h3 className="text-base font-bold text-mt-text flex items-center gap-2">
            <FileText className="w-4 h-4 text-mt-gold" /> Formula Sheet Reference
          </h3>
          <span className="text-xs text-mt-gold-bright font-semibold">Chapter 1 Electrostatics</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_CONCEPT.formulas.map((f, i) => (
            <div key={i} className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-2">
              <span className="text-xs font-semibold text-mt-gold-bright block">{f.label}</span>
              <LaTeXRenderer content={f.latex} block />
              <span className="text-[11px] text-mt-muted block">
                <LaTeXRenderer content={f.notes} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
