
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signUp(email: string, password: string, userData?: { first_name?: string; last_name?: string }) {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) throw error;
      toast.success("Sign up successful! Please check your email for verification.");
      return true;
    } catch (error: any) {
      toast.error(error.message || "An error occurred during sign up");
      return false;
    }
  }

  async function login(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      toast.success("Login successful!");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Invalid email or password");
      return false;
    }
  }

  async function logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
    }
  }

  async function updateProfile(profileData: { 
    first_name?: string; 
    last_name?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  }) {
    try {
      if (!user) throw new Error("User not authenticated");
      
      // Update auth metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          first_name: profileData.first_name,
          last_name: profileData.last_name
        }
      });
      
      if (authError) throw authError;
      
      // Update profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);
        
      if (profileError) throw profileError;
      
      toast.success("Profile updated successfully");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Error updating profile");
      return false;
    }
  }

  return {
    user,
    session,
    loading,
    signUp,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };
}
