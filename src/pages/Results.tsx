import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SimpleRadarChart } from "@/components/SimpleRadarChart";
import { calculateScore } from "@/utils/scoring";
import { QuestionnaireData, AssessmentResult } from "@/data/questions";
import { 
  Download, 
  Share2, 
  TrendingUp, 
  Users,
  PenTool,
  Shield,
  Settings,
  Search
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("final-answers");
    if (!savedAnswers) {
      navigate("/");
      return;
    }

    const answers: QuestionnaireData = JSON.parse(savedAnswers);
    const calculatedResult = calculateScore(answers);
    setResult(calculatedResult);

    // Hentikan efek confetti setelah 2 detik
    const timer = setTimeout(() => setShowConfetti(false), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handlePrintPDF = () => {
    window.print();
    toast({
      title: "Mencetak Hasil",
      description: "Dialog print telah dibuka. Pilih 'Save as PDF' untuk menyimpan hasil Anda.",
    });
  };

  const handleShare = (platform: string) => {
    const shareText = `Saya baru saja menyelesaikan asesmen literasi digital dengan skor ${result?.totalIndex}/100! 🚀 Tingkatkan kompetensi digital Anda juga di Portal Asesmen Literasi Digital.`;
    const shareUrl = window.location.origin;

    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case "instagram":
        navigator.clipboard.writeText(shareText + " " + shareUrl);
        toast({
          title: "Teks Disalin",
          description: "Teks untuk berbagi telah disalin ke clipboard. Silakan paste di Instagram Anda.",
        });
        return;
    }
    window.open(url, '_blank');
  };


  if (!result) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const radarData = [
    { area: "Info & Data", score: result.areaScores.area1, fullMark: 100 },
    { area: "Komunikasi", score: result.areaScores.area2, fullMark: 100 },
    { area: "Konten Digital", score: result.areaScores.area3, fullMark: 100 },
    { area: "Keamanan", score: result.areaScores.area4, fullMark: 100 },
    { area: "Problem Solving", score: result.areaScores.area5, fullMark: 100 },
  ];

  const getCompetencyColor = (level: string) => {
    switch (level) {
      case "Tinggi": return "bg-success text-success-foreground";
      case "Sedang": return "bg-primary text-primary-foreground";
      case "Rendah": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getAreaIcon = (areaIndex: number) => {
    const icons = [Search, Users, PenTool, Shield, Settings];
    const Icon = icons[areaIndex - 1];
    return Icon;
  };

  const getAreaName = (areaIndex: number): string => {
    const names: { [key: number]: string } = {
      1: "Information & Data Literacy",
      2: "Communication & Collaboration", 
      3: "Digital Content Creation",
      4: "Safety",
      5: "Problem Solving"
    };
    return names[areaIndex] || "";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full absolute animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`
              }}
            />
          ))}
        </div>
      )}

      <Header />

      <div className="container max-w-6xl py-8 space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            🎉 Selamat! Asesmen Anda Telah Selesai
          </h1>
          <p className="text-xl text-muted-foreground">
            Berikut adalah hasil analisis kompetensi literasi digital Anda
          </p>
        </div>

        <Card className="p-8 shadow-medium animate-slide-up">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">Visualisasi Kompetensi Digital</h2>
            <p className="text-muted-foreground">Radar chart menunjukkan profil kompetensi Anda di 5 area</p>
          </div>
          <SimpleRadarChart data={radarData} />
        </Card>

        <Card className="p-8 shadow-medium animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="grid md:grid-cols-2 gap-6 items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">{result.totalIndex}</div>
              <div className="text-sm text-muted-foreground">Indeks Total</div>
              <div className="text-xs text-muted-foreground">dari 100 poin</div>
            </div>

            <div className="text-center space-y-2">
              <Badge className={`text-lg px-4 py-2 ${getCompetencyColor(result.competencyLevel)}`}>
                {result.competencyLevel}
              </Badge>
              <div className="text-sm text-muted-foreground">Level Kompetensi</div>
              <div className="text-xs text-muted-foreground">berdasarkan skor total</div>
            </div>
          </div>
        </Card>

        <Card className="p-8 shadow-medium animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Analisis Detail</h3>
              <div className="space-y-4">
                {Object.entries(result.areaScores).map(([key, score]) => {
                  const areaIndex = parseInt(key.replace('area', ''));
                  const areaName = getAreaName(areaIndex);
                  const Icon = getAreaIcon(areaIndex);

                  return (
                    <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{areaName}</div>
                          <div className="text-sm text-muted-foreground">Area {areaIndex}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{score}</div>
                        <div className="text-sm text-muted-foreground">dari 100</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Saran Pengembangan</h3>
              <div className="space-y-4">
                {result.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-medium animate-slide-up" style={{ animationDelay: '600ms' }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handlePrintPDF} className="gap-2" size="lg">
              <Download className="h-4 w-4" />
              Cetak ke PDF
            </Button>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleShare("whatsapp")}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleShare("facebook")}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Facebook
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleShare("instagram")}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Instagram
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Footer />

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-confetti-fall {
            animation: confetti-fall 3s linear infinite;
        }
        @media print {
          .no-print {
            display: none !important;
          }
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
};

export default Results;