import { Image } from 'next/image'
import styles from './modal.module.scss'

export const BaseModal = ({ title, onClose, onSubmit, children }) => {
  return (
    <div className={styles.modalBase}>
      {/* 공통 헤더 영역 */}
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <button onClick={onClose} className={styles.closeButton}>
          <Image src="/images/close_icon.png" alt="close" width={16} height={16} />
        </button>
      </div>

      {/* 컨텐츠 영역 */}
      <div className={styles.modalContent}>{children}</div>

      {/* 공통 푸터 영역 */}
      <div className={styles.modalFooter}>
        <button onClick={onClose} className={styles.cancelButton}>
          취소
        </button>
        <button onClick={() => onSubmit(true)} className={styles.submitButton}>
          확인
        </button>
      </div>
    </div>
  )
}
