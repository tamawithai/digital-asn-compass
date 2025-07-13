import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  // Gunakan hook useAuth untuk mendapatkan data & fungsi otentikasi
  const { user, login, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">DL</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Portal Asesmen Literasi Digital
          </h1>
        </a>

        {/* Tampilkan tombol/info pengguna berdasarkan status login */}
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline">{user.displayName}</span>
            </div>
            <Button variant="outline" onClick={logout} size="sm" className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={login} className="gap-2">
            <User className="h-4 w-4" />
            Login
          </Button>
        )}
      </div>
    </header>
  );
};