// src/app/modules/components/skeleton/SkeletonLoading.jsx
import React from 'react'
import styles from './skeleton.module.scss'

const SkeletonLoading = () => {
  return (
    <div className={styles.container}>
      {/* Header Skeleton */}
      <div className={styles.header}>
        <div className={styles.title} />
        <div className={styles.registerButton} />
      </div>

      {/* Search Container Skeleton */}
      <div className={styles.searchContainer}>
        <div className={styles.dropdown}>
          <div className={styles.label} />
          <div className={styles.select}>
            <div className={styles.selectIcon} />
          </div>
        </div>
        <div className={styles.searchField}>
          <div className={styles.label} />
          <div className={styles.input}>
            <div className={styles.inputField} />
            <div className={styles.searchIcon} />
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className={styles.table}>
        <div className={styles.tableHead}>
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div key={index} className={styles.headCell} />
            ))}
        </div>
        <div className={styles.tableBody}>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div key={index} className={styles.tableRow}>
                {Array(6)
                  .fill(null)
                  .map((_, cellIndex) => (
                    <div key={cellIndex} className={styles.cell} />
                  ))}
              </div>
            ))}
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className={styles.footer}>
        <div className={styles.downloadButton} />
        <div className={styles.pagination}>
          <div className={styles.pageControl}>
            <div className={styles.controlButton} />
            <div className={styles.controlButton} />
          </div>
          <div className={styles.pageNumbers}>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className={index === 2 ? styles.activePageNumber : styles.pageNumber}
                />
              ))}
          </div>
        </div>
        <div className={styles.groupCount} />
      </div>
    </div>
  )
}

export default SkeletonLoading
