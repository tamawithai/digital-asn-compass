import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CompetencyCard } from "@/components/CompetencyCard";
import { useAuth } from "@/contexts/AuthContext"; // <-- IMPORT INI
import { 
  Search, 
  Users, 
  PenTool, 
  Shield, 
  Settings,
  ArrowRight,
  TrendingUp,
  Award,
  Target
} from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const competencies = [
  {
    icon: Search,
    title: "Information & Data Literacy",
    description: "Kemampuan untuk mengidentifikasi, menemukan, mengambil, menyimpan, mengorganisir dan menganalisis informasi digital."
  },
  {
    icon: Users,
    title: "Communication & Collaboration", 
    description: "Kemampuan berkomunikasi dan berkolaborasi menggunakan teknologi digital dengan etika yang tepat."
  },
  {
    icon: PenTool,
    title: "Digital Content Creation",
    description: "Kemampuan membuat dan mengedit konten digital dalam berbagai format dengan memahami hak cipta."
  },
  {
    icon: Shield,
    title: "Safety",
    description: "Kemampuan melindungi perangkat, data pribadi, privasi dan kesehatan dalam lingkungan digital."
  },
  {
    icon: Settings,
    title: "Problem Solving",
    description: "Kemampuan mengidentifikasi kebutuhan dan masalah, serta memecahkannya menggunakan teknologi digital."
  }
];

const Index = () => {
  const { login } = useAuth(); // <-- GUNAKAN AUTH CONTEXT

  const handleStartAssessment = () => {
    login(); // <-- PANGGIL FUNGSI LOGIN
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-primary/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  Framework DigComp 2.2
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Ukur dan Tingkatkan{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Kompetensi Digital
                  </span>{" "}
                  Anda
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Portal asesmen literasi digital, untuk Anda yang ingin mengetahui kompetensi literasi digital secara komprehensif. 
                  Dapatkan analisis mendalam dan rekomendasi pengembangan yang dipersonalisasi 
                  berdasarkan 5 area kompetensi DigComp 2.2.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={handleStartAssessment} // Tetap sama, tapi fungsinya beda
                  className="group"
                >
                  Mulai Asesmen Sekarang
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Award className="h-5 w-5" />
                  Pelajari Framework
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground">Area Kompetensi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">25</div>
                  <div className="text-sm text-muted-foreground">Indikator Penilaian</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    <Target className="h-6 w-6 mx-auto" />
                  </div>
                  <div className="text-sm text-muted-foreground">Hasil Personal</div>
                </div>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Digital Literacy Illustration"
                  className="w-full h-auto rounded-2xl shadow-large animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competency Areas Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              5 Area Kompetensi Digital
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Mengadaptasi dari framework DigComp 2.2 dari Uni Eropa, asesmen ini mengukur 
              kompetensi literasi digital Anda secara komprehensif
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {competencies.map((competency, index) => (
              <CompetencyCard
                key={competency.title}
                icon={competency.icon}
                title={competency.title}
                description={competency.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Siap Mengukur Kompetensi Digital Anda?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Asesmen ini memakan waktu sekitar 10-15 menit. Hasil yang Anda dapatkan 
            akan memberikan insight mendalam tentang kekuatan dan area pengembangan 
            kompetensi literasi digital Anda.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={handleStartAssessment} // <-- Tombol kedua yang diperbaiki
            className="text-lg px-8 py-6 shadow-large hover:shadow-xl"
          >
            Mulai Asesmen Gratis
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;