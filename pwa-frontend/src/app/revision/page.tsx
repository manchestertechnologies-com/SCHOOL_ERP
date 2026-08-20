'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCurriculum } from '@/lib/curriculumContext';
import { DEMO_CONCEPT, DEMO_QUESTIONS } from '@/lib/seedData';
import { KARNATAKA_2PUC_PHYSICS_CURRICULUM, SAMPLE_QUESTIONS, QuestionData } from '@/lib/curriculum';
import { FlashcardEngine } from '@/components/flashcards/FlashcardEngine';
import { MarkdownMathRenderer, LaTeXRenderer } from '@/components/math/LaTeXRenderer';
import {
  Repeat,
  Zap,
  BookOpen,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Flame,
  ChevronRight,
  Filter,
  Eye,
  EyeOff,
  Layers,
  Award,
  HelpCircle,
  RotateCw,
  Target,
  ShieldAlert,
  ArrowRight,
  Play,
  Check,
  Star,
} from 'lucide-react';

export default function RevisionPage() {
  const { activeBoard, activeClass, activeSubject, setActiveSubject } = useCurriculum();

  // State controls
  const [categoryTab, setCategoryTab] = useState<'all' | 'concepts' | 'formulas' | 'questions' | 'derivations' | 'pyqs' | 'mistakes'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Interactive reveals
  const [revealedAnswers, setRevealedAnswers] = useState<{ [id: string]: boolean }>({});
  const [revealedRecallPrompts, setRevealedRecallPrompts] = useState<{ [id: string]: boolean }>({});
  const [activeDerivationStep, setActiveDerivationStep] = useState<{ [id: string]: number }>({});
  const [revisedItems, setRevisedItems] = useState<{ [id: string]: boolean }>({});

  const chapter = KARNATAKA_2PUC_PHYSICS_CURRICULUM.chapters[0];
  const allQuestions: any[] = [...SAMPLE_QUESTIONS, ...DEMO_QUESTIONS];

  const toggleAnswerReveal = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRecallPrompt = (id: string) => {
    setRevealedRecallPrompts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleItemRevised = (id: string) => {
    setRevisedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const nextDerivationStep = (id: string, maxSteps: number) => {
    setActiveDerivationStep((prev) => ({
      ...prev,
      [id]: Math.min(maxSteps, (prev[id] || 1) + 1),
    }));
  };

  // Filter questions based on selections
  const filteredQuestions = allQuestions.filter((q) => {
    if (categoryTab === 'derivations' && q.type !== 'derivation') return false;
    if (categoryTab === 'pyqs' && !q.isPYQ) return false;
    if (typeFilter !== 'all' && q.type !== typeFilter) return false;
    if (priorityFilter === 'high' && q.marks < 3) return false;
    if (priorityFilter === 'medium' && q.marks >= 3) return false;
    return true;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16 px-2 sm:px-4">
      {/* 1. PAGE HEADER & CATEGORY PILLS */}
      <div className="mt-card p-6 space-y-5 border-l-4 border-l-mt-gold">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-mt-border pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-mt-elevated text-mt-gold-bright border border-mt-gold/30 flex items-center justify-center font-bold text-xl shadow-gold shrink-0">
              <Repeat className="w-6 h-6 text-mt-gold-bright" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-mt-gold uppercase tracking-widest bg-mt-gold/10 px-2.5 py-0.5 rounded-full border border-mt-gold/20">
                  QUICK REVISION
                </span>
                <span className="text-xs text-mt-muted font-medium">• {activeBoard.shortCode} Class {activeClass}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-mt-text tracking-tight mt-0.5">
                Smart Revision Command Center
              </h1>
              <p className="text-xs sm:text-sm text-mt-muted mt-1">
                Review important concepts, formulas, questions and your weak areas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => {
                setCategoryTab('all');
                setTypeFilter('all');
                setPriorityFilter('all');
              }}
              className="mt-btn-primary text-xs px-5 py-2.5 flex items-center gap-2 shadow-gold"
            >
              <Zap className="w-4 h-4 text-mt-bg fill-mt-bg" />
              <span>⚡ Start Smart Revision</span>
            </button>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'concepts', label: 'Concepts' },
            { id: 'formulas', label: 'Formulas' },
            { id: 'questions', label: 'Important Questions' },
            { id: 'derivations', label: 'Derivations' },
            { id: 'pyqs', label: 'PYQs' },
            { id: 'mistakes', label: 'Mistakes' },
          ].map((cat) => {
            const isActive = categoryTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryTab(cat.id as any)}
                className={`px-4 py-2 rounded-xl font-semibold text-xs whitespace-nowrap transition-all duration-premium ${
                  isActive
                    ? 'bg-mt-gold-bright text-mt-bg shadow-gold'
                    : 'bg-mt-card text-mt-text-secondary hover:text-mt-text hover:bg-mt-elevated border border-mt-border'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN 2-COLUMN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN (2 Cols): CHAPTER SHEET, QUESTIONS, FORMULAS, FLASHCARDS */}
        <div className="lg:col-span-2 space-y-8">
          {/* 4. CHAPTER REVISION SHEET */}
          {(categoryTab === 'all' || categoryTab === 'concepts') && (
            <div className="mt-card p-6 space-y-5 border border-mt-gold/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-mt-border pb-4">
                <div>
                  <span className="text-[10px] font-bold text-mt-gold uppercase tracking-widest block">Chapter Overview</span>
                  <h2 className="text-xl font-bold text-mt-text">CHAPTER 1: ELECTRIC CHARGES & FIELDS</h2>
                </div>

                <div className="flex items-center gap-3 bg-mt-elevated px-4 py-2 rounded-xl border border-mt-border shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-mt-muted block font-medium">Chapter Mastery</span>
                    <span className="text-sm font-bold text-mt-gold-bright">78%</span>
                  </div>
                  <div className="w-10 h-1.5 bg-mt-card rounded-full overflow-hidden w-16">
                    <div className="h-full bg-mt-gold-bright rounded-full w-[78%]" />
                  </div>
                </div>
              </div>

              {/* Grid breakdown inside Chapter Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Key Laws */}
                <div className="p-4 bg-mt-elevated rounded-xl border border-mt-border space-y-2">
                  <span className="font-bold text-mt-gold uppercase tracking-wider block flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Key Laws
                  </span>
                  <ul className="space-y-1 text-mt-text-secondary font-medium list-disc list-inside">
                    <li>Coulomb's Force Law</li>
                    <li>Superposition Principle</li>
                    <li>Gauss's Law of Electrostatics</li>
                  </ul>
                </div>

                {/* Core Formulas Preview */}
                <div className="p-4 bg-mt-elevated rounded-xl border border-mt-border space-y-2">
                  <span className="font-bold text-mt-gold uppercase tracking-wider block flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Core Formulas
                  </span>
                  <div className="space-y-1">
                    <div className="text-mt-text font-mono"><MarkdownMathRenderer content="$E = \frac{1}{4\pi\varepsilon_0}\frac{Q}{r^2}$" /></div>
                    <div className="text-mt-text font-mono"><MarkdownMathRenderer content="$F = q \cdot E$" /></div>
                    <div className="text-mt-text font-mono"><MarkdownMathRenderer content="$\Phi = \oint \vec{E}\cdot d\vec{A} = \frac{q_{\text{encl}}}{\varepsilon_0}$" /></div>
                  </div>
                </div>

                {/* Important Concepts */}
                <div className="p-4 bg-mt-elevated rounded-xl border border-mt-border space-y-2">
                  <span className="font-bold text-mt-gold uppercase tracking-wider block flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-mt-gold" /> Important Concepts
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Electric Field', 'Electric Flux', 'Electric Dipole', 'Gaussian Surface'].map((c) => (
                      <span key={c} className="px-2 py-1 bg-mt-card text-mt-text-secondary rounded-lg border border-mt-border text-[11px] font-medium">
                        ✓ {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Common Exam Traps */}
                <div className="p-4 bg-mt-elevated rounded-xl border border-mt-border space-y-2">
                  <span className="font-bold text-rose-400 uppercase tracking-wider block flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Common Exam Traps
                  </span>
                  <ul className="space-y-1 text-mt-text-secondary text-[11px] list-disc list-inside">
                    <li>Sign convention in vector electrostatic force</li>
                    <li>Direction of electric field around negative charges</li>
                    <li>Correct choice of closed Gaussian surface</li>
                  </ul>
                </div>
              </div>

              {/* Derivations Summary */}
              <div className="p-4 bg-mt-elevated rounded-xl border border-mt-border space-y-2 text-xs">
                <span className="font-bold text-mt-gold-bright uppercase tracking-wider block">Important Board Derivations</span>
                <ol className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-mt-text-secondary font-medium">
                  <li className="p-2.5 bg-mt-card rounded-lg border border-mt-border">1. Field due to point charge</li>
                  <li className="p-2.5 bg-mt-card rounded-lg border border-mt-border">2. Axial field of electric dipole</li>
                  <li className="p-2.5 bg-mt-card rounded-lg border border-mt-border">3. Field due to infinite plane sheet</li>
                </ol>
              </div>

              <div className="pt-2 flex justify-end">
                <Link href="/learn" className="mt-btn-secondary text-xs px-4 py-2">
                  Open Full Curriculum Learn Page <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* 12. FILTERS CONTROL BAR */}
          {(categoryTab === 'all' || categoryTab === 'questions' || categoryTab === 'derivations' || categoryTab === 'pyqs') && (
            <div className="p-4 bg-mt-card rounded-card border border-mt-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-mt-text flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-mt-gold" /> Filter Revision Question Bank
                </span>
                <span className="text-[11px] text-mt-muted font-medium">Showing {filteredQuestions.length} Questions</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {/* Subject Switcher */}
                <select
                  value={activeSubject}
                  onChange={(e) => setActiveSubject(e.target.value)}
                  className="mt-input text-xs py-2"
                >
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="biology">Biology</option>
                </select>

                {/* Question Type Filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="mt-input text-xs py-2"
                >
                  <option value="all">All Question Types</option>
                  <option value="mcq">MCQ Questions</option>
                  <option value="derivation">Step Derivations</option>
                  <option value="numerical">Numerical Solves</option>
                  <option value="assertion_reason">Assertion & Reason</option>
                </select>

                {/* Priority Filter */}
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="mt-input text-xs py-2"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">🔥 High Priority</option>
                  <option value="medium">◆ Medium Priority</option>
                </select>

                {/* Status Filter */}
                <select className="mt-input text-xs py-2">
                  <option value="all">All Revision Status</option>
                  <option value="due">🟡 Due for Revision</option>
                  <option value="revised">🟢 Revised</option>
                  <option value="mastered">🔥 Mastered</option>
                </select>
              </div>
            </div>
          )}

          {/* 5. IMPORTANT QUESTIONS & RECALL CARDS */}
          {(categoryTab === 'all' || categoryTab === 'questions' || categoryTab === 'derivations' || categoryTab === 'pyqs') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-mt-border pb-2">
                <h3 className="text-base font-bold text-mt-text flex items-center gap-2">
                  <Flame className="w-4 h-4 text-mt-gold-bright fill-mt-gold-bright" /> Important Revision Questions
                </h3>
                <span className="text-xs text-mt-gold font-medium">Ranked by Blueprint Priority</span>
              </div>

              {filteredQuestions.map((q, idx) => {
                const isRevealed = !!revealedAnswers[q.id];
                const isMarkedRevised = !!revisedItems[q.id];
                const currentStep = activeDerivationStep[q.id] || 1;
                const isHighPriority = q.marks >= 3 || q.isPYQ;

                return (
                  <div
                    key={q.id}
                    className={`p-6 bg-mt-card rounded-card border transition-all duration-premium space-y-4 ${
                      isHighPriority ? 'border-mt-gold/40 shadow-card' : 'border-mt-border'
                    }`}
                  >
                    {/* Card Header & Priority Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-mt-border pb-3">
                      <div className="flex items-center gap-2">
                        {isHighPriority ? (
                          <span className="px-2.5 py-0.5 bg-mt-gold/10 text-mt-gold-bright border border-mt-gold/30 rounded-full text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1">
                            <Flame className="w-3 h-3 text-mt-gold-bright" /> HIGH PRIORITY
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 bg-mt-elevated text-mt-text-secondary border border-mt-border rounded-full text-[10px] font-semibold tracking-wider uppercase">
                            ◆ MEDIUM PRIORITY
                          </span>
                        )}
                        <span className="text-xs font-mono font-bold text-mt-muted">Q0{idx + 1}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2.5 py-1 bg-mt-elevated text-mt-gold-bright border border-mt-gold/20 rounded-full font-semibold uppercase text-[10px]">
                          {q.type} • {q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}
                        </span>
                        {q.isPYQ && (
                          <span className="px-2 py-0.5 bg-mt-elevated text-mt-gold border border-mt-gold/20 rounded-full text-[10px] font-medium">
                            PYQ {q.pyqYear}
                          </span>
                        )}
                        <button
                          onClick={() => toggleItemRevised(q.id)}
                          className={`p-1.5 rounded-lg border text-xs transition-colors ${
                            isMarkedRevised
                              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
                              : 'bg-mt-elevated text-mt-muted border-mt-border hover:text-mt-text'
                          }`}
                          title="Mark Revised"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Question Prompt */}
                    <div className="space-y-2">
                      <h4 className="text-base font-semibold text-mt-text leading-relaxed">
                        <MarkdownMathRenderer content={q.question} />
                      </h4>
                      {q.conceptId && (
                        <span className="inline-block text-[10px] font-semibold text-mt-gold bg-mt-gold/10 px-2.5 py-0.5 rounded-md border border-mt-gold/20">
                          Concept: {q.conceptId.replace(/-/g, ' ')}
                        </span>
                      )}
                    </div>

                    {/* MCQ Options rendering */}
                    {q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                        {q.options.map((opt: any) => (
                          <div
                            key={opt.id}
                            className="p-3 bg-mt-elevated rounded-xl border border-mt-border text-mt-text-secondary font-medium"
                          >
                            <strong className="text-mt-gold-bright mr-1.5">{opt.id}.</strong>
                            <MarkdownMathRenderer content={opt.text} />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 10. NUMERICAL MODE STRUCTURAL BREAKDOWN */}
                    {q.type === 'numerical' && q.givenData && (
                      <div className="p-4 bg-mt-elevated rounded-xl border border-mt-border space-y-2 text-xs">
                        <span className="font-bold text-mt-gold uppercase tracking-wider block">GIVEN PARAMETERS</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {q.givenData.map((g: any, gIdx: number) => (
                            <div key={gIdx} className="p-2 bg-mt-card rounded-lg border border-mt-border text-mt-text-secondary">
                              <span className="text-mt-text font-semibold"><MarkdownMathRenderer content={g.label} />:</span> <MarkdownMathRenderer content={g.value} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 9. DERIVATION MODE STEP-BY-STEP PROOF */}
                    {q.type === 'derivation' && q.derivationSteps && (
                      <div className="p-4 bg-mt-elevated rounded-xl border border-mt-border space-y-3 text-xs">
                        <div className="flex items-center justify-between border-b border-mt-border pb-2">
                          <span className="font-bold text-mt-gold uppercase tracking-wider">Step-by-Step Derivation Proof</span>
                          <span className="text-mt-gold-bright font-semibold">Step {currentStep} of {q.derivationSteps.length}</span>
                        </div>

                        {q.derivationSteps.slice(0, currentStep).map((step: any) => (
                          <div key={step.stepNumber} className="p-3 bg-mt-card rounded-lg border border-mt-border space-y-1">
                            <span className="font-bold text-mt-gold-bright">Step {step.stepNumber}: {step.title}</span>
                            <LaTeXRenderer content={step.latex} block />
                            <p className="text-[11px] text-mt-text-secondary">{step.explanation}</p>
                          </div>
                        ))}

                        {currentStep < q.derivationSteps.length && (
                          <button
                            onClick={() => nextDerivationStep(q.id, q.derivationSteps!.length)}
                            className="mt-btn-secondary text-xs px-4 py-2 w-full justify-center mt-2"
                          >
                            Show Next Step ({currentStep + 1} / {q.derivationSteps.length})
                          </button>
                        )}
                      </div>
                    )}

                    {/* REVEALED ANSWER & EXPLANATION PANEL */}
                    {isRevealed && (
                      <div className="p-4 bg-mt-elevated rounded-card border border-mt-gold/30 space-y-2 text-xs animate-fadeIn">
                        <span className="font-bold text-mt-gold uppercase tracking-wider block">Solution & Key Takeaway</span>
                        <div className="text-mt-text font-medium leading-relaxed">
                          <MarkdownMathRenderer content={Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : String(q.correctAnswer)} />
                        </div>
                        <div className="text-mt-text-secondary leading-relaxed pt-1 border-t border-mt-border">
                          <MarkdownMathRenderer content={q.explanation} />
                        </div>
                      </div>
                    )}

                    {/* CARD FOOTER ACTIONS */}
                    <div className="flex items-center justify-between pt-2 border-t border-mt-border text-xs">
                      <button
                        onClick={() => toggleAnswerReveal(q.id)}
                        className="mt-btn-secondary text-xs px-4 py-2 flex items-center gap-1.5"
                      >
                        {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-mt-gold" />}
                        <span>{isRevealed ? 'Hide Answer' : 'Reveal Answer'}</span>
                      </button>

                      {/* Action buttons mapped to question type */}
                      {q.type === 'mcq' && (
                        <Link href="/practice" className="mt-btn-primary text-xs px-4 py-2">
                          Quick Test <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                      {q.type === 'derivation' && (
                        <button
                          onClick={() => nextDerivationStep(q.id, q.derivationSteps?.length || 5)}
                          className="mt-btn-primary text-xs px-4 py-2"
                        >
                          Step-by-Step Revision
                        </button>
                      )}
                      {q.type === 'numerical' && (
                        <Link href="/practice" className="mt-btn-primary text-xs px-4 py-2">
                          Solve Exercise
                        </Link>
                      )}
                      {q.type !== 'mcq' && q.type !== 'derivation' && q.type !== 'numerical' && (
                        <button onClick={() => toggleAnswerReveal(q.id)} className="mt-btn-primary text-xs px-4 py-2">
                          Quick Recall
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 14. FORMULA VAULT */}
          {(categoryTab === 'all' || categoryTab === 'formulas') && (
            <div className="mt-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-mt-border pb-3">
                <h3 className="text-base font-bold text-mt-text flex items-center gap-2">
                  <FileText className="w-4 h-4 text-mt-gold" /> High-Yield Formula Vault
                </h3>
                <span className="text-xs text-mt-gold-bright font-semibold">Chapter 1 Electrostatics</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DEMO_CONCEPT.formulas.map((f, i) => (
                  <div key={i} className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-mt-gold-bright">{f.label}</span>
                      <span className="text-[10px] text-mt-muted bg-mt-card px-2 py-0.5 rounded border border-mt-border">Formula</span>
                    </div>

                    <div className="p-3 bg-mt-card rounded-xl border border-mt-border">
                      <LaTeXRenderer content={f.latex} block />
                    </div>

                    <div className="text-[11px] text-mt-text-secondary space-y-1">
                      <span className="text-mt-muted block text-[10px] uppercase font-semibold">Notes & Context</span>
                      <MarkdownMathRenderer content={f.notes} />
                    </div>

                    <div className="pt-2 border-t border-mt-border flex justify-end">
                      <Link href="/practice" className="mt-btn-secondary text-[11px] px-3 py-1.5">
                        Practice Formula
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 15. FLASHCARDS DECK INTEGRATION */}
          {(categoryTab === 'all' || categoryTab === 'concepts') && (
            <div className="mt-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-mt-border pb-3">
                <h3 className="text-base font-bold text-mt-text flex items-center gap-2">
                  <Zap className="w-4 h-4 text-mt-gold-bright fill-mt-gold-bright" /> Spaced Repetition Flashcards
                </h3>
                <span className="text-xs text-mt-gold-bright font-bold bg-mt-elevated px-3 py-1 rounded-xl border border-mt-gold/20">
                  {DEMO_CONCEPT.flashcards.length} Cards Remaining
                </span>
              </div>
              <FlashcardEngine cards={DEMO_CONCEPT.flashcards} />
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (1 Col): OVERVIEW DASHBOARD, REVISE NOW, RECALL & MISTAKES */}
        <div className="space-y-6">
          {/* 2. REVISION OVERVIEW COMPACT DASHBOARD */}
          <div className="mt-card p-6 space-y-4 border border-mt-gold/30">
            <div className="flex items-center justify-between border-b border-mt-border pb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-mt-gold flex items-center gap-2">
                <Award className="w-4 h-4 text-mt-gold" /> Revision Command Status
              </h3>
              <span className="text-xs font-semibold text-mt-gold-bright flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-mt-gold-bright" /> 7 Day Streak
              </span>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-mt-elevated rounded-xl border border-mt-border">
                <span className="text-[10px] text-mt-muted uppercase block font-semibold">Concepts</span>
                <span className="text-lg font-bold text-mt-text">82%</span>
              </div>
              <div className="p-3 bg-mt-elevated rounded-xl border border-mt-border">
                <span className="text-[10px] text-mt-muted uppercase block font-semibold">Formulas</span>
                <span className="text-lg font-bold text-mt-gold-bright">74%</span>
              </div>
              <div className="p-3 bg-mt-elevated rounded-xl border border-mt-border">
                <span className="text-[10px] text-mt-muted uppercase block font-semibold">Questions</span>
                <span className="text-lg font-bold text-mt-text">68%</span>
              </div>
            </div>

            <div className="p-3.5 bg-mt-elevated rounded-xl border border-mt-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-mt-gold" />
                <span className="text-mt-text-secondary font-medium">Due for Revision Today</span>
              </div>
              <span className="font-bold text-mt-gold-bright">12 Items</span>
            </div>

            <button
              onClick={() => setCategoryTab('all')}
              className="mt-btn-primary w-full text-xs py-3 justify-center shadow-gold font-bold"
            >
              ⚡ START SMART REVISION
            </button>
          </div>

          {/* 3. "REVISE NOW" HIGH-PRIORITY MODULE */}
          <div className="mt-card p-6 space-y-4 border border-mt-border">
            <div className="flex items-center justify-between border-b border-mt-border pb-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-mt-text flex items-center gap-2">
                <Target className="w-4 h-4 text-rose-400" /> REVISE NOW (Priority)
              </h3>
              <span className="text-[10px] text-mt-muted">Top Weak Areas</span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Item 1 */}
              <div className="p-3.5 bg-mt-elevated rounded-xl border border-rose-500/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-mt-text">
                    <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                    Gauss's Law Applications
                  </div>
                  <span className="text-[10px] text-rose-400 font-medium block mt-0.5">Weak Concept • 3 Mistakes</span>
                </div>
                <button onClick={() => setCategoryTab('concepts')} className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/40 rounded-lg text-[11px] font-semibold transition-colors">
                  Revise
                </button>
              </div>

              {/* Item 2 */}
              <div className="p-3.5 bg-mt-elevated rounded-xl border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-mt-text">
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                    Electric Flux & Surface Integral
                  </div>
                  <span className="text-[10px] text-amber-400 font-medium block mt-0.5">Due for Revision</span>
                </div>
                <button onClick={() => setCategoryTab('formulas')} className="px-3 py-1.5 bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-800/40 rounded-lg text-[11px] font-semibold transition-colors">
                  Review
                </button>
              </div>

              {/* Item 3 */}
              <div className="p-3.5 bg-mt-elevated rounded-xl border border-mt-gold/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-mt-text">
                    <span className="w-2 h-2 rounded-full bg-mt-gold inline-block"></span>
                    Electric Dipole Axial Field
                  </div>
                  <span className="text-[10px] text-mt-gold-bright font-medium block mt-0.5">Needs Reinforcement</span>
                </div>
                <button onClick={() => setCategoryTab('derivations')} className="px-3 py-1.5 bg-mt-gold/10 hover:bg-mt-gold/20 text-mt-gold-bright border border-mt-gold/30 rounded-lg text-[11px] font-semibold transition-colors">
                  Practice
                </button>
              </div>
            </div>
          </div>

          {/* 17. 60-SECOND RECALL PROMPTS */}
          <div className="mt-card p-6 space-y-4 border border-mt-border">
            <div className="flex items-center justify-between border-b border-mt-border pb-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-mt-gold-bright flex items-center gap-2">
                <Zap className="w-4 h-4 text-mt-gold-bright fill-mt-gold-bright" /> 60-SECOND RECALL
              </h3>
              <span className="text-[10px] text-mt-muted">Rapid Fire Prompts</span>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { id: 'rec-1', prompt: "State Coulomb's Law in vector form.", answer: "$F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q_1 q_2|}{r^2} \\hat{r}$" },
                { id: 'rec-2', prompt: "Define Electric Flux and state its SI Unit.", answer: "$\Phi = \\oint \\vec{E} \\cdot d\\vec{A}$. SI Unit: $\\text{N}\\cdot\\text{m}^2/\\text{C}$ or $\\text{V}\\cdot\\text{m}$." },
                { id: 'rec-3', prompt: "What is the dipole moment direction?", answer: "Directed from $-q$ to $+q$ along the dipole axis." },
              ].map((r) => {
                const isRevealed = !!revealedRecallPrompts[r.id];
                return (
                  <div key={r.id} className="p-3.5 bg-mt-elevated rounded-xl border border-mt-border space-y-2">
                    <p className="font-medium text-mt-text">{r.prompt}</p>

                    {isRevealed && (
                      <div className="p-2.5 bg-mt-card rounded-lg border border-mt-gold/20 text-mt-gold-bright pt-2 border-t border-mt-border animate-fadeIn">
                        <MarkdownMathRenderer content={r.answer} />
                      </div>
                    )}

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => toggleRecallPrompt(r.id)}
                        className="px-3 py-1 bg-mt-card hover:bg-mt-elevated text-mt-gold-bright border border-mt-border rounded text-[10px] font-semibold transition-colors"
                      >
                        {isRevealed ? 'Hide Answer' : 'Reveal Answer'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 16. COMMON EXAM MISTAKES WARNING BOX */}
          <div className="mt-card p-6 space-y-3 border border-rose-500/30">
            <div className="flex items-center justify-between border-b border-mt-border pb-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-rose-400 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" /> COMMON EXAM MISTAKES
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-mt-elevated rounded-xl border border-mt-border space-y-1">
                <span className="font-semibold text-mt-text block">⚠️ Sign Convention in Vector Force</span>
                <p className="text-[11px] text-mt-muted">Don't insert negative sign of charge directly into force magnitude formula; use absolute values and apply vector direction.</p>
              </div>

              <div className="p-3 bg-mt-elevated rounded-xl border border-mt-border space-y-1">
                <span className="font-semibold text-mt-text block">⚠️ Inverse Square vs Distance Potential</span>
                <p className="text-[11px] text-mt-muted">Electric Field varies as $E \propto 1/r^2$, whereas Potential varies as $V \propto 1/r$.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

