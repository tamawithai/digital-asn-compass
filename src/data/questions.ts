export interface Question {
  id: string;
  text: string;
  area: number;
  areaName: string;
  isReversed: boolean;
}

export interface QuestionnaireData {
  [key: string]: number;
}

export interface AssessmentResult {
  totalIndex: number;
  areaScores: {
    area1: number;
    area2: number;
    area3: number;
    area4: number;
    area5: number;
  };
  competencyLevel: string;
  recommendations: string[];
}

export const questions: Question[] = [
  // Area 1: Information & Data Literacy
  {
    id: "A1",
    text: "Saya dapat menentukan informasi yang saya butuhkan di internet.",
    area: 1,
    areaName: "Information & Data Literacy",
    isReversed: false
  },
  {
    id: "A2", 
    text: "Saya dapat menemukan informasi yang relevan melalui mesin pencari.",
    area: 1,
    areaName: "Information & Data Literacy",
    isReversed: false
  },
  {
    id: "A3",
    text: "Saya kesulitan membedakan antara fakta dan opini dalam sebuah berita online.",
    area: 1,
    areaName: "Information & Data Literacy", 
    isReversed: true
  },
  {
    id: "A4",
    text: "Saya sering merasa kewalahan dengan banyaknya informasi yang tersedia.",
    area: 1,
    areaName: "Information & Data Literacy",
    isReversed: true
  },
  {
    id: "A5",
    text: "Saya dapat mengatur dan menyimpan file digital secara terstruktur.",
    area: 1,
    areaName: "Information & Data Literacy",
    isReversed: false
  },

  // Area 2: Communication & Collaboration
  {
    id: "B1",
    text: "Saya nyaman menggunakan email dan aplikasi pesan untuk komunikasi profesional.",
    area: 2,
    areaName: "Communication & Collaboration",
    isReversed: false
  },
  {
    id: "B2",
    text: "Saya merasa sulit untuk berkolaborasi dengan rekan kerja secara online.",
    area: 2,
    areaName: "Communication & Collaboration",
    isReversed: true
  },
  {
    id: "B3",
    text: "Saya memahami etika (netiket) saat berkomunikasi di ruang digital.",
    area: 2,
    areaName: "Communication & Collaboration",
    isReversed: false
  },
  {
    id: "B4",
    text: "Saya tidak yakin cara mengelola identitas digital profesional saya.",
    area: 2,
    areaName: "Communication & Collaboration",
    isReversed: true
  },
  {
    id: "B5",
    text: "Saya dapat menyampaikan ide secara efektif saat rapat online.",
    area: 2,
    areaName: "Communication & Collaboration",
    isReversed: false
  },

  // Area 3: Digital Content Creation
  {
    id: "C1",
    text: "Saya dapat membuat dokumen teks (misal: surat, laporan) dengan mudah.",
    area: 3,
    areaName: "Digital Content Creation",
    isReversed: false
  },
  {
    id: "C2",
    text: "Saya merasa kesulitan membuat presentasi yang menarik secara visual.",
    area: 3,
    areaName: "Digital Content Creation",
    isReversed: true
  },
  {
    id: "C3",
    text: "Saya memahami konsep dasar hak cipta saat menggunakan konten orang lain.",
    area: 3,
    areaName: "Digital Content Creation",
    isReversed: false
  },
  {
    id: "C4",
    text: "Saya tidak tertarik untuk mencoba pemrograman atau scripting sederhana.",
    area: 3,
    areaName: "Digital Content Creation",
    isReversed: true
  },
  {
    id: "C5",
    text: "Saya dapat membuat konten digital sederhana (misal: infografis, edit video).",
    area: 3,
    areaName: "Digital Content Creation",
    isReversed: false
  },

  // Area 4: Safety
  {
    id: "D1",
    text: "Saya menggunakan password yang kuat dan berbeda untuk setiap akun penting.",
    area: 4,
    areaName: "Safety",
    isReversed: false
  },
  {
    id: "D2",
    text: "Saya sering ragu apakah sebuah email aman atau merupakan upaya penipuan.",
    area: 4,
    areaName: "Safety",
    isReversed: true
  },
  {
    id: "D3",
    text: "Saya jarang melakukan backup data penting saya.",
    area: 4,
    areaName: "Safety",
    isReversed: true
  },
  {
    id: "D4",
    text: "Saya memahami cara melindungi data pribadi saya saat online.",
    area: 4,
    areaName: "Safety",
    isReversed: false
  },
  {
    id: "D5",
    text: "Saya yakin perangkat saya aman dari virus atau malware.",
    area: 4,
    areaName: "Safety",
    isReversed: false
  },

  // Area 5: Problem Solving
  {
    id: "E1",
    text: "Jika sebuah software tidak bekerja, saya akan mencoba mencari solusinya di internet.",
    area: 5,
    areaName: "Problem Solving",
    isReversed: false
  },
  {
    id: "E2",
    text: "Saya merasa kesulitan mempelajari cara menggunakan teknologi baru secara mandiri.",
    area: 5,
    areaName: "Problem Solving",
    isReversed: true
  },
  {
    id: "E3",
    text: "Saya dapat mengidentifikasi di mana letak kelemahan kompetensi digital saya.",
    area: 5,
    areaName: "Problem Solving",
    isReversed: false
  },
  {
    id: "E4",
    text: "Saya sering meminta bantuan orang lain bahkan untuk masalah teknis yang sederhana.",
    area: 5,
    areaName: "Problem Solving",
    isReversed: true
  },
  {
    id: "E5",
    text: "Saya tertarik untuk terus belajar dan beradaptasi dengan teknologi baru.",
    area: 5,
    areaName: "Problem Solving",
    isReversed: false
  }
];

export const areaNames = {
  1: "Information & Data Literacy",
  2: "Communication & Collaboration", 
  3: "Digital Content Creation",
  4: "Safety",
  5: "Problem Solving"
};

export const shuffleQuestions = (questions: Question[]): Question[] => {
  const areas = [1, 2, 3, 4, 5];
  const shuffled: Question[] = [];
  
  areas.forEach(area => {
    const areaQuestions = questions.filter(q => q.area === area);
    const shuffledAreaQuestions = [...areaQuestions].sort(() => Math.random() - 0.5);
    shuffled.push(...shuffledAreaQuestions);
  });
  
  return shuffled;
};