'use client';

import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (isStandalone) return;

    // Check if user dismissed installation previously
    const dismissed = localStorage.getItem('pwa_prompt_dismissed');
    if (dismissed) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-96 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-indigo-500/30 flex flex-col gap-3 backdrop-blur-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
            BL
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Install Bridge Learn</h4>
            <p className="text-xs text-slate-300">Install on your tablet for a faster app-like experience</p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="p-2 min-h-touch min-w-touch flex items-center justify-center text-slate-400 hover:text-white rounded-lg active:bg-slate-800"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          onClick={handleDismiss}
          className="px-4 py-2 text-xs text-slate-300 hover:text-white rounded-lg active:bg-slate-800 font-medium min-h-touch"
        >
          Later
        </button>
        <button
          onClick={handleInstall}
          className="px-5 py-2.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center gap-2 shadow-lg min-h-touch active:scale-95 transition-transform"
        >
          <Download className="w-4 h-4" />
          Install App
        </button>
      </div>
    </div>
  );
};
