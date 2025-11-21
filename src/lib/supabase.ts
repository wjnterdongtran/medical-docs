import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

// Create a lazy-initialized Supabase client to avoid errors during SSR/build
let _supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  // Only create the client in browser environment with valid credentials
  if (typeof window === 'undefined') {
    return null;
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      'Supabase credentials not configured. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY environment variables.'
    );
    return null;
  }

  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  return _supabase;
}

// Legacy export for backward compatibility - prefer getSupabaseClient()
export const supabase = {
  auth: {
    getSession: async () => {
      const client = getSupabaseClient();
      if (!client) return { data: { session: null }, error: null };
      return client.auth.getSession();
    },
    onAuthStateChange: (callback: Parameters<SupabaseClient['auth']['onAuthStateChange']>[0]) => {
      const client = getSupabaseClient();
      if (!client) {
        return { data: { subscription: { unsubscribe: () => {} } } };
      }
      return client.auth.onAuthStateChange(callback);
    },
    signInWithPassword: async (credentials: { email: string; password: string }) => {
      const client = getSupabaseClient();
      if (!client) return { data: { user: null, session: null }, error: new Error('Supabase not configured') };
      return client.auth.signInWithPassword(credentials);
    },
    signUp: async (credentials: { email: string; password: string }) => {
      const client = getSupabaseClient();
      if (!client) return { data: { user: null, session: null }, error: new Error('Supabase not configured') };
      return client.auth.signUp(credentials);
    },
    signOut: async () => {
      const client = getSupabaseClient();
      if (!client) return { error: null };
      return client.auth.signOut();
    },
    resetPasswordForEmail: async (email: string) => {
      const client = getSupabaseClient();
      if (!client) return { data: {}, error: new Error('Supabase not configured') };
      return client.auth.resetPasswordForEmail(email);
    },
  },
};

// Allowed email domain for authentication
export const ALLOWED_EMAIL_DOMAIN = 'trendingvenues.com';

export function isEmailAllowed(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain === ALLOWED_EMAIL_DOMAIN;
}
