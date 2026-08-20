'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCurriculum } from '@/lib/curriculumContext';
import { ManchesterLogo } from '@/components/brand/ManchesterLogo';
import { cn } from '@/lib/cn';
import {
  Home,
  BookOpen,
  PenTool,
  FileText,
  FlaskConical,
  Zap,
  User,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Flame,
  Layers,
  X,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}) => {
  const pathname = usePathname();
  const { activeBoard, activeClass, activeSubject, setActiveSubject, setShowOnboardingModal } =
    useCurriculum();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/learn', label: 'Curriculum & Learn', icon: BookOpen },
    { href: '/practice', label: 'Interactive Practice', icon: PenTool },
    { href: '/papers', label: 'PYQ Papers', icon: FileText },
    { href: '/tests', label: 'Mock Tests & Drills', icon: FlaskConical },
    { href: '/revision', label: 'Quick Revision', icon: Zap },
    { href: '/profile', label: 'Student Profile', icon: User },
    { href: '/admin', label: 'Admin Console', icon: ShieldCheck },
  ];

  const subjects = [
    { id: 'physics', label: 'Physics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'mathematics', label: 'Mathematics' },
    { id: 'biology', label: 'Biology' },
  ];

  const isExpanded = !collapsed || mobileOpen;

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between',
          'bg-mt-bg-secondary border-r border-mt-border',
          'transition-all duration-300 ease-in-out',
          collapsed ? 'w-[72px]' : 'w-64',
          mobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        )}
        aria-label="Main navigation"
      >
        {/* Brand & curriculum selector */}
        <div className="p-4 space-y-4 border-b border-mt-border">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={onCloseMobile}
              className="flex items-center gap-4 min-w-0"
              aria-label="Manchester Technologies — Dashboard home"
            >
              {isExpanded ? (
                <ManchesterLogo size="sm" />
              ) : (
                <ManchesterLogo size="sm" showText={false} />
              )}
            </Link>

            {mobileOpen && (
              <button
                onClick={onCloseMobile}
                className="p-2 text-mt-text-secondary hover:text-mt-text rounded-lg hover:bg-mt-elevated lg:hidden transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {isExpanded && (
            <button
              onClick={() => {
                setShowOnboardingModal(true);
                onCloseMobile();
              }}
              className="w-full p-4 bg-mt-card hover:bg-mt-elevated border border-mt-border hover:border-mt-gold/30 rounded-xl flex items-center justify-between transition-all duration-premium group"
              aria-label="Change curriculum"
            >
              <div className="flex items-center gap-2 text-left min-w-0">
                <Layers className="w-4 h-4 text-mt-gold flex-shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-mt-muted font-medium block uppercase tracking-wider">
                    Curriculum
                  </span>
                  <span className="text-xs font-semibold text-mt-text truncate block">
                    {activeBoard.shortCode} • Class {activeClass}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-mt-gold-bright border border-mt-gold/30 px-2 py-0.5 rounded-md uppercase flex-shrink-0 ml-2">
                Change
              </span>
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 no-scrollbar">
          <nav className="space-y-2" aria-label="Core menu">
            {isExpanded && (
              <span className="mt-section-label px-4 block mb-4">Navigation</span>
            )}

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  title={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-4 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-premium relative group',
                    isActive
                      ? 'mt-nav-active text-mt-text'
                      : 'text-mt-text-secondary hover:text-mt-text hover:bg-mt-elevated/60'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-[18px] h-[18px] flex-shrink-0 transition-colors duration-premium',
                      isActive ? 'text-mt-gold-bright' : 'text-mt-muted group-hover:text-mt-text-secondary'
                    )}
                  />
                  {isExpanded && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {isExpanded && (
            <div className="space-y-2 pt-4 border-t border-mt-border">
              <span className="mt-section-label px-4 block">Subjects</span>
              <div className="grid grid-cols-2 gap-2 px-2">
                {subjects.map((sub) => {
                  const isSelected = activeSubject === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSubject(sub.id)}
                      className={cn(
                        'p-2 rounded-lg text-left text-[11px] font-medium transition-all duration-premium border',
                        isSelected
                          ? 'bg-mt-elevated text-mt-gold-bright border-mt-gold/30'
                          : 'bg-transparent text-mt-text-secondary border-transparent hover:bg-mt-elevated hover:text-mt-text'
                      )}
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-mt-border space-y-2">
          {isExpanded ? (
            <div className="p-4 rounded-xl bg-mt-card border border-mt-border flex items-center gap-4">
              <div className="p-2 bg-mt-gold/10 rounded-lg">
                <Flame className="w-4 h-4 text-mt-gold-bright" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-semibold text-mt-text block">7 Day Streak</span>
                <span className="text-[10px] text-mt-muted">Keep learning daily</span>
              </div>
            </div>
          ) : (
            <div
              className="p-2 bg-mt-card rounded-xl text-center border border-mt-border"
              title="7 Day Streak"
            >
              <Flame className="w-4 h-4 text-mt-gold-bright mx-auto" aria-hidden="true" />
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-full py-2 bg-mt-card hover:bg-mt-elevated text-mt-muted hover:text-mt-text-secondary rounded-lg border border-mt-border text-xs font-medium transition-all duration-premium"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
};
