'use client'

import React, { useCallback, useMemo } from 'react'
import { logger } from '~/lib/logger'
import styles from './pagination.module.scss'

export const calculatePageRange = (currentPage, totalPages, pageGroupSize) => {
  const currentGroup = Math.ceil(currentPage / pageGroupSize)
  const startPage = Math.max(1, (currentGroup - 1) * pageGroupSize + 1)
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages)

  return {
    startPage,
    endPage,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages
  }
}

const PaginationPrevControls = ({ currentPage, onPageClick }) => {
  const isFirstPage = currentPage === 1

  return (
    <>
      <button
        className={styles.controlButton}
        onClick={() => onPageClick(1)}
        disabled={isFirstPage}
        aria-label="첫 페이지로 이동"
      >
        &lt;&lt;
      </button>
      <button
        className={styles.controlButton}
        onClick={() => onPageClick(currentPage - 1)}
        disabled={isFirstPage}
        aria-label="이전 페이지로 이동"
      >
        &lt;
      </button>
    </>
  )
}

const PageNumbers = ({ startPage, endPage, currentPage, onPageClick }) => {
  const pageNumbers = useMemo(
    () => Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
    [startPage, endPage]
  )

  return (
    <div className={styles.pageNumbers}>
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          className={`${styles.pageNumber} ${currentPage === pageNum ? styles.active : ''}`}
          onClick={() => onPageClick(pageNum)}
          aria-label={`${pageNum} 페이지로 이동`}
          aria-current={currentPage === pageNum ? 'page' : undefined}
        >
          {pageNum}
        </button>
      ))}
    </div>
  )
}

const PaginationNextControls = ({ currentPage, totalPages, onPageClick }) => {
  const isLastPage = currentPage === totalPages

  return (
    <>
      <button
        className={styles.controlButton}
        onClick={() => onPageClick(currentPage + 1)}
        disabled={isLastPage}
        aria-label="다음 페이지로 이동"
      >
        &gt;
      </button>
      <button
        className={styles.controlButton}
        onClick={() => onPageClick(totalPages)}
        disabled={isLastPage}
        aria-label="마지막 페이지로 이동"
      >
        &gt;&gt;
      </button>
    </>
  )
}

export const Pagination = ({ currentPage, totalPages, onPageChange, onPageLoad }) => {
  const { startPage, endPage } = useMemo(
    () => calculatePageRange(currentPage, totalPages, 5),
    [currentPage, totalPages]
  )

  const handlePageClick = useCallback(
    async (page) => {
      try {
        await onPageLoad(page)
        onPageChange(page)
      } catch (error) {
        logger.error('페이지 데이터 로딩 실패:', error)
      }
    },
    [onPageLoad, onPageChange]
  )

  return (
    <div className={styles.pagination}>
      <PaginationPrevControls currentPage={currentPage} onPageClick={handlePageClick} />
      <PageNumbers
        startPage={startPage}
        endPage={endPage}
        currentPage={currentPage}
        onPageClick={handlePageClick}
      />
      <PaginationNextControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageClick={handlePageClick}
      />
    </div>
  )
}
