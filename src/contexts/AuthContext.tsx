import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { AuthState, UserProfile } from '../types/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  async function refreshSession() {
    const session = supabase.auth.getSession();
    if (session?.expires_at && session.expires_at < Math.floor(Date.now() / 1000)) {
      // Token expired, refresh it
      await supabase.auth.refreshSession();
    }
  }

  refreshSession();
}, []);


  useEffect(() => {
    async function initializeAuth() {
      try {
        // Check active session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("Session:", session);

        if (session) {
          await fetchProfile(session.user.id);
        } else {
          setState((s) => ({ ...s, loading: false }));
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setState((s) => ({ ...s, loading: false }));
      }

      // Listen for auth state changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("Auth state changed:", event, session);

        if (session && event === "SIGNED_IN") {
          await fetchProfile(session.user.id);
          const origin = location.state?.from?.pathname || "/dashboard";
          navigate(origin);
        } else if (event === "SIGNED_OUT") {
          setState({ user: null, loading: false });
          navigate("/login");
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }

    initializeAuth();
  }, [navigate, location]);


  async function fetchProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      setState({
        user: data as UserProfile,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setState(s => ({ ...s, loading: false }));
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success('Successfully signed in!');
    } catch (error) {
      toast.error('Error signing in');
      throw error;
    }
  }

  async function signUp(email: string, password: string, fullName: string) {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      toast.success('Registration successful! Please sign in.');
      navigate('/login');
    } catch (error) {
      toast.error('Error signing up');
      throw error;
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Successfully signed out!');
    } catch (error) {
      toast.error('Error signing out');
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}