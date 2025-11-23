import { useState, useEffect, useCallback, type ReactNode } from 'react';
import DictionaryTable, {
  type TableFilters,
  type PaginationInfo,
} from '@site/src/components/DictionaryTable';
import TermModal, { type TermFormData } from '@site/src/components/TermModal';
import DeleteConfirmModal from '@site/src/components/DeleteConfirmModal';
import UserMenu from '@site/src/components/UserMenu';
import ProtectedRoute from '@site/src/components/ProtectedRoute';
import { useAuth } from '@site/src/contexts/AuthContext';
import {
  useMedicalTermsQuery,
  useCreateTermMutation,
  useUpdateTermMutation,
  useDeleteTermMutation,
} from '@site/src/hooks/useMedicalTermsQuery';
import type { MedicalTerm } from '@site/src/data/medicalTerms';
import styles from './styles.module.css';

// Debounce hook for search optimization
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

const DEFAULT_PAGE_SIZE = 10;

function DictionaryContentInner(): ReactNode {
  const { user } = useAuth();

  // Filter state (controlled by table, used for API calls)
  const [filters, setFilters] = useState<TableFilters>({
    searchQuery: '',
    selectedCategory: 'All',
    selectedCodeSystem: 'All',
    sortField: 'term',
    sortDirection: 'asc',
  });

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // Debounce search query for backend calls (300ms delay)
  const debouncedSearch = useDebounce(filters.searchQuery, 300);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [
    debouncedSearch,
    filters.selectedCategory,
    filters.selectedCodeSystem,
    filters.sortField,
    filters.sortDirection,
  ]);

  // React Query hooks
  const {
    data: queryData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useMedicalTermsQuery({
    page,
    pageSize,
    search: debouncedSearch,
    category: filters.selectedCategory,
    codeSystem: filters.selectedCodeSystem,
    sortField: filters.sortField,
    sortDirection: filters.sortDirection,
  });

  const createMutation = useCreateTermMutation();
  const updateMutation = useUpdateTermMutation();
  const deleteMutation = useDeleteTermMutation();

  // Modal states
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedTerm, setSelectedTerm] = useState<MedicalTerm | undefined>(undefined);

  // Handlers
  const handleAddClick = () => {
    setModalMode('add');
    setSelectedTerm(undefined);
    setIsTermModalOpen(true);
  };

  const handleEditClick = (term: MedicalTerm) => {
    setModalMode('edit');
    setSelectedTerm(term);
    setIsTermModalOpen(true);
  };

  const handleDeleteClick = (term: MedicalTerm) => {
    setSelectedTerm(term);
    setIsDeleteModalOpen(true);
  };

  const handleTermSubmit = async (formData: TermFormData) => {
    const termData = {
      term: formData.term.trim(),
      definition: formData.definition.trim(),
      category: formData.category,
      code: formData.code.trim() || undefined,
      codeSystem: formData.codeSystem || undefined,
    };

    const auditInfo = user
      ? {
          email: user.email,
          username: user.username || user.email.split('@')[0],
          timestamp: new Date().toISOString(),
        }
      : undefined;

    if (modalMode === 'add') {
      await createMutation.mutateAsync({ termData, auditInfo });
    } else if (selectedTerm) {
      await updateMutation.mutateAsync({ id: selectedTerm.id, updates: termData, auditInfo });
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedTerm) {
      await deleteMutation.mutateAsync(selectedTerm.id);
    }
  };

  // Handle filter changes from table
  const handleFiltersChange = useCallback((newFilters: Partial<TableFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Handle pagination
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
  }, []);

  // Prepare data for table
  const terms = queryData?.data ?? [];
  const pagination: PaginationInfo = {
    page: queryData?.page ?? page,
    pageSize: queryData?.pageSize ?? pageSize,
    totalCount: queryData?.totalCount ?? 0,
    totalPages: queryData?.totalPages ?? 0,
  };

  // Check if any mutation is pending
  const isMutating =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <>
      <section className={styles.content}>
        <UserMenu />

        {error && <div className={styles.errorNotice}>Error: {error.message}</div>}

        {isMutating && <div className={styles.mutatingNotice}>Saving changes...</div>}

        <DictionaryTable
          terms={terms}
          filters={filters}
          pagination={pagination}
          isLoading={isLoading || isFetching}
          onFiltersChange={handleFiltersChange}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onAdd={handleAddClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onRefresh={() => refetch()}
        />
      </section>

      {/* Modals */}
      <TermModal
        isOpen={isTermModalOpen}
        onClose={() => setIsTermModalOpen(false)}
        onSubmit={handleTermSubmit}
        initialData={selectedTerm}
        mode={modalMode}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        termName={selectedTerm?.term || ''}
      />
    </>
  );
}

export default function DictionaryContent(): ReactNode {
  return (
    <ProtectedRoute>
      <DictionaryContentInner />
    </ProtectedRoute>
  );
}
