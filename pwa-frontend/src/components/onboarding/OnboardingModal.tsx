'use client';

import React, { useState } from 'react';
import { BOARDS, ACADEMIC_YEARS, SUBJECTS } from '@/lib/curriculum';
import { useCurriculum } from '@/lib/curriculumContext';
import { Check, ArrowRight, BookOpen, GraduationCap, Calendar, Sparkles, X } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { onboardingState, updateOnboarding, showOnboardingModal, setShowOnboardingModal } = useCurriculum();

  const [step, setStep] = useState<number>(1);
  const [boardId, setBoardId] = useState<string>(onboardingState.boardId);
  const [classId, setClassId] = useState<string>(onboardingState.classId);
  const [streamId, setStreamId] = useState<string>(onboardingState.streamId || 'science');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    onboardingState.selectedSubjects || ['physics', 'chemistry', 'mathematics', 'biology', 'computer_science']
  );
  const [academicYear, setAcademicYear] = useState<string>(onboardingState.academicYear);

  if (!showOnboardingModal) return null;

  const currentBoard = BOARDS.find((b) => b.id === boardId) || BOARDS[0];

  const handleSubjectToggle = (subj: string) => {
    if (selectedSubjects.includes(subj)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== subj));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, subj]);
    }
  };

  const handleFinish = async () => {
    await updateOnboarding({
      boardId,
      classId,
      streamId,
      selectedSubjects,
      academicYear,
      completedOnboarding: true,
    });
    setShowOnboardingModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-mt-bg-secondary border border-mt-gold/30 w-full max-w-xl rounded-card p-6 sm:p-8 shadow-card-hover space-y-6 relative">
        <button
          onClick={() => setShowOnboardingModal(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-mt-muted hover:text-mt-text hover:bg-mt-elevated transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-mt-muted uppercase tracking-wider">
            <span>Step {step} of 5</span>
            <span className="text-mt-gold-bright">Curriculum Setup</span>
          </div>
          <div className="mt-progress-track">
            <div
              className="mt-progress-fill"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* STEP 1: SELECT BOARD */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-mt-gold/10 text-mt-gold-bright border border-mt-gold/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-mt-text">Select Educational Board</h2>
                <p className="text-xs text-mt-muted">Content will strictly filter to your selected board.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5 max-h-72 overflow-y-auto pr-1 no-scrollbar">
              {BOARDS.map((b) => {
                const isSelected = boardId === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => {
                      setBoardId(b.id);
                      if (!b.supportedClasses.includes(classId)) {
                        setClassId(b.supportedClasses[b.supportedClasses.length - 1]);
                      }
                    }}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-premium ${
                      isSelected
                        ? 'border-mt-gold bg-mt-elevated text-mt-text shadow-gold'
                        : 'border-mt-border bg-mt-card hover:bg-mt-elevated text-mt-text-secondary'
                    }`}
                  >
                    <div>
                      <h3 className="font-semibold text-sm text-mt-text">{b.name}</h3>
                      <p className="text-xs text-mt-muted mt-0.5">{b.description}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-mt-gold text-mt-bg flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: SELECT CLASS */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-mt-gold/10 text-mt-gold-bright border border-mt-gold/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-mt-text">Select Class / Level</h2>
                <p className="text-xs text-mt-muted">Board: {currentBoard.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {currentBoard.supportedClasses.map((cls) => {
                const isSelected = classId === cls;
                return (
                  <button
                    key={cls}
                    onClick={() => setClassId(cls)}
                    className={`p-5 rounded-xl border text-center font-semibold text-sm transition-all duration-premium ${
                      isSelected
                        ? 'border-mt-gold bg-mt-gold-bright text-mt-bg'
                        : 'border-mt-border bg-mt-card hover:bg-mt-elevated text-mt-text-secondary'
                    }`}
                  >
                    {cls}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: STREAM SELECTION */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-mt-gold/10 text-mt-gold-bright border border-mt-gold/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-mt-text">Select Academic Stream</h2>
                <p className="text-xs text-mt-muted">Applicable for High School / Pre-University</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'science', label: 'Science', desc: 'Physics, Chemistry, Math, Biology, Computer Science' },
                { id: 'commerce', label: 'Commerce', desc: 'Accounts, Economics, Business' },
                { id: 'arts', label: 'Arts / Humanities', desc: 'History, Political Science' },
              ].map((str) => {
                const isSelected = streamId === str.id;
                return (
                  <button
                    key={str.id}
                    onClick={() => setStreamId(str.id)}
                    className={`p-4 rounded-xl border text-left transition-all duration-premium ${
                      isSelected
                        ? 'border-mt-gold bg-mt-elevated text-mt-text'
                        : 'border-mt-border bg-mt-card hover:bg-mt-elevated text-mt-text-secondary'
                    }`}
                  >
                    <h3 className="font-semibold text-sm text-mt-text">{str.label}</h3>
                    <p className="text-[11px] text-mt-muted mt-1">{str.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: SUBJECT SELECTION */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-mt-gold/10 text-mt-gold-bright border border-mt-gold/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-mt-text">Select Enrolled Subjects</h2>
                <p className="text-xs text-mt-muted">Choose subjects to track progress.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {SUBJECTS.map((subj) => {
                const isSelected = selectedSubjects.includes(subj.id);
                return (
                  <button
                    key={subj.id}
                    onClick={() => handleSubjectToggle(subj.id)}
                    className={`p-4 rounded-xl border font-medium text-xs flex items-center justify-between transition-all duration-premium ${
                      isSelected
                        ? 'border-mt-gold bg-mt-elevated text-mt-gold-bright'
                        : 'border-mt-border bg-mt-card hover:bg-mt-elevated text-mt-text-secondary'
                    }`}
                  >
                    <span>{subj.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-mt-gold-bright" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: ACADEMIC YEAR */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-mt-gold/10 text-mt-gold-bright border border-mt-gold/20 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-mt-text">Select Academic Year</h2>
                <p className="text-xs text-mt-muted">Default is the currently active board syllabus.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {ACADEMIC_YEARS.map((ay) => {
                const isSelected = academicYear === ay.year;
                return (
                  <button
                    key={ay.year}
                    onClick={() => setAcademicYear(ay.year)}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-premium ${
                      isSelected
                        ? 'border-mt-gold bg-mt-elevated text-mt-text'
                        : 'border-mt-border bg-mt-card hover:bg-mt-elevated text-mt-text-secondary'
                    }`}
                  >
                    <div>
                      <h3 className="font-semibold text-sm text-mt-text">{ay.year} Academic Year</h3>
                      {ay.isCurrent && <span className="text-[10px] text-mt-gold font-medium uppercase">Current Official Curriculum</span>}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-mt-gold-bright" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-mt-border">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="mt-btn-secondary text-xs px-4 py-2"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="mt-btn-primary text-xs px-5 py-2"
            >
              Next <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="mt-btn-primary text-xs px-5 py-2"
            >
              Start Learning <Check className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
