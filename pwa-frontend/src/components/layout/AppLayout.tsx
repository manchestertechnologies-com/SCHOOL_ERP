'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SideDashboard } from './SideDashboard';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sideDashboardOpen, setSideDashboardOpen] = useState(false);

  return (
    <div className="min-h-screen bg-mt-bg text-mt-text flex flex-col font-sans">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
        }`}
      >
        <Header
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          sideDashboardOpen={sideDashboardOpen}
          onToggleSideDashboard={() => setSideDashboardOpen(!sideDashboardOpen)}
        />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pb-28 lg:pb-10">
          {children}
        </main>
      </div>

      <SideDashboard open={sideDashboardOpen} onClose={() => setSideDashboardOpen(false)} />

      <BottomNav />
    </div>
  );
};
