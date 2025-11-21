import { useState, type ReactNode } from 'react';
import DictionaryTable from '@site/src/components/DictionaryTable';
import TermModal, { type TermFormData } from '@site/src/components/TermModal';
import DeleteConfirmModal from '@site/src/components/DeleteConfirmModal';
import UserMenu from '@site/src/components/UserMenu';
import ProtectedRoute from '@site/src/components/ProtectedRoute';
import { useAuth } from '@site/src/contexts/AuthContext';
import { useDictionary } from '@site/src/hooks/useDictionary';
import type { MedicalTerm } from '@site/src/data/medicalTerms';
import styles from './styles.module.css';

function DictionaryContentInner(): ReactNode {
  const { user } = useAuth();
  const { terms, addTerm, updateTerm, deleteTerm, refreshTerms, isLoaded, isLoading, error } = useDictionary({
    userEmail: user?.email,
    username: user?.username,
  });

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

    if (modalMode === 'add') {
      await addTerm(termData);
    } else if (selectedTerm) {
      await updateTerm(selectedTerm.id, termData);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedTerm) {
      await deleteTerm(selectedTerm.id);
    }
  };

  if (!isLoaded) {
    return <div className={styles.loading}>Loading dictionary...</div>;
  }

  return (
    <>
      <section className={styles.content}>
        <UserMenu />

        <div className={styles.demoNotice}>
          <span className={styles.demoBadge}>Supabase</span>
          <span className={styles.demoText}>Changes are synced with the database.</span>
          <button className={styles.resetButton} onClick={refreshTerms} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {error && (
          <div className={styles.errorNotice}>
            Error: {error}
          </div>
        )}

        <DictionaryTable
          terms={terms}
          onAdd={handleAddClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
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
