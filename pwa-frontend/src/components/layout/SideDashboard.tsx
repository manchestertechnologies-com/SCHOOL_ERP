'use client';

import React, { useState, useEffect } from 'react';
import { useCurriculum } from '@/lib/curriculumContext';
import { AITutorPanel } from '@/components/ai/AITutorPanel';
import { LaTeXRenderer } from '@/components/math/LaTeXRenderer';
import { cn } from '@/lib/cn';
import {
  Sparkles,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Bookmark,
  X,
  Target,
  CheckCircle2,
  FileText,
  Clock,
  BarChart2,
} from 'lucide-react';

interface SideDashboardProps {
  open: boolean;
  onClose: () => void;
}

const tabs = [
  { id: 'ai' as const, icon: Sparkles, label: 'AI Tutor' },
  { id: 'timer' as const, icon: Timer, label: 'Timer' },
  { id: 'formulas' as const, icon: FileText, label: 'Formulas' },
  { id: 'notes' as const, icon: Bookmark, label: 'Notes' },
  { id: 'mastery' as const, icon: BarChart2, label: 'Mastery' },
];

export const SideDashboard: React.FC<SideDashboardProps> = ({ open, onClose }) => {
  const { activeBoard, activeSubject } = useCurriculum();
  const [activeTab, setActiveTab] = useState<'ai' | 'timer' | 'formulas' | 'notes' | 'mastery'>('ai');

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(2);

  const [notes, setNotes] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bridge_learn_notes') || '';
    }
    return '';
  });
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
      setCompletedSessions((s) => s + 1);
      setTimeLeft(25 * 60);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const handleSaveNotes = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bridge_learn_notes', notes);
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 bottom-0 right-0 z-50',
          'w-full max-w-full sm:w-96 md:w-[400px]',
          'bg-mt-bg-secondary border-l border-mt-border box-border',
          'flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-card-hover',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-label="Side dashboard"
      >
        {/* Header */}
        <div className="p-4 border-b border-mt-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-mt-gold/10 rounded-lg">
                <Sparkles className="w-4 h-4 text-mt-gold-bright" />
              </div>
              <div>
                <h3 className="font-semibold text-mt-text text-xs tracking-tight">Side Dashboard</h3>
                <span className="text-[10px] text-mt-muted font-medium">
                  {activeBoard.shortCode} • {activeSubject}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-mt-muted hover:text-mt-text rounded-lg hover:bg-mt-elevated transition-colors duration-premium"
              title="Close side dashboard"
              aria-label="Close side dashboard"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab bar */}
          <div className="grid grid-cols-5 gap-1 bg-mt-card p-1 rounded-xl border border-mt-border">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'py-2 rounded-lg flex items-center justify-center transition-all duration-premium',
                    isActive
                      ? 'bg-mt-gold-bright text-mt-bg'
                      : 'text-mt-muted hover:text-mt-text-secondary'
                  )}
                  title={tab.label}
                  aria-label={tab.label}
                  aria-pressed={isActive}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {activeTab === 'ai' && <AITutorPanel />}

          {activeTab === 'timer' && (
            <div className="space-y-4">
              <div className="p-6 bg-mt-card rounded-card border border-mt-border text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-mt-gold/10 text-mt-gold rounded-full text-[11px] font-medium border border-mt-gold/20">
                  <Clock className="w-3.5 h-3.5" /> Focus Pomodoro
                </div>

                <div className="text-5xl font-bold text-mt-text font-mono tracking-tight">
                  {formatTimer(timeLeft)}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    className={cn(
                      'px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all duration-premium',
                      timerRunning
                        ? 'bg-rose-600/90 hover:bg-rose-500 text-white'
                        : 'mt-btn-primary'
                    )}
                  >
                    {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{timerRunning ? 'Pause' : 'Start Focus'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setTimerRunning(false);
                      setTimeLeft(25 * 60);
                    }}
                    className="p-2.5 bg-mt-elevated hover:bg-mt-card text-mt-muted hover:text-mt-text rounded-xl border border-mt-border transition-colors duration-premium"
                    title="Reset timer"
                    aria-label="Reset timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-mt-card rounded-card border border-mt-border space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-mt-text-secondary">Sessions Today</span>
                  <span className="font-semibold text-mt-gold-bright">{completedSessions} / 4</span>
                </div>
                <div className="mt-progress-track">
                  <div
                    className="mt-progress-fill"
                    style={{ width: `${(completedSessions / 4) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-mt-card rounded-card border border-mt-border space-y-2 text-xs">
                <span className="mt-section-label block mb-1">Target Objectives</span>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-mt-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-mt-gold flex-shrink-0" />
                    <span>Complete 1 Physics Derivation</span>
                  </div>
                  <div className="flex items-center gap-2 text-mt-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-mt-gold flex-shrink-0" />
                    <span>Attempt 5 Previous Year MCQs</span>
                  </div>
                  <div className="flex items-center gap-2 text-mt-muted">
                    <Target className="w-4 h-4 flex-shrink-0" />
                    <span>Review Electrostatics Quick Sheet</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'formulas' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-mt-border">
                <h4 className="font-semibold text-xs text-mt-text">Physics Core Formulas</h4>
                <span className="text-[10px] font-medium text-mt-gold">Chapter 1</span>
              </div>

              {[
                { title: "Coulomb's Force Law", latex: '$F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q_1 q_2|}{r^2}$', desc: 'Vector electrostatic attraction / repulsion' },
                { title: 'Electric Field Intensity', latex: '$E = \\frac{F}{q_0} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{Q}{r^2}$', desc: 'Field due to point charge in vacuum' },
                { title: 'Vector Field Definition', latex: '$\\vec{E} = \\frac{\\vec{F}}{q}$', desc: 'Force per unit charge in vector form' },
                { title: 'Electric Dipole Moment', latex: '$p = q\\cdot(2a)$', desc: 'Direction from $-q$ to $+q$ along axis' },
                { title: 'Electrostatic Potential', latex: '$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r}$', desc: 'Work done per unit charge from infinity' },
                { title: 'Potential Difference Relation', latex: '$\\Delta V = -\\int \\vec{E}\\cdot d\\vec{l}$', desc: 'Line integral of electric field' },
              ].map((formula) => (
                <div key={formula.title} className="p-3.5 bg-mt-card rounded-card border border-mt-border space-y-1.5">
                  <span className="text-xs font-semibold text-mt-gold block">{formula.title}</span>
                  <LaTeXRenderer content={formula.latex} block />
                  <span className="text-[10px] text-mt-muted block"><LaTeXRenderer content={formula.desc} /></span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="flex flex-col h-full space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-xs text-mt-text">Quick Study Notes</h4>
                {savedStatus && (
                  <span className="text-[10px] font-medium text-mt-gold bg-mt-gold/10 px-2 py-0.5 rounded-md border border-mt-gold/20">
                    Saved
                  </span>
                )}
              </div>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Type key notes, weak concepts, or revision reminders..."
                className="flex-1 min-h-[260px] mt-input resize-none leading-relaxed"
              />

              <button onClick={handleSaveNotes} className="mt-btn-primary w-full">
                Save Notes
              </button>
            </div>
          )}

          {activeTab === 'mastery' && (
            <div className="space-y-4">
              <div className="p-4 bg-mt-card rounded-card border border-mt-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-medium text-mt-muted block">Overall Curriculum</span>
                  <span className="text-2xl font-bold text-mt-text">74%</span>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-mt-gold flex items-center justify-center font-semibold text-xs text-mt-gold-bright">
                  74%
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <span className="mt-section-label block">Unit Breakdown</span>

                {[
                  { title: 'Electrostatics', score: 88 },
                  { title: 'Current Electricity', score: 72 },
                  { title: 'Magnetic Effects', score: 65 },
                  { title: 'Electromagnetic Induction', score: 50 },
                ].map((item) => (
                  <div key={item.title} className="p-3 bg-mt-card rounded-card border border-mt-border space-y-1.5">
                    <div className="flex items-center justify-between font-medium">
                      <span className="text-mt-text-secondary">{item.title}</span>
                      <span className="text-mt-gold-bright">{item.score}%</span>
                    </div>
                    <div className="mt-progress-track">
                      <div className="mt-progress-fill" style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-mt-border text-center">
          <span className="text-[10px] text-mt-muted font-medium">
            Manchester Technologies • Side Dashboard
          </span>
        </div>
      </aside>
    </>
  );
};
