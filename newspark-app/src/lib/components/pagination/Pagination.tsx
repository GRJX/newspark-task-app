import React from 'react';
import styles from './pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button onClick={handlePrevious} disabled={currentPage === 1} data-testid="previous-button">
        Previous
      </button>
      <span>
        Page <span data-testid="current-page-number">{currentPage}</span> of <span data-testid="total-page-number">{totalPages}</span>
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages} data-testid="next-button">
        Next
      </button>
    </div>
  );
};

export default Pagination;
