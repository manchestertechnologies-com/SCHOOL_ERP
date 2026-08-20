'use client';

import React, { useState } from 'react';
import { useCurriculum } from '@/lib/curriculumContext';
import { KARNATAKA_2PUC_PHYSICS_CURRICULUM, SAMPLE_QUESTIONS, QuestionData } from '@/lib/curriculum';
import { QuestionEngine } from '@/components/questions/QuestionEngine';
import { PenTool, Filter, Target, Award, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

export default function PracticePage() {
  const { activeBoard, activeClass, activeSubject } = useCurriculum();

  const [selectedMark, setSelectedMark] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');

  const chapters = KARNATAKA_2PUC_PHYSICS_CURRICULUM.chapters;

  const filteredQuestions = SAMPLE_QUESTIONS.filter((q) => {
    if (selectedMark !== 'all' && q.marks !== selectedMark) return false;
    if (selectedType !== 'all' && q.type !== selectedType) return false;
    if (selectedChapterId !== 'all' && q.chapterId !== selectedChapterId) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="mt-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-mt-border pb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-mt-gold-bright">{activeBoard.shortCode} • Class {activeClass}</span>
            <h1 className="text-2xl font-bold text-mt-text">Multi-Format & Mark-Wise Practice</h1>
            <p className="text-xs text-mt-muted mt-0.5">Practice 1 to 5-mark questions, numericals, derivations, and assertion-reasons.</p>
          </div>
          <span className="text-xs font-semibold text-mt-gold-bright bg-mt-elevated px-3.5 py-1.5 rounded-xl border border-mt-gold/20">
            {filteredQuestions.length} Questions Loaded
          </span>
        </div>

        {/* Mark-Wise Practice Selector Bar */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-mt-gold">Mark-Wise Filter</span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All Marks' },
              { id: 1, label: '1 Mark' },
              { id: 2, label: '2 Marks' },
              { id: 3, label: '3 Marks' },
              { id: 5, label: '5 Marks' },
            ].map((m) => {
              const isSelected = selectedMark === m.id;
              return (
                <button
                  key={String(m.id)}
                  onClick={() => setSelectedMark(m.id as any)}
                  className={`px-4 py-2 rounded-xl font-semibold text-xs whitespace-nowrap min-h-touch transition-all duration-premium ${
                    isSelected
                      ? 'bg-mt-gold-bright text-mt-bg shadow-gold'
                      : 'bg-mt-card text-mt-muted hover:text-mt-text border border-mt-border'
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="flex items-center gap-2 bg-mt-elevated p-2.5 rounded-xl border border-mt-border text-xs font-medium">
            <span className="text-mt-gold-bright font-semibold">Chapter:</span>
            <select
              value={selectedChapterId}
              onChange={(e) => setSelectedChapterId(e.target.value)}
              className="bg-transparent text-mt-text focus:outline-none cursor-pointer w-full"
            >
              <option value="all" className="bg-mt-card text-mt-text">All Chapters</option>
              {chapters.map((c) => (
                <option key={c.id} value={c.id} className="bg-mt-card text-mt-text">Ch {c.chapterNumber}. {c.title}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-mt-elevated p-2.5 rounded-xl border border-mt-border text-xs font-medium">
            <span className="text-mt-gold-bright font-semibold">Question Format:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-transparent text-mt-text focus:outline-none cursor-pointer w-full"
            >
              <option value="all" className="bg-mt-card text-mt-text">All Formats (MCQ, Numerical, Derivation)</option>
              <option value="mcq" className="bg-mt-card text-mt-text">MCQ</option>
              <option value="numerical" className="bg-mt-card text-mt-text">Numerical</option>
              <option value="derivation" className="bg-mt-card text-mt-text">Derivation</option>
              <option value="assertion_reason" className="bg-mt-card text-mt-text">Assertion & Reason</option>
              <option value="short_3m" className="bg-mt-card text-mt-text">3-Mark Short Answer</option>
            </select>
          </div>
        </div>
      </div>

      {/* QUESTION ENGINE CONTAINER */}
      <div className="mt-card p-6">
        {filteredQuestions.length > 0 ? (
          <QuestionEngine questions={filteredQuestions} />
        ) : (
          <div className="text-center py-12 text-mt-muted text-xs font-medium">
            No practice questions found matching the selected filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}
