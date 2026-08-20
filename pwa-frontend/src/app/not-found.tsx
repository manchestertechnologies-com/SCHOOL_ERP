'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Compass, ArrowRight, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shadow-xl">
        <AlertTriangle className="w-10 h-10 text-amber-400" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-black uppercase tracking-widest text-indigo-400">
          404 Page Not Found
        </span>
        <h1 className="text-3xl font-black text-white">Lost in the Curriculum?</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The academic module or page you are searching for does not exist or has been moved.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all active:scale-95"
        >
          <Home className="w-4 h-4" /> Return to Dashboard
        </Link>
        <Link
          href="/learn"
          className="px-6 py-3 bg-slate-900 hover:bg-slate-850 text-slate-300 font-extrabold text-xs rounded-2xl border border-slate-800 flex items-center gap-2 transition-all"
        >
          <Compass className="w-4 h-4 text-indigo-400" /> Browse Syllabus
        </Link>
      </div>
    </div>
  );
}
