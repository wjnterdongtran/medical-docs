import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  medicalTermsService,
  type PaginationParams,
  type PaginatedResult,
} from '@site/src/lib/medicalTermsService';
import type { MedicalTerm, AuditInfo } from '@site/src/data/medicalTerms';

// Query keys for cache management
export const medicalTermsKeys = {
  all: ['medical-terms'] as const,
  paginated: (params: PaginationParams) =>
    [...medicalTermsKeys.all, 'paginated', params] as const,
};

// Hook for fetching paginated terms with backend filtering
export function useMedicalTermsQuery(params: PaginationParams) {
  return useQuery({
    queryKey: medicalTermsKeys.paginated(params),
    queryFn: async () => {
      const result = await medicalTermsService.getPaginated(params);
      if (result.error) {
        throw result.error;
      }
      return result.data as PaginatedResult<MedicalTerm>;
    },
    placeholderData: (previousData) => previousData, // Keep previous data while fetching (smooth pagination)
  });
}

// Hook for creating a new term
export function useCreateTermMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      termData,
      auditInfo,
    }: {
      termData: Omit<MedicalTerm, 'id' | 'createdBy' | 'updatedBy'>;
      auditInfo?: AuditInfo;
    }) => {
      const result = await medicalTermsService.create(termData, auditInfo);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
    onSuccess: () => {
      // Invalidate all paginated queries to refresh the list
      queryClient.invalidateQueries({ queryKey: medicalTermsKeys.all });
    },
  });
}

// Hook for updating a term
export function useUpdateTermMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
      auditInfo,
    }: {
      id: string;
      updates: Partial<Omit<MedicalTerm, 'id' | 'createdBy' | 'updatedBy'>>;
      auditInfo?: AuditInfo;
    }) => {
      const result = await medicalTermsService.update(id, updates, auditInfo);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
    onSuccess: () => {
      // Invalidate all paginated queries to refresh the list
      queryClient.invalidateQueries({ queryKey: medicalTermsKeys.all });
    },
  });
}

// Hook for deleting a term
export function useDeleteTermMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await medicalTermsService.delete(id);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
    onSuccess: () => {
      // Invalidate all paginated queries to refresh the list
      queryClient.invalidateQueries({ queryKey: medicalTermsKeys.all });
    },
  });
}
