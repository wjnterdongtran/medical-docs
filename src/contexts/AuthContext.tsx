import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase, getSupabaseClient, isEmailAllowed, ALLOWED_EMAIL_DOMAIN } from '@site/src/lib/supabase';
import type { User, Session, AuthError } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: AuthError | Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: AuthError | Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchUserProfile(userId: string): Promise<{ username: string } | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from('profiles')
    .select('username')
    .eq('id', userId)
    .single();

  if (error || !data) {
    console.warn('Failed to fetch user profile:', error?.message);
    return null;
  }

  return { username: data.username };
}

function mapUser(user: User | null, username?: string): AuthUser | null {
  if (!user || !user.email) return null;
  return {
    id: user.id,
    email: user.email,
    username: username || user.email.split('@')[0], // Fallback to email prefix
  };
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): ReactNode {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserWithProfile = useCallback(async (authUser: User | null) => {
    if (!authUser) {
      setUser(null);
      return;
    }

    // Fetch profile to get username
    const profile = await fetchUserProfile(authUser.id);
    setUser(mapUser(authUser, profile?.username));
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      await loadUserWithProfile(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      await loadUserWithProfile(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadUserWithProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    // Validate email domain
    if (!isEmailAllowed(email)) {
      return {
        error: new Error(`Only @${ALLOWED_EMAIL_DOMAIN} email addresses are allowed`),
      };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    // Validate email domain
    if (!isEmailAllowed(email)) {
      return {
        error: new Error(`Only @${ALLOWED_EMAIL_DOMAIN} email addresses are allowed`),
      };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    return { error };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    // Validate email domain
    if (!isEmailAllowed(email)) {
      return {
        error: new Error(`Only @${ALLOWED_EMAIL_DOMAIN} email addresses are allowed`),
      };
    }

    // Get the current URL origin for redirect
    const redirectTo = typeof window !== 'undefined'
      ? `${window.location.origin}/reset-password`
      : undefined;

    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    return { error };
  }, []);

  const updatePassword = useCallback(async (newPassword: string) => {
    if (newPassword.length < 6) {
      return {
        error: new Error('Password must be at least 6 characters'),
      };
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return { error };
  }, []);

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
