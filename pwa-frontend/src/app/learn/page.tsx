'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCurriculum } from '@/lib/curriculumContext';
import { KARNATAKA_2PUC_PHYSICS_CURRICULUM, Chapter, Topic, SAMPLE_QUESTIONS } from '@/lib/curriculum';
import { LaTeXRenderer } from '@/components/math/LaTeXRenderer';
import { QuestionEngine } from '@/components/questions/QuestionEngine';
import { BookOpen, Star, HelpCircle, FileText, Clock, Play, ArrowRight, Lightbulb, AlertTriangle, Layers, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function LearnPage() {
  const { activeBoard, activeClass, activeSubject, setActiveSubject } = useCurriculum();

  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(KARNATAKA_2PUC_PHYSICS_CURRICULUM.chapters[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'important_topics' | 'concept' | 'examples' | 'practice' | 'pyq' | 'revision'>('overview');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(KARNATAKA_2PUC_PHYSICS_CURRICULUM.chapters[0].topics[0]);

  const chapters = KARNATAKA_2PUC_PHYSICS_CURRICULUM.chapters;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Subject Header & Switcher */}
      <div className="mt-card p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-mt-border pb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-mt-gold-bright">{activeBoard.shortCode} • Class {activeClass}</span>
            <h1 className="text-2xl font-bold text-mt-text">Curriculum Syllabus & Learning</h1>
          </div>
          <div className="flex items-center gap-1.5 bg-mt-elevated p-1.5 rounded-xl border border-mt-border">
            {[
              { id: 'physics', label: 'Physics' },
              { id: 'chemistry', label: 'Chemistry' },
              { id: 'mathematics', label: 'Math' },
              { id: 'biology', label: 'Biology' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSubject(s.id)}
                className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all duration-premium ${
                  activeSubject === s.id
                    ? 'bg-mt-gold-bright text-mt-bg shadow-gold'
                    : 'text-mt-muted hover:text-mt-text'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chapter Selection Pill List */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {chapters.map((ch) => {
            const isSelected = selectedChapter?.id === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChapter(ch);
                  setSelectedTopic(ch.topics[0]);
                  setActiveTab('overview');
                }}
                className={`px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-2 whitespace-nowrap min-h-touch transition-all duration-premium ${
                  isSelected
                    ? 'bg-mt-gold-bright text-mt-bg shadow-gold'
                    : 'bg-mt-card text-mt-text-secondary hover:bg-mt-elevated hover:text-mt-text border border-mt-border'
                }`}
              >
                <span>Ch {ch.chapterNumber}. {ch.title}</span>
                <span className="text-[10px] bg-mt-bg/40 px-2 py-0.5 rounded-full font-bold">{ch.completionPercentage}%</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE CHAPTER CONTAINER */}
      {selectedChapter && (
        <div className="space-y-6">
          {/* Chapter Details Banner */}
          <div className="mt-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-mt-gold">Chapter {selectedChapter.chapterNumber}</span>
                <h2 className="text-2xl font-bold text-mt-text">{selectedChapter.title}</h2>
                <p className="text-xs text-mt-muted mt-1">{selectedChapter.description}</p>
              </div>

              <div className="flex items-center gap-3 text-xs font-medium text-mt-text-secondary bg-mt-elevated p-3.5 rounded-xl border border-mt-border">
                <div>
                  <span className="text-mt-muted block text-[10px]">Weightage</span>
                  <span className="text-mt-gold-bright font-bold">{selectedChapter.weightageMarks} Marks</span>
                </div>
                <div className="w-px h-6 bg-mt-border"></div>
                <div>
                  <span className="text-mt-muted block text-[10px]">PYQs</span>
                  <span className="text-mt-gold-bright font-bold">{selectedChapter.pyqRelevanceCount} PYQs</span>
                </div>
                <div className="w-px h-6 bg-mt-border"></div>
                <div>
                  <span className="text-mt-muted block text-[10px]">Est. Time</span>
                  <span className="text-mt-gold-bright font-bold">{selectedChapter.estLearningMinutes} Mins</span>
                </div>
              </div>
            </div>

            {/* FOCUSED SUB-TASK NAVIGATION TABS */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 border-t border-mt-border">
              {[
                { id: 'overview', label: '1. Overview' },
                { id: 'important_topics', label: '2. Important Topics' },
                { id: 'concept', label: '3. Concept Learning' },
                { id: 'examples', label: '4. Solved Examples' },
                { id: 'practice', label: '5. Practice' },
                { id: 'pyq', label: '6. PYQs' },
                { id: 'revision', label: '7. Revision' },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3.5 py-2 rounded-xl font-semibold text-xs whitespace-nowrap transition-all duration-premium ${
                      isActive
                        ? 'bg-mt-gold-bright text-mt-bg shadow-gold'
                        : 'bg-mt-card text-mt-muted hover:text-mt-text border border-mt-border'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="mt-card p-6 space-y-6">
              <h3 className="text-lg font-bold text-mt-text border-b border-mt-border pb-3">Chapter Summary & Weightage Blueprint</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-1">
                  <span className="text-xs font-semibold text-mt-gold uppercase">Board Exam Weightage</span>
                  <p className="text-xl font-bold text-mt-text">{selectedChapter.weightageMarks} Marks</p>
                  <span className="text-[11px] text-mt-muted">High priority in 2, 3, and 5 mark sections</span>
                </div>

                <div className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-1">
                  <span className="text-xs font-semibold text-mt-gold uppercase">Important Topics</span>
                  <p className="text-xl font-bold text-mt-text">{selectedChapter.topics.filter(t => t.priority === 'HIGH').length} High Priority</p>
                  <span className="text-[11px] text-mt-muted">Based on past 10 years exam frequency</span>
                </div>

                <div className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-1">
                  <span className="text-xs font-semibold text-mt-gold-bright uppercase">Question Bank</span>
                  <p className="text-xl font-bold text-mt-text">{selectedChapter.totalQuestionCount} Questions</p>
                  <span className="text-[11px] text-mt-muted">{selectedChapter.pyqRelevanceCount} Board PYQs mapped</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IMPORTANT TOPICS SYSTEM */}
          {activeTab === 'important_topics' && (
            <div className="mt-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-mt-border pb-3">
                <h3 className="text-lg font-bold text-mt-text flex items-center gap-2">
                  <Star className="w-4 h-4 text-mt-gold-bright fill-mt-gold-bright" /> Important Topics Breakdown
                </h3>
                <span className="text-xs text-mt-muted font-medium">Ranked by Board Frequency & Blueprint Weightage</span>
              </div>

              <div className="space-y-3">
                {selectedChapter.topics.map((top) => {
                  const isHigh = top.priority === 'HIGH';
                  const isImportant = top.priority === 'IMPORTANT';
                  return (
                    <div
                      key={top.id}
                      onClick={() => {
                        setSelectedTopic(top);
                        setActiveTab('concept');
                      }}
                      className="p-5 bg-mt-elevated hover:bg-mt-card border border-mt-border hover:border-mt-gold/40 rounded-card cursor-pointer transition-all duration-premium space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {isHigh && <span className="px-2.5 py-0.5 bg-mt-gold/10 text-mt-gold-bright rounded-full font-semibold text-xs border border-mt-gold/30">⭐ HIGH PRIORITY</span>}
                          {isImportant && <span className="px-2.5 py-0.5 bg-mt-elevated text-mt-gold rounded-full font-semibold text-xs border border-mt-border">🟡 IMPORTANT TOPIC</span>}
                          {top.priority === 'SUPPORTING' && <span className="px-2.5 py-0.5 bg-mt-card text-mt-muted rounded-full font-medium text-xs border border-mt-border">⚪ SUPPORTING TOPIC</span>}
                          {top.syllabusStatus === 'deleted' && <span className="px-2.5 py-0.5 bg-rose-950/40 text-rose-300 rounded-full font-medium text-[10px] border border-rose-800/40">REMOVED FROM SYLLABUS</span>}
                        </div>
                        <span className="text-xs font-semibold text-mt-gold-bright">{top.pyqCount} Previous PYQs</span>
                      </div>

                      <h4 className="font-bold text-base text-mt-text">{top.title}</h4>
                      <p className="text-xs text-mt-muted">{top.description}</p>

                      <div className="flex items-center justify-between text-xs text-mt-muted pt-2 border-t border-mt-border">
                        <span>Typical Marks: <strong className="text-mt-gold-bright font-medium">{top.typicalMarks.join(', ')} Marks</strong></span>
                        <span className="text-mt-gold-bright font-semibold flex items-center gap-1">Open Concept <ChevronRight className="w-4 h-4" /></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: CONCEPT LEARNING */}
          {activeTab === 'concept' && selectedTopic && (
            <div className="space-y-6">
              <div className="bg-mt-elevated border border-mt-gold/30 rounded-card p-6 shadow-card space-y-3">
                <div className="flex items-center gap-2 text-mt-gold-bright font-semibold text-xs uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-mt-gold-bright" /> Intuitive Concept Explanation
                </div>
                <h3 className="text-xl font-bold text-mt-text">{selectedTopic.title}</h3>
                <p className="text-sm text-mt-text-secondary leading-relaxed font-medium">
                  {selectedTopic.description}
                </p>
              </div>

              {/* Core Formulas */}
              <div className="mt-card p-6 space-y-4">
                <h3 className="text-lg font-bold text-mt-text border-b border-mt-border pb-3">Core Formulas & Expressions</h3>
                <div className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-2">
                  <span className="text-xs font-semibold text-mt-gold-bright">Formula Equation</span>
                  <LaTeXRenderer content="E = \frac{1}{4\pi\varepsilon_0} \frac{|Q|}{r^2}" block />
                  <span className="text-xs text-mt-muted block"><LaTeXRenderer content={"Where $\\varepsilon_0 = 8.854 \\times 10^{-12} \\text{ F/m}$."} /></span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PRACTICE QUESTIONS */}
          {activeTab === 'practice' && (
            <div className="mt-card p-6">
              <QuestionEngine questions={SAMPLE_QUESTIONS} />
            </div>
          )}

          {/* TAB 6: PREVIOUS YEAR QUESTIONS */}
          {activeTab === 'pyq' && (
            <div className="mt-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-mt-border pb-3">
                <h3 className="text-lg font-bold text-mt-text flex items-center gap-2">
                  <FileText className="w-5 h-5 text-mt-gold" /> Chapter PYQs ({selectedChapter.pyqRelevanceCount})
                </h3>
                <Link href="/papers" className="text-xs font-semibold text-mt-gold-bright hover:underline">View All Full Papers</Link>
              </div>

              <div className="space-y-3">
                {SAMPLE_QUESTIONS.filter(q => q.isPYQ).map((q) => (
                  <div key={q.id} className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-mt-gold uppercase">{q.type} • {q.marks} Marks</span>
                      <span className="px-2 py-0.5 bg-mt-card text-mt-gold-bright border border-mt-gold/20 rounded-full font-medium text-[10px]">
                        {q.pyqBoard} {q.pyqYear}
                      </span>
                    </div>
                    <p className="font-medium text-xs text-mt-text-secondary"><LaTeXRenderer content={q.question} /></p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
