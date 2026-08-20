'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useCurriculum } from '@/lib/curriculumContext';
import {
  SUBJECTS,
  Topic,
  getQuestionsForCurriculum,
} from '@/lib/curriculum';
import { QuestionEngine } from '@/components/questions/QuestionEngine';
import {
  BookOpen,
  FileText,
  Layers,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
} from 'lucide-react';

export default function LearnPage() {
  const {
    activeBoard,
    activeClass,
    activeSubject,
    activeCurriculum,
    setActiveSubject,
    onboardingState,
  } = useCurriculum();

  const chapters = activeCurriculum.chapters;
  const availableSubjects = SUBJECTS.filter((subject) =>
    onboardingState.selectedSubjects.includes(subject.id)
  );

  const [selectedChapterId, setSelectedChapterId] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'concepts' | 'concept' | 'examples' | 'practice' | 'pyq' | 'revision'
  >('overview');

  const selectedChapter =
    chapters.find((chapter) => chapter.id === selectedChapterId) || chapters[0] || null;

  const selectedTopic: Topic | null =
    selectedChapter?.topics.find((topic) => topic.id === selectedTopicId) ||
    selectedChapter?.topics[0] ||
    null;

  const curriculumQuestions = useMemo(
    () => getQuestionsForCurriculum(activeCurriculum),
    [activeCurriculum]
  );

  const chapterQuestions = selectedChapter
    ? curriculumQuestions.filter((question) => question.chapterId === selectedChapter.id)
    : [];

  const chapterPYQs = chapterQuestions.filter((question) => question.isPYQ);

  useEffect(() => {
    const firstChapter = chapters[0];
    setSelectedChapterId(firstChapter?.id || '');
    setSelectedTopicId(firstChapter?.topics[0]?.id || '');
    setActiveTab('overview');
  }, [activeBoard.id, activeClass, activeSubject, chapters.length]);

  const selectChapter = (chapterId: string) => {
    const chapter = chapters.find((item) => item.id === chapterId);
    setSelectedChapterId(chapterId);
    setSelectedTopicId(chapter?.topics[0]?.id || '');
    setActiveTab('overview');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Subject Header & Switcher */}
      <div className="mt-card p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-mt-border pb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-mt-gold-bright">
              {activeBoard.shortCode} • {activeClass} • 2026-27
            </span>
            <h1 className="text-2xl font-bold text-mt-text">Curriculum Syllabus & Learning</h1>
            <p className="text-xs text-mt-muted mt-1">
              Class 11/12 syllabus updated from the supplied 2026-27 curriculum files.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-mt-elevated p-1.5 rounded-xl border border-mt-border overflow-x-auto no-scrollbar max-w-full">
            {availableSubjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setActiveSubject(subject.id)}
                className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all duration-premium whitespace-nowrap ${
                  activeSubject === subject.id
                    ? 'bg-mt-gold-bright text-mt-bg shadow-gold'
                    : 'text-mt-muted hover:text-mt-text'
                }`}
              >
                {subject.label}
              </button>
            ))}
          </div>
        </div>

        {chapters.length > 0 ? (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {chapters.map((chapter) => {
              const isSelected = selectedChapter?.id === chapter.id;
              return (
                <button
                  key={chapter.id}
                  onClick={() => selectChapter(chapter.id)}
                  className={`px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-2 whitespace-nowrap min-h-touch transition-all duration-premium ${
                    isSelected
                      ? 'bg-mt-gold-bright text-mt-bg shadow-gold'
                      : 'bg-mt-card text-mt-text-secondary hover:bg-mt-elevated hover:text-mt-text border border-mt-border'
                  }`}
                >
                  <span>Ch {chapter.chapterNumber}. {chapter.title}</span>
                  {(chapter.completionPercentage || 0) > 0 && (
                    <span className="text-[10px] bg-mt-bg/40 px-2 py-0.5 rounded-full font-bold">
                      {chapter.completionPercentage}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-mt-gold/20 bg-mt-elevated text-xs text-mt-text-secondary flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-mt-gold mt-0.5 shrink-0" />
            <span>
              The supplied syllabus files cover Class 11 and Class 12 NCERT-based science subjects. No syllabus data was supplied for this board/class combination.
            </span>
          </div>
        )}
      </div>

      {selectedChapter && (
        <div className="space-y-6">
          <div className="mt-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-mt-gold">
                  Chapter {selectedChapter.chapterNumber} • {activeCurriculum.subjectName}
                </span>
                <h2 className="text-2xl font-bold text-mt-text">{selectedChapter.title}</h2>
                <p className="text-xs text-mt-muted mt-1">{selectedChapter.description}</p>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-mt-text-secondary bg-mt-elevated p-3.5 rounded-xl border border-mt-border">
                <div>
                  <span className="text-mt-muted block text-[10px]">Concepts</span>
                  <span className="text-mt-gold-bright font-bold">{selectedChapter.topics.length}</span>
                </div>
                <div className="w-px h-6 bg-mt-border" />
                <div>
                  <span className="text-mt-muted block text-[10px]">Weightage</span>
                  <span className="text-mt-gold-bright font-bold">
                    {selectedChapter.weightageMarks > 0 ? `${selectedChapter.weightageMarks} Marks` : 'Not supplied'}
                  </span>
                </div>
                <div className="w-px h-6 bg-mt-border" />
                <div>
                  <span className="text-mt-muted block text-[10px]">Mapped Questions</span>
                  <span className="text-mt-gold-bright font-bold">{chapterQuestions.length}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 border-t border-mt-border">
              {[
                { id: 'overview', label: '1. Overview' },
                { id: 'concepts', label: '2. Syllabus Concepts' },
                { id: 'concept', label: '3. Concept Learning' },
                { id: 'examples', label: '4. Solved Examples' },
                { id: 'practice', label: '5. Practice' },
                { id: 'pyq', label: '6. PYQs' },
                { id: 'revision', label: '7. Revision' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3.5 py-2 rounded-xl font-semibold text-xs whitespace-nowrap transition-all duration-premium ${
                    activeTab === tab.id
                      ? 'bg-mt-gold-bright text-mt-bg shadow-gold'
                      : 'bg-mt-card text-mt-muted hover:text-mt-text border border-mt-border'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'overview' && (
            <div className="mt-card p-6 space-y-5">
              <h3 className="text-lg font-bold text-mt-text border-b border-mt-border pb-3">
                Chapter Syllabus Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-1">
                  <span className="text-xs font-semibold text-mt-gold uppercase">Syllabus Concepts</span>
                  <p className="text-xl font-bold text-mt-text">{selectedChapter.topics.length}</p>
                  <span className="text-[11px] text-mt-muted">Concept headings mapped from the supplied syllabus.</span>
                </div>

                <div className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-1">
                  <span className="text-xs font-semibold text-mt-gold uppercase">Board Weightage</span>
                  <p className="text-xl font-bold text-mt-text">
                    {selectedChapter.weightageMarks > 0 ? `${selectedChapter.weightageMarks} Marks` : 'Not provided'}
                  </p>
                  <span className="text-[11px] text-mt-muted">Only shown where the existing app already had mapped metadata.</span>
                </div>

                <div className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-1">
                  <span className="text-xs font-semibold text-mt-gold uppercase">Question Bank</span>
                  <p className="text-xl font-bold text-mt-text">{chapterQuestions.length}</p>
                  <span className="text-[11px] text-mt-muted">Current questions linked to this chapter.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'concepts' && (
            <div className="mt-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-mt-border pb-3 gap-4">
                <h3 className="text-lg font-bold text-mt-text flex items-center gap-2">
                  <Layers className="w-4 h-4 text-mt-gold-bright" /> Syllabus Concepts
                </h3>
                <span className="text-xs text-mt-muted font-medium">2026-27 supplied curriculum</span>
              </div>

              {selectedChapter.topics.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedChapter.topics.map((topic, index) => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setSelectedTopicId(topic.id);
                        setActiveTab('concept');
                      }}
                      className="p-4 bg-mt-elevated hover:bg-mt-card border border-mt-border hover:border-mt-gold/40 rounded-card text-left transition-all duration-premium"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 shrink-0 rounded-lg bg-mt-gold/10 text-mt-gold-bright flex items-center justify-center text-[11px] font-bold border border-mt-gold/20">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm text-mt-text">{topic.title}</h4>
                          <p className="text-[11px] text-mt-muted mt-1">{topic.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-mt-gold mt-1 shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-5 bg-mt-elevated rounded-card border border-mt-border text-sm text-mt-text-secondary">
                  The supplied Biology contents identify this chapter, but do not provide its internal subsection/concept list. No concepts have been invented or added beyond the source.
                </div>
              )}
            </div>
          )}

          {activeTab === 'concept' && (
            <div className="space-y-5">
              {selectedTopic ? (
                <div className="bg-mt-elevated border border-mt-gold/30 rounded-card p-6 shadow-card space-y-3">
                  <div className="flex items-center gap-2 text-mt-gold-bright font-semibold text-xs uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4" /> Selected Syllabus Concept
                  </div>
                  <h3 className="text-xl font-bold text-mt-text">{selectedTopic.title}</h3>
                  <p className="text-sm text-mt-text-secondary leading-relaxed">{selectedTopic.description}</p>
                  <p className="text-xs text-mt-muted border-t border-mt-border pt-3">
                    Detailed lesson notes, formulas and solved examples for this concept are not part of the supplied syllabus list and can be added separately.
                  </p>
                </div>
              ) : (
                <div className="mt-card p-6 text-sm text-mt-text-secondary">
                  No concept-level headings were supplied for this chapter.
                </div>
              )}
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="mt-card p-6">
              {chapterQuestions.length > 0 ? (
                <QuestionEngine questions={chapterQuestions} />
              ) : (
                <div className="text-center py-10 text-xs text-mt-muted">
                  No practice questions are currently mapped to this syllabus chapter.
                </div>
              )}
            </div>
          )}

          {activeTab === 'pyq' && (
            <div className="mt-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-mt-border pb-3">
                <h3 className="text-lg font-bold text-mt-text flex items-center gap-2">
                  <FileText className="w-5 h-5 text-mt-gold" /> Chapter PYQs ({chapterPYQs.length})
                </h3>
                <Link href="/papers" className="text-xs font-semibold text-mt-gold-bright hover:underline">
                  View Full Papers
                </Link>
              </div>

              {chapterPYQs.length > 0 ? (
                <div className="space-y-3">
                  {chapterPYQs.map((question) => (
                    <div key={question.id} className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-mt-gold uppercase">{question.type} • {question.marks} Marks</span>
                        <span className="px-2 py-0.5 bg-mt-card text-mt-gold-bright border border-mt-gold/20 rounded-full font-medium text-[10px]">
                          {question.pyqBoard} {question.pyqYear}
                        </span>
                      </div>
                      <p className="font-medium text-xs text-mt-text-secondary">{question.question}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-xs text-mt-muted">No PYQs are currently mapped to this chapter.</div>
              )}
            </div>
          )}

          {(activeTab === 'examples' || activeTab === 'revision') && (
            <div className="mt-card p-6 text-center py-12 space-y-2">
              <BookOpen className="w-6 h-6 text-mt-gold mx-auto" />
              <h3 className="font-bold text-mt-text">
                {activeTab === 'examples' ? 'Solved Examples' : 'Revision Content'}
              </h3>
              <p className="text-xs text-mt-muted">
                The syllabus structure is updated. Learning content for this section has not been added from the supplied files.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
