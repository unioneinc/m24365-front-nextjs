'use client'

import React from 'react'
import styles from '@/app/group/modules/styles/group-switch.module.scss'

export const GroupSwitch = ({ checked, disabled, onChange }) => {
  const handleClick = () => {
    onChange?.(!checked)
  }

  return (
    <div
      className={`${styles.switch} ${checked ? styles.checked : ''}`}
      onClick={handleClick}
      role="switch"
      aria-checked={checked}
    >
      <div className={styles.indicator} />
    </div>
  )
}

export default GroupSwitch
