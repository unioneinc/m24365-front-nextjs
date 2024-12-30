'use client'

import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { Typo14, Typo16 } from '@/app/ui/misc/Typo'
import styles from './member-info.module.scss'

const MemberInfo = ({ isOpen, onClose, memberInfo, isLeader = true }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typo16>{isLeader ? '그룹장 정보' : '멤버 정보'}</Typo16>
      </DialogTitle>
      <DialogContent>
        <div className={styles.infoContainer}>
          <div className={styles.infoRow}>
            <Typo14 className={styles.label}>이름</Typo14>
            <Typo14>{memberInfo?.name || '-'}</Typo14>
          </div>
          <div className={styles.infoRow}>
            <Typo14 className={styles.label}>직위</Typo14>
            <Typo14>{memberInfo?.position || '-'}</Typo14>
          </div>
          <div className={styles.infoRow}>
            <Typo14 className={styles.label}>부서</Typo14>
            <Typo14>{memberInfo?.deptNm || '-'}</Typo14>
          </div>
          <div className={styles.infoRow}>
            <Typo14 className={styles.label}>연락처</Typo14>
            <Typo14>{memberInfo?.cell || '-'}</Typo14>
          </div>
          <div className={styles.infoRow}>
            <Typo14 className={styles.label}>이메일</Typo14>
            <Typo14>{memberInfo?.email || '-'}</Typo14>
          </div>
          <div className={styles.infoRow}>
            <Typo14 className={styles.label}>권한</Typo14>
            <Typo14>
              {memberInfo?.atLev === 2 ? 'Master' : memberInfo?.atLev === 1 ? 'Admin' : 'Member'}
            </Typo14>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          <Typo14 color="#FFFFFF">확인</Typo14>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MemberInfo
