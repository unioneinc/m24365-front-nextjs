import React from 'react'
import { Modal } from './Modal'

const NotificationModal = ({
  message,
  confirmText = '확인',
  cancelText = '취소',
  isOpen,
  onClose,
  onSubmit
}) => {
  const handleConfirm = () => {
    onSubmit(true)
  }

  const handleCancel = () => {
    onSubmit(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <p className="text-gray-700 mb-6">{message}</p>
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={handleCancel}
            >
              {cancelText}
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default NotificationModal
