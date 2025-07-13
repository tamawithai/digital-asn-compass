import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";

// Tipe untuk nilai yang akan disediakan oleh context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

// Membuat context dengan nilai default undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Komponen Provider yang akan "membungkus" aplikasi kita
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Listener ini akan memantau perubahan status login dari Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    // Membersihkan listener saat komponen tidak lagi digunakan
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Arahkan ke halaman kuesioner setelah berhasil login
      navigate("/questionnaire");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // Arahkan ke halaman utama setelah berhasil logout
      navigate("/");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
  };

  // Sediakan nilai ke semua komponen anak
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Hook kustom untuk mempermudah penggunaan context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};