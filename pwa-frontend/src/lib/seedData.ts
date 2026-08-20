export interface CurriculumOption {
  id: string;
  name: string;
  classes: string[];
}

export const SUPPORTED_CURRICULUMS: CurriculumOption[] = [
  { id: 'cbse', name: 'CBSE', classes: ['9', '10', '11', '12'] },
  { id: 'ncert', name: 'NCERT', classes: ['9', '10', '11', '12'] },
  { id: 'karnataka', name: 'Karnataka State Board', classes: ['9', '10', '1st PUC (Class 11)', '2nd PUC (Class 12)'] },
  { id: 'icse', name: 'ICSE', classes: ['9', '10'] },
  { id: 'isc', name: 'ISC', classes: ['11', '12'] },
];

export interface QuestionData {
  id: string;
  conceptId: string;
  type:
    | 'mcq'
    | 'true_false'
    | 'fill_blank'
    | 'match_following'
    | 'sequence'
    | 'assertion_reason'
    | 'numerical'
    | 'derivation'
    | 'subjective';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
  bloomLevel: 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate';
  marks: number;
  question: string;
  options?: { id: string; text: string }[];
  correctAnswer: string | string[] | { [key: string]: string };
  explanation: string;
  commonMistake?: string;
  hints?: string[];
  // For Match the Following
  matchLeft?: { id: string; label: string }[];
  matchRight?: { id: string; label: string }[];
  // For Numerical
  givenData?: { label: string; value: string }[];
  formulaLatex?: string;
  solutionSteps?: string[];
  finalAnswerUnit?: string;
  // For Derivation
  derivationSteps?: { stepNumber: number; title: string; latex: string; explanation: string }[];
}

export interface ConceptDetail {
  id: string;
  chapterId: string;
  title: string;
  simpleExplanation: string;
  intuitiveExample: string;
  detailedExplanation: string;
  formulas: { label: string; latex: string; notes: string }[];
  importantPoints: string[];
  commonMistakes: string[];
  youtubeVideo: {
    title: string;
    channel: string;
    videoUrl: string;
    thumbnailUrl: string;
    duration: string;
    language: string;
  };
  activeRecallQuestions: string[];
  flashcards: { id: string; front: string; back: string }[];
  masteryScore: number;
}

export const DEMO_CONCEPT: ConceptDetail = {
  id: 'electric-field-point-charge',
  chapterId: 'electrostatics-ch1',
  title: "Electric Field Due to a Point Charge",
  simpleExplanation: "An electric field is an invisible space around a charged particle where it exerts an electric force on other charges. Think of it like a gravitational field, but for electric charges!",
  intuitiveExample: "Imagine a heater radiating warmth in a room. The closer you stand to the heater, the stronger the heat you feel. Similarly, the closer a test charge is to a central charge $Q$, the stronger the electric field $E$ it experiences!",
  detailedExplanation: "According to Coulomb's Law, the force between a source charge $Q$ and a unit positive test charge $q_0$ separated by distance $r$ in vacuum is given by $F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q q_0}{r^2}$. The electric field vector $\\vec{E}$ is defined as the electrostatic force per unit test charge: $\\vec{E} = \\lim_{q_0 \\to 0} \\frac{\\vec{F}}{q_0} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r^2} \\hat{r}$.",
  formulas: [
    { label: "Electric Field Magnitude", latex: "E = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|Q|}{r^2}", notes: "where $\\frac{1}{4\\pi\\varepsilon_0} \\approx 8.99 \\times 10^9 \\text{ N}\\cdot\\text{m}^2/\\text{C}^2$" },
    { label: "Force on Test Charge", latex: "\\vec{F} = q \\vec{E}", notes: "Force is parallel to $\\vec{E}$ for positive charges, antiparallel for negative charges" },
    { label: "Permittivity in Medium", latex: "E_{\\text{medium}} = \\frac{E_{\\text{vacuum}}}{K}", notes: "where $K$ is the dielectric constant of the medium" }
  ],
  importantPoints: [
    "Electric field is a vector quantity; its direction points away from positive charges and towards negative charges.",
    "SI Unit of Electric Field is Newton per Coulomb (N/C) or Volt per meter (V/m).",
    "It obeys the superposition principle: total field $\\vec{E}_{total} = \\sum \\vec{E}_i$."
  ],
  commonMistakes: [
    "Confusing electric field magnitude $E \\propto \\frac{1}{r^2}$ with electric potential $V \\propto \\frac{1}{r}$.",
    "Forgetting that field direction depends on the sign of the source charge $Q$."
  ],
  youtubeVideo: {
    title: "Electric Field Due to Point Charge - Class 12 Physics",
    channel: "Physics Wallah - Alakh Pandey",
    videoUrl: "https://www.youtube.com/watch?v=fq2n_aFfHjE",
    thumbnailUrl: "https://img.youtube.com/vi/fq2n_aFfHjE/hqdefault.jpg",
    duration: "14:20",
    language: "Hindi / English"
  },
  activeRecallQuestions: [
    "What is the SI unit of Electric Field intensity?",
    "How does electric field strength change when the distance $r$ from a point charge is doubled?",
    "What is the direction of electric field lines around an isolated negative point charge?"
  ],
  flashcards: [
    { id: 'fc-1', front: "What is the formula for Electric Field due to a point charge?", back: "$E = \\frac{1}{4\\pi\\varepsilon_0} \\frac{Q}{r^2}$" },
    { id: 'fc-2', front: "What is the SI Unit of Electric Field?", back: "N/C (Newton per Coulomb) or V/m (Volt per meter)" },
    { id: 'fc-3', front: "What is the direction of electric field lines for a positive point charge?", back: "Radially outward in all directions" },
    { id: 'fc-4', front: "How does dielectric constant $K$ affect electric field?", back: "It reduces the field strength by a factor of $K$: $E_{medium} = \\frac{E_{vacuum}}{K}$" }
  ],
  masteryScore: 78
};

export const DEMO_QUESTIONS: QuestionData[] = [
  // 1. MCQ Single Correct
  {
    id: 'q-mcq-1',
    conceptId: 'electric-field-point-charge',
    type: 'mcq',
    difficulty: 'Easy',
    bloomLevel: 'Remember',
    marks: 1,
    question: "What is the SI unit of Electric Field Intensity?",
    options: [
      { id: 'A', text: "Newton · Coulomb (N·C)" },
      { id: 'B', text: "Newton per Coulomb (N/C)" },
      { id: 'C', text: "Joule per Coulomb (J/C)" },
      { id: 'D', text: "Watt per meter (W/m)" }
    ],
    correctAnswer: 'B',
    explanation: "Electric field intensity is defined as force per unit test charge ($E = F/q$). Hence its unit is Newton per Coulomb (N/C), or equivalently Volt per meter (V/m).",
    hints: ["Recall the definition $E = \\frac{F}{q}$. Force is measured in Newtons and charge in Coulombs."]
  },
  // 2. MCQ Inverse Square Law
  {
    id: 'q-mcq-2',
    conceptId: 'electric-field-point-charge',
    type: 'mcq',
    difficulty: 'Medium',
    bloomLevel: 'Apply',
    marks: 2,
    question: "If the distance from a point charge $Q$ is doubled, the electric field strength becomes:",
    options: [
      { id: 'A', text: "Double" },
      { id: 'B', text: "Half" },
      { id: 'C', text: "One-fourth (1/4)" },
      { id: 'D', text: "Four times (4x)" }
    ],
    correctAnswer: 'C',
    explanation: "Because $E \\propto \\frac{1}{r^2}$, doubling the distance ($r \\to 2r$) reduces the field strength to $\\frac{1}{(2)^2} = \\frac{1}{4}$ of its initial value.",
    commonMistake: "Confusing inverse-square law $1/r^2$ with linear inverse relationship $1/r$."
  },
  // 3. True / False
  {
    id: 'q-tf-1',
    conceptId: 'electric-field-point-charge',
    type: 'true_false',
    difficulty: 'Easy',
    bloomLevel: 'Understand',
    marks: 1,
    question: "Electric field lines point radially inward toward a positive point charge.",
    options: [
      { id: 'true', text: "True" },
      { id: 'false', text: "False" }
    ],
    correctAnswer: 'false',
    explanation: "False! Electric field lines point radially OUTWARD from positive charges and radially INWARD toward negative charges.",
    hints: ["Test charge is positive. A positive charge repels a positive test charge."]
  },
  // 4. Fill in the Blank
  {
    id: 'q-fib-1',
    conceptId: 'electric-field-point-charge',
    type: 'fill_blank',
    difficulty: 'Medium',
    bloomLevel: 'Understand',
    marks: 1,
    question: "When a dielectric medium of dielectric constant $K$ is introduced, the electric field strength is reduced by a factor of ____.",
    options: [],
    correctAnswer: "K",
    explanation: "In a medium with dielectric constant $K$, permittivity becomes $\\varepsilon = K \\varepsilon_0$, reducing the field to $E_{medium} = E_{vacuum} / K$."
  },
  // 5. Match the Following
  {
    id: 'q-match-1',
    conceptId: 'electric-field-point-charge',
    type: 'match_following',
    difficulty: 'Hard',
    bloomLevel: 'Analyze',
    marks: 4,
    question: "Match the physical quantity in Column A with its corresponding formula or unit in Column B:",
    matchLeft: [
      { id: 'L1', label: "Electric Field ($E$)" },
      { id: 'L2', label: "Coulomb Constant ($k$)" },
      { id: 'L3', label: "Force on charge ($F$)" },
      { id: 'L4', label: "Permittivity of Free Space ($\\varepsilon_0$)" }
    ],
    matchRight: [
      { id: 'R1', label: "$8.854 \\times 10^{-12} \\text{ C}^2/(\\text{N}\\cdot\\text{m}^2)$" },
      { id: 'R2', label: "$q E$" },
      { id: 'R3', label: "$\\frac{1}{4\\pi\\varepsilon_0} \\frac{Q}{r^2}$" },
      { id: 'R4', label: "$8.9875 \\times 10^9 \\text{ N}\\cdot\\text{m}^2/\\text{C}^2$" }
    ],
    correctAnswer: { L1: 'R3', L2: 'R4', L3: 'R2', L4: 'R1' },
    explanation: "Electric field is $Q/(4\\pi\\varepsilon_0 r^2)$, Coulomb constant $k = 9\\times 10^9$, Force $F=qE$, and $\\varepsilon_0 = 8.854 \\times 10^{-12}$."
  },
  // 6. Sequence Ordering
  {
    id: 'q-seq-1',
    conceptId: 'electric-field-point-charge',
    type: 'sequence',
    difficulty: 'Medium',
    bloomLevel: 'Apply',
    marks: 3,
    question: "Arrange the following points in DECREASING order of Electric Field magnitude due to a $+5\\mu\\text{C}$ point charge:",
    options: [
      { id: 'P1', text: "Point A at distance r = 10 cm" },
      { id: 'P2', text: "Point B at distance r = 20 cm" },
      { id: 'P3', text: "Point C at distance r = 5 cm" },
      { id: 'P4', text: "Point D at distance r = 50 cm" }
    ],
    correctAnswer: ['P3', 'P1', 'P2', 'P4'],
    explanation: "Because $E \\propto \\frac{1}{r^2}$, smaller distance means larger electric field magnitude. Order from smallest $r$ to largest $r$: C (5 cm) > A (10 cm) > B (20 cm) > D (50 cm)."
  },
  // 7. Assertion & Reason
  {
    id: 'q-ar-1',
    conceptId: 'electric-field-point-charge',
    type: 'assertion_reason',
    difficulty: 'Hard',
    bloomLevel: 'Evaluate',
    marks: 2,
    question: "Assertion (A): No two electric field lines can intersect each other.\nReason (R): At the point of intersection, the electric field vector would have two different directions, which is physically impossible.",
    options: [
      { id: 'A', text: "Both A and R are true and R is the correct explanation of A" },
      { id: 'B', text: "Both A and R are true but R is NOT the correct explanation of A" },
      { id: 'C', text: "A is true but R is false" },
      { id: 'D', text: "A is false but R is true" }
    ],
    correctAnswer: 'A',
    explanation: "If field lines intersected, drawing tangents at the intersection point would give two unique directions for $\\vec{E}$ at a single spatial point, which is impossible!"
  },
  // 8. Numerical Problem
  {
    id: 'q-num-1',
    conceptId: 'electric-field-point-charge',
    type: 'numerical',
    difficulty: 'Hard',
    bloomLevel: 'Apply',
    marks: 3,
    question: "Calculate the magnitude of the Electric Field at a distance of $r = 0.3\\text{ m}$ from a point charge of $Q = +4.0\\mu\\text{C}$ in air.",
    givenData: [
      { label: "Charge (Q)", value: "$4.0 \\times 10^{-6}\\text{ C}$" },
      { label: "Distance (r)", value: "$0.3\\text{ m}$" },
      { label: "Coulomb Constant (k)", value: "$9 \\times 10^9\\text{ N}\\cdot\\text{m}^2/\\text{C}^2$" }
    ],
    formulaLatex: "E = k \\frac{|Q|}{r^2}",
    solutionSteps: [
      "Step 1: Substitute values into formula: $E = \\frac{9 \\times 10^9 \\times 4.0 \\times 10^{-6}}{(0.3)^2}$",
      "Step 2: Simplify numerator: $9 \\times 4 \\times 10^3 = 3.6 \\times 10^4$",
      "Step 3: Divide by $r^2 = 0.09 = 9 \\times 10^{-2}$: $E = \\frac{36000}{0.09} = 4.0 \\times 10^5\\text{ N/C}$"
    ],
    correctAnswer: "400000",
    finalAnswerUnit: "N/C",
    explanation: "The magnitude of the electric field is $4.0 \\times 10^5\\text{ N/C}$ (or $400\\text{ kN/C}$)."
  },
  // 9. Derivation
  {
    id: 'q-deriv-1',
    conceptId: 'electric-field-point-charge',
    type: 'derivation',
    difficulty: 'Very Hard',
    bloomLevel: 'Analyze',
    marks: 5,
    question: "Derive the mathematical expression for the Electric Field intensity $\\vec{E}$ at an axial point of an Electric Dipole of dipole moment $\\vec{p} = 2qa \\hat{p}$.",
    derivationSteps: [
      {
        stepNumber: 1,
        title: "Setup & Diagram Geometry",
        latex: "\\text{Consider charges } -q \\text{ at } -a \\text{ and } +q \\text{ at } +a \\text{ along x-axis. Point P is at distance } r \\text{ from center O.}",
        explanation: "Distance from $+q$ to P is $(r - a)$, and from $-q$ to P is $(r + a)$."
      },
      {
        stepNumber: 2,
        title: "Individual Field Magnitudes",
        latex: "E_{+} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{(r-a)^2}, \\quad E_{-} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{(r+a)^2}",
        explanation: "$E_+$ acts away from dipole, $E_-$ acts towards dipole along the axis."
      },
      {
        stepNumber: 3,
        title: "Superposition of Fields",
        latex: "E_{axial} = E_{+} - E_{-} = \\frac{q}{4\\pi\\varepsilon_0} \\left[ \\frac{1}{(r-a)^2} - \\frac{1}{(r+a)^2} \\right]",
        explanation: "Combining fractions gives common denominator $(r^2 - a^2)^2$."
      },
      {
        stepNumber: 4,
        title: "Algebraic Simplification",
        latex: "E_{axial} = \\frac{q}{4\\pi\\varepsilon_0} \\frac{4ra}{(r^2 - a^2)^2} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{2(2qa)r}{(r^2 - a^2)^2} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{2pr}{(r^2 - a^2)^2}",
        explanation: "Substituting electric dipole moment $p = 2qa$."
      },
      {
        stepNumber: 5,
        title: "Far-Field Approximation ($r \\gg a$)",
        latex: "E_{axial} \\approx \\frac{1}{4\\pi\\varepsilon_0} \\frac{2p}{r^3} \\hat{p}",
        explanation: "For short dipole ($r \\gg a$), $a^2$ is negligible compared to $r^2$."
      }
    ],
    correctAnswer: "derivation_complete",
    explanation: "Axial electric field of a short dipole decreases inversely as the cube of distance ($E \\propto 1/r^3$)."
  },
  // 10. Subjective Short Answer
  {
    id: 'q-subj-1',
    conceptId: 'electric-field-point-charge',
    type: 'subjective',
    difficulty: 'Medium',
    bloomLevel: 'Understand',
    marks: 3,
    question: "Define Electric Dipole Moment and state its SI unit and direction.",
    correctAnswer: "Electric dipole moment p = q * 2a. SI unit C*m. Directed from negative to positive charge.",
    explanation: "Electric Dipole Moment ($\\vec{p}$) is a vector quantity defined as the product of magnitude of either charge ($q$) and the distance vector ($2\\vec{a}$) separating them: $\\vec{p} = q (2\\vec{a})$. Its SI unit is Coulomb-meter (C·m) and its vector direction is from the negative charge to the positive charge."
  }
];
