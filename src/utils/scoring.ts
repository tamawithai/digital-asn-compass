import { AssessmentResult, QuestionnaireData } from "@/data/questions";

export const calculateScore = (answers: QuestionnaireData): AssessmentResult => {
  const areaScores = {
    area1: 0,
    area2: 0, 
    area3: 0,
    area4: 0,
    area5: 0
  };

  // Calculate scores for each area
  const areas = [
    { area: 1, questions: ["A1", "A2", "A3", "A4", "A5"], reversed: [false, false, true, true, false] },
    { area: 2, questions: ["B1", "B2", "B3", "B4", "B5"], reversed: [false, true, false, true, false] },
    { area: 3, questions: ["C1", "C2", "C3", "C4", "C5"], reversed: [false, true, false, true, false] },
    { area: 4, questions: ["D1", "D2", "D3", "D4", "D5"], reversed: [false, true, true, false, false] },
    { area: 5, questions: ["E1", "E2", "E3", "E4", "E5"], reversed: [false, true, false, true, false] }
  ];

  areas.forEach((area, index) => {
    let totalScore = 0;
    let maxScore = area.questions.length * 5; // 5 is max score per question
    
    area.questions.forEach((questionId, qIndex) => {
      let score = answers[questionId] || 0;
      
      // Apply reverse scoring if needed
      if (area.reversed[qIndex]) {
        score = 6 - score; // 1->5, 2->4, 3->3, 4->2, 5->1
      }
      
      totalScore += score;
    });
    
    // Calculate index as percentage
    const areaIndex = (totalScore / maxScore) * 100;
    
    switch(area.area) {
      case 1: areaScores.area1 = Math.round(areaIndex); break;
      case 2: areaScores.area2 = Math.round(areaIndex); break;
      case 3: areaScores.area3 = Math.round(areaIndex); break;
      case 4: areaScores.area4 = Math.round(areaIndex); break;
      case 5: areaScores.area5 = Math.round(areaIndex); break;
    }
  });

  // Calculate total index (average of all areas)
  const totalIndex = Math.round(
    (areaScores.area1 + areaScores.area2 + areaScores.area3 + areaScores.area4 + areaScores.area5) / 5
  );

  // Determine competency level
  let competencyLevel = "";
  let recommendations: string[] = [];

  if (totalIndex >= 80) {
    competencyLevel = "Tinggi";
    recommendations = [
      "Anda memiliki kompetensi digital yang sangat baik!",
      "Pertahankan kemampuan Anda dan bantu rekan kerja untuk berkembang.",
      "Pertimbangkan untuk mengambil peran sebagai mentor digital di unit kerja Anda."
    ];
  } else if (totalIndex >= 60) {
    competencyLevel = "Sedang";
    recommendations = [
      "Kompetensi digital Anda sudah cukup baik, namun masih ada ruang untuk berkembang.",
      "Fokus pada area dengan skor terendah untuk meningkatkan kemampuan secara keseluruhan.",
      "Ikuti pelatihan lanjutan sesuai kebutuhan area yang perlu ditingkatkan."
    ];
  } else {
    competencyLevel = "Rendah";
    recommendations = [
      "Kompetensi digital Anda masih perlu ditingkatkan secara signifikan.",
      "Prioritaskan pembelajaran pada area-area fundamental terlebih dahulu.",
      "Manfaatkan sumber belajar online dan ikuti pelatihan dasar literasi digital."
    ];
  }

  return {
    totalIndex,
    areaScores,
    competencyLevel,
    recommendations
  };
};