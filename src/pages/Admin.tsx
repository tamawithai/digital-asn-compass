import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Settings, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [googleSheetUrl, setGoogleSheetUrl] = useState("");

  const handleLogin = () => {
    // Simple password check - in production this should be more secure
    if (password === "admin123") {
      setIsAuthenticated(true);
      // Load current Google Sheet URL
      const savedUrl = localStorage.getItem("google-sheet-url");
      if (savedUrl) setGoogleSheetUrl(savedUrl);
    } else {
      toast({
        title: "Password Salah",
        description: "Silakan masukkan password yang benar.",
        variant: "destructive"
      });
    }
  };

  const handleSave = () => {
    localStorage.setItem("google-sheet-url", googleSheetUrl);
    toast({
      title: "Konfigurasi Berhasil Disimpan",
      description: "URL Google Sheet telah diperbarui."
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header showLogin={false} />
        <div className="container max-w-md mx-auto py-20">
          <Card className="p-8 shadow-medium">
            <div className="text-center space-y-6">
              <Settings className="h-12 w-12 text-primary mx-auto" />
              <h1 className="text-2xl font-bold">Akses Admin</h1>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="password">Password Admin</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
                <Button onClick={handleLogin} className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showLogin={false} />
      <div className="container max-w-2xl py-8">
        <Card className="p-8 shadow-medium">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Konfigurasi Sistem</h1>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="sheet-url">URL Google Sheet Tujuan</Label>
                <Input
                  id="sheet-url"
                  value={googleSheetUrl}
                  onChange={(e) => setGoogleSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Masukkan URL Google Sheet yang akan digunakan untuk menyimpan data hasil asesmen.
                </p>
              </div>
              
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Simpan
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;