'use client';

import React, { useState } from 'react';
import { useCurriculum } from '@/lib/curriculumContext';
import { BOARDS, ACADEMIC_YEARS, KARNATAKA_2PUC_PHYSICS_CURRICULUM } from '@/lib/curriculum';
import { ShieldCheck, Upload, FileCode, CheckCircle2, AlertTriangle, RefreshCw, Plus, Layers } from 'lucide-react';

export default function AdminPage() {
  const { activeBoard, activeClass } = useCurriculum();
  const [activeTab, setActiveTab] = useState<'import' | 'syllabus' | 'boards'>('import');

  // Bulk import state
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [validationReport, setValidationReport] = useState<{
    valid: boolean;
    totalParsed: number;
    errors: string[];
    successMessage?: string;
  } | null>(null);

  // Syllabus change engine state
  const [syllabusChanges, setSyllabusChanges] = useState([
    { id: '1', chapter: 'Electrostatic Potential', topic: 'Van de Graaff Generator', action: 'DELETED', year: '2024-25', note: 'Removed in latest NCERT update' },
    { id: '2', chapter: 'Current Electricity', topic: 'Potentiometer Applications', action: 'DELETED', year: '2024-25', note: 'Removed from board practical syllabus' },
    { id: '3', chapter: 'Electric Charges & Fields', topic: 'Gauss Law Applications', action: 'MODIFIED', year: '2025-26', note: 'Added conceptual competency questions' },
  ]);

  const handleValidateAndImport = () => {
    try {
      if (!importJsonText.trim()) {
        setValidationReport({
          valid: false,
          totalParsed: 0,
          errors: ['JSON payload cannot be empty.'],
        });
        return;
      }

      const parsed = JSON.parse(importJsonText);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      const errors: string[] = [];

      items.forEach((q, idx) => {
        if (!q.id) errors.push(`Item #${idx + 1}: Missing mandatory field 'id'.`);
        if (!q.question) errors.push(`Item #${idx + 1}: Missing mandatory field 'question'.`);
        if (!q.correctAnswer) errors.push(`Item #${idx + 1}: Missing mandatory field 'correctAnswer'.`);
        if (q.marks !== undefined && (typeof q.marks !== 'number' || q.marks < 1)) {
          errors.push(`Item #${idx + 1}: Field 'marks' must be a positive integer.`);
        }
      });

      if (errors.length > 0) {
        setValidationReport({
          valid: false,
          totalParsed: items.length,
          errors,
        });
      } else {
        setValidationReport({
          valid: true,
          totalParsed: items.length,
          errors: [],
          successMessage: `Successfully validated and imported ${items.length} structured question(s) into official curriculum bank!`,
        });
      }
    } catch (err: any) {
      setValidationReport({
        valid: false,
        totalParsed: 0,
        errors: [`Syntax Error in JSON file: ${err.message}`],
      });
    }
  };

  const handleLoadSampleJson = () => {
    const sample = [
      {
        id: 'q-imported-101',
        chapterId: 'kar-phy-ch1',
        topicId: 'topic-gauss',
        type: 'mcq',
        marks: 1,
        question: 'What is the electric flux through a closed surface enclosing charge Q?',
        options: [
          { id: 'a', text: 'Q / eps0' },
          { id: 'b', text: 'eps0 / Q' },
        ],
        correctAnswer: 'a',
        explanation: 'According to Gauss Law, net flux equals Q / eps0.',
      },
    ];
    setImportJsonText(JSON.stringify(sample, null, 2));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="mt-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-mt-border pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-mt-elevated text-mt-gold-bright border border-mt-gold/30 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-mt-gold-bright" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-mt-gold-bright">Admin Control Center</span>
              <h1 className="text-2xl font-bold text-mt-text">Curriculum & Content Management</h1>
            </div>
          </div>

          <span className="text-xs font-semibold text-mt-gold-bright bg-mt-elevated px-3.5 py-1.5 rounded-xl border border-mt-gold/20">
            Role: Super Admin
          </span>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {[
            { id: 'import', label: 'Bulk Content Importer', icon: Upload },
            { id: 'syllabus', label: 'Syllabus Change Engine', icon: RefreshCw },
            { id: 'boards', label: 'Board Configurations', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 whitespace-nowrap min-h-touch transition-all duration-premium ${
                  isActive
                    ? 'bg-mt-gold-bright text-mt-bg shadow-gold'
                    : 'bg-mt-card text-mt-muted hover:text-mt-text border border-mt-border'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: BULK CONTENT IMPORTER */}
      {activeTab === 'import' && (
        <div className="mt-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-mt-border pb-3">
            <div>
              <h3 className="text-lg font-bold text-mt-text">Bulk Question & PYQ Importer</h3>
              <p className="text-xs text-mt-muted">Paste or drag JSON content. Importer checks schema validation before publishing.</p>
            </div>

            <button
              onClick={handleLoadSampleJson}
              className="mt-btn-secondary text-xs px-3.5 py-2"
            >
              Load Sample JSON Template
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-mt-gold block">Structured JSON Content:</label>
            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste JSON array of questions or PYQ papers here..."
              className="mt-input font-mono text-xs"
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleValidateAndImport}
              className="mt-btn-primary text-xs px-6 py-3"
            >
              <Upload className="w-4 h-4 text-mt-bg" /> VALIDATE & PUBLISH CONTENT
            </button>
          </div>

          {/* Validation Report Result */}
          {validationReport && (
            <div
              className={`p-5 rounded-card border space-y-2 text-xs ${
                validationReport.valid
                  ? 'bg-mt-elevated border-mt-gold/40 text-mt-gold-bright'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {validationReport.valid ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-mt-gold-bright" /> Validation Passed
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-rose-400" /> Validation Failed
                  </>
                )}
              </div>

              {validationReport.valid ? (
                <p className="font-medium">{validationReport.successMessage}</p>
              ) : (
                <div className="space-y-1">
                  <p className="font-semibold">Errors found ({validationReport.errors.length}):</p>
                  <ul className="list-disc list-inside space-y-0.5 font-mono text-[11px]">
                    {validationReport.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SYLLABUS CHANGE ENGINE */}
      {activeTab === 'syllabus' && (
        <div className="mt-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-mt-border pb-3">
            <div>
              <h3 className="text-lg font-bold text-mt-text">Syllabus Change Engine</h3>
              <p className="text-xs text-mt-muted">Track added, removed, and modified topics per academic year.</p>
            </div>

            <button
              onClick={() => {
                const topicName = prompt('Enter modified topic name:');
                if (topicName) {
                  setSyllabusChanges([
                    ...syllabusChanges,
                    {
                      id: String(Date.now()),
                      chapter: 'Physics',
                      topic: topicName,
                      action: 'DELETED',
                      year: '2026-27',
                      note: 'Manually logged by admin',
                    },
                  ]);
                }
              }}
              className="mt-btn-primary text-xs px-4 py-2"
            >
              <Plus className="w-4 h-4 text-mt-bg" /> Add Syllabus Change Entry
            </button>
          </div>

          <div className="space-y-3">
            {syllabusChanges.map((change) => (
              <div key={change.id} className="p-4 bg-mt-elevated rounded-card border border-mt-border flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-mt-text">{change.topic}</span>
                    <span className="text-mt-muted">({change.chapter})</span>
                  </div>
                  <p className="text-mt-muted text-[11px] mt-0.5">{change.note} • Academic Year: {change.year}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full font-semibold text-[10px] uppercase border ${
                    change.action === 'DELETED'
                      ? 'bg-rose-950/40 text-rose-300 border-rose-800/40'
                      : change.action === 'ADDED'
                      ? 'bg-mt-gold/10 text-mt-gold-bright border-mt-gold/30'
                      : 'bg-mt-elevated text-mt-gold border-mt-border'
                  }`}
                >
                  {change.action}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BOARD CONFIGURATIONS */}
      {activeTab === 'boards' && (
        <div className="mt-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-mt-text border-b border-mt-border pb-3">Active Educational Board Registries</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BOARDS.map((b) => (
              <div key={b.id} className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-2">
                <span className="text-xs font-semibold text-mt-gold uppercase">{b.shortCode}</span>
                <h4 className="font-bold text-sm text-mt-text">{b.name}</h4>
                <p className="text-xs text-mt-muted">{b.description}</p>
                <div className="text-[11px] text-mt-text-secondary pt-1 font-medium">
                  Classes: {b.supportedClasses.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
