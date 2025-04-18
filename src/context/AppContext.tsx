
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define types
interface User {
  id: string;
  name: string;
  phone: string;
  trustScore: number;
  dailyEarnings: number;
  eligibleLoan: number;
  completedJobs: number;
  isVerified: boolean;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isOffline: boolean;
  darkMode: boolean;
  language: "en" | "sw" | "fr";
  setLanguage: (lang: "en" | "sw" | "fr") => void;
  toggleDarkMode: () => void;
  login: (phone: string) => Promise<void>;
  logout: () => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: "user-123",
  name: "Brian",
  phone: "+254712345678",
  trustScore: 72,
  dailyEarnings: 1200,
  eligibleLoan: 3500,
  completedJobs: 27,
  isVerified: true,
};

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<"en" | "sw" | "fr">("en");

  // Check network status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    // Set initial status
    setIsOffline(!navigator.onLine);

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Set dark mode based on user preference
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Login function (mock)
  const login = async (phone: string): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        resolve();
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Create the value object
  const value: AppContextType = {
    user,
    isAuthenticated: !!user,
    isOffline,
    darkMode,
    language,
    setLanguage,
    toggleDarkMode,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook for using the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
