'use client'

import React from 'react'
import styles from './modal-header.module.scss'
import { Button } from '@mui/material'
import { Typo14 } from '@/app/modules/components/misc/Typo'
import Image from 'next/image'

const ModalHeader = ({ title, onClose }) => {
  return (
    <div className={styles.header}>
      <Typo14 color="#FDFDFD">{title}</Typo14>
      <Button
        onClick={onClose}
        className={styles.closeButton}
        sx={{
          minWidth: 'auto',
          padding: 0,
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }}
      >
        <div className={styles.closeIcon}>
          <Image src="/images/icon/close.png" alt="close" width={16} height={16} />
        </div>
      </Button>
    </div>
  )
}

export default ModalHeader
