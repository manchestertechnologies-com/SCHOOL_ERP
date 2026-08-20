'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Search,
  Wifi,
  WifiOff,
  RefreshCw,
  Sparkles,
  BookOpen,
  PanelRightOpen,
  PanelRightClose,
  ChevronRight,
  User,
} from 'lucide-react';
import { getUnsyncedAttempts, markAttemptsSynced } from '@/lib/db';
import { useCurriculum } from '@/lib/curriculumContext';
import { cn } from '@/lib/cn';
import { SUBJECTS } from '@/lib/curriculum';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  sideDashboardOpen: boolean;
  onToggleSideDashboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  sideDashboardOpen,
  onToggleSideDashboard,
}) => {
  const pathname = usePathname();
  const { activeBoard, activeClass, activeSubject, setShowOnboardingModal, setShowSearchModal } =
    useCurriculum();

  const activeSubjectLabel = SUBJECTS.find((subject) => subject.id === activeSubject)?.label || activeSubject;

  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced');

  useEffect(() => {
    const handleOnline = async () => {
      setSyncStatus('syncing');
      try {
        const unsynced = await getUnsyncedAttempts();
        if (unsynced.length > 0) {
          await new Promise((res) => setTimeout(res, 800));
          const ids = unsynced.map((u) => u.id!).filter(Boolean);
          await markAttemptsSynced(ids);
        }
      } catch (e) {
        console.error('Sync error', e);
      }
      setSyncStatus('synced');
    };

    const handleOffline = () => setSyncStatus('offline');

    if (!navigator.onLine) setSyncStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getPageTitle = () => {
    if (pathname === '/') return 'Dashboard';
    if (pathname.startsWith('/learn')) return 'Curriculum Syllabus';
    if (pathname.startsWith('/practice')) return 'Interactive Practice';
    if (pathname.startsWith('/papers')) return 'Previous Year Papers';
    if (pathname.startsWith('/tests')) return 'Mock Tests & Drills';
    if (pathname.startsWith('/revision')) return 'Quick Revision';
    if (pathname.startsWith('/profile')) return 'Student Profile';
    if (pathname.startsWith('/admin')) return 'Admin Console';
    return 'Bridge Learn';
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...(pathname !== '/' ? [{ label: getPageTitle(), href: pathname }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 bg-mt-bg/90 backdrop-blur-xl border-b border-mt-border px-4 py-4 flex items-center justify-between gap-4">
      {/* Left: mobile toggle + breadcrumb + title */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 text-mt-text-secondary hover:text-mt-text rounded-xl bg-mt-card border border-mt-border lg:hidden transition-colors duration-premium active:scale-95"
          title="Toggle navigation menu"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          {/* Breadcrumb — desktop */}
          <nav
            className="hidden sm:flex items-center gap-2 text-[11px] text-mt-muted mb-2"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb.href}>
                {i > 0 && <ChevronRight className="w-3 h-3 flex-shrink-0" aria-hidden="true" />}
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-mt-text-secondary truncate">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-mt-text-secondary transition-colors truncate">
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          <h2 className="font-semibold text-mt-text text-sm sm:text-base tracking-tight leading-tight flex items-center gap-2 truncate">
            {getPageTitle()}
            <span className="hidden sm:inline text-mt-muted font-normal">·</span>
            <span className="hidden sm:inline text-xs text-mt-gold capitalize font-medium">
              {activeSubjectLabel}
            </span>
          </h2>
        </div>
      </div>

      {/* Center: search */}
      <div className="flex-1 max-w-md hidden md:block">
        <button
          onClick={() => setShowSearchModal(true)}
          className="w-full px-4 py-2 bg-mt-card hover:bg-mt-elevated text-mt-muted hover:text-mt-text-secondary rounded-xl border border-mt-border hover:border-mt-gold/25 flex items-center justify-between text-sm transition-all duration-premium group focus:outline-none focus:border-mt-gold/40 focus:ring-2 focus:ring-mt-gold/10"
          aria-label="Open global search"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-mt-gold group-hover:text-mt-gold-bright transition-colors" />
            <span>Search concepts, formulas, PYQs...</span>
          </div>
          <kbd className="px-2 py-1 bg-mt-elevated border border-mt-border text-[10px] font-mono text-mt-gold rounded-md">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => setShowSearchModal(true)}
          className="p-2 bg-mt-card hover:bg-mt-elevated text-mt-text-secondary rounded-xl border border-mt-border md:hidden transition-colors duration-premium"
          aria-label="Search"
        >
          <Search className="w-4 h-4 text-mt-gold" />
        </button>

        <button
          onClick={() => setShowOnboardingModal(true)}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-mt-card hover:bg-mt-elevated text-mt-text-secondary hover:text-mt-text rounded-xl border border-mt-border text-xs font-medium transition-all duration-premium"
          title="Switch board or class"
        >
          <BookOpen className="w-3.5 h-3.5 text-mt-gold" />
          <span>{activeBoard.shortCode} • Class {activeClass}</span>
        </button>

        <div
          className="hidden lg:flex items-center gap-2 px-4 py-2 bg-mt-card rounded-xl border border-mt-border text-[11px] font-medium text-mt-text-secondary"
          aria-live="polite"
          aria-label={`Sync status: ${syncStatus}`}
        >
          {syncStatus === 'synced' && <Wifi className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />}
          {syncStatus === 'syncing' && (
            <RefreshCw className="w-3.5 h-3.5 text-mt-gold-bright animate-spin" aria-hidden="true" />
          )}
          {syncStatus === 'offline' && <WifiOff className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />}
          <span className="capitalize">{syncStatus}</span>
        </div>

        <button
          onClick={onToggleSideDashboard}
          className={cn(
            'px-4 py-2 rounded-xl font-medium text-xs flex items-center gap-2 transition-all duration-premium min-h-touch active:scale-95',
            sideDashboardOpen
              ? 'bg-mt-gold-bright text-mt-bg'
              : 'bg-mt-card hover:bg-mt-elevated text-mt-text-secondary border border-mt-border hover:border-mt-gold/25'
          )}
          title="Toggle side dashboard"
          aria-pressed={sideDashboardOpen}
        >
          <Sparkles className={cn('w-4 h-4', sideDashboardOpen ? 'text-mt-bg' : 'text-mt-gold')} />
          <span className="hidden sm:inline">Side Dashboard</span>
          {sideDashboardOpen ? (
            <PanelRightClose className="w-4 h-4 opacity-70" aria-hidden="true" />
          ) : (
            <PanelRightOpen className="w-4 h-4 opacity-70" aria-hidden="true" />
          )}
        </button>

        <Link
          href="/profile"
          className="hidden sm:flex p-2 bg-mt-card hover:bg-mt-elevated rounded-xl border border-mt-border transition-colors duration-premium"
          aria-label="Student profile"
        >
          <User className="w-4 h-4 text-mt-text-secondary" />
        </Link>
      </div>
    </header>
  );
};
