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

// KARNATAKA 2nd PUC PHYSICS CURRICULUM DATA
export const KARNATAKA_2PUC_PHYSICS_CURRICULUM: SubjectCurriculum = {
  boardId: 'karnataka',
  classId: '2nd PUC (12)',
  streamId: 'science',
  subjectId: 'physics',
  subjectName: 'Physics',
  academicYear: '2026-27',
  chapters: [
    {
      id: 'kar-phy-ch1',
      chapterNumber: 1,
      title: 'Electric Charges and Fields',
      description: 'Coulomb law, electric field, dipoles, and Gauss law applications.',
      weightageMarks: 9,
      estLearningMinutes: 120,
      difficulty: 'Medium',
      pyqRelevanceCount: 18,
      totalQuestionCount: 45,
      completionPercentage: 68,
      topics: [
        {
          id: 'topic-coulomb',
          title: "Coulomb's Law & Electrostatic Force",
          priority: 'HIGH',
          pyqCount: 7,
          typicalMarks: [2, 3, 5],
          syllabusStatus: 'current',
          description: 'Inverse-square force between point charges in vacuum and medium.',
          subtopics: ['Permittivity of Free Space', 'Vector Form of Coulomb Law', 'Superposition Principle'],
        },
        {
          id: 'topic-efield',
          title: 'Electric Field & Electric Dipole',
          priority: 'HIGH',
          pyqCount: 6,
          typicalMarks: [3, 5],
          syllabusStatus: 'current',
          description: 'Electric field intensity due to axial and equatorial point charges & dipoles.',
          subtopics: ['Axial Field Derivation', 'Equatorial Field Derivation', 'Torque on Dipole'],
        },
        {
          id: 'topic-gauss',
          title: "Gauss's Law & Applications",
          priority: 'HIGH',
          pyqCount: 5,
          typicalMarks: [3, 5],
          syllabusStatus: 'current',
          description: 'Electric flux calculation and field due to infinite wire and plane sheet.',
          subtopics: ['Electric Flux', 'Proof of Gauss Law', 'Field due to Infinitely Long Wire'],
        },
        {
          id: 'topic-field-lines',
          title: 'Electric Field Lines Properties',
          priority: 'SUPPORTING',
          pyqCount: 2,
          typicalMarks: [1, 2],
          syllabusStatus: 'current',
          description: 'Visual representations of electric fields and key property rules.',
          subtopics: ['Lines of Force', 'Equipotential Surface Intersection'],
        },
      ],
    },
    {
      id: 'kar-phy-ch2',
      chapterNumber: 2,
      title: 'Electrostatic Potential and Capacitance',
      description: 'Electric potential, equipotential surfaces, dielectrics, and capacitors.',
      weightageMarks: 8,
      estLearningMinutes: 110,
      difficulty: 'Medium',
      pyqRelevanceCount: 15,
      totalQuestionCount: 38,
      completionPercentage: 40,
      topics: [
        {
          id: 'topic-potential',
          title: 'Electric Potential due to Point Charge & Dipole',
          priority: 'HIGH',
          pyqCount: 5,
          typicalMarks: [2, 3, 5],
          syllabusStatus: 'current',
          description: 'Work done in moving charge and potential derivation.',
          subtopics: ['Relation between E and V', 'Potential Energy of Dipole'],
        },
        {
          id: 'topic-capacitance',
          title: 'Parallel Plate Capacitor & Energy Stored',
          priority: 'HIGH',
          pyqCount: 7,
          typicalMarks: [3, 5],
          syllabusStatus: 'current',
          description: 'Capacitance formula derivation, series & parallel combinations.',
          subtopics: ['Dielectric Medium Effect', 'Series and Parallel Combination', 'Energy Density'],
        },
        {
          id: 'topic-vande-graaff',
          title: 'Van de Graaff Generator',
          priority: 'SUPPORTING',
          pyqCount: 0,
          typicalMarks: [],
          syllabusStatus: 'deleted',
          description: 'High voltage particle accelerator (Removed from 2024-25 syllabus onwards).',
          subtopics: ['Principle of Working', 'Construction Details'],
        },
      ],
    },
    {
      id: 'kar-phy-ch3',
      chapterNumber: 3,
      title: 'Current Electricity',
      description: 'Ohm law, drift velocity, Kirchhoff laws, and Wheatstone bridge.',
      weightageMarks: 11,
      estLearningMinutes: 150,
      difficulty: 'Hard',
      pyqRelevanceCount: 24,
      totalQuestionCount: 52,
      completionPercentage: 55,
      topics: [
        {
          id: 'topic-drift',
          title: 'Drift Velocity & Ohm Law Derivation',
          priority: 'HIGH',
          pyqCount: 8,
          typicalMarks: [2, 3, 5],
          syllabusStatus: 'current',
          description: 'Relaxation time, mobility, and microscopic relation J = n e v_d.',
          subtopics: ['Derivation of Ohm Law', 'Temperature Dependence of Resistivity'],
        },
        {
          id: 'topic-kirchhoff',
          title: "Kirchhoff's Rules & Wheatstone Bridge",
          priority: 'HIGH',
          pyqCount: 11,
          typicalMarks: [3, 5],
          syllabusStatus: 'current',
          description: 'Junction rule, Loop rule, and Wheatstone bridge balance condition derivation.',
          subtopics: ['KCL and KVL Loop Analysis', 'Balanced Wheatstone Bridge Derivation'],
        },
        {
          id: 'topic-potentiometer',
          title: 'Potentiometer Applications',
          priority: 'IMPORTANT',
          pyqCount: 3,
          typicalMarks: [3, 5],
          syllabusStatus: 'deleted',
          description: 'Comparing EMF and internal resistance (Removed in latest NCERT/Karnataka update).',
          subtopics: ['EMF Comparison', 'Internal Resistance Measurement'],
        },
      ],
    },
    {
      id: 'kar-phy-ch4',
      chapterNumber: 4,
      title: 'Moving Charges and Magnetism',
      description: 'Biot-Savart law, Ampere circuital law, moving coil galvanometer.',
      weightageMarks: 9,
      estLearningMinutes: 130,
      difficulty: 'Hard',
      pyqRelevanceCount: 16,
      totalQuestionCount: 40,
      completionPercentage: 20,
      topics: [
        {
          id: 'topic-biot-savart',
          title: 'Biot-Savart Law & Circular Loop Field',
          priority: 'HIGH',
          pyqCount: 6,
          typicalMarks: [3, 5],
          syllabusStatus: 'current',
          description: 'Magnetic field derivation at the center and axis of a current circular loop.',
          subtopics: ['Axis of Circular Loop', 'Comparison with Coulomb Law'],
        },
        {
          id: 'topic-galvanometer',
          title: 'Moving Coil Galvanometer Conversion',
          priority: 'HIGH',
          pyqCount: 7,
          typicalMarks: [3, 5],
          syllabusStatus: 'current',
          description: 'Conversion of Galvanometer into Ammeter (Shunt) and Voltmeter (High R).',
          subtopics: ['Galvanometer Principle', 'Conversion to Ammeter', 'Conversion to Voltmeter'],
        },
      ],
    },
  ],
};

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
