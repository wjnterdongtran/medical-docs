import { type ReactNode, useState, useRef, useEffect } from 'react';
import { MedicalTerm, AuditInfo, categories, codeSystems } from '@site/src/data/medicalTerms';
import styles from './styles.module.css';

interface ExpandableDefinitionProps {
  definition: string;
  maxHeight?: number;
}

function ExpandableDefinition({ definition, maxHeight = 72 }: ExpandableDefinitionProps): ReactNode {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setNeedsExpansion(scrollHeight > maxHeight);
    }
  }, [definition, maxHeight]);

  return (
    <div className={styles.definitionWrapper}>
      <div
        ref={contentRef}
        className={`${styles.definitionContent} ${!isExpanded && needsExpansion ? styles.collapsed : styles.expanded}`}
      >
        {definition}
      </div>
      {needsExpansion && (
        <button
          className={styles.seeMoreButton}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'See less' : 'See more'}
        </button>
      )}
    </div>
  );
}

type SortField = 'term' | 'category' | 'codeSystem';
type SortDirection = 'asc' | 'desc';

function formatAuditInfo(audit: AuditInfo | undefined): string {
  if (!audit) return '-';
  const date = new Date(audit.timestamp);
  const formatted = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  // Display username instead of email
  const displayName = audit.username || audit.email.split('@')[0];
  return `${displayName} (${formatted})`;
}

export interface TableFilters {
  searchQuery: string;
  selectedCategory: string;
  selectedCodeSystem: string;
  sortField: SortField;
  sortDirection: SortDirection;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface DictionaryTableProps {
  terms: MedicalTerm[];
  filters: TableFilters;
  pagination: PaginationInfo;
  isLoading?: boolean;
  onFiltersChange: (filters: Partial<TableFilters>) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onEdit?: (term: MedicalTerm) => void;
  onDelete?: (term: MedicalTerm) => void;
  onAdd?: () => void;
}

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function DictionaryTable({
  terms,
  filters,
  pagination,
  isLoading = false,
  onFiltersChange,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
  onAdd,
}: DictionaryTableProps): ReactNode {
  const { searchQuery, selectedCategory, selectedCodeSystem, sortField, sortDirection } = filters;
  const { page, pageSize, totalCount, totalPages } = pagination;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      onFiltersChange({ sortDirection: sortDirection === 'asc' ? 'desc' : 'asc' });
    } else {
      onFiltersChange({ sortField: field, sortDirection: 'asc' });
    }
  };

  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  const hasActions = onEdit || onDelete;

  // Calculate showing range
  const startItem = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount);

  return (
    <div className={styles.dictionaryContainer}>
      {/* Search and Filters */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search terms, definitions, or codes..."
            value={searchQuery}
            onChange={(e) => onFiltersChange({ searchQuery: e.target.value })}
            className={styles.searchInput}
            aria-label="Search medical terms"
          />
          {searchQuery && (
            <button
              className={styles.clearButton}
              onClick={() => onFiltersChange({ searchQuery: '' })}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className={styles.filters}>
          <select
            value={selectedCategory}
            onChange={(e) => onFiltersChange({ selectedCategory: e.target.value })}
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
            onChange={(e) => onFiltersChange({ selectedCodeSystem: e.target.value })}
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

      {/* Results count and pagination controls */}
      <div className={styles.paginationHeader}>
        <div className={styles.resultsCount}>
          {isLoading ? (
            'Loading...'
          ) : (
            <>
              Showing {startItem}-{endItem} of {totalCount} terms
            </>
          )}
        </div>
        <div className={styles.pageSizeSelector}>
          <label htmlFor="pageSize">Show:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className={styles.pageSizeSelect}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>per page</span>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={`${styles.table} ${isLoading ? styles.tableLoading : ''}`}>
          <thead>
            <tr>
              <th className={`${styles.sortable} ${styles.colTerm}`} onClick={() => handleSort('term')}>
                Term{getSortIndicator('term')}
              </th>
              <th className={styles.colDefinition}>Definition</th>
              <th className={`${styles.sortable} ${styles.colCategory}`} onClick={() => handleSort('category')}>
                Category{getSortIndicator('category')}
              </th>
              <th className={`${styles.sortable} ${styles.colCodeSystem}`} onClick={() => handleSort('codeSystem')}>
                Code System{getSortIndicator('codeSystem')}
              </th>
              <th className={styles.colCode}>Code</th>
              <th className={styles.colModifiedBy}>Modified By</th>
              {hasActions && <th className={`${styles.actionsHeader} ${styles.colActions}`}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {terms.length === 0 ? (
              <tr>
                <td colSpan={hasActions ? 7 : 6} className={styles.noResults}>
                  {isLoading ? 'Loading terms...' : 'No terms found matching your search criteria.'}
                </td>
              </tr>
            ) : (
              terms.map((term) => (
                <tr key={term.id}>
                  <td className={styles.termCell}>
                    <strong>{term.term}</strong>
                  </td>
                  <td className={styles.definitionCell}>
                    <ExpandableDefinition definition={term.definition} />
                  </td>
                  <td>
                    <span className={`${styles.badge} ${styles[`badge${term.category}`]}`}>
                      {term.category}
                    </span>
                  </td>
                  <td>{term.codeSystem || '-'}</td>
                  <td className={styles.codeCell}>{term.code ? <code>{term.code}</code> : '-'}</td>
                  <td className={styles.auditCell}>
                    {term.updatedBy ? (
                      <span title={`Created by: ${formatAuditInfo(term.createdBy)}`}>
                        {formatAuditInfo(term.updatedBy)}
                      </span>
                    ) : term.createdBy ? (
                      <span>{formatAuditInfo(term.createdBy)}</span>
                    ) : (
                      '-'
                    )}
                  </td>
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(1)}
            disabled={page === 1 || isLoading}
            aria-label="First page"
          >
            ««
          </button>
          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1 || isLoading}
            aria-label="Previous page"
          >
            «
          </button>

          {/* Page numbers */}
          <div className={styles.pageNumbers}>
            {getPageNumbers(page, totalPages).map((pageNum, index) =>
              pageNum === '...' ? (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  ...
                </span>
              ) : (
                <button
                  key={pageNum}
                  className={`${styles.pageButton} ${page === pageNum ? styles.pageButtonActive : ''}`}
                  onClick={() => onPageChange(pageNum as number)}
                  disabled={isLoading}
                  aria-label={`Page ${pageNum}`}
                  aria-current={page === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              )
            )}
          </div>

          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages || isLoading}
            aria-label="Next page"
          >
            »
          </button>
          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(totalPages)}
            disabled={page === totalPages || isLoading}
            aria-label="Last page"
          >
            »»
          </button>
        </div>
      )}
    </div>
  );
}

// Helper function to generate page numbers with ellipsis
function getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  const pages: (number | string)[] = [];
  const showEllipsis = totalPages > 7;

  if (!showEllipsis) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    pages.push(totalPages);
  }

  return pages;
}
