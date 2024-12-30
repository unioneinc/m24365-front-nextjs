import React from 'react'
import styles from '@/styles/common.module.scss'
import AddIcon from '@mui/icons-material/Add'

const AssetButton = ({ onClick, text }) => {
  return (
    <button className={styles.buttonContainer} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <AddIcon className={styles.icon} />
      </div>
      <div className={styles.buttonText}>{text}</div>
    </button>
  )
}

export default AssetButton
