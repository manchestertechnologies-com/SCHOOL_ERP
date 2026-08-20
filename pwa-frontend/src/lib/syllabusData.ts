// Auto-generated from the uploaded 2026-27 Class 11 & 12 syllabus markdown.
// Keep this file data-only. Curriculum UI metadata is built in curriculum.ts.

export interface RawSyllabusChapter {
  number: number;
  title: string;
  concepts: string[];
}

export interface RawSubjectSyllabus {
  subjectId: string;
  subjectName: string;
  chapters: RawSyllabusChapter[];
}

export type RawSyllabusCatalog = Record<'11' | '12', Record<string, RawSubjectSyllabus>>;

export const SYLLABUS_2026_27: RawSyllabusCatalog = {
  "11": {
    "physics": {
      "subjectId": "physics",
      "subjectName": "Physics",
      "chapters": [
        {
          "number": 1,
          "title": "Units and Measurements",
          "concepts": [
            "The International System of Units",
            "Significant Figures",
            "Dimensions of Physical Quantities",
            "Dimensional Formulae and Dimensional Equations",
            "Dimensional Analysis and its Applications"
          ]
        },
        {
          "number": 2,
          "title": "Motion in a Straight Line",
          "concepts": [
            "Instantaneous Velocity and Speed",
            "Acceleration",
            "Kinematic Equations for Uniformly Accelerated Motion"
          ]
        },
        {
          "number": 3,
          "title": "Motion in a Plane",
          "concepts": [
            "Scalars and Vectors",
            "Multiplication of Vectors by Real Numbers",
            "Addition and Subtraction of Vectors — Graphical Method",
            "Resolution of Vectors",
            "Vector Addition — Analytical Method",
            "Motion in a Plane",
            "Motion in a Plane with Constant Acceleration",
            "Projectile Motion",
            "Uniform Circular Motion"
          ]
        },
        {
          "number": 4,
          "title": "Laws of Motion",
          "concepts": [
            "Aristotle's Fallacy",
            "Law of Inertia",
            "Newton's First Law of Motion",
            "Newton's Second Law of Motion",
            "Newton's Third Law of Motion",
            "Conservation of Momentum",
            "Equilibrium of a Particle",
            "Common Forces in Mechanics",
            "Circular Motion",
            "Solving Problems in Mechanics"
          ]
        },
        {
          "number": 5,
          "title": "Work, Energy and Power",
          "concepts": [
            "Work and Kinetic Energy",
            "Work-Energy Theorem",
            "Work",
            "Kinetic Energy",
            "Work Done by a Variable Force",
            "Work-Energy Theorem for a Variable Force",
            "Potential Energy",
            "Conservation of Mechanical Energy",
            "Potential Energy of a Spring",
            "Power",
            "Collisions"
          ]
        },
        {
          "number": 6,
          "title": "System of Particles and Rotational Motion",
          "concepts": [
            "Centre of Mass",
            "Motion of Centre of Mass",
            "Linear Momentum of a System of Particles",
            "Vector Product of Two Vectors",
            "Angular Velocity and its Relation with Linear Velocity",
            "Torque and Angular Momentum",
            "Equilibrium of a Rigid Body",
            "Moment of Inertia",
            "Kinematics of Rotational Motion about a Fixed Axis",
            "Dynamics of Rotational Motion about a Fixed Axis",
            "Angular Momentum in Rotations about a Fixed Axis"
          ]
        },
        {
          "number": 7,
          "title": "Gravitation",
          "concepts": [
            "Kepler's Laws",
            "Universal Law of Gravitation",
            "Gravitational Constant",
            "Acceleration due to Gravity of the Earth",
            "Acceleration due to Gravity Below and Above Earth's Surface",
            "Gravitational Potential Energy",
            "Escape Speed",
            "Earth Satellites",
            "Energy of an Orbiting Satellite"
          ]
        },
        {
          "number": 8,
          "title": "Mechanical Properties of Solids",
          "concepts": [
            "Stress and Strain",
            "Hooke's Law",
            "Stress-Strain Curve",
            "Elastic Moduli",
            "Applications of Elastic Behaviour of Materials"
          ]
        },
        {
          "number": 9,
          "title": "Mechanical Properties of Fluids",
          "concepts": [
            "Pressure",
            "Streamline Flow",
            "Bernoulli's Principle",
            "Viscosity",
            "Surface Tension"
          ]
        },
        {
          "number": 10,
          "title": "Thermal Properties of Matter",
          "concepts": [
            "Temperature and Heat",
            "Measurement of Temperature",
            "Ideal-Gas Equation and Absolute Temperature",
            "Thermal Expansion",
            "Specific Heat Capacity",
            "Calorimetry",
            "Change of State",
            "Heat Transfer",
            "Newton's Law of Cooling"
          ]
        },
        {
          "number": 11,
          "title": "Thermodynamics",
          "concepts": [
            "Thermal Equilibrium",
            "Zeroth Law of Thermodynamics",
            "Heat, Internal Energy and Work",
            "First Law of Thermodynamics",
            "Specific Heat Capacity",
            "Thermodynamic State Variables and Equation of State",
            "Thermodynamic Processes",
            "Second Law of Thermodynamics",
            "Reversible and Irreversible Processes",
            "Carnot Engine"
          ]
        },
        {
          "number": 12,
          "title": "Kinetic Theory",
          "concepts": [
            "Molecular Nature of Matter",
            "Behaviour of Gases",
            "Kinetic Theory of an Ideal Gas",
            "Law of Equipartition of Energy",
            "Specific Heat Capacity",
            "Mean Free Path"
          ]
        },
        {
          "number": 13,
          "title": "Oscillations",
          "concepts": [
            "Periodic and Oscillatory Motions",
            "Simple Harmonic Motion",
            "SHM and Uniform Circular Motion",
            "Velocity and Acceleration in SHM",
            "Force Law for SHM",
            "Energy in SHM",
            "Simple Pendulum"
          ]
        },
        {
          "number": 14,
          "title": "Waves",
          "concepts": [
            "Transverse and Longitudinal Waves",
            "Displacement Relation in a Progressive Wave",
            "Speed of a Travelling Wave",
            "Principle of Superposition of Waves",
            "Reflection of Waves",
            "Beats"
          ]
        }
      ]
    },
    "chemistry": {
      "subjectId": "chemistry",
      "subjectName": "Chemistry",
      "chapters": [
        {
          "number": 1,
          "title": "Some Basic Concepts of Chemistry",
          "concepts": [
            "Importance of Chemistry",
            "Nature of Matter",
            "Properties of Matter and their Measurement",
            "Uncertainty in Measurement",
            "Laws of Chemical Combinations",
            "Dalton's Atomic Theory",
            "Atomic and Molecular Masses",
            "Mole Concept and Molar Masses",
            "Percentage Composition",
            "Stoichiometry and Stoichiometric Calculations"
          ]
        },
        {
          "number": 2,
          "title": "Structure of Atom",
          "concepts": [
            "Discovery of Sub-atomic Particles",
            "Atomic Models",
            "Developments Leading to Bohr's Model of Atom",
            "Bohr's Model for Hydrogen Atom",
            "Towards Quantum Mechanical Model of the Atom",
            "Quantum Mechanical Model of Atom"
          ]
        },
        {
          "number": 3,
          "title": "Classification of Elements and Periodicity in Properties",
          "concepts": [
            "Need for Classification of Elements",
            "Genesis of Periodic Classification",
            "Modern Periodic Law and Present Form of Periodic Table",
            "Nomenclature of Elements with Atomic Numbers > 100",
            "Electronic Configurations and Periodic Table",
            "Electronic Configurations and Types of Elements: s-, p-, d-, f-Blocks",
            "Periodic Trends in Properties of Elements"
          ]
        },
        {
          "number": 4,
          "title": "Chemical Bonding and Molecular Structure",
          "concepts": [
            "Kössel-Lewis Approach to Chemical Bonding",
            "Ionic or Electrovalent Bond",
            "Bond Parameters",
            "VSEPR Theory",
            "Valence Bond Theory",
            "Hybridisation",
            "Molecular Orbital Theory",
            "Bonding in Homonuclear Diatomic Molecules",
            "Hydrogen Bonding"
          ]
        },
        {
          "number": 5,
          "title": "Thermodynamics",
          "concepts": [
            "Thermodynamic Terms",
            "Applications",
            "Measurement of ΔU and ΔH — Calorimetry",
            "Reaction Enthalpy",
            "Enthalpies for Different Types of Reactions",
            "Spontaneity",
            "Gibbs Energy Change and Equilibrium"
          ]
        },
        {
          "number": 6,
          "title": "Equilibrium",
          "concepts": [
            "Equilibrium in Physical Processes",
            "Dynamic Chemical Equilibrium",
            "Law of Chemical Equilibrium and Equilibrium Constant",
            "Homogeneous Equilibria",
            "Heterogeneous Equilibria",
            "Applications of Equilibrium Constants",
            "Relationship between Equilibrium Constant K, Reaction Quotient Q and Gibbs Energy",
            "Factors Affecting Equilibria",
            "Ionic Equilibrium in Solution",
            "Acids, Bases and Salts",
            "Ionisation of Acids and Bases",
            "Buffer Solutions",
            "Solubility Equilibria of Sparingly Soluble Salts"
          ]
        },
        {
          "number": 7,
          "title": "Redox Reactions",
          "concepts": [
            "Classical Idea of Oxidation and Reduction",
            "Redox Reactions in Terms of Electron Transfer",
            "Oxidation Number",
            "Redox Reactions and Electrode Processes"
          ]
        },
        {
          "number": 8,
          "title": "Organic Chemistry — Some Basic Principles and Techniques",
          "concepts": [
            "General Introduction",
            "Tetravalence of Carbon",
            "Shapes of Organic Compounds",
            "Structural Representations",
            "Classification of Organic Compounds",
            "Nomenclature",
            "Isomerism",
            "Fundamental Concepts in Organic Reaction Mechanism",
            "Purification of Organic Compounds",
            "Qualitative Analysis",
            "Quantitative Analysis"
          ]
        },
        {
          "number": 9,
          "title": "Hydrocarbons",
          "concepts": [
            "Classification",
            "Alkanes",
            "Alkenes",
            "Alkynes",
            "Aromatic Hydrocarbons",
            "Carcinogenicity and Toxicity"
          ]
        }
      ]
    },
    "mathematics": {
      "subjectId": "mathematics",
      "subjectName": "Mathematics",
      "chapters": [
        {
          "number": 1,
          "title": "Sets",
          "concepts": [
            "Sets and their Representations",
            "Empty Set",
            "Finite and Infinite Sets",
            "Equal Sets",
            "Subsets",
            "Universal Set",
            "Venn Diagrams",
            "Operations on Sets",
            "Complement of a Set"
          ]
        },
        {
          "number": 2,
          "title": "Relations and Functions",
          "concepts": [
            "Cartesian Product of Sets",
            "Relations",
            "Functions"
          ]
        },
        {
          "number": 3,
          "title": "Trigonometric Functions",
          "concepts": [
            "Angles",
            "Trigonometric Functions",
            "Trigonometric Functions of Sum and Difference of Two Angles"
          ]
        },
        {
          "number": 4,
          "title": "Complex Numbers and Quadratic Equations",
          "concepts": [
            "Complex Numbers",
            "Algebra of Complex Numbers",
            "Modulus and Conjugate of a Complex Number",
            "Argand Plane",
            "Polar Representation"
          ]
        },
        {
          "number": 5,
          "title": "Linear Inequalities",
          "concepts": [
            "Inequalities",
            "Algebraic Solutions of Linear Inequalities in One Variable",
            "Graphical Representation"
          ]
        },
        {
          "number": 6,
          "title": "Permutations and Combinations",
          "concepts": [
            "Fundamental Principle of Counting",
            "Permutations",
            "Combinations"
          ]
        },
        {
          "number": 7,
          "title": "Binomial Theorem",
          "concepts": [
            "Binomial Theorem for Positive Integral Indices"
          ]
        },
        {
          "number": 8,
          "title": "Sequences and Series",
          "concepts": [
            "Sequences",
            "Series",
            "Geometric Progression",
            "Relationship between A.M. and G.M."
          ]
        },
        {
          "number": 9,
          "title": "Straight Lines",
          "concepts": [
            "Slope of a Line",
            "Various Forms of Equation of a Line",
            "Distance of a Point from a Line"
          ]
        },
        {
          "number": 10,
          "title": "Conic Sections",
          "concepts": [
            "Sections of a Cone",
            "Circle",
            "Parabola",
            "Ellipse",
            "Hyperbola"
          ]
        },
        {
          "number": 11,
          "title": "Introduction to Three Dimensional Geometry",
          "concepts": [
            "Coordinate Axes and Coordinate Planes in 3D Space",
            "Coordinates of a Point in Space",
            "Distance between Two Points"
          ]
        },
        {
          "number": 12,
          "title": "Limits and Derivatives",
          "concepts": [
            "Intuitive Idea of Derivatives",
            "Limits",
            "Limits of Trigonometric Functions",
            "Derivatives"
          ]
        },
        {
          "number": 13,
          "title": "Statistics",
          "concepts": [
            "Measures of Dispersion",
            "Range",
            "Mean Deviation",
            "Variance",
            "Standard Deviation"
          ]
        },
        {
          "number": 14,
          "title": "Probability",
          "concepts": [
            "Event",
            "Axiomatic Approach to Probability"
          ]
        }
      ]
    },
    "biology": {
      "subjectId": "biology",
      "subjectName": "Biology",
      "chapters": [
        { "number": 1, "title": "The Living World", "concepts": [] },
        { "number": 2, "title": "Biological Classification", "concepts": [] },
        { "number": 3, "title": "Plant Kingdom", "concepts": [] },
        { "number": 4, "title": "Animal Kingdom", "concepts": [] },
        { "number": 5, "title": "Morphology of Flowering Plants", "concepts": [] },
        { "number": 6, "title": "Anatomy of Flowering Plants", "concepts": [] },
        { "number": 7, "title": "Structural Organisation in Animals", "concepts": [] },
        { "number": 8, "title": "Cell: The Unit of Life", "concepts": [] },
        { "number": 9, "title": "Biomolecules", "concepts": [] },
        { "number": 10, "title": "Cell Cycle and Cell Division", "concepts": [] },
        { "number": 11, "title": "Photosynthesis in Higher Plants", "concepts": [] },
        { "number": 12, "title": "Respiration in Plants", "concepts": [] },
        { "number": 13, "title": "Plant Growth and Development", "concepts": [] },
        { "number": 14, "title": "Breathing and Exchange of Gases", "concepts": [] },
        { "number": 15, "title": "Body Fluids and Circulation", "concepts": [] },
        { "number": 16, "title": "Excretory Products and their Elimination", "concepts": [] },
        { "number": 17, "title": "Locomotion and Movement", "concepts": [] },
        { "number": 18, "title": "Neural Control and Coordination", "concepts": [] },
        { "number": 19, "title": "Chemical Coordination and Integration", "concepts": [] }
      ]
    },
    "computer_science": {
      "subjectId": "computer_science",
      "subjectName": "Computer Science",
      "chapters": [
        {
          "number": 1,
          "title": "Computer System",
          "concepts": [
            "Introduction to Computer System",
            "Evolution of Computer",
            "Computer Memory",
            "Data Transfer between Memory and CPU",
            "Microprocessors",
            "Data and Information",
            "Software",
            "Operating System"
          ]
        },
        {
          "number": 2,
          "title": "Encoding Schemes and Number System",
          "concepts": [
            "Number System",
            "Conversion between Number Systems"
          ]
        },
        {
          "number": 3,
          "title": "Emerging Trends",
          "concepts": [
            "Artificial Intelligence",
            "Big Data",
            "Internet of Things",
            "Cloud Computing",
            "Grid Computing",
            "Blockchains"
          ]
        },
        {
          "number": 4,
          "title": "Introduction to Problem Solving",
          "concepts": [
            "Steps for Problem Solving",
            "Algorithm",
            "Representation of Algorithms",
            "Flow of Control",
            "Verifying Algorithms",
            "Comparison of Algorithms",
            "Coding",
            "Decomposition"
          ]
        },
        {
          "number": 5,
          "title": "Getting Started with Python",
          "concepts": [
            "Python Keywords",
            "Identifiers",
            "Variables",
            "Comments",
            "Everything is an Object",
            "Data Types",
            "Operators",
            "Expressions",
            "Statements",
            "Input and Output",
            "Type Conversion",
            "Debugging"
          ]
        },
        {
          "number": 6,
          "title": "Flow of Control",
          "concepts": [
            "Selection",
            "Indentation",
            "Repetition",
            "Break and Continue Statements",
            "Nested Loops"
          ]
        },
        {
          "number": 7,
          "title": "Functions",
          "concepts": [
            "Functions",
            "User Defined Functions",
            "Scope of a Variable",
            "Python Standard Library"
          ]
        },
        {
          "number": 8,
          "title": "Strings",
          "concepts": [
            "Strings",
            "String Operations",
            "Traversing a String",
            "String Methods and Built-in Functions",
            "Handling Strings"
          ]
        },
        {
          "number": 9,
          "title": "Lists",
          "concepts": [
            "List Operations",
            "Traversing a List",
            "List Methods and Built-in Functions",
            "Nested Lists",
            "Copying Lists",
            "Lists as Arguments to Functions",
            "List Manipulation"
          ]
        },
        {
          "number": 10,
          "title": "Tuples and Dictionaries",
          "concepts": [
            "Tuple Operations",
            "Tuple Methods and Built-in Functions",
            "Tuple Assignment",
            "Nested Tuples",
            "Tuple Handling",
            "Introduction to Dictionaries",
            "Mutable Dictionaries",
            "Dictionary Operations",
            "Traversing a Dictionary",
            "Dictionary Methods and Built-in Functions",
            "Manipulating Dictionaries"
          ]
        },
        {
          "number": 11,
          "title": "Societal Impact",
          "concepts": [
            "Digital Footprints",
            "Digital Society and Netizen",
            "Data Protection",
            "Cyber Crime",
            "Indian Information Technology Act",
            "Impact on Health"
          ]
        }
      ]
    }
  },
  "12": {
    "physics": {
      "subjectId": "physics",
      "subjectName": "Physics",
      "chapters": [
        {
          "number": 1,
          "title": "Electric Charges and Fields",
          "concepts": [
            "Electric Charge",
            "Conductors and Insulators",
            "Basic Properties of Electric Charge",
            "Coulomb's Law",
            "Forces between Multiple Charges",
            "Electric Field",
            "Electric Field Lines",
            "Electric Flux",
            "Electric Dipole",
            "Dipole in a Uniform External Field",
            "Continuous Charge Distribution",
            "Gauss's Law",
            "Applications of Gauss's Law"
          ]
        },
        {
          "number": 2,
          "title": "Electrostatic Potential and Capacitance",
          "concepts": [
            "Electrostatic Potential",
            "Potential due to a Point Charge",
            "Potential due to an Electric Dipole",
            "Potential due to a System of Charges",
            "Equipotential Surfaces",
            "Potential Energy of a System of Charges",
            "Potential Energy in an External Field",
            "Electrostatics of Conductors",
            "Dielectrics and Polarisation",
            "Capacitors and Capacitance",
            "Parallel Plate Capacitor",
            "Effect of Dielectric on Capacitance",
            "Combination of Capacitors",
            "Energy Stored in a Capacitor"
          ]
        },
        {
          "number": 3,
          "title": "Current Electricity",
          "concepts": [
            "Electric Current",
            "Electric Currents in Conductors",
            "Ohm's Law",
            "Drift of Electrons and Origin of Resistivity",
            "Limitations of Ohm's Law",
            "Resistivity of Materials",
            "Temperature Dependence of Resistivity",
            "Electrical Energy and Power",
            "Cells, EMF and Internal Resistance",
            "Cells in Series and Parallel",
            "Kirchhoff's Rules",
            "Wheatstone Bridge"
          ]
        },
        {
          "number": 4,
          "title": "Moving Charges and Magnetism",
          "concepts": [
            "Magnetic Force",
            "Motion in a Magnetic Field",
            "Biot-Savart Law",
            "Magnetic Field on Axis of Circular Current Loop",
            "Ampere's Circuital Law",
            "Solenoid",
            "Force between Parallel Currents",
            "Torque on Current Loop",
            "Magnetic Dipole",
            "Moving Coil Galvanometer"
          ]
        },
        {
          "number": 5,
          "title": "Magnetism and Matter",
          "concepts": [
            "Bar Magnet",
            "Magnetism and Gauss's Law",
            "Magnetisation",
            "Magnetic Intensity",
            "Magnetic Properties of Materials"
          ]
        },
        {
          "number": 6,
          "title": "Electromagnetic Induction",
          "concepts": [
            "Experiments of Faraday and Henry",
            "Magnetic Flux",
            "Faraday's Law of Induction",
            "Lenz's Law and Conservation of Energy",
            "Motional Electromotive Force",
            "Inductance",
            "AC Generator"
          ]
        },
        {
          "number": 7,
          "title": "Alternating Current",
          "concepts": [
            "AC Voltage Applied to a Resistor",
            "Phasor Representation",
            "AC Voltage Applied to an Inductor",
            "AC Voltage Applied to a Capacitor",
            "Series LCR Circuit",
            "Power in AC Circuit",
            "Power Factor",
            "Transformers"
          ]
        },
        {
          "number": 8,
          "title": "Electromagnetic Waves",
          "concepts": [
            "Displacement Current",
            "Electromagnetic Waves",
            "Electromagnetic Spectrum"
          ]
        },
        {
          "number": 9,
          "title": "Ray Optics and Optical Instruments",
          "concepts": [
            "Reflection by Spherical Mirrors",
            "Refraction",
            "Total Internal Reflection",
            "Refraction at Spherical Surfaces and by Lenses",
            "Refraction through a Prism",
            "Optical Instruments"
          ]
        },
        {
          "number": 10,
          "title": "Wave Optics",
          "concepts": [
            "Huygens Principle",
            "Refraction and Reflection of Plane Waves using Huygens Principle",
            "Coherent and Incoherent Addition of Waves",
            "Interference",
            "Young's Experiment",
            "Diffraction",
            "Polarisation"
          ]
        },
        {
          "number": 11,
          "title": "Dual Nature of Radiation and Matter",
          "concepts": [
            "Electron Emission",
            "Photoelectric Effect",
            "Experimental Study of Photoelectric Effect",
            "Photoelectric Effect and Wave Theory",
            "Einstein's Photoelectric Equation",
            "Energy Quantum of Radiation",
            "Particle Nature of Light — Photon",
            "Wave Nature of Matter"
          ]
        },
        {
          "number": 12,
          "title": "Atoms",
          "concepts": [
            "Alpha-Particle Scattering",
            "Rutherford's Nuclear Model",
            "Atomic Spectra",
            "Bohr Model of Hydrogen Atom",
            "Line Spectra of Hydrogen",
            "de Broglie's Explanation of Bohr's Second Postulate"
          ]
        },
        {
          "number": 13,
          "title": "Nuclei",
          "concepts": [
            "Atomic Masses and Composition of Nucleus",
            "Size of Nucleus",
            "Mass-Energy and Nuclear Binding Energy",
            "Nuclear Force",
            "Radioactivity",
            "Nuclear Energy"
          ]
        },
        {
          "number": 14,
          "title": "Semiconductor Electronics — Materials, Devices and Simple Circuits",
          "concepts": [
            "Classification of Metals, Conductors and Semiconductors",
            "Intrinsic Semiconductor",
            "Extrinsic Semiconductor",
            "p-n Junction",
            "Semiconductor Diode",
            "Junction Diode as a Rectifier"
          ]
        }
      ]
    },
    "chemistry": {
      "subjectId": "chemistry",
      "subjectName": "Chemistry",
      "chapters": [
        {
          "number": 1,
          "title": "Solutions",
          "concepts": [
            "Types of Solutions",
            "Expressing Concentration of Solutions",
            "Solubility",
            "Vapour Pressure of Liquid Solutions",
            "Ideal and Non-Ideal Solutions",
            "Colligative Properties",
            "Determination of Molar Mass",
            "Abnormal Molar Masses"
          ]
        },
        {
          "number": 2,
          "title": "Electrochemistry",
          "concepts": [
            "Electrochemical Cells",
            "Galvanic Cells",
            "Nernst Equation",
            "Conductance of Electrolytic Solutions",
            "Electrolytic Cells and Electrolysis",
            "Batteries",
            "Fuel Cells",
            "Corrosion"
          ]
        },
        {
          "number": 3,
          "title": "Chemical Kinetics",
          "concepts": [
            "Rate of a Chemical Reaction",
            "Factors Influencing Rate",
            "Integrated Rate Equations",
            "Temperature Dependence of Rate",
            "Collision Theory"
          ]
        },
        {
          "number": 4,
          "title": "The d- and f-Block Elements",
          "concepts": [
            "Position in Periodic Table",
            "Electronic Configurations of d-Block Elements",
            "General Properties of Transition Elements",
            "Important Compounds of Transition Elements",
            "Lanthanoids",
            "Actinoids",
            "Applications of d- and f-Block Elements"
          ]
        },
        {
          "number": 5,
          "title": "Coordination Compounds",
          "concepts": [
            "Werner's Theory",
            "Important Terms in Coordination Chemistry",
            "Nomenclature",
            "Isomerism",
            "Bonding in Coordination Compounds",
            "Bonding in Metal Carbonyls",
            "Importance and Applications"
          ]
        },
        {
          "number": 6,
          "title": "Haloalkanes and Haloarenes",
          "concepts": [
            "Classification",
            "Nomenclature",
            "Nature of C–X Bond",
            "Preparation of Haloalkanes",
            "Preparation of Haloarenes",
            "Physical Properties",
            "Chemical Reactions",
            "Polyhalogen Compounds"
          ]
        },
        {
          "number": 7,
          "title": "Alcohols, Phenols and Ethers",
          "concepts": [
            "Classification",
            "Nomenclature",
            "Structures of Functional Groups",
            "Alcohols and Phenols",
            "Commercially Important Alcohols",
            "Ethers"
          ]
        },
        {
          "number": 8,
          "title": "Aldehydes, Ketones and Carboxylic Acids",
          "concepts": [
            "Nomenclature and Structure of Carbonyl Group",
            "Preparation of Aldehydes and Ketones",
            "Physical Properties",
            "Chemical Reactions",
            "Uses of Aldehydes and Ketones",
            "Nomenclature and Structure of Carboxyl Group",
            "Preparation of Carboxylic Acids",
            "Physical Properties",
            "Chemical Reactions",
            "Uses of Carboxylic Acids"
          ]
        },
        {
          "number": 9,
          "title": "Amines",
          "concepts": [
            "Structure of Amines",
            "Classification",
            "Nomenclature",
            "Preparation of Amines",
            "Physical Properties",
            "Chemical Reactions",
            "Preparation of Diazonium Salts",
            "Physical Properties of Diazonium Salts",
            "Chemical Reactions of Diazonium Salts",
            "Importance of Diazonium Salts in Synthesis of Aromatic Compounds"
          ]
        },
        {
          "number": 10,
          "title": "Biomolecules",
          "concepts": [
            "Carbohydrates",
            "Proteins",
            "Enzymes",
            "Vitamins",
            "Nucleic Acids",
            "Hormones"
          ]
        }
      ]
    },
    "mathematics": {
      "subjectId": "mathematics",
      "subjectName": "Mathematics",
      "chapters": [
        {
          "number": 1,
          "title": "Relations and Functions",
          "concepts": [
            "Types of Relations",
            "Types of Functions",
            "Composition of Functions",
            "Invertible Function"
          ]
        },
        {
          "number": 2,
          "title": "Inverse Trigonometric Functions",
          "concepts": [
            "Basic Concepts",
            "Properties of Inverse Trigonometric Functions"
          ]
        },
        {
          "number": 3,
          "title": "Matrices",
          "concepts": [
            "Matrix",
            "Types of Matrices",
            "Operations on Matrices",
            "Transpose of a Matrix",
            "Symmetric and Skew Symmetric Matrices",
            "Invertible Matrices"
          ]
        },
        {
          "number": 4,
          "title": "Determinants",
          "concepts": [
            "Determinant",
            "Area of a Triangle",
            "Minors and Cofactors",
            "Adjoint and Inverse of a Matrix",
            "Applications of Determinants and Matrices"
          ]
        },
        {
          "number": 5,
          "title": "Continuity and Differentiability",
          "concepts": [
            "Continuity",
            "Differentiability",
            "Exponential and Logarithmic Functions",
            "Logarithmic Differentiation",
            "Derivatives of Functions in Parametric Forms",
            "Second Order Derivative"
          ]
        },
        {
          "number": 6,
          "title": "Application of Derivatives",
          "concepts": [
            "Rate of Change of Quantities",
            "Increasing and Decreasing Functions",
            "Maxima and Minima"
          ]
        },
        {
          "number": 7,
          "title": "Integrals",
          "concepts": [
            "Integration as an Inverse Process of Differentiation",
            "Methods of Integration",
            "Integrals of Particular Functions",
            "Integration by Partial Fractions",
            "Integration by Parts",
            "Definite Integral",
            "Fundamental Theorem of Calculus",
            "Evaluation by Substitution",
            "Properties of Definite Integrals"
          ]
        },
        {
          "number": 8,
          "title": "Application of Integrals",
          "concepts": [
            "Area under Simple Curves"
          ]
        },
        {
          "number": 9,
          "title": "Differential Equations",
          "concepts": [
            "Basic Concepts",
            "General and Particular Solutions",
            "First Order, First Degree Differential Equations"
          ]
        },
        {
          "number": 10,
          "title": "Vector Algebra",
          "concepts": [
            "Basic Concepts",
            "Types of Vectors",
            "Addition of Vectors",
            "Multiplication of Vector by a Scalar",
            "Product of Two Vectors"
          ]
        },
        {
          "number": 11,
          "title": "Three Dimensional Geometry",
          "concepts": [
            "Direction Cosines and Direction Ratios of a Line",
            "Equation of a Line in Space",
            "Angle between Two Lines",
            "Shortest Distance between Two Lines"
          ]
        },
        {
          "number": 12,
          "title": "Linear Programming",
          "concepts": [
            "Linear Programming Problem",
            "Mathematical Formulation of a Linear Programming Problem"
          ]
        },
        {
          "number": 13,
          "title": "Probability",
          "concepts": [
            "Conditional Probability",
            "Multiplication Theorem on Probability",
            "Independent Events",
            "Bayes' Theorem"
          ]
        }
      ]
    },
    "biology": {
      "subjectId": "biology",
      "subjectName": "Biology",
      "chapters": [
        { "number": 1, "title": "Sexual Reproduction in Flowering Plants", "concepts": [] },
        { "number": 2, "title": "Human Reproduction", "concepts": [] },
        { "number": 3, "title": "Reproductive Health", "concepts": [] },
        { "number": 4, "title": "Principles of Inheritance and Variation", "concepts": [] },
        { "number": 5, "title": "Molecular Basis of Inheritance", "concepts": [] },
        { "number": 6, "title": "Evolution", "concepts": [] },
        { "number": 7, "title": "Human Health and Disease", "concepts": [] },
        { "number": 8, "title": "Microbes in Human Welfare", "concepts": [] },
        { "number": 9, "title": "Biotechnology: Principles and Processes", "concepts": [] },
        { "number": 10, "title": "Biotechnology and its Applications", "concepts": [] },
        { "number": 11, "title": "Organisms and Populations", "concepts": [] },
        { "number": 12, "title": "Ecosystem", "concepts": [] },
        { "number": 13, "title": "Biodiversity and Conservation", "concepts": [] }
      ]
    },
    "computer_science": {
      "subjectId": "computer_science",
      "subjectName": "Computer Science",
      "chapters": [
        {
          "number": 1,
          "title": "Exception Handling in Python",
          "concepts": [
            "Syntax Errors",
            "Exceptions",
            "Built-in Exceptions",
            "Raising Exceptions",
            "Handling Exceptions",
            "Finally Clause"
          ]
        },
        {
          "number": 2,
          "title": "File Handling in Python",
          "concepts": [
            "Introduction to Files",
            "Types of Files",
            "Opening and Closing a Text File",
            "Writing to a Text File",
            "Reading from a Text File",
            "Setting Offsets in a File",
            "Creating and Traversing a Text File",
            "Pickle Module"
          ]
        },
        {
          "number": 3,
          "title": "Stack",
          "concepts": [
            "Stack",
            "Operations on Stack",
            "Implementation of Stack in Python",
            "Notations for Arithmetic Expressions",
            "Infix to Postfix Conversion",
            "Evaluation of Postfix Expression"
          ]
        },
        {
          "number": 4,
          "title": "Queue",
          "concepts": [
            "Queue",
            "Operations on Queue",
            "Implementation of Queue using Python",
            "Deque",
            "Implementation of Deque using Python"
          ]
        },
        {
          "number": 5,
          "title": "Sorting",
          "concepts": [
            "Bubble Sort",
            "Selection Sort",
            "Insertion Sort",
            "Time Complexity of Algorithms"
          ]
        },
        {
          "number": 6,
          "title": "Searching",
          "concepts": [
            "Linear Search",
            "Binary Search",
            "Search by Hashing"
          ]
        },
        {
          "number": 7,
          "title": "Understanding Data",
          "concepts": [
            "Introduction to Data",
            "Data Collection",
            "Data Storage",
            "Data Processing",
            "Statistical Techniques for Data Processing"
          ]
        },
        {
          "number": 8,
          "title": "Database Concepts",
          "concepts": [
            "File System",
            "Database Management System",
            "Relational Data Model",
            "Keys in a Relational Database"
          ]
        },
        {
          "number": 9,
          "title": "Structured Query Language (SQL)",
          "concepts": [
            "SQL",
            "Data Types and Constraints in MySQL",
            "SQL for Data Definition",
            "SQL for Data Manipulation",
            "SQL for Data Query",
            "Data Updation and Deletion",
            "Functions in SQL",
            "GROUP BY Clause",
            "Operations on Relations",
            "Using Two Relations in a Query"
          ]
        },
        {
          "number": 10,
          "title": "Computer Networks",
          "concepts": [
            "Evolution of Networking",
            "Types of Networks",
            "Network Devices",
            "Networking Topologies",
            "Identifying Nodes in Networked Communication",
            "Internet",
            "Web",
            "Internet of Things",
            "Domain Name System"
          ]
        },
        {
          "number": 11,
          "title": "Data Communication",
          "concepts": [
            "Concept of Communication",
            "Components of Data Communication",
            "Capacity of Communication Media",
            "Types of Data Communication",
            "Switching Techniques",
            "Transmission Media",
            "Mobile Telecommunication Technologies",
            "Protocols"
          ]
        },
        {
          "number": 12,
          "title": "Security Aspects",
          "concepts": [
            "Threats and Prevention",
            "Malware",
            "Antivirus",
            "Spam",
            "HTTP vs HTTPS",
            "Firewall",
            "Cookies",
            "Hackers and Crackers",
            "Network Security Threats"
          ]
        },
        {
          "number": 13,
          "title": "Project Based Learning",
          "concepts": [
            "Approaches for Solving Projects",
            "Teamwork",
            "Project Descriptions"
          ]
        }
      ]
    }
  }
} as RawSyllabusCatalog;
