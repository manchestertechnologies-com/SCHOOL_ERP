'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCurriculum } from '@/lib/curriculumContext';
import { PYQ_PAPERS_BANK, PYQPaper } from '@/lib/curriculum';
import { FileText, Download, Play, AlertTriangle, CheckCircle2, Clock, Award, Filter, Sparkles, Eye, X, Printer } from 'lucide-react';
import { MarkdownMathRenderer, LaTeXRenderer } from '@/components/math/LaTeXRenderer';

export default function PapersPage() {
  const { activeBoard, activeClass, activeSubject } = useCurriculum();
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('all');
  const [activePaperModal, setActivePaperModal] = useState<PYQPaper | null>(null);
  const [showSolutions, setShowSolutions] = useState<boolean>(false);

  const filteredPapers = PYQ_PAPERS_BANK.filter((p) => {
    if (selectedYearFilter !== 'all' && String(p.year) !== selectedYearFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="mt-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-mt-border pb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-mt-gold-bright">{activeBoard.shortCode} • Class {activeClass}</span>
            <h1 className="text-2xl font-bold text-mt-text">Previous Year Question Papers (PYQs)</h1>
            <p className="text-xs text-mt-muted mt-0.5">Filter, view, download PDFs, or convert papers into timed Mock Tests.</p>
          </div>

          <div className="flex items-center gap-2 bg-mt-elevated p-2 rounded-xl border border-mt-border text-xs font-medium">
            <Filter className="w-4 h-4 text-mt-gold" />
            <select
              value={selectedYearFilter}
              onChange={(e) => setSelectedYearFilter(e.target.value)}
              className="bg-transparent text-mt-text focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-mt-card text-mt-text">All Years (2022-2025)</option>
              <option value="2025" className="bg-mt-card text-mt-text">2025 Board Exam</option>
              <option value="2024" className="bg-mt-card text-mt-text">2024 Board Exam</option>
              <option value="2022" className="bg-mt-card text-mt-text">2022 Board Exam</option>
            </select>
          </div>
        </div>

        {/* Analytics Snapshot */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 bg-mt-elevated rounded-xl border border-mt-border space-y-1">
            <span className="text-[10px] font-semibold text-mt-muted uppercase tracking-wider">Available Papers</span>
            <p className="text-lg font-bold text-mt-text">{filteredPapers.length} Official Papers</p>
          </div>

          <div className="p-3.5 bg-mt-elevated rounded-xl border border-mt-border space-y-1">
            <span className="text-[10px] font-semibold text-mt-muted uppercase tracking-wider">Current Syllabus Papers</span>
            <p className="text-lg font-bold text-mt-gold-bright">
              {filteredPapers.filter((p) => p.isCurrentSyllabus).length} Papers (2024-2025)
            </p>
          </div>

          <div className="p-3.5 bg-mt-elevated rounded-xl border border-mt-border space-y-1">
            <span className="text-[10px] font-semibold text-mt-muted uppercase tracking-wider">Mock Exam Mode</span>
            <p className="text-lg font-bold text-mt-gold">Instant Interactive Test</p>
          </div>
        </div>
      </div>

      {/* PAPER CARDS GRID */}
      <div className="space-y-4">
        {filteredPapers.map((paper) => (
          <div
            key={paper.id}
            className="mt-card p-6 space-y-4 hover:border-mt-gold/40 transition-all duration-premium"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-mt-border pb-3">
              <div className="flex items-center gap-2">
                {paper.isCurrentSyllabus ? (
                  <span className="px-3 py-1 bg-mt-gold/10 text-mt-gold-bright rounded-full font-semibold text-xs border border-mt-gold/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-mt-gold-bright" /> CURRENT SYLLABUS ({paper.year})
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-mt-elevated text-mt-muted rounded-full font-medium text-xs border border-mt-border flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-mt-gold" /> OLD SYLLABUS ({paper.year})
                  </span>
                )}
                <span className="text-xs text-mt-muted font-medium">{paper.setNumber}</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-mt-text-secondary">
                <span>Total Marks: <strong className="text-mt-gold-bright">{paper.totalMarks}</strong></span>
                <span>Duration: <strong className="text-mt-gold-bright">{paper.durationMinutes} mins</strong></span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-mt-text">{paper.paperTitle}</h3>
              {paper.warningNotice && (
                <div className="mt-2 p-3 bg-mt-elevated border border-mt-gold/20 rounded-xl flex items-start gap-2 text-xs text-mt-gold-bright">
                  <AlertTriangle className="w-4 h-4 text-mt-gold shrink-0 mt-0.5" />
                  <span>{paper.warningNotice}</span>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActivePaperModal(paper)}
                className="mt-btn-secondary text-xs px-4 py-2.5"
              >
                <Eye className="w-4 h-4 text-mt-gold" /> View Paper
              </button>

              {paper.pdfUrl && (
                <a
                  href={paper.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-btn-secondary text-xs px-4 py-2.5"
                >
                  <Download className="w-4 h-4 text-mt-gold" /> Download PDF
                </a>
              )}

              <Link
                href={`/tests?mode=mock&paperId=${paper.id}`}
                className="mt-btn-primary text-xs px-5 py-2.5"
              >
                <Play className="w-3.5 h-3.5 fill-mt-bg text-mt-bg" /> START AS MOCK TEST
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* PAPER PREVIEW MODAL (TYPESET QUESTION PAPER VIEWER) */}
      {activePaperModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto no-print">
          <div className="bg-slate-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 w-full max-w-4xl rounded-2xl p-4 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto print-paper">
            {/* PAPER ACTION HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4 no-print">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full font-bold text-xs border border-amber-500/30 uppercase">
                  {activePaperModal.boardId} • {activePaperModal.year}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Official Exam Paper</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSolutions(!showSolutions)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                    showSolutions
                      ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-sm'
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-300'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showSolutions ? 'Hide Answer Key' : 'Show Answer Key'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Paper</span>
                </button>

                <button
                  onClick={() => setActivePaperModal(null)}
                  className="p-1.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* FORMAL EXAMINATION PAPER CONTAINER */}
            <div className="space-y-6 bg-white dark:bg-zinc-950 p-6 sm:p-10 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              {/* BOARD & EXAMINATION HEADING */}
              <div className="text-center border-b-2 border-zinc-900 dark:border-zinc-100 pb-4 space-y-1">
                <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 block">
                  DEPARTMENT OF PRE-UNIVERSITY EDUCATION
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 uppercase">
                  {activePaperModal.paperTitle}
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-zinc-700 dark:text-zinc-300 pt-2 uppercase">
                  <span>Subject: Physics (Code: 33)</span>
                  <span>•</span>
                  <span>Time Allowed: {activePaperModal.durationMinutes} Minutes</span>
                  <span>•</span>
                  <span>Max. Marks: {activePaperModal.totalMarks}</span>
                </div>
              </div>

              {/* GENERAL INSTRUCTIONS */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                <span className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider block">General Instructions:</span>
                <ol className="list-decimal list-inside space-y-1 leading-relaxed">
                  <li>All parts are compulsory. Read questions carefully before writing answers.</li>
                  <li>Part-A contains Multiple Choice Questions (1 mark each). Part-B contains 2-Mark questions.</li>
                  <li>Part-C contains 3-Mark Numericals and Derivations. Part-D contains 5-Mark Long Answer proofs.</li>
                  <li>Use of log tables and physical constant values is permitted where necessary.</li>
                </ol>
              </div>

              {/* QUESTIONS LIST WITH TYPESET LATEX RENDERING */}
              <div className="space-y-8 pt-2">
                {activePaperModal.questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800 last:border-0 last:pb-0"
                  >
                    {/* Question Meta Bar */}
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-900 dark:text-zinc-100 font-mono text-sm">Q{idx + 1}.</span>
                        <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded border border-zinc-300 dark:border-zinc-700 text-[10px] uppercase font-semibold">
                          {q.type.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <span className="font-semibold text-amber-600 dark:text-amber-400 font-mono">
                        [{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}]
                      </span>
                    </div>

                    {/* Question Body (Markdown + LaTeX Rendered) */}
                    <div className="text-sm font-medium leading-relaxed text-zinc-900 dark:text-zinc-100 pl-6">
                      <MarkdownMathRenderer content={q.question} />
                    </div>

                    {/* MCQ Options Grid */}
                    {q.options && q.options.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 pl-6">
                        {q.options.map((opt: any) => (
                          <div
                            key={opt.id}
                            className="p-2.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-start gap-2 text-zinc-800 dark:text-zinc-200"
                          >
                            <span className="font-bold text-amber-600 dark:text-amber-400 min-w-[20px]">
                              ({opt.id.toUpperCase()})
                            </span>
                            <div className="leading-snug">
                              <MarkdownMathRenderer content={opt.text} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Numerical Given Parameters */}
                    {q.type === 'numerical' && q.givenData && (
                      <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs space-y-1.5 ml-6">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider block text-[10px]">
                          Given Data & Parameters:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {q.givenData.map((g: any, gIdx: number) => (
                            <div key={gIdx} className="p-2 bg-white dark:bg-zinc-950 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200">
                              <span className="font-semibold text-zinc-900 dark:text-zinc-100"><MarkdownMathRenderer content={g.label} />: </span>
                              <MarkdownMathRenderer content={g.value} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Derivation Steps Breakdown */}
                    {q.type === 'derivation' && q.derivationSteps && (
                      <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs space-y-2 ml-6">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider block text-[10px]">
                          Derivation Proof Steps:
                        </span>
                        {q.derivationSteps.map((step: any) => (
                          <div key={step.stepNumber} className="p-2.5 bg-white dark:bg-zinc-950 rounded border border-zinc-200 dark:border-zinc-800 space-y-1">
                            <span className="font-bold text-amber-600 dark:text-amber-400">Step {step.stepNumber}: {step.title}</span>
                            <LaTeXRenderer content={step.latex} block />
                            <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">{step.explanation}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Answer Key & Explanation (Toggleable) */}
                    {showSolutions && (
                      <div className="p-3.5 bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-1.5 text-xs ml-6 animate-fadeIn">
                        <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block text-[10px]">
                          Official Answer & Marking Explanation:
                        </span>
                        <div className="text-zinc-900 dark:text-zinc-100 font-semibold leading-relaxed">
                          <MarkdownMathRenderer content={Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : String(q.correctAnswer)} />
                        </div>
                        {q.explanation && (
                          <div className="text-zinc-700 dark:text-zinc-300 text-[11px] pt-1 border-t border-amber-500/20 leading-relaxed">
                            <MarkdownMathRenderer content={q.explanation} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* PAPER FOOTER */}
              <div className="text-center pt-6 border-t-2 border-zinc-900 dark:border-zinc-100 text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                *** END OF QUESTION PAPER ***
              </div>
            </div>

            {/* MODAL FOOTER ACTIONS */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 no-print">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Showing {activePaperModal.questions.length} questions
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href={`/tests?mode=mock&paperId=${activePaperModal.id}`}
                  className="mt-btn-primary text-xs px-5 py-2.5 shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-mt-bg text-mt-bg" /> Start Timed Mock Exam Mode
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
