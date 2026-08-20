'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, PenTool, FileText, User, Zap } from 'lucide-react';
import { cn } from '@/lib/cn';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/learn', label: 'Learn', icon: BookOpen },
    { href: '/practice', label: 'Practice', icon: PenTool },
    { href: '/papers', label: 'Papers', icon: FileText },
    { href: '/revision', label: 'Revision', icon: Zap },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-40 lg:hidden" aria-label="Mobile navigation">
      <div className="bg-mt-bg-secondary/95 backdrop-blur-xl border border-mt-border rounded-2xl p-1 shadow-card flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex flex-col items-center gap-0.5 py-2 px-2.5 rounded-xl transition-all duration-premium min-h-touch active:scale-95',
                isActive
                  ? 'text-mt-gold-bright'
                  : 'text-mt-muted hover:text-mt-text-secondary'
              )}
            >
              <Icon className={cn('w-[18px] h-[18px]', isActive && 'stroke-[2.5px]')} />
              <span className="text-[9px] font-medium">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-mt-gold-bright mt-0.5" aria-hidden="true" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
