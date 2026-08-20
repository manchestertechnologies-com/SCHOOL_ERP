import { SYLLABUS_2026_27 } from './syllabusData';

export interface Board {
  id: string;
  name: string;
  shortCode: string;
  description: string;
  supportedClasses: string[];
}

export interface AcademicYear {
  year: string; // e.g. "2026-27"
  isCurrent: boolean;
}

export interface Topic {
  id: string;
  title: string;
  priority: 'HIGH' | 'IMPORTANT' | 'SUPPORTING'; // ⭐ HIGH, 🟡 IMPORTANT, ⚪ SUPPORTING
  pyqCount: number;
  typicalMarks: number[];
  syllabusStatus: 'current' | 'added' | 'deleted' | 'modified';
  description: string;
  subtopics: string[];
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  description: string;
  weightageMarks: number;
  estLearningMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: Topic[];
  pyqRelevanceCount: number;
  totalQuestionCount: number;
  completionPercentage?: number;
}

export interface SubjectCurriculum {
  boardId: string;
  classId: string;
  streamId?: string; // 'science' | 'commerce' | 'arts'
  subjectId: string;
  subjectName: string;
  academicYear: string;
  chapters: Chapter[];
}

export interface QuestionData {
  id: string;
  chapterId: string;
  topicId: string;
  type:
    | 'mcq'
    | 'multiple_correct'
    | 'assertion_reason'
    | 'true_false'
    | 'fill_blank'
    | 'match_following'
    | 'one_word'
    | 'short_1m'
    | 'short_2m'
    | 'short_3m'
    | 'long_5m'
    | 'numerical'
    | 'derivation'
    | 'case_study'
    | 'hots';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marks: number;
  question: string;
  options?: { id: string; text: string }[];
  correctAnswer: any;
  explanation: string;
  commonMistake?: string;
  hints?: string[];
  // Match following
  matchLeft?: { id: string; label: string }[];
  matchRight?: { id: string; label: string }[];
  // Numerical specific
  givenData?: { label: string; value: string }[];
  formulaLatex?: string;
  solutionSteps?: string[];
  finalAnswerUnit?: string;
  // Derivation specific
  startingPrinciple?: string;
  derivationSteps?: { stepNumber: number; title: string; latex: string; explanation: string }[];
  finalResultLatex?: string;
  assumptions?: string[];
  // Metadata
  isPYQ?: boolean;
  pyqYear?: number;
  pyqBoard?: string;
}

export interface PYQPaper {
  id: string;
  boardId: string;
  classId: string;
  streamId?: string;
  subjectId: string;
  subjectName: string;
  year: number;
  academicYear: string;
  paperTitle: string;
  setNumber: string;
  totalMarks: number;
  durationMinutes: number;
  isCurrentSyllabus: boolean;
  warningNotice?: string;
  pdfUrl?: string;
  questions: QuestionData[];
}

// SUPPORTED BOARDS
export const BOARDS: Board[] = [
  {
    id: 'karnataka',
    name: 'Karnataka State Board (PUC)',
    shortCode: 'Karnataka KSEAB',
    description: 'Karnataka Pre-University Examination Board (1st & 2nd PUC)',
    supportedClasses: ['9', '10', '1st PUC (11)', '2nd PUC (12)'],
  },
  {
    id: 'cbse',
    name: 'Central Board of Secondary Education',
    shortCode: 'CBSE',
    description: 'National Level Board following NCERT Curriculum',
    supportedClasses: ['9', '10', 'Class 11', 'Class 12'],
  },
  {
    id: 'icse',
    name: 'Council for the Indian School Certificate Examinations',
    shortCode: 'ICSE / ISC',
    description: 'ICSE for Class 9-10 and ISC for Class 11-12',
    supportedClasses: ['9', '10', 'ISC 11', 'ISC 12'],
  },
  {
    id: 'tn',
    name: 'Tamil Nadu State Board',
    shortCode: 'TN State Board',
    description: 'Tamil Nadu Higher Secondary Education Board',
    supportedClasses: ['9', '10', 'Class 11', 'Class 12'],
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra State Board',
    shortCode: 'MSBSHSE',
    description: 'Maharashtra Secondary and Higher Secondary Board',
    supportedClasses: ['9', '10', 'Class 11', 'Class 12'],
  },
];

export const ACADEMIC_YEARS: AcademicYear[] = [
  { year: '2026-27', isCurrent: true },
  { year: '2025-26', isCurrent: false },
  { year: '2024-25', isCurrent: false },
];

// SUBJECTS AVAILABLE IN THE UPLOADED 2026-27 CLASS 11/12 SYLLABUS
export const SUBJECTS = [
  { id: 'physics', label: 'Physics' },
  { id: 'chemistry', label: 'Chemistry' },
  { id: 'mathematics', label: 'Mathematics' },
  { id: 'biology', label: 'Biology' },
  { id: 'computer_science', label: 'Computer Science' },
] as const;

export const getClassLevel = (classId: string): '11' | '12' | null => {
  if (classId.includes('11')) return '11';
  if (classId.includes('12')) return '12';
  return null;
};

const subjectShortCode: Record<string, string> = {
  physics: 'phy',
  chemistry: 'chem',
  mathematics: 'math',
  biology: 'bio',
  computer_science: 'cs',
};

const legacyKarnatakaPhysicsMetadata: Record<number, Partial<Chapter>> = {
  1: {
    weightageMarks: 9,
    estLearningMinutes: 120,
    difficulty: 'Medium',
    pyqRelevanceCount: 18,
    totalQuestionCount: 45,
    completionPercentage: 68,
  },
  2: {
    weightageMarks: 8,
    estLearningMinutes: 110,
    difficulty: 'Medium',
    pyqRelevanceCount: 15,
    totalQuestionCount: 38,
    completionPercentage: 40,
  },
  3: {
    weightageMarks: 11,
    estLearningMinutes: 150,
    difficulty: 'Hard',
    pyqRelevanceCount: 24,
    totalQuestionCount: 52,
    completionPercentage: 55,
  },
  4: {
    weightageMarks: 9,
    estLearningMinutes: 130,
    difficulty: 'Hard',
    pyqRelevanceCount: 16,
    totalQuestionCount: 40,
    completionPercentage: 20,
  },
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);

const chapterIdFor = (
  boardId: string,
  level: '11' | '12',
  subjectId: string,
  chapterNumber: number
) => {
  // Preserve the existing Karnataka 2nd PUC Physics chapter IDs so the
  // current sample question bank remains linked to Chapters 1 and 3.
  if (boardId === 'karnataka' && level === '12' && subjectId === 'physics') {
    return `kar-phy-ch${chapterNumber}`;
  }

  const boardPrefix = boardId === 'karnataka' ? 'kar' : boardId;
  return `${boardPrefix}-${level}-${subjectShortCode[subjectId] || subjectId}-ch${chapterNumber}`;
};

const topicIdFor = (
  boardId: string,
  level: '11' | '12',
  subjectId: string,
  chapterNumber: number,
  concept: string,
  index: number
) => {
  if (boardId === 'karnataka' && level === '12' && subjectId === 'physics') {
    if (concept === "Coulomb's Law") return 'topic-coulomb';
    if (concept === 'Electric Field') return 'topic-efield';
    if (concept === "Kirchhoff's Rules") return 'topic-kirchhoff';
  }

  return `${chapterIdFor(boardId, level, subjectId, chapterNumber)}-topic-${index + 1}-${slugify(concept)}`;
};

export function getSubjectCurriculum(
  boardId: string,
  classId: string,
  subjectId: string,
  academicYear = '2026-27'
): SubjectCurriculum {
  const level = getClassLevel(classId);
  const subjectLabel = SUBJECTS.find((subject) => subject.id === subjectId)?.label || subjectId;

  if (!level) {
    return {
      boardId,
      classId,
      streamId: 'science',
      subjectId,
      subjectName: subjectLabel,
      academicYear,
      chapters: [],
    };
  }

  // The supplied PDFs/markdown contain NCERT 2026-27 Class 11/12 science
  // curriculum data. It is enabled for Karnataka PUC and CBSE here.
  if (!['karnataka', 'cbse'].includes(boardId)) {
    return {
      boardId,
      classId,
      streamId: 'science',
      subjectId,
      subjectName: subjectLabel,
      academicYear,
      chapters: [],
    };
  }

  const rawSubject = SYLLABUS_2026_27[level]?.[subjectId];

  if (!rawSubject) {
    return {
      boardId,
      classId,
      streamId: 'science',
      subjectId,
      subjectName: subjectLabel,
      academicYear,
      chapters: [],
    };
  }

  return {
    boardId,
    classId,
    streamId: 'science',
    subjectId,
    subjectName: rawSubject.subjectName,
    academicYear,
    chapters: rawSubject.chapters.map((rawChapter) => {
      const chapterNumber = rawChapter.number;
      const isLegacyPhysics =
        boardId === 'karnataka' && level === '12' && subjectId === 'physics';
      const legacy = isLegacyPhysics
        ? legacyKarnatakaPhysicsMetadata[chapterNumber]
        : undefined;

      const topics: Topic[] = rawChapter.concepts.map((concept, index) => ({
        id: topicIdFor(boardId, level, subjectId, chapterNumber, concept, index),
        title: concept,
        priority: 'SUPPORTING',
        pyqCount: 0,
        typicalMarks: [],
        syllabusStatus: 'current',
        description: `Included in the uploaded 2026-27 syllabus under ${rawChapter.title}.`,
        subtopics: [],
      }));

      return {
        id: chapterIdFor(boardId, level, subjectId, chapterNumber),
        chapterNumber,
        title: rawChapter.title,
        description:
          rawChapter.concepts.length > 0
            ? `${rawChapter.concepts.length} syllabus concepts are mapped to this chapter.`
            : 'This chapter is listed in the uploaded syllabus. Detailed Biology subsection concepts were not present in the supplied contents.',
        weightageMarks: legacy?.weightageMarks ?? 0,
        estLearningMinutes: legacy?.estLearningMinutes ?? 0,
        difficulty: legacy?.difficulty ?? 'Medium',
        topics,
        pyqRelevanceCount: legacy?.pyqRelevanceCount ?? 0,
        totalQuestionCount: legacy?.totalQuestionCount ?? 0,
        completionPercentage: legacy?.completionPercentage ?? 0,
      };
    }),
  };
}

// Backward-compatible export used by the existing sample Physics question bank.
export const KARNATAKA_2PUC_PHYSICS_CURRICULUM: SubjectCurriculum =
  getSubjectCurriculum('karnataka', '2nd PUC (12)', 'physics', '2026-27');

// SAMPLE QUESTIONS FOR KARNATAKA 2ND PUC PHYSICS
export const SAMPLE_QUESTIONS: QuestionData[] = [
  {
    id: 'q-kar-1',
    chapterId: 'kar-phy-ch1',
    topicId: 'topic-coulomb',
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    question: 'What is the SI unit of electrostatic permittivity of free space ($\\varepsilon_0$)?',
    options: [
      { id: 'a', text: '$\\text{C}^2\\cdot\\text{N}^{-1}\\cdot\\text{m}^{-2}$' },
      { id: 'b', text: '$\\text{N}\\cdot\\text{m}^2\\cdot\\text{C}^{-2}$' },
      { id: 'c', text: '$\\text{C}\\cdot\\text{m}^{-1}$' },
      { id: 'd', text: '$\\text{N}\\cdot\\text{C}^{-1}\\cdot\\text{m}$' },
    ],
    correctAnswer: 'a',
    explanation: 'From Coulomb Law $F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q_1 q_2}{r^2}$, we get $\\varepsilon_0 = \\frac{q_1 q_2}{4\\pi F r^2}$. Thus unit is $\\text{C}^2/(\\text{N}\\cdot\\text{m}^2) = \\text{C}^2\\text{N}^{-1}\\text{m}^{-2}$.',
    commonMistake: 'Confusing $\\varepsilon_0$ units with the Coulomb constant $k = \\frac{1}{4\\pi\\varepsilon_0}$ unit.',
    isPYQ: true,
    pyqYear: 2024,
    pyqBoard: 'Karnataka 2nd PUC',
  },
  {
    id: 'q-kar-2',
    chapterId: 'kar-phy-ch1',
    topicId: 'topic-efield',
    type: 'derivation',
    difficulty: 'Hard',
    marks: 5,
    question: 'Derive an expression for the electric field at any point on the axial line of a short electric dipole.',
    correctAnswer: 'E_{axial} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{2p}{r^3}',
    explanation: 'Consider a dipole of charges $+q$ and $-q$ separated by $2a$. For a point $P$ at distance $r$ on the axial line, $E_+ = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{(r-a)^2}$ and $E_- = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{(r+a)^2}$. Net field $E = E_+ - E_- = \\frac{q}{4\\pi\\varepsilon_0} \\left[ \\frac{4ar}{(r^2-a^2)^2} \\right]$. For $r \\gg a$, $E_{axial} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{2p}{r^3}$.',
    startingPrinciple: 'Superposition Principle of Electric Fields due to individual point charges $+q$ and $-q$.',
    derivationSteps: [
      { stepNumber: 1, title: 'Field due to positive charge (+q)', latex: 'E_+ = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q}{(r-a)^2}', explanation: 'Directed away from +q along the dipole axis.' },
      { stepNumber: 2, title: 'Field due to negative charge (-q)', latex: 'E_- = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q}{(r+a)^2}', explanation: 'Directed towards -q along the dipole axis.' },
      { stepNumber: 3, title: 'Net Axial Field', latex: 'E_{net} = E_+ - E_- = \\frac{q}{4\\pi\\varepsilon_0} \\left[ \\frac{1}{(r-a)^2} - \\frac{1}{(r+a)^2} \\right]', explanation: 'Subtract opposing field vectors.' },
      { stepNumber: 4, title: 'Short Dipole Approximation (r >> a)', latex: 'E_{axial} \\approx \\frac{1}{4\\pi\\varepsilon_0} \\frac{2p}{r^3}', explanation: 'Substitute dipole moment $p = q \\times 2a$ and ignore $a^2$ relative to $r^2$.' },
    ],
    finalResultLatex: 'E_{axial} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{2p}{r^3}',
    assumptions: ['The dipole length $2a$ is negligible compared to the distance $r$ ($r \\gg a$).'],
    isPYQ: true,
    pyqYear: 2025,
    pyqBoard: 'Karnataka 2nd PUC',
  },
  {
    id: 'q-kar-3',
    chapterId: 'kar-phy-ch1',
    topicId: 'topic-coulomb',
    type: 'numerical',
    difficulty: 'Medium',
    marks: 3,
    question: 'Two point charges $q_1 = +2\\, \\mu\\text{C}$ and $q_2 = -6\\, \\mu\\text{C}$ are separated by $10\\text{ cm}$ in air. Calculate the force of attraction between them.',
    correctAnswer: '10.798 N',
    explanation: 'Substitute values into Coulomb law formula in SI units ($q_1 = 2\\times 10^{-6}\\text{ C}$, $q_2 = 6\\times 10^{-6}\\text{ C}$, $r = 0.1\\text{ m}$).',
    givenData: [
      { label: 'Charge q1', value: '2 * 10^-6 C' },
      { label: 'Charge q2', value: '6 * 10^-6 C' },
      { label: 'Distance r', value: '0.1 m' },
      { label: 'Permittivity factor 1/(4 pi eps0)', value: '8.988 * 10^9 N m^2/C^2' },
    ],
    formulaLatex: 'F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q_1 q_2|}{r^2}',
    solutionSteps: [
      'Convert distance: $r = 10\\text{ cm} = 0.1\\text{ m}$.',
      'Calculate charge product: $|q_1 q_2| = (2\\times 10^{-6}) \\times (6\\times 10^{-6}) = 12\\times 10^{-12}\\text{ C}^2$.',
      'Substitute into formula: $F = (8.988\\times 10^9) \\times \\frac{12\\times 10^{-12}}{(0.1)^2}$.',
      'Final answer: $F = 10.79\\text{ N}$ (Attractive Force).',
    ],
    finalAnswerUnit: 'Newton (N)',
    isPYQ: true,
    pyqYear: 2023,
    pyqBoard: 'Karnataka 2nd PUC',
  },
  {
    id: 'q-kar-4',
    chapterId: 'kar-phy-ch3',
    topicId: 'topic-kirchhoff',
    type: 'assertion_reason',
    difficulty: 'Medium',
    marks: 2,
    question: 'Assertion (A): Kirchhoff’s Junction Rule is based on the law of conservation of charge.\nReason (R): In a closed electrical circuit, total incoming current at a junction equals total outgoing current.',
    options: [
      { id: 'a', text: 'Both A and R are true, and R is the correct explanation of A' },
      { id: 'b', text: 'Both A and R are true, but R is NOT the correct explanation of A' },
      { id: 'c', text: 'A is true but R is false' },
      { id: 'd', text: 'A is false but R is true' },
    ],
    correctAnswer: 'a',
    explanation: 'Charges cannot accumulate at a junction in steady state current flow; hence charge conservation directly implies $\\sum I_{in} = \\sum I_{out}$.',
    isPYQ: true,
    pyqYear: 2024,
    pyqBoard: 'Karnataka 2nd PUC',
  },
  {
    id: 'q-kar-5',
    chapterId: 'kar-phy-ch3',
    topicId: 'topic-kirchhoff',
    type: 'short_3m',
    difficulty: 'Medium',
    marks: 3,
    question: 'State Kirchhoff’s loop rule and explain its physical significance.',
    correctAnswer: 'Sum of potential differences in a closed loop is zero.',
    explanation: 'Kirchhoff’s Loop Rule states that the algebraic sum of changes in potential around any closed circuit loop must be zero (\\sum \\Delta V = 0). Physical significance: It is a direct statement of the Law of Conservation of Energy.',
    isPYQ: true,
    pyqYear: 2025,
    pyqBoard: 'Karnataka 2nd PUC',
  },
];

export function getQuestionsForCurriculum(curriculum: SubjectCurriculum): QuestionData[] {
  const level = getClassLevel(curriculum.classId);
  if (
    curriculum.boardId === 'karnataka' &&
    level === '12' &&
    curriculum.subjectId === 'physics'
  ) {
    return SAMPLE_QUESTIONS;
  }

  return [];
}

// PREVIOUS YEAR PAPERS BANK
export const PYQ_PAPERS_BANK: PYQPaper[] = [
  {
    id: 'pyq-kar-2025',
    boardId: 'karnataka',
    classId: '2nd PUC (12)',
    streamId: 'science',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 2025,
    academicYear: '2025-26',
    paperTitle: 'Karnataka 2nd PUC Physics Annual Examination 2025 (Set A)',
    setNumber: 'Set A',
    totalMarks: 70,
    durationMinutes: 195,
    isCurrentSyllabus: true,
    pdfUrl: 'https://kseab.karnataka.gov.in/physics-2025-sample.pdf',
    questions: SAMPLE_QUESTIONS,
  },
  {
    id: 'pyq-kar-2024',
    boardId: 'karnataka',
    classId: '2nd PUC (12)',
    streamId: 'science',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 2024,
    academicYear: '2024-25',
    paperTitle: 'Karnataka 2nd PUC Physics Annual Examination 2024',
    setNumber: 'Main Set',
    totalMarks: 70,
    durationMinutes: 195,
    isCurrentSyllabus: true,
    pdfUrl: 'https://kseab.karnataka.gov.in/physics-2024.pdf',
    questions: SAMPLE_QUESTIONS,
  },
  {
    id: 'pyq-kar-2022',
    boardId: 'karnataka',
    classId: '2nd PUC (12)',
    streamId: 'science',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 2022,
    academicYear: '2021-22',
    paperTitle: 'Karnataka 2nd PUC Physics Board Paper 2022 (Older Pattern)',
    setNumber: 'Set 1',
    totalMarks: 70,
    durationMinutes: 195,
    isCurrentSyllabus: false,
    warningNotice: 'Contains questions from Potentiometer and Van de Graaff Generator which were removed in the 2024-25 curriculum revision.',
    pdfUrl: 'https://kseab.karnataka.gov.in/physics-2022.pdf',
    questions: SAMPLE_QUESTIONS,
  },
  {
    id: 'pyq-cbse-2025',
    boardId: 'cbse',
    classId: 'Class 12',
    streamId: 'science',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 2025,
    academicYear: '2025-26',
    paperTitle: 'CBSE Class 12 Physics All India Examination 2025 (Set 55/1/1)',
    setNumber: 'Set 1',
    totalMarks: 70,
    durationMinutes: 180,
    isCurrentSyllabus: true,
    pdfUrl: 'https://cbse.gov.in/pyq2025-phy.pdf',
    questions: SAMPLE_QUESTIONS,
  },
];
