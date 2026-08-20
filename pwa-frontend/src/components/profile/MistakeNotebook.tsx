'use client';

import React, { useState, useEffect } from 'react';
import { getMistakes, resolveMistake, MistakeRecord } from '@/lib/db';
import { LaTeXRenderer } from '@/components/math/LaTeXRenderer';
import { AlertCircle, CheckCircle2, RefreshCw, BookOpen } from 'lucide-react';

export const MistakeNotebook: React.FC = () => {
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);
  const [activeRetryId, setActiveRetryId] = useState<string | null>(null);

  useEffect(() => {
    async function loadMistakes() {
      const data = await getMistakes();
      setMistakes(data);
    }
    loadMistakes();
  }, []);

  const handleResolve = async (id: string) => {
    await resolveMistake(id);
    const data = await getMistakes();
    setMistakes(data);
    setActiveRetryId(null);
  };

  const unresolved = mistakes.filter((m) => !m.resolved);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-mt-border pb-3">
        <h3 className="text-lg font-bold text-mt-text flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-400" /> Mistake Notebook ({unresolved.length} Unresolved)
        </h3>
        <span className="text-xs text-mt-muted">Automatically logged when you answer incorrectly</span>
      </div>

      {unresolved.length === 0 ? (
        <div className="p-8 bg-mt-elevated rounded-card border border-mt-border text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <h4 className="font-bold text-sm text-mt-text">No Unresolved Mistakes!</h4>
          <p className="text-xs text-mt-muted">Great job! Incorrect questions will automatically appear here for revision.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {unresolved.map((m) => (
            <div key={m.id} className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-rose-400">Mistake Record</span>
                <span className="text-mt-muted text-[10px]">{new Date(m.attemptedAt).toLocaleDateString()}</span>
              </div>

              <p className="font-medium text-xs text-mt-text-secondary">
                <LaTeXRenderer content={m.questionText} />
              </p>

              <div className="p-3 bg-mt-card rounded-xl border border-mt-border space-y-1 text-xs">
                <span className="text-mt-gold-bright font-semibold block">Correct Answer & Concept:</span>
                <p className="text-emerald-400 font-medium"><LaTeXRenderer content={String(m.correctAnswer)} /></p>
                <p className="text-mt-text-secondary text-[11px] mt-1"><LaTeXRenderer content={m.explanation} /></p>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => handleResolve(m.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 min-h-touch transition-all duration-premium"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Mark Resolved after Retry
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
