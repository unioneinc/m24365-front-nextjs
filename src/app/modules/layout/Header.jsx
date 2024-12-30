'use client'

import React, { useState, useEffect } from 'react'
import styles from './header.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'

const NotificationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  )
}

export const Header = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (path) => {
    router.push(path)
  }

  return (
    <div className={styles.containerHeader}>
      <div className={styles.typographyH1Bold}>
        <div className={styles.title}>타이틀</div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.frame5160}>
          <button
            type="button"
            onClick={() => handleClick('/login')}
            className={styles.logoutButton}
          >
            <Image src="/images/layout/header_logout.png" alt="logout" width={16} height={16} />
            <span>로그아웃</span>
          </button>
          <div className={styles.iconElementAlramOnB}>
            <button type="button" className={styles.iconButton} onClick={() => setIsOpen(true)}>
              <NotificationIcon />
            </button>
            <div className={styles.ellipse34} />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <div className={styles.notificationDrawer}>NoticeDrawer</div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
