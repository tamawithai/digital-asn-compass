import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface HeaderProps {
  showLogin?: boolean;
  onLoginClick?: () => void;
}

export const Header = ({ showLogin = true, onLoginClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">DL</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Portal Indeks Literasi Digital ASN
          </h1>
        </div>
        
        {showLogin && (
          <Button variant="outline" onClick={onLoginClick} className="gap-2">
            <User className="h-4 w-4" />
            Login
          </Button>
        )}
      </div>
    </header>
  );
};