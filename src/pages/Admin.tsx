import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const [googleSheetUrl, setGoogleSheetUrl] = useState("");

  // Saat komponen dimuat, ambil URL yang tersimpan dari localStorage
  useEffect(() => {
    const savedUrl = localStorage.getItem("google-sheet-url");
    if (savedUrl) {
      setGoogleSheetUrl(savedUrl);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("google-sheet-url", googleSheetUrl);
    toast({
      title: "Konfigurasi Berhasil Disimpan",
      description: "URL Google Sheet telah diperbarui.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-2xl py-8">
        <Card className="p-8 shadow-medium">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Konfigurasi Sistem</h1>
            <div className="space-y-4">
              <div>
                <Label htmlFor="sheet-url">
                  URL Google Apps Script (Web App)
                </Label>
                <Input
                  id="sheet-url"
                  value={googleSheetUrl}
                  onChange={(e) => setGoogleSheetUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/..."
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Masukkan URL Google Sheet yang akan digunakan untuk menyimpan
                  data hasil asesmen.
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