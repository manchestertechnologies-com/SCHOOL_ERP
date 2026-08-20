'use client';

import React, { useState } from 'react';
import { useCurriculum } from '@/lib/curriculumContext';
import { KARNATAKA_2PUC_PHYSICS_CURRICULUM, SAMPLE_QUESTIONS } from '@/lib/curriculum';
import { Search, X, BookOpen, Layers, HelpCircle, FileText, ArrowRight } from 'lucide-react';
import { LaTeXRenderer } from '@/components/math/LaTeXRenderer';
import Link from 'next/link';

export const SearchModal: React.FC = () => {
  const { showSearchModal, setShowSearchModal, activeBoard, activeClass } = useCurriculum();
  const [query, setQuery] = useState('');
  const [searchAllBoards, setSearchAllBoards] = useState(false);

  if (!showSearchModal) return null;

  const chapters = KARNATAKA_2PUC_PHYSICS_CURRICULUM.chapters;
  const lowerQuery = query.toLowerCase().trim();

  // Search results
  const matchingTopics = lowerQuery
    ? chapters.flatMap((c) =>
        c.topics
          .filter((t) => t.title.toLowerCase().includes(lowerQuery) || t.description.toLowerCase().includes(lowerQuery))
          .map((t) => ({ ...t, chapterTitle: c.title, chapterId: c.id }))
      )
    : [];

  const matchingQuestions = lowerQuery
    ? SAMPLE_QUESTIONS.filter((q) => q.question.toLowerCase().includes(lowerQuery) || q.explanation.toLowerCase().includes(lowerQuery))
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 p-4">
      <div className="bg-mt-bg-secondary border border-mt-gold/30 w-full max-w-2xl rounded-card p-6 shadow-card-hover space-y-4">
        <div className="flex items-center justify-between border-b border-mt-border pb-3">
          <div className="flex items-center gap-2 text-mt-gold-bright font-semibold text-xs uppercase tracking-wider">
            <Search className="w-4 h-4 text-mt-gold-bright" /> Global Search
          </div>
          <button
            onClick={() => setShowSearchModal(false)}
            className="p-1.5 rounded-xl text-mt-muted hover:text-mt-text hover:bg-mt-elevated transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-3.5 text-mt-gold" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search concepts, formulas, PYQs..."
            autoFocus
            className="mt-input pl-11"
          />
        </div>

        {/* Filter scope toggle */}
        <div className="flex items-center justify-between text-xs text-mt-text-secondary px-1 font-medium">
          <span>Filtered by: <strong className="text-mt-gold-bright">{activeBoard.shortCode} • Class {activeClass}</strong></span>
          <button
            onClick={() => setSearchAllBoards(!searchAllBoards)}
            className="text-mt-gold-bright hover:underline font-semibold"
          >
            {searchAllBoards ? 'Scope: Current Board Only' : 'Search All Boards'}
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-80 overflow-y-auto space-y-4 pr-1 no-scrollbar">
          {lowerQuery.length === 0 && (
            <div className="text-center py-8 text-mt-muted text-xs font-medium">
              Type keywords above to search topics, concepts, formulas, and PYQs.
            </div>
          )}

          {lowerQuery.length > 0 && matchingTopics.length === 0 && matchingQuestions.length === 0 && (
            <div className="text-center py-8 text-mt-muted text-xs font-medium">
              No matching topics or questions found for "{query}".
            </div>
          )}

          {matchingTopics.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[11px] font-semibold text-mt-muted uppercase tracking-wider">Matching Topics</h4>
              {matchingTopics.map((t) => (
                <Link
                  key={t.id}
                  href="/learn"
                  onClick={() => setShowSearchModal(false)}
                  className="block p-3.5 bg-mt-card hover:bg-mt-elevated rounded-xl border border-mt-border hover:border-mt-gold/30 transition-all duration-premium"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-mt-gold-bright">{t.chapterTitle}</span>
                    <span className="text-[10px] bg-mt-gold/10 border border-mt-gold/20 px-2 py-0.5 rounded-full text-mt-gold-bright font-medium">{t.priority} Priority</span>
                  </div>
                  <h5 className="font-semibold text-sm text-mt-text mt-1">{t.title}</h5>
                  <p className="text-xs text-mt-muted line-clamp-1 mt-0.5">{t.description}</p>
                </Link>
              ))}
            </div>
          )}

          {matchingQuestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[11px] font-semibold text-mt-muted uppercase tracking-wider">Matching Practice Questions / PYQs</h4>
              {matchingQuestions.map((q) => (
                <Link
                  key={q.id}
                  href="/practice"
                  onClick={() => setShowSearchModal(false)}
                  className="block p-3.5 bg-mt-card hover:bg-mt-elevated rounded-xl border border-mt-border hover:border-mt-gold/30 transition-all duration-premium"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-mt-gold-bright uppercase">{q.type} • {q.marks} Mark</span>
                    {q.isPYQ && <span className="text-[10px] bg-mt-elevated text-mt-gold-bright border border-mt-gold/20 px-2 py-0.5 rounded-full font-medium">PYQ {q.pyqYear}</span>}
                  </div>
                  <p className="font-medium text-xs text-mt-text-secondary mt-1 line-clamp-2"><LaTeXRenderer content={q.question} /></p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
