'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCurriculum } from '@/lib/curriculumContext';
import { PYQ_PAPERS_BANK, PYQPaper } from '@/lib/curriculum';
import { FileText, Download, Play, AlertTriangle, CheckCircle2, Clock, Award, Filter, Sparkles, Eye, X } from 'lucide-react';

export default function PapersPage() {
  const { activeBoard, activeClass, activeSubject } = useCurriculum();
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('all');
  const [activePaperModal, setActivePaperModal] = useState<PYQPaper | null>(null);

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

      {/* PAPER PREVIEW MODAL */}
      {activePaperModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-mt-bg-secondary border border-mt-gold/30 w-full max-w-2xl rounded-card p-6 shadow-card-hover space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-mt-border pb-3">
              <div>
                <span className="text-xs font-semibold text-mt-gold uppercase">{activePaperModal.boardId} • {activePaperModal.year}</span>
                <h3 className="text-lg font-bold text-mt-text">{activePaperModal.paperTitle}</h3>
              </div>
              <button
                onClick={() => setActivePaperModal(null)}
                className="p-1.5 rounded-xl text-mt-muted hover:text-mt-text bg-mt-elevated border border-mt-border"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-mt-gold uppercase tracking-wider">Questions Preview ({activePaperModal.questions.length})</h4>
              {activePaperModal.questions.map((q, i) => (
                <div key={q.id} className="p-4 bg-mt-card rounded-xl border border-mt-border space-y-1">
                  <div className="flex items-center justify-between text-xs text-mt-gold-bright font-semibold">
                    <span>Q{i + 1}. [{q.type.toUpperCase()}]</span>
                    <span>{q.marks} Marks</span>
                  </div>
                  <p className="text-xs text-mt-text-secondary font-medium">{q.question}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-mt-border flex justify-end gap-2">
              <Link
                href={`/tests?mode=mock&paperId=${activePaperModal.id}`}
                className="mt-btn-primary text-xs px-5 py-2.5"
              >
                Start Timed Mock Test
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
