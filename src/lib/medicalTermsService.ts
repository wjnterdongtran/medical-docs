import { getSupabaseClient } from './supabase';
import type { MedicalTerm, AuditInfo } from '@site/src/data/medicalTerms';

// Database row type (matches Supabase table structure)
interface MedicalTermRow {
  id: string;
  term: string;
  definition: string;
  category: string;
  code: string | null;
  code_system: string | null;
  created_by_email: string | null;
  created_by_username: string | null;
  created_at: string | null;
  updated_by_email: string | null;
  updated_by_username: string | null;
  updated_at: string | null;
}

// Convert database row to MedicalTerm
function rowToMedicalTerm(row: MedicalTermRow): MedicalTerm {
  const term: MedicalTerm = {
    id: row.id,
    term: row.term,
    definition: row.definition,
    category: row.category as MedicalTerm['category'],
    code: row.code || undefined,
    codeSystem: row.code_system as MedicalTerm['codeSystem'] | undefined,
  };

  if (row.created_by_email && row.created_at) {
    term.createdBy = {
      email: row.created_by_email,
      username: row.created_by_username || row.created_by_email.split('@')[0],
      timestamp: row.created_at,
    };
  }

  if (row.updated_by_email && row.updated_at) {
    term.updatedBy = {
      email: row.updated_by_email,
      username: row.updated_by_username || row.updated_by_email.split('@')[0],
      timestamp: row.updated_at,
    };
  }

  return term;
}

// Convert MedicalTerm to database insert/update data
function medicalTermToRow(
  term: Omit<MedicalTerm, 'id' | 'createdBy' | 'updatedBy'>,
  auditInfo?: AuditInfo,
  isUpdate = false
): Partial<MedicalTermRow> {
  const row: Partial<MedicalTermRow> = {
    term: term.term,
    definition: term.definition,
    category: term.category,
    code: term.code || null,
    code_system: term.codeSystem || null,
  };

  if (auditInfo) {
    if (isUpdate) {
      row.updated_by_email = auditInfo.email;
      row.updated_by_username = auditInfo.username;
      row.updated_at = auditInfo.timestamp;
    } else {
      row.created_by_email = auditInfo.email;
      row.created_by_username = auditInfo.username;
      row.created_at = auditInfo.timestamp;
    }
  }

  return row;
}

export interface MedicalTermsServiceResult<T> {
  data: T | null;
  error: Error | null;
}

export const medicalTermsService = {
  // Fetch all terms
  async getAll(): Promise<MedicalTermsServiceResult<MedicalTerm[]>> {
    const client = getSupabaseClient();
    if (!client) {
      return { data: null, error: new Error('Supabase client not available') };
    }

    const { data, error } = await client
      .from('medical_terms')
      .select('*')
      .order('term', { ascending: true });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: (data || []).map(rowToMedicalTerm), error: null };
  },

  // Fetch single term by ID
  async getById(id: string): Promise<MedicalTermsServiceResult<MedicalTerm>> {
    const client = getSupabaseClient();
    if (!client) {
      return { data: null, error: new Error('Supabase client not available') };
    }

    const { data, error } = await client
      .from('medical_terms')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: rowToMedicalTerm(data), error: null };
  },

  // Create a new term
  async create(
    termData: Omit<MedicalTerm, 'id' | 'createdBy' | 'updatedBy'>,
    auditInfo?: AuditInfo
  ): Promise<MedicalTermsServiceResult<MedicalTerm>> {
    const client = getSupabaseClient();
    if (!client) {
      return { data: null, error: new Error('Supabase client not available') };
    }

    const row = medicalTermToRow(termData, auditInfo, false);

    const { data, error } = await client
      .from('medical_terms')
      .insert(row)
      .select()
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: rowToMedicalTerm(data), error: null };
  },

  // Update an existing term
  async update(
    id: string,
    updates: Partial<Omit<MedicalTerm, 'id' | 'createdBy' | 'updatedBy'>>,
    auditInfo?: AuditInfo
  ): Promise<MedicalTermsServiceResult<MedicalTerm>> {
    const client = getSupabaseClient();
    if (!client) {
      return { data: null, error: new Error('Supabase client not available') };
    }

    const row: Partial<MedicalTermRow> = {};

    if (updates.term !== undefined) row.term = updates.term;
    if (updates.definition !== undefined) row.definition = updates.definition;
    if (updates.category !== undefined) row.category = updates.category;
    if (updates.code !== undefined) row.code = updates.code || null;
    if (updates.codeSystem !== undefined) row.code_system = updates.codeSystem || null;

    if (auditInfo) {
      row.updated_by_email = auditInfo.email;
      row.updated_by_username = auditInfo.username;
      row.updated_at = auditInfo.timestamp;
    }

    const { data, error } = await client
      .from('medical_terms')
      .update(row)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: rowToMedicalTerm(data), error: null };
  },

  // Delete a term
  async delete(id: string): Promise<MedicalTermsServiceResult<boolean>> {
    const client = getSupabaseClient();
    if (!client) {
      return { data: null, error: new Error('Supabase client not available') };
    }

    const { error } = await client
      .from('medical_terms')
      .delete()
      .eq('id', id);

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data: true, error: null };
  },
};
