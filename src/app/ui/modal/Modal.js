'use client'

import React, { useEffect } from 'react'
import styles from './modal.module.scss'
import { createPortal } from 'react-dom'

const Modal = ({ isOpen, onClose, onSubmit, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // 모달이 열렸을 때 배경 스크롤 방지
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={() => onSubmit(true)}>확인</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>,
    document.body
  )
}

export { Modal }
