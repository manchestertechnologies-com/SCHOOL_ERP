'use client';

import React, { useState, useEffect } from 'react';
import { useCurriculum } from '@/lib/curriculumContext';
import { MistakeNotebook } from '@/components/profile/MistakeNotebook';
import { AITutorPanel } from '@/components/ai/AITutorPanel';
import { getBookmarks, SavedBookmark } from '@/lib/db';
import { User, BookOpen, Bookmark, AlertCircle, Sparkles, Settings, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { activeBoard, activeClass, activeAcademicYear, setShowOnboardingModal } = useCurriculum();
  const [activeSubTab, setActiveSubTab] = useState<'mistakes' | 'bookmarks' | 'ai_tutor' | 'settings'>('mistakes');
  const [bookmarks, setBookmarks] = useState<SavedBookmark[]>([]);

  useEffect(() => {
    async function loadBookmarks() {
      const data = await getBookmarks();
      setBookmarks(data);
    }
    loadBookmarks();
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Profile Header */}
      <div className="mt-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-mt-border pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-mt-gold-bright text-mt-bg flex items-center justify-center font-bold text-xl shadow-gold">
              S
            </div>
            <div>
              <h1 className="text-2xl font-bold text-mt-text">Student Dashboard & Profile</h1>
              <p className="text-xs text-mt-gold-bright font-medium mt-0.5">
                {activeBoard.name} • Class {activeClass} ({activeAcademicYear})
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowOnboardingModal(true)}
            className="mt-btn-primary text-xs px-4 py-2.5"
          >
            <Settings className="w-4 h-4 text-mt-bg" /> Change Board / Class
          </button>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {[
            { id: 'mistakes', label: 'My Mistakes Notebook', icon: AlertCircle },
            { id: 'bookmarks', label: `Saved Bookmarks (${bookmarks.length})`, icon: Bookmark },
            { id: 'ai_tutor', label: 'AI Tutor Assistant', icon: Sparkles },
            { id: 'settings', label: 'Curriculum Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
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

      {/* SUB-TAB 1: MISTAKE NOTEBOOK */}
      {activeSubTab === 'mistakes' && (
        <div className="mt-card p-6">
          <MistakeNotebook />
        </div>
      )}

      {/* SUB-TAB 2: SAVED BOOKMARKS */}
      {activeSubTab === 'bookmarks' && (
        <div className="mt-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-mt-text border-b border-mt-border pb-3 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-mt-gold" /> Saved Bookmarks
          </h3>

          {bookmarks.length === 0 ? (
            <div className="text-center py-8 text-mt-muted text-xs font-medium">
              No bookmarked questions yet. Click the bookmark icon during practice to save questions here.
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarks.map((bm) => (
                <div key={bm.id} className="p-4 bg-mt-elevated rounded-card border border-mt-border space-y-1">
                  <span className="text-[10px] text-mt-gold-bright font-medium uppercase">Saved {new Date(bm.savedAt).toLocaleDateString()}</span>
                  <p className="text-xs text-mt-text-secondary font-medium">{bm.questionText}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: AI TUTOR ASSISTANT */}
      {activeSubTab === 'ai_tutor' && (
        <div className="mt-card p-6">
          <AITutorPanel />
        </div>
      )}

      {/* SUB-TAB 4: SETTINGS */}
      {activeSubTab === 'settings' && (
        <div className="mt-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-mt-text border-b border-mt-border pb-3">Active Curriculum Profile</h3>
          <div className="space-y-3 text-xs">
            <div className="p-4 bg-mt-elevated rounded-card border border-mt-border flex items-center justify-between">
              <div>
                <span className="text-mt-muted block font-medium">Selected Board</span>
                <span className="text-mt-text font-bold text-sm">{activeBoard.name}</span>
              </div>
              <button onClick={() => setShowOnboardingModal(true)} className="text-mt-gold-bright font-semibold hover:underline">Edit</button>
            </div>

            <div className="p-4 bg-mt-elevated rounded-card border border-mt-border flex items-center justify-between">
              <div>
                <span className="text-mt-muted block font-medium">Class / Grade</span>
                <span className="text-mt-text font-bold text-sm">{activeClass}</span>
              </div>
              <button onClick={() => setShowOnboardingModal(true)} className="text-mt-gold-bright font-semibold hover:underline">Edit</button>
            </div>

            <div className="p-4 bg-mt-elevated rounded-card border border-mt-border flex items-center justify-between">
              <div>
                <span className="text-mt-muted block font-medium">Academic Syllabus Year</span>
                <span className="text-mt-gold-bright font-bold text-sm">{activeAcademicYear} (Official)</span>
              </div>
              <button onClick={() => setShowOnboardingModal(true)} className="text-mt-gold-bright font-semibold hover:underline">Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
