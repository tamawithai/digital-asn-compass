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
import { auth, googleProvider, db } from "@/lib/firebase"; // <-- Tambahkan db
import { doc, getDoc } from "firebase/firestore"; // <-- Tambahkan ini
import { useNavigate } from "react-router-dom";

// Tipe untuk data pengguna kustom kita
interface AppUser extends User {
  isAdmin?: boolean;
}

// Tipe untuk nilai yang akan disediakan oleh context
interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

// Membuat context dengan nilai default undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Komponen Provider yang akan "membungkus" aplikasi kita
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Listener ini akan memantau perubahan status login dari Firebase
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Jika ada pengguna, periksa perannya di Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        const userData: AppUser = {
          ...currentUser,
          isAdmin: userDoc.exists() && userDoc.data().role === "admin",
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Membersihkan listener saat komponen tidak lagi digunakan
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;

      // Setelah login, periksa apakah dia admin
      const userDocRef = doc(db, "users", loggedInUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() && userDoc.data().role === "admin") {
        // Jika admin, arahkan ke dashboard admin
        navigate("/admin");
      } else {
        // Jika bukan, arahkan ke kuesioner
        navigate("/questionnaire");
      }
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