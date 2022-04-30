import React from 'react';
import { usePagination, DOTS } from '../../../Hooks/usePagination.js';
import './Pagination.css';
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={'pagination-container'}>
      <li
        className={
          currentPage === 1
            ? 'pagination-item pagination-disable'
            : 'pagination-item'
        }
        onClick={onPrevious}
        disabled={currentPage === 1 ? true : false}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li className="pagination-item dots" key={index}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={
              pageNumber === currentPage
                ? 'pagination-item selected'
                : 'pagination-item'
            }
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={
          currentPage === lastPage
            ? 'pagination-item pagination-disable'
            : 'pagination-item'
        }
        onClick={onNext}
        disabled={currentPage === lastPage}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
