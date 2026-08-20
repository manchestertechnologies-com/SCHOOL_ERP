'use client';

import React, { useState } from 'react';
import { useCurriculum } from '@/lib/curriculumContext';
import { KARNATAKA_2PUC_PHYSICS_CURRICULUM, SAMPLE_QUESTIONS } from '@/lib/curriculum';
import { MockTestEngine } from '@/components/tests/MockTestEngine';
import { FlaskConical, Users, Zap, Check, Play, Share2, Plus, Sparkles, Copy, AlertCircle } from 'lucide-react';
import { saveSharedTest, getSharedTest } from '@/lib/db';

export default function TestsPage() {
  const { activeBoard, activeClass, activeSubject } = useCurriculum();

  const [activeTab, setActiveTab] = useState<'create' | 'self' | 'friend'>('create');
  const [activeRunningTest, setActiveRunningTest] = useState<{ title: string; durationMinutes: number; questions: any[] } | null>(null);

  // Friend Test Code Inputs
  const [enterTestCode, setEnterTestCode] = useState('');
  const [generatedShareCode, setGeneratedShareCode] = useState<string | null>(null);

  // Custom Test Generator Form State
  const [selectedChapters, setSelectedChapters] = useState<string[]>(['kar-phy-ch1', 'kar-phy-ch3']);
  const [difficulty, setDifficulty] = useState<string>('Medium');
  const [totalMarks, setTotalMarks] = useState<number>(50);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);

  const chapters = KARNATAKA_2PUC_PHYSICS_CURRICULUM.chapters;

  const handleGenerateCustomTest = async () => {
    const testTitle = `Custom Practice Test (${activeBoard.shortCode} Class ${activeClass})`;
    setActiveRunningTest({
      title: testTitle,
      durationMinutes,
      questions: SAMPLE_QUESTIONS,
    });
  };

  const handleCreateFriendTest = async () => {
    const code = `BL${Math.floor(1000 + Math.random() * 9000)}`;
    await saveSharedTest({
      id: code,
      title: `Friend Challenge Test by Student`,
      boardId: activeBoard.id,
      classId: activeClass,
      subjectId: activeSubject,
      questionIds: SAMPLE_QUESTIONS.map((q) => q.id),
      totalMarks: 50,
      durationMinutes: 45,
      createdAt: Date.now(),
      creatorName: 'Student',
    });
    setGeneratedShareCode(code);
  };

  const handleJoinFriendTest = async () => {
    const shared = await getSharedTest(enterTestCode.trim());
    if (shared) {
      setActiveRunningTest({
        title: shared.title,
        durationMinutes: shared.durationMinutes,
        questions: SAMPLE_QUESTIONS,
      });
    } else {
      alert(`Test Code "${enterTestCode}" not found. Generating quick demo test...`);
      setActiveRunningTest({
        title: `Friend Challenge Test (${enterTestCode})`,
        durationMinutes: 45,
        questions: SAMPLE_QUESTIONS,
      });
    }
  };

  if (activeRunningTest) {
    return (
      <MockTestEngine
        title={activeRunningTest.title}
        durationMinutes={activeRunningTest.durationMinutes}
        questions={activeRunningTest.questions}
        onFinish={() => setActiveRunningTest(null)}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="mt-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-mt-border pb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-mt-gold-bright">{activeBoard.shortCode} • Class {activeClass}</span>
            <h1 className="text-2xl font-bold text-mt-text">Mock Test & Examination Engine</h1>
            <p className="text-xs text-mt-muted mt-0.5">Generate custom tests, launch instant self-tests, or challenge friends with test codes.</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {[
            { id: 'create', label: 'Custom Test Generator', icon: Plus },
            { id: 'self', label: 'Instant Self-Tests', icon: Zap },
            { id: 'friend', label: 'Friend Test Mode', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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

      {/* TAB 1: CUSTOM TEST GENERATOR */}
      {activeTab === 'create' && (
        <div className="mt-card p-6 space-y-6">
          <h3 className="text-lg font-bold text-mt-text border-b border-mt-border pb-3">Configure Custom Question Paper</h3>

          {/* Chapter Selection */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-mt-gold block">Select Chapters to Include:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {chapters.map((ch) => {
                const isSelected = selectedChapters.includes(ch.id);
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      if (isSelected) {
                        if (selectedChapters.length > 1) setSelectedChapters(selectedChapters.filter((c) => c !== ch.id));
                      } else {
                        setSelectedChapters([...selectedChapters, ch.id]);
                      }
                    }}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between text-xs font-medium transition-all duration-premium ${
                      isSelected
                        ? 'border-mt-gold bg-mt-elevated text-mt-text font-semibold shadow-gold'
                        : 'border-mt-border bg-mt-card text-mt-muted'
                    }`}
                  >
                    <span>Ch {ch.chapterNumber}. {ch.title}</span>
                    {isSelected && <Check className="w-4 h-4 text-mt-gold-bright" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-mt-gold block">Difficulty:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mt-input text-xs"
              >
                <option value="Easy" className="bg-mt-card text-mt-text">Easy</option>
                <option value="Medium" className="bg-mt-card text-mt-text">Medium</option>
                <option value="Hard" className="bg-mt-card text-mt-text">Hard</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-mt-gold block">Total Marks:</label>
              <select
                value={totalMarks}
                onChange={(e) => setTotalMarks(Number(e.target.value))}
                className="mt-input text-xs"
              >
                <option value={25} className="bg-mt-card text-mt-text">25 Marks</option>
                <option value={50} className="bg-mt-card text-mt-text">50 Marks</option>
                <option value={70} className="bg-mt-card text-mt-text">70 Marks (Full Paper)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-mt-gold block">Duration (Minutes):</label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="mt-input text-xs"
              >
                <option value={30} className="bg-mt-card text-mt-text">30 Minutes</option>
                <option value={60} className="bg-mt-card text-mt-text">60 Minutes</option>
                <option value={180} className="bg-mt-card text-mt-text">180 Minutes (Full Duration)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleGenerateCustomTest}
              className="mt-btn-primary text-xs px-6 py-3"
            >
              <Sparkles className="w-4 h-4 text-mt-bg" /> GENERATE & START TEST
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: INSTANT SELF-TESTS */}
      {activeTab === 'self' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: '10 Question Quick Speed Test', duration: 15, qCount: 10 },
            { title: '20 Question Chapter Test', duration: 30, qCount: 20 },
            { title: 'Weak Topic Targeted Practice Test', duration: 25, qCount: 15 },
            { title: 'Full Subject Mock Examination', duration: 180, qCount: 45 },
          ].map((t, idx) => (
            <div key={idx} className="mt-card p-6 space-y-3">
              <h4 className="font-bold text-base text-mt-text">{t.title}</h4>
              <p className="text-xs text-mt-muted">Duration: {t.duration} Mins • {t.qCount} Questions</p>
              <button
                onClick={() =>
                  setActiveRunningTest({
                    title: t.title,
                    durationMinutes: t.duration,
                    questions: SAMPLE_QUESTIONS,
                  })
                }
                className="mt-btn-primary text-xs px-4 py-2"
              >
                <Play className="w-3.5 h-3.5 fill-mt-bg text-mt-bg" /> Start Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: FRIEND TEST MODE */}
      {activeTab === 'friend' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create & Share Test */}
          <div className="mt-card p-6 space-y-4">
            <h3 className="text-base font-bold text-mt-text flex items-center gap-2">
              <Share2 className="w-5 h-5 text-mt-gold" /> Create Test & Share with Friend
            </h3>
            <p className="text-xs text-mt-muted">Generate a unique 6-character code to send to classmates for live score comparison.</p>

            {generatedShareCode ? (
              <div className="p-5 bg-mt-elevated border border-mt-gold/30 rounded-card space-y-2 text-center">
                <span className="text-xs font-semibold text-mt-gold uppercase">Your Test Code</span>
                <p className="text-3xl font-bold text-mt-gold-bright tracking-widest">{generatedShareCode}</p>
                <p className="text-[11px] text-mt-muted">Share this code with your friend to compare scores!</p>
              </div>
            ) : (
              <button
                onClick={handleCreateFriendTest}
                className="mt-btn-primary w-full text-xs py-3"
              >
                Generate Shareable Test Code
              </button>
            )}
          </div>

          {/* Join Friend Test */}
          <div className="mt-card p-6 space-y-4">
            <h3 className="text-base font-bold text-mt-text flex items-center gap-2">
              <Users className="w-5 h-5 text-mt-gold" /> Join Friend's Test
            </h3>
            <p className="text-xs text-mt-muted">Enter the 6-character test code received from your classmate.</p>

            <div className="space-y-3">
              <input
                type="text"
                value={enterTestCode}
                onChange={(e) => setEnterTestCode(e.target.value.toUpperCase())}
                placeholder="e.g. BL9482"
                maxLength={6}
                className="mt-input text-center text-lg font-bold tracking-widest"
              />
              <button
                onClick={handleJoinFriendTest}
                disabled={!enterTestCode.trim()}
                className="mt-btn-primary w-full disabled:opacity-50 text-xs py-3"
              >
                Enter Test & Challenge Friend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
