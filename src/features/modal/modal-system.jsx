// src/features/modal/modal-system.jsx

'use client'

import { create } from 'zustand'
import React, { createContext, useContext } from 'react'
import { ModalContainer } from './components/modal-container'

const useModalStore = create((set) => ({
  modals: [],
  activeModalId: null,

  openModal: (component, props) => {
    return new Promise((resolve, reject) => {
      const id = `modal_${Math.random().toString(36).substr(2, 9)}`

      set((state) => ({
        modals: [
          ...state.modals,
          {
            id,
            component,
            props,
            isOpen: true,
            resolve,
            reject
          }
        ],
        activeModalId: id
      }))
    })
  },

  closeModal: (id) => {
    set((state) => {
      const modalToClose = state.modals.find((modal) => modal.id === id)
      if (modalToClose) {
        modalToClose.resolve(null)
      }
      return {
        modals: state.modals.filter((modal) => modal.id !== id),
        activeModalId:
          state.modals.length > 1 ? (state.modals[state.modals.length - 2]?.id ?? null) : null
      }
    })
  },

  submitModal: (id, result) => {
    set((state) => {
      const modalToSubmit = state.modals.find((modal) => modal.id === id)
      if (modalToSubmit) {
        modalToSubmit.resolve(result)
      }
      return {
        modals: state.modals.filter((modal) => modal.id !== id),
        activeModalId:
          state.modals.length > 1 ? (state.modals[state.modals.length - 2]?.id ?? null) : null
      }
    })
  }
}))

const ModalContext = createContext(null)

const ModalProvider = ({ children }) => {
  const store = useModalStore()

  return (
    <ModalContext.Provider
      value={{
        openModal: store.openModal,
        closeModal: store.closeModal,
        submitModal: store.submitModal
      }}
    >
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  )
}

const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export { useModalStore, useModal }
export default ModalProvider
