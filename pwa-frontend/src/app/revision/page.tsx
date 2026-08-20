'use client';

import React, { useEffect, useState } from 'react';
import { useCurriculum } from '@/lib/curriculumContext';
import { FlashcardEngine } from '@/components/flashcards/FlashcardEngine';
import {
  filterRevisionFlashcards,
  filterRevisionFormulas,
} from '@/lib/flashcardData';
import { Repeat, Zap, FileText, Filter, AlertCircle } from 'lucide-react';
import { LaTeXRenderer } from '@/components/math/LaTeXRenderer';

export default function RevisionPage() {
  const { activeBoard, activeClass, activeSubject, activeCurriculum } = useCurriculum();

  const [selectedChapterId, setSelectedChapterId] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [flashcardKey, setFlashcardKey] = useState<number>(0);

  const chapters = activeCurriculum.chapters;
  const selectedChapter = chapters.find((c) => c.id === selectedChapterId) || null;
  const topics = selectedChapter ? selectedChapter.topics : [];
  const selectedTopic = topics.find((t) => t.id === selectedTopicId) || null;

  // Reset chapter & concept when Board, Class, or Subject changes from sidebar/onboarding
  useEffect(() => {
    setSelectedChapterId('');
    setSelectedTopicId('');
    setFlashcardKey((k) => k + 1);
  }, [activeBoard.id, activeClass, activeSubject]);

  const handleChapterChange = (newChapterId: string) => {
    setSelectedChapterId(newChapterId);
    setSelectedTopicId('');
    setFlashcardKey((k) => k + 1);
  };

  const handleTopicChange = (newTopicId: string) => {
    setSelectedTopicId(newTopicId);
    setFlashcardKey((k) => k + 1);
  };

  const filteredCards =
    selectedChapterId && selectedTopicId
      ? filterRevisionFlashcards(activeClass, activeSubject, selectedChapterId, selectedTopicId)
      : [];

  const filteredFormulas =
    selectedChapterId && selectedTopicId
      ? filterRevisionFormulas(activeClass, activeSubject, selectedChapterId, selectedTopicId)
      : [];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="mt-card p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-mt-elevated text-mt-gold-bright border border-mt-gold/30 flex items-center justify-center font-bold text-xl">
            <Repeat className="w-6 h-6 text-mt-gold-bright" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-mt-gold uppercase tracking-wider block">
              {activeBoard.shortCode} • {activeClass} • {activeCurriculum.subjectName}
            </span>
            <h1 className="text-2xl font-bold text-mt-text">Spaced Repetition & Revision</h1>
            <p className="text-xs text-mt-muted mt-0.5">
              Review concept flashcards and formula sheets mapped to your active subject curriculum.
            </p>
          </div>
        </div>
      </div>

      {/* Chapter & Concept Selector Area */}
      <div className="mt-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-mt-border pb-3">
          <h3 className="text-base font-bold text-mt-text flex items-center gap-2">
            <Filter className="w-4 h-4 text-mt-gold" /> Revision Scope Filter
          </h3>
          <span className="text-xs text-mt-gold-bright font-medium">
            {activeCurriculum.subjectName} ({chapters.length} Chapters)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-mt-gold block">Chapter:</label>
            <select
              value={selectedChapterId}
              onChange={(e) => handleChapterChange(e.target.value)}
              className="mt-input text-xs"
            >
              <option value="" className="bg-mt-card text-mt-text">
                Select Chapter
              </option>
              {chapters.map((ch) => (
                <option key={ch.id} value={ch.id} className="bg-mt-card text-mt-text">
                  Ch {ch.chapterNumber}. {ch.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-mt-gold block">Concept:</label>
            <select
              value={selectedTopicId}
              onChange={(e) => handleTopicChange(e.target.value)}
              disabled={!selectedChapterId || topics.length === 0}
              className="mt-input text-xs disabled:opacity-50 cursor-pointer"
            >
              <option value="" className="bg-mt-card text-mt-text">
                {topics.length === 0 && selectedChapterId
                  ? 'No Concept Headings Listed'
                  : 'Select Concept'}
              </option>
              {topics.map((top) => (
                <option key={top.id} value={top.id} className="bg-mt-card text-mt-text">
                  {top.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Flashcard Deck Section */}
      <div className="mt-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-mt-border pb-3">
          <h3 className="text-base font-bold text-mt-text flex items-center gap-2">
            <Zap className="w-4 h-4 text-mt-gold-bright fill-mt-gold-bright" /> Active Flashcard Review Deck
          </h3>
          {selectedChapterId && selectedTopicId && (
            <span className="text-xs text-mt-gold-bright font-bold bg-mt-elevated px-3 py-1 rounded-xl border border-mt-gold/20">
              {filteredCards.length} Cards
            </span>
          )}
        </div>

        {!selectedChapterId || !selectedTopicId ? (
          <div className="text-center py-12 space-y-3">
            <Filter className="w-8 h-8 text-mt-gold/50 mx-auto" />
            <h4 className="text-base font-semibold text-mt-text">Select a chapter and concept to start revision.</h4>
            <p className="text-xs text-mt-muted max-w-sm mx-auto">
              Choose a chapter and concept from the dropdowns above to load relevant revision flashcards.
            </p>
          </div>
        ) : filteredCards.length > 0 ? (
          <FlashcardEngine key={flashcardKey} cards={filteredCards} />
        ) : (
          <div className="text-center py-12 space-y-3">
            <AlertCircle className="w-8 h-8 text-mt-gold/50 mx-auto" />
            <h4 className="text-base font-semibold text-mt-text">
              No flashcards are available for this concept yet.
            </h4>
            <p className="text-xs text-mt-muted max-w-md mx-auto">
              Revision flashcards for {selectedTopic?.title || 'this concept'} in {activeCurriculum.subjectName} have not been added yet.
            </p>
          </div>
        )}
      </div>

      {/* Formula Sheet Reference Section */}
      <div className="mt-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-mt-border pb-3">
          <h3 className="text-base font-bold text-mt-text flex items-center gap-2">
            <FileText className="w-4 h-4 text-mt-gold" /> Formula Sheet Reference
          </h3>
          {selectedTopic && (
            <span className="text-xs text-mt-gold-bright font-semibold">{selectedTopic.title}</span>
          )}
        </div>

        {!selectedChapterId || !selectedTopicId ? (
          <div className="text-center py-8 text-xs text-mt-muted font-medium">
            Select a chapter and concept above to view formula references.
          </div>
        ) : filteredFormulas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFormulas.map((f) => (
              <div key={f.id} className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-2">
                <span className="text-xs font-semibold text-mt-gold-bright block">{f.label}</span>
                <LaTeXRenderer content={f.latex} block />
                <span className="text-[11px] text-mt-muted block">
                  <LaTeXRenderer content={f.notes} />
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-mt-muted font-medium">
            No formula references are available for this concept yet.
          </div>
        )}
      </div>
    </div>
  );
}
