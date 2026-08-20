'use client';

import React from 'react';
import Link from 'next/link';
import { useCurriculum } from '@/lib/curriculumContext';
import { cn } from '@/lib/cn';
import {
  Play,
  BookOpen,
  PenTool,
  FileText,
  FlaskConical,
  ArrowRight,
  Flame,
  Target,
  BarChart3,
  BrainCircuit,
  Clock,
} from 'lucide-react';

const commandCenterCards = [
  {
    href: '/learn',
    icon: BookOpen,
    title: 'Concept Syllabus',
    description: 'Interactive concepts, key formula sheets and step-by-step derivations.',
    cta: 'Explore Syllabus',
  },
  {
    href: '/practice',
    icon: PenTool,
    title: 'Mark-Wise Drills',
    description: 'Practice 1, 2, 3 and 5-mark examination questions.',
    cta: 'Start Practice',
  },
  {
    href: '/papers',
    icon: FileText,
    title: 'PYQ Repository',
    description: '25 years of solved board examination papers.',
    cta: 'View Papers',
  },
  {
    href: '/tests',
    icon: FlaskConical,
    title: 'Mock Test Drills',
    description: 'Full-length timed examination simulations and practice drills.',
    cta: 'Launch Test',
  },
];

const subjectMastery = [
  { subject: 'Physics', progress: 72 },
  { subject: 'Chemistry', progress: 64 },
  { subject: 'Mathematics', progress: 58 },
  { subject: 'Biology', progress: 61 },
];

export default function Dashboard() {
  const { activeBoard, activeClass, activeCurriculum } = useCurriculum();

  const currentChapter = activeCurriculum.chapters[0];
  const currentTopic = currentChapter.topics[0];
  const recommendedTopic = currentChapter.topics[1];

  return (
    <div className="space-y-10 pb-12 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="relative">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
          {/* Welcome content */}
          <div className="space-y-6 flex-1">
            {/* Status chips */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-mt-card border border-mt-border rounded-full text-xs font-medium text-mt-text-secondary">
                <Flame className="w-3.5 h-3.5 text-mt-gold-bright" aria-hidden="true" />
                7 Day Streak
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-mt-card border border-mt-border rounded-full text-xs font-medium text-mt-text-secondary">
                {activeBoard.shortCode} • Class {activeClass}
              </span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-mt-text tracking-tight leading-tight">
                Welcome back,<br />
                <span className="text-mt-gold-bright">Scholar!</span>
              </h1>

              <p className="text-sm md:text-base text-mt-text-secondary max-w-xl leading-relaxed">
                Your academic target today is{' '}
                <strong className="text-mt-gold-bright font-semibold">{currentChapter.title}</strong>.
                Complete today&apos;s recommended derivation and 3 PYQs to maintain your mastery pace.
              </p>
            </div>
          </div>

          {/* Resume Module — floating panel */}
          <div className="mt-hero-panel w-full lg:w-[300px] flex-shrink-0 space-y-4">
            <div className="flex items-center justify-between">
              <span className="mt-section-label">Resume Module</span>
              <span className="text-xs font-semibold text-mt-gold-bright">
                {currentChapter.completionPercentage}% Done
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-mt-text">{currentTopic.title}</h4>
              <p className="text-xs text-mt-muted">
                Chapter {currentChapter.chapterNumber} • {currentTopic.pyqCount} Board PYQs
              </p>
            </div>

            {/* Progress bar */}
            <div className="mt-progress-track">
              <div
                className="mt-progress-fill"
                style={{ width: `${currentChapter.completionPercentage}%` }}
              />
            </div>

            <Link href="/learn" className="mt-btn-primary w-full">
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
              Continue Module
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Academic Command Center */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-mt-text flex items-center gap-2">
            <Target className="w-4 h-4 text-mt-gold" aria-hidden="true" />
            Academic Command Center
          </h2>
          <span className="text-xs text-mt-muted">4 Primary Engines</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {commandCenterCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="mt-card-interactive p-6 flex flex-col justify-between gap-6 group min-h-[200px]"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-mt-elevated border border-mt-border flex items-center justify-center group-hover:border-mt-gold/30 transition-colors duration-premium">
                    <Icon className="w-5 h-5 text-mt-muted group-hover:text-mt-gold-bright transition-colors duration-premium" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-mt-text group-hover:text-mt-text transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-mt-muted mt-2 leading-relaxed">{card.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-mt-gold group-hover:text-mt-gold-bright transition-colors duration-premium pt-4 border-t border-mt-border">
                  <span>{card.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-premium" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recommended Topic + Subject Mastery */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Topic */}
        <div className="lg:col-span-2">
          <div className="mt-card p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-mt-text">Recommended Topic Focus Today</h3>
              <span className="inline-flex items-center gap-2 text-[11px] font-medium text-mt-text-secondary bg-mt-elevated px-3 py-1 rounded-lg border border-mt-border">
                <Clock className="w-3 h-3 text-mt-gold" aria-hidden="true" />
                15 mins session
              </span>
            </div>

            <div className="p-6 bg-mt-elevated rounded-card border border-mt-border space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-mt-gold uppercase tracking-wide">
                  {currentChapter.title}
                </span>
                <span className="text-[10px] font-semibold text-mt-gold-bright bg-mt-gold/10 border border-mt-gold/20 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                  High Priority
                </span>
              </div>

              <h4 className="font-semibold text-lg text-mt-text">{recommendedTopic.title}</h4>

              <p className="text-xs text-mt-text-secondary leading-relaxed">
                Revise key concepts • Solve 3 PYQs • Strengthen derivations
              </p>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-mt-muted">
                  Includes <strong className="text-mt-gold font-medium">3-Mark Derivation</strong> & 4 Past PYQs
                </span>
                <Link href="/learn" className="mt-btn-primary text-xs px-4 py-2">
                  Start Learning
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Mastery */}
        <div className="mt-card p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-mt-text flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-mt-gold" aria-hidden="true" />
                Subject Mastery
              </h3>
              <span className="text-[10px] text-mt-muted font-medium">Class {activeClass}</span>
            </div>

            <div className="space-y-4">
              {subjectMastery.map((item) => (
                <div key={item.subject} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-mt-text-secondary">{item.subject}</span>
                    <span className="font-semibold text-mt-gold-bright">{item.progress}%</span>
                  </div>
                  <div className="mt-progress-track">
                    <div className="mt-progress-fill" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/revision"
            className="mt-btn-secondary w-full text-xs py-2.5"
          >
            <BrainCircuit className="w-4 h-4 text-mt-gold" aria-hidden="true" />
            Quick Revision Flashcards
          </Link>
        </div>
      </section>
    </div>
  );
}
