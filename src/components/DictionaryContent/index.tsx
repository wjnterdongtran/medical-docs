import { useState, type ReactNode } from 'react';
import DictionaryTable from '@site/src/components/DictionaryTable';
import TermModal, { type TermFormData } from '@site/src/components/TermModal';
import DeleteConfirmModal from '@site/src/components/DeleteConfirmModal';
import { useDictionary } from '@site/src/hooks/useDictionary';
import type { MedicalTerm } from '@site/src/data/medicalTerms';
import styles from './styles.module.css';

export default function DictionaryContent(): ReactNode {
  const { terms, addTerm, updateTerm, deleteTerm, resetToDefault, isLoaded } = useDictionary();

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

  const handleTermSubmit = (formData: TermFormData) => {
    const termData = {
      term: formData.term.trim(),
      definition: formData.definition.trim(),
      category: formData.category,
      code: formData.code.trim() || undefined,
      codeSystem: formData.codeSystem || undefined,
    };

    if (modalMode === 'add') {
      addTerm(termData);
    } else if (selectedTerm) {
      updateTerm(selectedTerm.id, termData);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedTerm) {
      deleteTerm(selectedTerm.id);
    }
  };

  if (!isLoaded) {
    return <div className={styles.loading}>Loading dictionary...</div>;
  }

  return (
    <>
      <section className={styles.content}>
        <div className={styles.demoNotice}>
          <span className={styles.demoBadge}>Demo Mode</span>
          <span className={styles.demoText}>Changes are stored locally in your browser.</span>
          <button className={styles.resetButton} onClick={resetToDefault}>
            Reset to Default
          </button>
        </div>

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
