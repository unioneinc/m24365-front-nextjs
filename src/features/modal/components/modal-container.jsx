// src/features/modal/components/modal-container.js
import { useEffect } from 'react'
import { useModalStore } from '../modal-system'
import styles from './modal.module.scss'

export const ModalContainer = () => {
  const modals = useModalStore((state) => state.modals)
  const activeModalId = useModalStore((state) => state.activeModalId)

  // 모달 스택에 ESC 키 이벤트 바인딩
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && activeModalId) {
        useModalStore.getState().closeModal(activeModalId)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [activeModalId])

  return (
    <>
      {modals.map(({ id, component: ModalComponent, props = {}, isOpen }) => (
        <div
          key={id}
          className={styles.modalWrapper}
          style={{
            visibility: isOpen && id === activeModalId ? 'visible' : 'hidden',
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            className={styles.modalOverlay}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }}
            onClick={() => useModalStore.getState().closeModal(id)}
          />
          <div className={styles.modalContent} style={{ position: 'relative', zIndex: 1001 }}>
            <ModalComponent
              id={id}
              {...props}
              data={{
                id,
                title: '',
                selectedGroup: null,
                ...(props?.data || {})
              }}
              isOpen={isOpen && id === activeModalId}
              onClose={() => useModalStore.getState().closeModal(id)}
              onSubmit={(result) => useModalStore.getState().submitModal(id, result)}
            />
          </div>
        </div>
      ))}
    </>
  )
}
