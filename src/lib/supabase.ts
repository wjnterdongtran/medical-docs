import { createClient, SupabaseClient } from '@supabase/supabase-js';
import siteConfig from '@generated/docusaurus.config';

// Create a lazy-initialized Supabase client to avoid errors during SSR/build
let _supabase: SupabaseClient | null = null;

function getSupabaseConfig(): { url: string; anonKey: string } {
  // Only access config in browser environment
  if (typeof window === 'undefined') {
    return { url: '', anonKey: '' };
  }

  // Access Docusaurus config from window (injected at runtime)
  const customFields = siteConfig?.customFields || {};

  return {
    url: (customFields.supabaseUrl as string) || '',
    anonKey: (customFields.supabaseAnonKey as string) || '',
  };
}

export function getSupabaseClient(): SupabaseClient | null {
  // Only create the client in browser environment
  if (typeof window === 'undefined') {
    return null;
  }

  const { url, anonKey } = getSupabaseConfig();

  if (!url || !anonKey) {
    console.warn(
      'Supabase credentials not configured. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_PUBLISHABLE_KEY environment variables.'
    );
    return null;
  }

  if (!_supabase) {
    _supabase = createClient(url, anonKey);
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
      if (!client)
        return { data: { user: null, session: null }, error: new Error('Supabase not configured') };
      return client.auth.signInWithPassword(credentials);
    },
    signUp: async (credentials: { email: string; password: string }) => {
      const client = getSupabaseClient();
      if (!client)
        return { data: { user: null, session: null }, error: new Error('Supabase not configured') };
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
