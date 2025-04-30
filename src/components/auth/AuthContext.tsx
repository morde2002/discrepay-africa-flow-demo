import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define types for our authentication context
type AuthStatus = "idle" | "authenticated" | "unauthenticated";
type VerificationStatus = "unverified" | "pending" | "approved" | "rejected";

interface UserData {
  username: string;
  role: string;
  businessName?: string;
  email?: string;
  verificationStatus?: VerificationStatus;
  kybStatus?: VerificationStatus;
  isTestMode?: boolean;
}

interface AuthContextType {
  status: AuthStatus;
  user: UserData | null;
  login: (username: string, password: string, remember: boolean) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
  getUserRole: () => string | null;
  isAccountActive: () => boolean;
  verificationStep: number;
  setVerificationStep: (step: number) => void;
  updateUserData: (data: Partial<UserData>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Valid credentials for demo purposes
const VALID_CREDENTIALS = { username: "rjlogistics", password: "Abc123**!!" };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [user, setUser] = useState<UserData | null>(null);
  const [verificationStep, setVerificationStep] = useState(0);
  const navigate = useNavigate();

  // Check for existing session on initial load
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    if (isAuth) {
      const role = localStorage.getItem("userRole") || "user";
      const username = localStorage.getItem("rememberedUser") || "User";
      const verificationStatus = localStorage.getItem("verificationStatus") as VerificationStatus || "unverified";
      const kybStatus = localStorage.getItem("kybStatus") as VerificationStatus || "unverified";
      const businessName = localStorage.getItem("businessName") || undefined;
      const email = localStorage.getItem("businessEmail") || undefined;
      const isTestMode = localStorage.getItem("isTestMode") === "true";
      
      setUser({
        username,
        role,
        businessName,
        email,
        verificationStatus,
        kybStatus,
        isTestMode
      });
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  const login = async (username: string, password: string, remember: boolean): Promise<boolean> => {
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("isTestMode", "true"); // For demo purposes
      
      if (remember) {
        localStorage.setItem("rememberedUser", username);
      }
      
      const kybStatus = localStorage.getItem("kybStatus") as VerificationStatus || "pending";
      const verificationStatus = localStorage.getItem("verificationStatus") as VerificationStatus || "approved";
      const businessName = localStorage.getItem("businessName") || "RJ Logistics";
      const email = localStorage.getItem("businessEmail") || "info@rjlogistics.com";
      
      setUser({
        username,
        role: "admin",
        kybStatus,
        verificationStatus,
        businessName,
        email,
        isTestMode: true // For demo purposes
      });
      
      setStatus("authenticated");
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("rememberedUser");
    localStorage.removeItem("isTestMode");
    // We don't remove verification status on logout to keep the user's progress
    setUser(null);
    setStatus("unauthenticated");
    navigate("/auth");
  };

  const isAuthenticated = (): boolean => {
    return localStorage.getItem("isAuthenticated") === "true";
  };

  const getUserRole = (): string | null => {
    return localStorage.getItem("userRole");
  };

  const isAccountActive = (): boolean => {
    // Account is active if KYB status is approved
    const kybStatus = user?.kybStatus || localStorage.getItem("kybStatus") as VerificationStatus;
    return kybStatus === "approved";
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUser(prev => {
      const updatedUser = { ...prev, ...data } as UserData;
      
      // Update localStorage for persistence
      if (data.businessName) localStorage.setItem("businessName", data.businessName);
      if (data.email) localStorage.setItem("businessEmail", data.email);
      if (data.verificationStatus) localStorage.setItem("verificationStatus", data.verificationStatus);
      if (data.kybStatus) localStorage.setItem("kybStatus", data.kybStatus);
      if (data.isTestMode !== undefined) localStorage.setItem("isTestMode", data.isTestMode ? "true" : "false");
      
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        status, 
        user, 
        login, 
        logout, 
        isAuthenticated, 
        getUserRole,
        isAccountActive,
        verificationStep, 
        setVerificationStep,
        updateUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
