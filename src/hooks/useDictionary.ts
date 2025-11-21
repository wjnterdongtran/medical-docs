import { useState, useEffect, useCallback } from 'react';
import { MedicalTerm, AuditInfo, medicalTerms as initialTerms } from '@site/src/data/medicalTerms';

const STORAGE_KEY = 'medical-dictionary-terms';

function generateId(): string {
  return `term-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function createAuditInfo(email: string): AuditInfo {
  return {
    email,
    timestamp: new Date().toISOString(),
  };
}

function loadTermsFromStorage(): MedicalTerm[] {
  if (typeof window === 'undefined') {
    return initialTerms;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load terms from localStorage:', error);
  }

  return initialTerms;
}

function saveTermsToStorage(terms: MedicalTerm[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(terms));
  } catch (error) {
    console.error('Failed to save terms to localStorage:', error);
  }
}

export interface UseDictionaryReturn {
  terms: MedicalTerm[];
  addTerm: (term: Omit<MedicalTerm, 'id' | 'createdBy' | 'updatedBy'>) => MedicalTerm;
  updateTerm: (id: string, updates: Partial<Omit<MedicalTerm, 'id' | 'createdBy' | 'updatedBy'>>) => boolean;
  deleteTerm: (id: string) => boolean;
  getTermById: (id: string) => MedicalTerm | undefined;
  resetToDefault: () => void;
  isLoaded: boolean;
}

export interface UseDictionaryOptions {
  userEmail?: string;
}

export function useDictionary(options: UseDictionaryOptions = {}): UseDictionaryReturn {
  const { userEmail } = options;
  const [terms, setTerms] = useState<MedicalTerm[]>(initialTerms);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    const loadedTerms = loadTermsFromStorage();
    setTerms(loadedTerms);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever terms change (after initial load)
  useEffect(() => {
    if (isLoaded) {
      saveTermsToStorage(terms);
    }
  }, [terms, isLoaded]);

  const addTerm = useCallback((termData: Omit<MedicalTerm, 'id' | 'createdBy' | 'updatedBy'>): MedicalTerm => {
    const auditInfo = userEmail ? createAuditInfo(userEmail) : undefined;
    const newTerm: MedicalTerm = {
      ...termData,
      id: generateId(),
      createdBy: auditInfo,
    };

    setTerms((prev) => [...prev, newTerm]);
    return newTerm;
  }, [userEmail]);

  const updateTerm = useCallback((id: string, updates: Partial<Omit<MedicalTerm, 'id' | 'createdBy' | 'updatedBy'>>): boolean => {
    let found = false;
    const auditInfo = userEmail ? createAuditInfo(userEmail) : undefined;

    setTerms((prev) =>
      prev.map((term) => {
        if (term.id === id) {
          found = true;
          return { ...term, ...updates, updatedBy: auditInfo };
        }
        return term;
      })
    );

    return found;
  }, [userEmail]);

  const deleteTerm = useCallback((id: string): boolean => {
    let found = false;

    setTerms((prev) => {
      const index = prev.findIndex((term) => term.id === id);
      if (index !== -1) {
        found = true;
        return prev.filter((term) => term.id !== id);
      }
      return prev;
    });

    return found;
  }, []);

  const getTermById = useCallback((id: string): MedicalTerm | undefined => {
    return terms.find((term) => term.id === id);
  }, [terms]);

  const resetToDefault = useCallback((): void => {
    setTerms(initialTerms);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    terms,
    addTerm,
    updateTerm,
    deleteTerm,
    getTermById,
    resetToDefault,
    isLoaded,
  };
}
