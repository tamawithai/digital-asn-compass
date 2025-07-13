import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/Header";
import { questions, shuffleQuestions, Question, QuestionnaireData } from "@/data/questions";
import { ChevronLeft, ChevronRight } from "lucide-react";

const likertOptions = [
  { value: 1, label: "Sangat Tidak Setuju" },
  { value: 2, label: "Tidak Setuju" },
  { value: 3, label: "Netral" },
  { value: 4, label: "Setuju" },
  { value: 5, label: "Sangat Setuju" }
];

const Questionnaire = () => {
  const navigate = useNavigate();
  const [shuffledQuestions] = useState<Question[]>(() => shuffleQuestions(questions));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireData>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const currentArea = currentQuestion?.area || 1;
  // --- PERUBAHAN LOGIKA PROGRESS ---
  const progress = (currentQuestionIndex / shuffledQuestions.length) * 100;

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem("questionnaire-answers", JSON.stringify(answers));
    localStorage.setItem("questionnaire-progress", currentQuestionIndex.toString());
  }, [answers, currentQuestionIndex]);

  // Load saved progress
  useEffect(() => {
    const savedAnswers = localStorage.getItem("questionnaire-answers");
    const savedProgress = localStorage.getItem("questionnaire-progress");

    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    if (savedProgress) {
      setCurrentQuestionIndex(parseInt(savedProgress));
    }
  }, []);

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowConfirmDialog(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    // Save final answers
    localStorage.setItem("final-answers", JSON.stringify(answers));
    // Clear progress
    localStorage.removeItem("questionnaire-answers");
    localStorage.removeItem("questionnaire-progress");
    // Navigate to results
    navigate("/results");
  };

  const isAnswered = currentQuestion && answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container max-w-4xl py-8">
        {/* Progress Section */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {/* --- PENAMBAHAN PERSENTASE TEKS --- */}
            <div className="flex items-center gap-2">
              <span>Pertanyaan {currentQuestionIndex + 1} dari {shuffledQuestions.length}</span>
              <span className="font-medium text-primary">({Math.round(progress)}%)</span>
            </div>
            <span>Area {currentArea}: {currentQuestion.areaName}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-8 shadow-medium">
          <div className="space-y-8">
            <h2 className="text-xl font-semibold leading-relaxed">
              {currentQuestion.text}
            </h2>

            {/* Likert Scale Options */}
            <div className="space-y-3">
              {likertOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
                    answers[currentQuestion.id] === option.value
                      ? "border-primary bg-primary/5 shadow-soft"
                      : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option.value}
                    checked={answers[currentQuestion.id] === option.value}
                    onChange={() => handleAnswer(option.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                      answers[currentQuestion.id] === option.value
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {answers[currentQuestion.id] === option.value && (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                    )}
                  </div>
                  <span className="font-medium">{option.label}</span>
                </label>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Sebelumnya
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isAnswered}
                className="gap-2"
              >
                {isLastQuestion ? "Selesai & Lihat Hasil" : "Berikutnya"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-md mx-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Konfirmasi Penyelesaian</h3>
              <p className="text-muted-foreground">
                Anda telah menjawab semua pertanyaan. Apakah Anda yakin ingin menyelesaikan asesmen dan melihat hasil?
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmDialog(false)}
                >
                  Batal
                </Button>
                <Button onClick={handleComplete}>
                  Ya, Selesai
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;