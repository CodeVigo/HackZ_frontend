import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    user: UserProfile | null;
    loading: boolean;
  }>({
    user: null,
    loading: true,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          await fetchProfile(token); // Fetch user profile if token exists
        } catch (error) {
          console.error("Error during re-authentication:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } else {
        setState({ user: null, loading: false }); // No token, finish loading
      }
    };

    initializeAuth();
  }, []);

  const fetchProfile = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:5000/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data;
      setState({ user, loading: false });
      localStorage.setItem("user", JSON.stringify(user)); // Cache user details
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Session expired. Please log in again.");
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token); // Save token to localStorage
      setState({ user, loading: false });
      toast.success("Successfully signed in!");
      const origin = location.state?.from?.pathname || "/dashboard";
      navigate(origin);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to sign in";
      toast.error(errorMessage);
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: string
  ) => {
    try {
      await axios.post("http://localhost:5000/auth/register", {
        email,
        password,
        fullName,
        role,
      });

      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error: any) {
      console.error("Sign up error:", error);
      const errorMessage = error.response?.data?.message || "Failed to sign up";
      toast.error(errorMessage);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setState({ user: null, loading: false });
      toast.success("Successfully signed out!");
      navigate("/login");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
