import { useState, useMemo, type ReactNode } from 'react';
import { MedicalTerm, categories, codeSystems } from '@site/src/data/medicalTerms';
import styles from './styles.module.css';

type SortField = 'term' | 'category' | 'codeSystem';
type SortDirection = 'asc' | 'desc';

interface DictionaryTableProps {
  terms: MedicalTerm[];
  onEdit?: (term: MedicalTerm) => void;
  onDelete?: (term: MedicalTerm) => void;
  onAdd?: () => void;
}

export default function DictionaryTable({
  terms,
  onEdit,
  onDelete,
  onAdd,
}: DictionaryTableProps): ReactNode {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCodeSystem, setSelectedCodeSystem] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('term');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const filteredAndSortedTerms = useMemo(() => {
    const filtered = terms.filter((term) => {
      const matchesSearch =
        searchQuery === '' ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.code?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;

      const matchesCodeSystem =
        selectedCodeSystem === 'All' || term.codeSystem === selectedCodeSystem;

      return matchesSearch && matchesCategory && matchesCodeSystem;
    });

    filtered.sort((a, b) => {
      let aValue: string;
      let bValue: string;

      switch (sortField) {
        case 'term':
          aValue = a.term;
          bValue = b.term;
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        case 'codeSystem':
          aValue = a.codeSystem || '';
          bValue = b.codeSystem || '';
          break;
        default:
          aValue = a.term;
          bValue = b.term;
      }

      const comparison = aValue.localeCompare(bValue);
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [terms, searchQuery, selectedCategory, selectedCodeSystem, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  const hasActions = onEdit || onDelete;

  return (
    <div className={styles.dictionaryContainer}>
      {/* Search and Filters */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search terms, definitions, or codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Search medical terms"
          />
          {searchQuery && (
            <button
              className={styles.clearButton}
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className={styles.filters}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.filterSelect}
            aria-label="Filter by category"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <select
            value={selectedCodeSystem}
            onChange={(e) => setSelectedCodeSystem(e.target.value)}
            className={styles.filterSelect}
            aria-label="Filter by code system"
          >
            {codeSystems.map((sys) => (
              <option key={sys} value={sys}>
                {sys === 'All' ? 'All Code Systems' : sys}
              </option>
            ))}
          </select>

          {onAdd && (
            <button className={styles.addButton} onClick={onAdd} aria-label="Add new term">
              + Add Term
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className={styles.resultsCount}>
        Showing {filteredAndSortedTerms.length} of {terms.length} terms
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.sortable} onClick={() => handleSort('term')}>
                Term{getSortIndicator('term')}
              </th>
              <th>Definition</th>
              <th className={styles.sortable} onClick={() => handleSort('category')}>
                Category{getSortIndicator('category')}
              </th>
              <th className={styles.sortable} onClick={() => handleSort('codeSystem')}>
                Code System{getSortIndicator('codeSystem')}
              </th>
              <th>Code</th>
              {hasActions && <th className={styles.actionsHeader}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTerms.length === 0 ? (
              <tr>
                <td colSpan={hasActions ? 6 : 5} className={styles.noResults}>
                  No terms found matching your search criteria.
                </td>
              </tr>
            ) : (
              filteredAndSortedTerms.map((term) => (
                <tr key={term.id}>
                  <td className={styles.termCell}>
                    <strong>{term.term}</strong>
                  </td>
                  <td className={styles.definitionCell}>{term.definition}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[`badge${term.category}`]}`}>
                      {term.category}
                    </span>
                  </td>
                  <td>{term.codeSystem || '-'}</td>
                  <td className={styles.codeCell}>{term.code ? <code>{term.code}</code> : '-'}</td>
                  {hasActions && (
                    <td className={styles.actionsCell}>
                      {onEdit && (
                        <button
                          className={styles.editButton}
                          onClick={() => onEdit(term)}
                          aria-label={`Edit ${term.term}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className={styles.deleteButton}
                          onClick={() => onDelete(term)}
                          aria-label={`Delete ${term.term}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
