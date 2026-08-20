export interface RevisionFlashcard {
  id: string;
  classId: '11' | '12';
  subjectId: 'physics' | 'chemistry' | 'mathematics' | 'biology' | 'computer_science';
  chapterId: string; // Chapter ID or matching key
  conceptId: string; // Concept ID or matching title/slug
  front: string;
  back: string;
  formula?: string;
  hint?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  examTip?: string;
}

export interface RevisionFormula {
  id: string;
  classId: '11' | '12';
  subjectId: 'physics' | 'chemistry' | 'mathematics' | 'biology' | 'computer_science';
  chapterId: string;
  conceptId: string;
  label: string;
  latex: string;
  notes: string;
}

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const FLASHCARDS_REPOSITORY: RevisionFlashcard[] = [
  // ==========================================
  // CLASS 12 PHYSICS
  // ==========================================
  {
    id: 'phy12-ch1-coulomb-1',
    classId: '12',
    subjectId: 'physics',
    chapterId: 'kar-phy-ch1',
    conceptId: 'topic-coulomb',
    front: 'What is Coulomb\'s Law in vector form?',
    back: '$\\vec{F}_{12} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q_1 q_2}{r^2} \\hat{r}_{12}$',
    formula: 'F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2}',
    examTip: 'Remember force is attractive for opposite charges and repulsive for like charges.'
  },
  {
    id: 'phy12-ch1-coulomb-2',
    classId: '12',
    subjectId: 'physics',
    chapterId: 'kar-phy-ch1',
    conceptId: 'topic-coulomb',
    front: 'What is the SI unit and value of permittivity of free space (\\varepsilon_0)?',
    back: '$\\varepsilon_0 = 8.854 \\times 10^{-12} \\text{ C}^2\\cdot\\text{N}^{-1}\\cdot\\text{m}^{-2}$',
  },
  {
    id: 'phy12-ch1-efield-1',
    classId: '12',
    subjectId: 'physics',
    chapterId: 'kar-phy-ch1',
    conceptId: 'topic-efield',
    front: 'What is the Electric Field formula due to a point charge?',
    back: '$E = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|Q|}{r^2}$',
    examTip: 'Electric field points radially outwards from positive charge and inwards towards negative charge.'
  },
  {
    id: 'phy12-ch1-efield-2',
    classId: '12',
    subjectId: 'physics',
    chapterId: 'kar-phy-ch1',
    conceptId: 'topic-efield',
    front: 'What is torque (\\tau) on an electric dipole in a uniform electric field E?',
    back: '$\\vec{\\tau} = \\vec{p} \\times \\vec{E} = p E \\sin\\theta$',
  },
  {
    id: 'phy12-ch1-gauss-1',
    classId: '12',
    subjectId: 'physics',
    chapterId: 'kar-phy-ch1',
    conceptId: 'topic-gauss',
    front: 'State Gauss\'s Law statement equation.',
    back: '$\\Phi_E = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{\\text{enclosed}}}{\\varepsilon_0}$',
  },
  {
    id: 'phy12-ch2-cap-1',
    classId: '12',
    subjectId: 'physics',
    chapterId: 'kar-phy-ch2',
    conceptId: 'topic-capacitance',
    front: 'What is the capacitance of a parallel plate capacitor with dielectric medium K?',
    back: '$C = \\frac{K \\varepsilon_0 A}{d}$',
  },
  {
    id: 'phy12-ch3-drift-1',
    classId: '12',
    subjectId: 'physics',
    chapterId: 'kar-phy-ch3',
    conceptId: 'topic-drift',
    front: 'Write the microscopic expression relating current density J to drift velocity v_d.',
    back: '$J = n e v_d$',
  },
  {
    id: 'phy12-ch3-kirchhoff-1',
    classId: '12',
    subjectId: 'physics',
    chapterId: 'kar-phy-ch3',
    conceptId: 'topic-kirchhoff',
    front: 'What is Kirchhoff\'s Junction Rule based on?',
    back: 'Conservation of Charge ($\\sum I_{\\text{in}} = \\sum I_{\\text{out}}$)',
  },

  // ==========================================
  // CLASS 12 CHEMISTRY
  // ==========================================
  {
    id: 'chem12-ch1-solutions-1',
    classId: '12',
    subjectId: 'chemistry',
    chapterId: 'kar-12-chem-ch1',
    conceptId: 'kar-12-chem-ch1-topic-1-types-of-solutions',
    front: 'What is Raoult\'s Law for volatile liquids?',
    back: 'For a solution of volatile liquids, partial vapour pressure of each component is directly proportional to its mole fraction: $p_A = p_A^0 x_A$',
  },
  {
    id: 'chem12-ch2-electro-1',
    classId: '12',
    subjectId: 'chemistry',
    chapterId: 'kar-12-chem-ch2',
    conceptId: 'kar-12-chem-ch2-topic-3-nernst-equation',
    front: 'Write the Nernst equation for a single electrode reaction $M^{n+} + n e^- \\to M(s)$ at 298 K.',
    back: '$E_{M^{n+}/M} = E^0_{M^{n+}/M} - \\frac{0.0591}{n} \\log \\frac{1}{[M^{n+}]}$',
    examTip: 'n is the number of electrons transferred in the balanced redox equation.'
  },
  {
    id: 'chem12-ch2-electro-2',
    classId: '12',
    subjectId: 'chemistry',
    chapterId: 'kar-12-chem-ch2',
    conceptId: 'kar-12-chem-ch2-topic-3-nernst-equation',
    front: 'How is standard cell EMF (E°cell) related to equilibrium constant (K_c)?',
    back: '$E^0_{\\text{cell}} = \\frac{2.303 R T}{n F} \\log K_c = \\frac{0.0591}{n} \\log K_c$',
  },
  {
    id: 'chem12-ch2-electro-3',
    classId: '12',
    subjectId: 'chemistry',
    chapterId: 'kar-12-chem-ch2',
    conceptId: 'kar-12-chem-ch2-topic-2-galvanic-cells',
    front: 'In a Galvanic cell, at which electrode does oxidation take place?',
    back: 'Anode (Negative terminal). Mnemonic: ANOX (Anode Oxidation) & REDCAT (Reduction Cathode).',
  },
  {
    id: 'chem12-ch2-electro-4',
    classId: '12',
    subjectId: 'chemistry',
    chapterId: 'kar-12-chem-ch2',
    conceptId: 'kar-12-chem-ch2-topic-4-conductance-of-electrolytic-solutions',
    front: 'What is Kohlrausch\'s Law of Independent Migration of Ions?',
    back: 'Limiting molar conductivity of an electrolyte can be represented as the sum of individual contributions of anion and cation: $\\Lambda_m^0 = \\nu_+ \\lambda_+^0 + \\nu_- \\lambda_-^0$',
  },
  {
    id: 'chem12-ch3-kinetics-1',
    classId: '12',
    subjectId: 'chemistry',
    chapterId: 'kar-12-chem-ch3',
    conceptId: 'kar-12-chem-ch3-topic-1-rate-of-a-chemical-reaction',
    front: 'What is the integrated rate equation for a First-Order reaction?',
    back: '$k = \\frac{2.303}{t} \\log \\frac{[A]_0}{[A]}$',
  },
  {
    id: 'chem12-ch10-biomol-1',
    classId: '12',
    subjectId: 'chemistry',
    chapterId: 'kar-12-chem-ch10',
    conceptId: 'kar-12-chem-ch10-topic-1-carbohydrates',
    front: 'What type of linkage joins glucose units in sucrose?',
    back: '$\\alpha, \\beta-1,2$-glycosidic linkage between C1 of $\\alpha$-D-glucose and C2 of $\\beta$-D-fructose.',
  },

  // ==========================================
  // CLASS 12 MATHEMATICS
  // ==========================================
  {
    id: 'math12-ch7-integrals-1',
    classId: '12',
    subjectId: 'mathematics',
    chapterId: 'kar-12-math-ch7',
    conceptId: 'kar-12-math-ch7-topic-5-integration-by-parts',
    front: 'Write the Integration by Parts formula.',
    back: '$\\int u \\cdot v \\, dx = u \\int v \\, dx - \\int \\left( \\frac{du}{dx} \\int v \\, dx \\right) dx$',
    examTip: 'Use the ILATE rule to choose the first function u.'
  },
  {
    id: 'math12-ch7-integrals-2',
    classId: '12',
    subjectId: 'mathematics',
    chapterId: 'kar-12-math-ch7',
    conceptId: 'kar-12-math-ch7-topic-5-integration-by-parts',
    front: 'What is $\\int e^x [f(x) + f\'(x)] \\, dx$ equal to?',
    back: '$e^x f(x) + C$',
  },
  {
    id: 'math12-ch7-integrals-3',
    classId: '12',
    subjectId: 'mathematics',
    chapterId: 'kar-12-math-ch7',
    conceptId: 'kar-12-math-ch7-topic-9-properties-of-definite-integrals',
    front: 'State King\'s Property for definite integrals $\\int_a^b f(x) \\, dx$.',
    back: '$\\int_a^b f(x) \\, dx = \\int_a^b f(a + b - x) \\, dx$',
  },
  {
    id: 'math12-ch3-matrices-1',
    classId: '12',
    subjectId: 'mathematics',
    chapterId: 'kar-12-math-ch3',
    conceptId: 'kar-12-math-ch3-topic-5-symmetric-and-skew-symmetric-matrices',
    front: 'What defines a Skew-Symmetric Matrix A?',
    back: '$A^T = -A$. All diagonal elements of a skew-symmetric matrix are always zero.',
  },
  {
    id: 'math12-ch13-prob-1',
    classId: '12',
    subjectId: 'mathematics',
    chapterId: 'kar-12-math-ch13',
    conceptId: 'kar-12-math-ch13-topic-4-bayes-theorem',
    front: 'State Bayes\' Theorem formula for event $E_i$ given event $A$.',
    back: '$P(E_i | A) = \\frac{P(E_i) P(A | E_i)}{\\sum_{j=1}^n P(E_j) P(A | E_j)}$',
  },

  // ==========================================
  // CLASS 12 BIOLOGY
  // ==========================================
  {
    id: 'bio12-ch1-reprod-1',
    classId: '12',
    subjectId: 'biology',
    chapterId: 'kar-12-bio-ch1',
    conceptId: 'kar-12-bio-ch1-topic-1-sexual-reproduction-in-flowering-plants',
    front: 'What is Double Fertilisation in angiosperms?',
    back: 'It consists of Syngamy (fusion of egg cell with 1st male gamete to form diploid zygote) and Triple Fusion (fusion of 2nd male gamete with polar nuclei to form triploid primary endosperm nucleus).',
  },
  {
    id: 'bio12-ch2-human-1',
    classId: '12',
    subjectId: 'biology',
    chapterId: 'kar-12-bio-ch2',
    conceptId: 'kar-12-bio-ch2-topic-1-human-reproduction',
    front: 'Which hormone triggers ovulation during the menstrual cycle?',
    back: 'LH Surge (rapid surge of Luteinising Hormone) around the 14th day of the cycle.',
  },

  // ==========================================
  // CLASS 12 COMPUTER SCIENCE
  // ==========================================
  {
    id: 'cs12-ch1-exc-1',
    classId: '12',
    subjectId: 'computer_science',
    chapterId: 'kar-12-cs-ch1',
    conceptId: 'kar-12-cs-ch1-topic-1-syntax-errors',
    front: 'What is the difference between Syntax Error and Exception in Python?',
    back: 'Syntax Errors occur due to improper language structure before code execution. Exceptions occur during runtime when valid syntax encounters an illegal operation (e.g. ZeroDivisionError).',
  },
  {
    id: 'cs12-ch1-exc-2',
    classId: '12',
    subjectId: 'computer_science',
    chapterId: 'kar-12-cs-ch1',
    conceptId: 'kar-12-cs-ch1-topic-6-finally-clause',
    front: 'When is the `finally` block executed in Python exception handling?',
    back: 'The `finally` block ALWAYS executes, regardless of whether an exception was raised, caught, or unhandled. Used for cleanup actions like closing files.',
  },
  {
    id: 'cs12-ch3-stack-1',
    classId: '12',
    subjectId: 'computer_science',
    chapterId: 'kar-12-cs-ch3',
    conceptId: 'kar-12-cs-ch3-topic-1-stack',
    front: 'What principle does a Stack data structure follow?',
    back: 'LIFO (Last In First Out). Insertion and deletion happen at the top end.',
  },
  {
    id: 'cs12-ch9-sql-1',
    classId: '12',
    subjectId: 'computer_science',
    chapterId: 'kar-12-cs-ch9',
    conceptId: 'kar-12-cs-ch9-topic-8-group-by-clause',
    front: 'What is the purpose of the `GROUP BY` clause in SQL?',
    back: 'It groups rows with identical values in specified columns into summary rows (used with aggregate functions like COUNT, SUM, AVG, MAX, MIN).',
  },

  // ==========================================
  // CLASS 11 SUBJECTS
  // ==========================================
  {
    id: 'phy11-ch1-units-1',
    classId: '11',
    subjectId: 'physics',
    chapterId: 'kar-11-phy-ch1',
    conceptId: 'kar-11-phy-ch1-topic-1-the-international-system-of-units',
    front: 'Name the 7 base SI units.',
    back: 'Meter (m), Kilogram (kg), Second (s), Ampere (A), Kelvin (K), Mole (mol), and Candela (cd).',
  },
  {
    id: 'chem11-ch1-basic-1',
    classId: '11',
    subjectId: 'chemistry',
    chapterId: 'kar-11-chem-ch1',
    conceptId: 'kar-11-chem-ch1-topic-8-mole-concept-and-molar-masses',
    front: 'Define Avogadro\'s Constant ($N_A$).',
    back: 'The exact number of elementary entities in 1 mole of substance: $6.02214076 \\times 10^{23} \\text{ mol}^{-1}$.',
  },
  {
    id: 'math11-ch1-sets-1',
    classId: '11',
    subjectId: 'mathematics',
    chapterId: 'kar-11-math-ch1',
    conceptId: 'kar-11-math-ch1-topic-7-venn-diagrams',
    front: 'What is de Morgan\'s First Law for sets A and B?',
    back: '$(A \\cup B)\' = A\' \\cap B\'$',
  },
  {
    id: 'bio11-ch8-cell-1',
    classId: '11',
    subjectId: 'biology',
    chapterId: 'kar-11-bio-ch8',
    conceptId: 'kar-11-bio-ch8-topic-1-cell-the-unit-of-life',
    front: 'Which organelle is known as the powerhouse of the cell?',
    back: 'Mitochondria (site of aerobic respiration and ATP generation).',
  },
  {
    id: 'cs11-ch5-py-1',
    classId: '11',
    subjectId: 'computer_science',
    chapterId: 'kar-11-cs-ch5',
    conceptId: 'kar-11-cs-ch5-topic-1-python-keywords',
    front: 'Can Python keywords be used as variable names?',
    back: 'No. Keywords are reserved words in Python with fixed meanings (e.g., `for`, `if`, `class`, `def`).',
  }
];

export const FORMULAS_REPOSITORY: RevisionFormula[] = [
  // Physics 12 Electrostatics
  {
    id: 'f-phy12-1',
    classId: '12',
    subjectId: 'physics',
    chapterId: 'kar-phy-ch1',
    conceptId: 'topic-coulomb',
    label: 'Coulomb\'s Law Force',
    latex: 'F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q_1 q_2|}{r^2}',
    notes: 'where $\\frac{1}{4\\pi\\varepsilon_0} \\approx 8.99 \\times 10^9 \\text{ N}\\cdot\\text{m}^2/\\text{C}^2$',
  },
  {
    id: 'f-phy12-2',
    classId: '12',
    subjectId: 'physics',
    chapterId: 'kar-phy-ch1',
    conceptId: 'topic-efield',
    label: 'Electric Field of Point Charge',
    latex: 'E = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|Q|}{r^2}',
    notes: 'Field vector points away from positive charge and towards negative charge.',
  },

  // Chemistry 12 Electrochemistry
  {
    id: 'f-chem12-1',
    classId: '12',
    subjectId: 'chemistry',
    chapterId: 'kar-12-chem-ch2',
    conceptId: 'kar-12-chem-ch2-topic-3-nernst-equation',
    label: 'Nernst Equation for Cell EMF',
    latex: 'E_{\\text{cell}} = E^0_{\\text{cell}} - \\frac{0.0591}{n} \\log Q',
    notes: 'Calculated at T = 298 K, where Q is the reaction quotient.',
  },
  {
    id: 'f-chem12-2',
    classId: '12',
    subjectId: 'chemistry',
    chapterId: 'kar-12-chem-ch2',
    conceptId: 'kar-12-chem-ch2-topic-3-nernst-equation',
    label: 'Gibbs Energy & Cell EMF',
    latex: '\\Delta_r G^0 = -n F E^0_{\\text{cell}}',
    notes: 'where F = 96487 C/mol is Faraday constant.',
  },

  // Math 12 Integrals
  {
    id: 'f-math12-1',
    classId: '12',
    subjectId: 'mathematics',
    chapterId: 'kar-12-math-ch7',
    conceptId: 'kar-12-math-ch7-topic-5-integration-by-parts',
    label: 'Integration by Parts Rule',
    latex: '\\int u \\, dv = u v - \\int v \\, du',
    notes: 'Use ILATE order to select u.',
  },

  // Computer Science 12 Stack
  {
    id: 'f-cs12-1',
    classId: '12',
    subjectId: 'computer_science',
    chapterId: 'kar-12-cs-ch3',
    conceptId: 'kar-12-cs-ch3-topic-1-stack',
    label: 'Stack Operation Complexity',
    latex: '\\text{Time Complexity: } O(1) \\text{ for Push and Pop}',
    notes: 'LIFO access pattern using list `.append()` and `.pop()`.',
  }
];

export function filterRevisionFlashcards(
  classId: string,
  subjectId: string,
  chapterId?: string,
  conceptId?: string
): RevisionFlashcard[] {
  const normClass = classId.includes('11') ? '11' : classId.includes('12') ? '12' : '';
  const normSubject = subjectId.toLowerCase();

  return FLASHCARDS_REPOSITORY.filter((card) => {
    if (card.classId !== normClass) return false;
    if (card.subjectId !== normSubject) return false;

    if (chapterId && chapterId !== 'all') {
      // Loose match by ID or slug/chapterNumber
      const cMatch =
        card.chapterId === chapterId ||
        card.chapterId.endsWith(chapterId) ||
        chapterId.endsWith(card.chapterId);
      if (!cMatch) return false;
    }

    if (conceptId && conceptId !== 'all') {
      const topicMatch =
        card.conceptId === conceptId ||
        slugify(card.conceptId).includes(slugify(conceptId)) ||
        slugify(conceptId).includes(slugify(card.conceptId));
      if (!topicMatch) return false;
    }

    return true;
  });
}

export function filterRevisionFormulas(
  classId: string,
  subjectId: string,
  chapterId?: string,
  conceptId?: string
): RevisionFormula[] {
  const normClass = classId.includes('11') ? '11' : classId.includes('12') ? '12' : '';
  const normSubject = subjectId.toLowerCase();

  return FORMULAS_REPOSITORY.filter((form) => {
    if (form.classId !== normClass) return false;
    if (form.subjectId !== normSubject) return false;

    if (chapterId && chapterId !== 'all') {
      const cMatch =
        form.chapterId === chapterId ||
        form.chapterId.endsWith(chapterId) ||
        chapterId.endsWith(form.chapterId);
      if (!cMatch) return false;
    }

    if (conceptId && conceptId !== 'all') {
      const topicMatch =
        form.conceptId === conceptId ||
        slugify(form.conceptId).includes(slugify(conceptId)) ||
        slugify(conceptId).includes(slugify(form.conceptId));
      if (!topicMatch) return false;
    }

    return true;
  });
}
