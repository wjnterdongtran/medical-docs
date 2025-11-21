import { type ReactNode, type MouseEvent } from 'react';
import styles from './styles.module.css';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  termName: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  termName,
}: DeleteConfirmModalProps): ReactNode {
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
        <div className={styles.iconContainer}>
          <svg
            className={styles.warningIcon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 id="delete-modal-title" className={styles.title}>
          Delete Term
        </h2>

        <p className={styles.message}>
          Are you sure you want to delete <strong>"{termName}"</strong>? This action cannot be undone.
        </p>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={styles.deleteButton} onClick={handleConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
