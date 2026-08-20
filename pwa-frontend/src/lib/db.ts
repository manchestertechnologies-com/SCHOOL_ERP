import { openDB, IDBPDatabase } from 'idb';

export interface OnboardingState {
  boardId: string;
  classId: string;
  streamId?: string;
  selectedSubjects: string[];
  academicYear: string;
  completedOnboarding: boolean;
}

export interface QuestionAttempt {
  id?: number;
  attemptId: string;
  questionId: string;
  chapterId?: string;
  topicId?: string;
  answer: any;
  isCorrect: boolean;
  timestamp: number;
  synced: boolean;
}

export interface SavedBookmark {
  id: string; // questionId
  chapterId: string;
  topicId: string;
  questionText: string;
  savedAt: number;
}

export interface MistakeRecord {
  id: string; // questionId
  chapterId: string;
  topicId: string;
  questionText: string;
  userAnswer: any;
  correctAnswer: any;
  explanation: string;
  attemptedAt: number;
  retryCount: number;
  resolved: boolean;
}

export interface SharedTestRecord {
  id: string; // 6-char code e.g. "BL9482"
  title: string;
  boardId: string;
  classId: string;
  subjectId: string;
  questionIds: string[];
  totalMarks: number;
  durationMinutes: number;
  createdAt: number;
  creatorName: string;
}

let dbPromise: Promise<IDBPDatabase> | null = null;

export function getDB() {
  if (typeof window === 'undefined') return null;
  if (!dbPromise) {
    dbPromise = openDB('bridge-learn-v2-db', 2, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('onboarding')) {
          db.createObjectStore('onboarding', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('question_attempts')) {
          const attemptStore = db.createObjectStore('question_attempts', {
            keyPath: 'id',
            autoIncrement: true,
          });
          attemptStore.createIndex('by-synced', 'synced');
        }
        if (!db.objectStoreNames.contains('bookmarks')) {
          db.createObjectStore('bookmarks', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('mistakes')) {
          db.createObjectStore('mistakes', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('shared_tests')) {
          db.createObjectStore('shared_tests', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('student_progress')) {
          db.createObjectStore('student_progress', { keyPath: 'key' });
        }
      },
    });
  }
  return dbPromise;
}

export async function saveOnboardingState(state: OnboardingState) {
  const db = await getDB();
  if (!db) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bl_onboarding', JSON.stringify(state));
    }
    return;
  }
  await db.put('onboarding', { key: 'active_profile', value: state });
}

export async function getOnboardingState(): Promise<OnboardingState | null> {
  const db = await getDB();
  if (!db) {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('bl_onboarding');
      return cached ? JSON.parse(cached) : null;
    }
    return null;
  }
  const res = await db.get('onboarding', 'active_profile');
  return res ? res.value : null;
}

export async function saveQuestionAttempt(attempt: Omit<QuestionAttempt, 'id'>) {
  const db = await getDB();
  if (!db) return;
  return await db.add('question_attempts', attempt);
}

export async function getUnsyncedAttempts(): Promise<QuestionAttempt[]> {
  const db = await getDB();
  if (!db) return [];
  const all: QuestionAttempt[] = await db.getAll('question_attempts');
  return all.filter((a) => !a.synced);
}

export async function markAttemptsSynced(ids: number[]) {
  const db = await getDB();
  if (!db) return;
  const tx = db.transaction('question_attempts', 'readwrite');
  for (const id of ids) {
    const record = await tx.store.get(id);
    if (record) {
      record.synced = true;
      await tx.store.put(record);
    }
  }
  await tx.done;
}

export async function saveBookmark(bookmark: SavedBookmark) {
  const db = await getDB();
  if (!db) return;
  await db.put('bookmarks', bookmark);
}

export async function removeBookmark(id: string) {
  const db = await getDB();
  if (!db) return;
  await db.delete('bookmarks', id);
}

export async function getBookmarks(): Promise<SavedBookmark[]> {
  const db = await getDB();
  if (!db) return [];
  return await db.getAll('bookmarks');
}

export async function addMistake(mistake: MistakeRecord) {
  const db = await getDB();
  if (!db) return;
  await db.put('mistakes', mistake);
}

export async function getMistakes(): Promise<MistakeRecord[]> {
  const db = await getDB();
  if (!db) return [];
  return await db.getAll('mistakes');
}

export async function resolveMistake(id: string) {
  const db = await getDB();
  if (!db) return;
  const record: MistakeRecord = await db.get('mistakes', id);
  if (record) {
    record.resolved = true;
    record.retryCount += 1;
    await db.put('mistakes', record);
  }
}

export async function saveSharedTest(test: SharedTestRecord) {
  const db = await getDB();
  if (!db) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`bl_test_${test.id}`, JSON.stringify(test));
    }
    return;
  }
  await db.put('shared_tests', test);
}

export async function getSharedTest(id: string): Promise<SharedTestRecord | null> {
  const db = await getDB();
  if (!db) {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(`bl_test_${id}`);
      return cached ? JSON.parse(cached) : null;
    }
    return null;
  }
  return await db.get('shared_tests', id);
}
