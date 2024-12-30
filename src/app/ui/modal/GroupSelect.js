// src/app/ui/modal/GroupSelect.jsx
'use client'

import React from 'react'
import styles from './group-select.module.scss'

const GroupSelect = ({ onClose, onSubmit }) => {
  const handleConfirm = () => {
    onSubmit('Selected Group')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>그룹 선택</div>
        <div className={styles.closeIconWrapper} onClick={onClose}>
          <div className={styles.closeIcon}></div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.searchBoxWrapper}>
          <div className={styles.searchBoxShadow}>
            <div className={styles.searchBox}>
              <div className={styles.searchPlaceholder}>그룹명을 검색하세요</div>
              <div className={styles.searchIcon}></div>
            </div>
          </div>
        </div>
        <div className={styles.groupListWrapper}>
          <div className={styles.groupListHeader}>
            <div className={styles.headerItem}>그룹유형</div>
            <div className={styles.headerItem}>그룹명</div>
            <div className={styles.headerItem}>그룹장</div>
            <div className={styles.headerItem}>소속회사</div>
          </div>
          {Array(10)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className={`${styles.groupItem} ${
                  index % 2 === 0 ? styles.groupItemOdd : styles.groupItemEven
                }`}
              >
                <div className={styles.groupItem}>업무</div>
                <div className={styles.groupItem}>그룹명</div>
                <div className={styles.groupItem}>성명</div>
                <div className={styles.groupItem}>소속회사</div>
              </div>
            ))}
        </div>
        <div className={styles.paginationWrapper}>
          <div className={styles.pageButtonWrapper}>
            <div className={styles.pageButton}>
              <img src="/images/prev.png" alt="Previous" />
            </div>
            {[1, 2, 3, 4, 5].map((page) => (
              <div
                key={page}
                className={`${styles.pageButton} ${page === 1 ? styles.pageButtonActive : ''}`}
              >
                {page}
              </div>
            ))}
            <div className={styles.pageButton}>
              <img src="/images/next.png" alt="Next" />
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <div className={styles.cancelButton} onClick={onClose}>
            취소
          </div>
          <div className={styles.confirmButton} onClick={handleConfirm}>
            확인
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupSelect
