import { useState, useEffect, useCallback } from 'react';
import { MedicalTerm, AuditInfo, medicalTerms as initialTerms } from '@site/src/data/medicalTerms';
import { medicalTermsService } from '@site/src/lib/medicalTermsService';
import { getSupabaseClient } from '@site/src/lib/supabase';

function createAuditInfo(email: string, username: string): AuditInfo {
  return {
    email,
    username,
    timestamp: new Date().toISOString(),
  };
}

export interface UseDictionaryReturn {
  terms: MedicalTerm[];
  addTerm: (term: Omit<MedicalTerm, 'id' | 'createdBy' | 'updatedBy'>) => Promise<MedicalTerm | null>;
  updateTerm: (id: string, updates: Partial<Omit<MedicalTerm, 'id' | 'createdBy' | 'updatedBy'>>) => Promise<boolean>;
  deleteTerm: (id: string) => Promise<boolean>;
  getTermById: (id: string) => MedicalTerm | undefined;
  refreshTerms: () => Promise<void>;
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UseDictionaryOptions {
  userEmail?: string;
  username?: string;
}

export function useDictionary(options: UseDictionaryOptions = {}): UseDictionaryReturn {
  const { userEmail, username } = options;
  const [terms, setTerms] = useState<MedicalTerm[]>(initialTerms);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if Supabase is available
  const isSupabaseAvailable = useCallback(() => {
    return getSupabaseClient() !== null;
  }, []);

  // Load terms from Supabase
  const loadTerms = useCallback(async () => {
    if (!isSupabaseAvailable()) {
      // Fall back to initial terms if Supabase is not configured
      setTerms(initialTerms);
      setIsLoaded(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    const { data, error: fetchError } = await medicalTermsService.getAll();

    if (fetchError) {
      console.error('Failed to fetch terms:', fetchError);
      setError(fetchError.message);
      // Fall back to initial terms on error
      setTerms(initialTerms);
    } else if (data && data.length > 0) {
      setTerms(data);
    } else {
      // No terms in database, use initial terms
      setTerms(initialTerms);
    }

    setIsLoaded(true);
    setIsLoading(false);
  }, [isSupabaseAvailable]);

  // Load from Supabase on mount
  useEffect(() => {
    loadTerms();
  }, [loadTerms]);

  const refreshTerms = useCallback(async () => {
    await loadTerms();
  }, [loadTerms]);

  const addTerm = useCallback(async (
    termData: Omit<MedicalTerm, 'id' | 'createdBy' | 'updatedBy'>
  ): Promise<MedicalTerm | null> => {
    if (!isSupabaseAvailable()) {
      setError('Supabase is not configured');
      return null;
    }

    const auditInfo = userEmail && username ? createAuditInfo(userEmail, username) : undefined;

    setIsLoading(true);
    setError(null);

    const { data, error: createError } = await medicalTermsService.create(termData, auditInfo);

    if (createError) {
      console.error('Failed to create term:', createError);
      setError(createError.message);
      setIsLoading(false);
      return null;
    }

    if (data) {
      setTerms((prev) => [...prev, data]);
    }

    setIsLoading(false);
    return data;
  }, [userEmail, username, isSupabaseAvailable]);

  const updateTerm = useCallback(async (
    id: string,
    updates: Partial<Omit<MedicalTerm, 'id' | 'createdBy' | 'updatedBy'>>
  ): Promise<boolean> => {
    if (!isSupabaseAvailable()) {
      setError('Supabase is not configured');
      return false;
    }

    const auditInfo = userEmail && username ? createAuditInfo(userEmail, username) : undefined;

    setIsLoading(true);
    setError(null);

    const { data, error: updateError } = await medicalTermsService.update(id, updates, auditInfo);

    if (updateError) {
      console.error('Failed to update term:', updateError);
      setError(updateError.message);
      setIsLoading(false);
      return false;
    }

    if (data) {
      setTerms((prev) =>
        prev.map((term) => (term.id === id ? data : term))
      );
    }

    setIsLoading(false);
    return true;
  }, [userEmail, username, isSupabaseAvailable]);

  const deleteTerm = useCallback(async (id: string): Promise<boolean> => {
    if (!isSupabaseAvailable()) {
      setError('Supabase is not configured');
      return false;
    }

    setIsLoading(true);
    setError(null);

    const { error: deleteError } = await medicalTermsService.delete(id);

    if (deleteError) {
      console.error('Failed to delete term:', deleteError);
      setError(deleteError.message);
      setIsLoading(false);
      return false;
    }

    setTerms((prev) => prev.filter((term) => term.id !== id));
    setIsLoading(false);
    return true;
  }, [isSupabaseAvailable]);

  const getTermById = useCallback((id: string): MedicalTerm | undefined => {
    return terms.find((term) => term.id === id);
  }, [terms]);

  return {
    terms,
    addTerm,
    updateTerm,
    deleteTerm,
    getTermById,
    refreshTerms,
    isLoaded,
    isLoading,
    error,
  };
}
