'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BOARDS,
  getSubjectCurriculum,
  Board,
  SubjectCurriculum,
} from '@/lib/curriculum';
import { OnboardingState, getOnboardingState, saveOnboardingState } from '@/lib/db';

interface CurriculumContextType {
  onboardingState: OnboardingState;
  activeBoard: Board;
  activeClass: string;
  activeSubject: string;
  activeAcademicYear: string;
  activeCurriculum: SubjectCurriculum;
  showOnboardingModal: boolean;
  setShowOnboardingModal: (show: boolean) => void;
  showSearchModal: boolean;
  setShowSearchModal: (show: boolean) => void;
  updateOnboarding: (newState: Partial<OnboardingState>) => Promise<void>;
  setActiveSubject: (subjectId: string) => void;
}

const DEFAULT_ONBOARDING: OnboardingState = {
  boardId: 'karnataka',
  classId: '2nd PUC (12)',
  streamId: 'science',
  selectedSubjects: ['physics', 'chemistry', 'mathematics', 'biology', 'computer_science'],
  academicYear: '2026-27',
  completedOnboarding: true,
};

const CurriculumContext = createContext<CurriculumContextType | null>(null);

export const CurriculumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [onboardingState, setOnboardingState] = useState<OnboardingState>(DEFAULT_ONBOARDING);
  const [activeSubject, setActiveSubject] = useState<string>('physics');
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  useEffect(() => {
    async function loadSavedProfile() {
      const saved = await getOnboardingState();
      if (saved) {
        // Migration: ensure computer_science is always included for Class 11/12 profiles
        // This handles existing users who completed onboarding before CS was added.
        let migratedState = saved;
        if (!saved.selectedSubjects.includes('computer_science')) {
          migratedState = {
            ...saved,
            selectedSubjects: [...saved.selectedSubjects, 'computer_science'],
          };
          // Persist the migration so it sticks after refresh
          await saveOnboardingState(migratedState);
        }
        setOnboardingState(migratedState);
        if (migratedState.selectedSubjects && migratedState.selectedSubjects.length > 0) {
          // Keep the previously active subject if possible, default to first
          setActiveSubject(migratedState.selectedSubjects[0]);
        }
      } else {
        // Prompt onboarding for first time
        setShowOnboardingModal(true);
      }
    }
    loadSavedProfile();
  }, []);

  const activeBoard = BOARDS.find((b) => b.id === onboardingState.boardId) || BOARDS[0];

  const updateOnboarding = async (newState: Partial<OnboardingState>) => {
    const updated = { ...onboardingState, ...newState };
    setOnboardingState(updated);

    if (
      newState.selectedSubjects &&
      newState.selectedSubjects.length > 0 &&
      !newState.selectedSubjects.includes(activeSubject)
    ) {
      setActiveSubject(newState.selectedSubjects[0]);
    }

    await saveOnboardingState(updated);
  };

  // Resolve the selected Class 11/12 + subject syllabus dynamically.
  const activeCurriculum: SubjectCurriculum = getSubjectCurriculum(
    onboardingState.boardId,
    onboardingState.classId,
    activeSubject,
    onboardingState.academicYear
  );

  return (
    <CurriculumContext.Provider
      value={{
        onboardingState,
        activeBoard,
        activeClass: onboardingState.classId,
        activeSubject,
        activeAcademicYear: onboardingState.academicYear,
        activeCurriculum,
        showOnboardingModal,
        setShowOnboardingModal,
        showSearchModal,
        setShowSearchModal,
        updateOnboarding,
        setActiveSubject,
      }}
    >
      {children}
    </CurriculumContext.Provider>
  );
};

export const useCurriculum = () => {
  const ctx = useContext(CurriculumContext);
  if (!ctx) {
    throw new Error('useCurriculum must be used within a CurriculumProvider');
  }
  return ctx;
};
