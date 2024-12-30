'use client'

import React, { useState } from 'react'
import styles from './non-member-invite.module.scss'
import { Modal } from '@/app/ui/modal/Modal'
import { Button } from '@mui/material'
import Image from 'next/image'
import { CustomDropdown } from '@/paths'

const NonMemberInvite = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '임시 이름',
    phone: '010-1234-5678',
    email: 'example@example.com',
    duty: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDutySelect = (value) => {
    setFormData((prev) => ({ ...prev, duty: value }))
  }

  const handleSubmit = () => {
    // 필수 필드 검증
    if (!formData.name || !formData.phone || !formData.email) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }
    onSubmit(formData)
    onClose()
  }

  const dutyOptions = ['개발자', '디자이너', 'PM', '마케터']

  const renderTableRow = (label, name, required = false, isDropdown = false) => (
    <div className={styles.tableRow}>
      <div className={styles.label}>
        <span className={styles.text}>{label}</span>
        {required && <span className={styles.required}> *</span>}
      </div>
      <div className={styles.inputContainer}>
        {isDropdown ? (
          <CustomDropdown
            label={label}
            value={formData.duty}
            options={dutyOptions}
            onChange={handleDutySelect}
            showLabel={false}
          />
        ) : (
          <input
            type="text"
            name={name}
            className={styles.input}
            value={formData[name]}
            onChange={handleInputChange}
            placeholder={`${label}을 입력해주세요.`}
          />
        )}
      </div>
    </div>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.title}>비회원 정보</div>
          <Button className={styles.closeButton} onClick={onClose} sx={{ minWidth: 'unset' }}>
            <Image src="/images/close_white.png" alt="close" width={16} height={16} />
          </Button>
        </div>

        <div className={styles.content}>
          <div className={styles.tableContainer}>
            {renderTableRow('성명', 'name', true)}
            {renderTableRow('연락처', 'phone', true)}
            {renderTableRow('이메일', 'email', true)}
            {renderTableRow('담당업무', 'duty', false, true)}
          </div>

          <div className={styles.notice}>
            *서비스관리 진행상황이 전송되기 때문에 이메일을 정확하게 작성해 주시기 바랍니다.
          </div>

          <div className={styles.buttonContainer}>
            <Button className={`${styles.button} ${styles.cancel}`} onClick={onClose}>
              취소
            </Button>
            <Button className={`${styles.button} ${styles.submit}`} onClick={handleSubmit}>
              저장
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default NonMemberInvite
