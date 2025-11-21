import { useState, useEffect, type ReactNode, type ChangeEvent, type FormEvent, type MouseEvent } from 'react';
import { MedicalTerm, categories, codeSystems } from '@site/src/data/medicalTerms';
import styles from './styles.module.css';

type TermCategory = MedicalTerm['category'];
type TermCodeSystem = NonNullable<MedicalTerm['codeSystem']>;

export interface TermFormData {
  term: string;
  definition: string;
  category: TermCategory;
  code: string;
  codeSystem: TermCodeSystem | '';
}

interface TermModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TermFormData) => void;
  initialData?: MedicalTerm;
  mode: 'add' | 'edit';
}

const categoryOptions = categories.filter((c) => c !== 'All') as TermCategory[];
const codeSystemOptions = codeSystems.filter((c) => c !== 'All') as TermCodeSystem[];

const emptyFormData: TermFormData = {
  term: '',
  definition: '',
  category: 'Diagnosis',
  code: '',
  codeSystem: '',
};

export default function TermModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: TermModalProps): ReactNode {
  const [formData, setFormData] = useState<TermFormData>(emptyFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof TermFormData, string>>>({});

  useEffect(() => {
    if (isOpen) {
      if (initialData && mode === 'edit') {
        setFormData({
          term: initialData.term,
          definition: initialData.definition,
          category: initialData.category,
          code: initialData.code || '',
          codeSystem: initialData.codeSystem || '',
        });
      } else {
        setFormData(emptyFormData);
      }
      setErrors({});
    }
  }, [isOpen, initialData, mode]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TermFormData, string>> = {};

    if (!formData.term.trim()) {
      newErrors.term = 'Term is required';
    }

    if (!formData.definition.trim()) {
      newErrors.definition = 'Definition is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    // If code is provided, code system should be provided too
    if (formData.code.trim() && !formData.codeSystem) {
      newErrors.codeSystem = 'Code system is required when code is provided';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof TermFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className={styles.modalHeader}>
          <h2 id="modal-title" className={styles.modalTitle}>
            {mode === 'add' ? 'Add New Term' : 'Edit Term'}
          </h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="term" className={styles.label}>
              Term <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="term"
              name="term"
              value={formData.term}
              onChange={handleChange}
              className={`${styles.input} ${errors.term ? styles.inputError : ''}`}
              placeholder="e.g., Hypertension"
            />
            {errors.term && <span className={styles.errorMessage}>{errors.term}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="definition" className={styles.label}>
              Definition <span className={styles.required}>*</span>
            </label>
            <textarea
              id="definition"
              name="definition"
              value={formData.definition}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.definition ? styles.inputError : ''}`}
              placeholder="Enter the definition of the term..."
              rows={4}
            />
            {errors.definition && <span className={styles.errorMessage}>{errors.definition}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              Category <span className={styles.required}>*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`${styles.select} ${errors.category ? styles.inputError : ''}`}
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <span className={styles.errorMessage}>{errors.category}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="codeSystem" className={styles.label}>
                Code System
              </label>
              <select
                id="codeSystem"
                name="codeSystem"
                value={formData.codeSystem}
                onChange={handleChange}
                className={`${styles.select} ${errors.codeSystem ? styles.inputError : ''}`}
              >
                <option value="">Select code system</option>
                {codeSystemOptions.map((sys) => (
                  <option key={sys} value={sys}>
                    {sys}
                  </option>
                ))}
              </select>
              {errors.codeSystem && <span className={styles.errorMessage}>{errors.codeSystem}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="code" className={styles.label}>
                Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className={styles.input}
                placeholder="e.g., I10"
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {mode === 'add' ? 'Add Term' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
