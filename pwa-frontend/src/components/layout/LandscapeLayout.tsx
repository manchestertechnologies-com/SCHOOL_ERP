'use client';

import React, { useState } from 'react';
import { BookOpen, Award, Sparkles, ChevronRight, FileText, Bookmark, CheckCircle2 } from 'lucide-react';
import { AITutorPanel } from '@/components/ai/AITutorPanel';
import { LaTeXRenderer } from '@/components/math/LaTeXRenderer';

interface LandscapeLayoutProps {
  children: React.ReactNode;
  activeConceptTitle?: string;
  masteryScore?: number;
}

export const LandscapeLayout: React.FC<LandscapeLayoutProps> = ({
  children,
  activeConceptTitle = 'Electric Field Due to Point Charge',
  masteryScore = 78,
}) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'notes' | 'formulas'>('ai');
  const [noteText, setNoteText] = useState('');

  const chapters = [
    { title: '1. Electric Charges & Fields', active: true },
    { title: '2. Electrostatic Potential', active: false },
    { title: '3. Current Electricity', active: false },
    { title: '4. Moving Charges & Magnetism', active: false },
  ];

  const concepts = [
    { id: 'c1', title: 'Electric Charge & Conservation', score: 95 },
    { id: 'c2', title: "Coulomb's Law in Vector Form", score: 88 },
    { id: 'c3', title: 'Electric Field Due to Point Charge', score: 78, active: true },
    { id: 'c4', title: 'Electric Dipole & Axial Field', score: 62 },
    { id: 'c5', title: "Gauss's Law Applications", score: 40 },
  ];

  return (
    <div className="hidden tb-land:flex w-full h-[calc(100vh-68px)] overflow-hidden bg-slate-950 text-slate-100">
      {/* LEFT PANE: Curriculum Navigation */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <BookOpen className="w-4 h-4" /> CBSE Class 12 Physics
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">Chapters</h4>
              <div className="space-y-1">
                {chapters.map((ch, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                      ch.active
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="truncate">{ch.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">Concepts</h4>
              <div className="space-y-1">
                {concepts.map((c) => (
                  <div
                    key={c.id}
                    className={`p-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                      c.active
                        ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{c.title}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        c.score >= 80 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {c.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 mt-4 text-xs">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Chapter Mastery</span>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full w-[72%]"></div>
          </div>
          <span className="text-right block text-[10px] text-indigo-300 font-bold mt-1">72% Mastered</span>
        </div>
      </aside>

      {/* CENTER PANE: Learning Canvas */}
      <main className="flex-1 overflow-y-auto p-6 bg-slate-950">{children}</main>

      {/* RIGHT PANE: Mastery Stats, Formula & AI Tutor */}
      <aside className="w-80 border-l border-slate-800 bg-slate-900/80 flex flex-col">
        {/* Right Header Navigation */}
        <div className="p-3 border-b border-slate-800 bg-slate-950 flex items-center justify-around">
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 min-h-touch ${
              activeTab === 'ai'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Tutor
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 min-h-touch ${
              activeTab === 'formulas'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Formulas
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 min-h-touch ${
              activeTab === 'notes'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" /> Notes
          </button>
        </div>

        {/* Concept Mastery Badge */}
        <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-indigo-950/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Mastery</span>
            <span className="text-xl font-black text-white">{masteryScore}%</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500 flex items-center justify-center font-bold text-xs text-indigo-300">
            {masteryScore}%
          </div>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'ai' && <AITutorPanel conceptTitle={activeConceptTitle} />}

          {activeTab === 'formulas' && (
            <div className="p-4 space-y-3 text-xs">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px] mb-2">Key Formulas</h4>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-400 block">Electric Field Intensity:</span>
                <LaTeXRenderer content="$E = \frac{1}{4\pi\varepsilon_0}\frac{Q}{r^2}$" block />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-400 block">Electrostatic Force:</span>
                <LaTeXRenderer content="$F = q E$" block />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-400 block">Field in Medium:</span>
                <LaTeXRenderer content="$E_{\text{medium}} = \frac{E_{\text{vacuum}}}{K}$" block />
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="p-4 flex flex-col h-full text-xs">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px] mb-2">Personal Concept Notes</h4>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write your quick revision notes here..."
                className="flex-1 min-h-[220px] p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 outline-none focus:border-indigo-500"
              />
              <button className="mt-3 py-2 bg-indigo-600 hover:bg-indigo-500 font-bold text-white rounded-xl min-h-touch active:scale-95 transition-all">
                Save Notes
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
