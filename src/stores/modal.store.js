import { create } from 'zustand'

export const useModalStore = create((set) => ({
  modals: [],

  openModal: (config) => {
    return new Promise((resolve, reject) => {
      const id = config.id || Math.random().toString(36).substr(2, 9)
      const modal = {
        id,
        component: config.component,
        props: config.props,
        isOpen: true,
        resolve,
        reject
      }

      set((state) => ({
        modals: [...state.modals, modal]
      }))
    })
  },

  closeModal: (id) => {
    set((state) => {
      const modalToClose = state.modals.find((modal) => modal.id === id)
      if (modalToClose) {
        modalToClose.reject(new Error('Modal closed without submission'))
      }
      return {
        modals: state.modals.filter((modal) => modal.id !== id)
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
        modals: state.modals.filter((modal) => modal.id !== id)
      }
    })
  }
}))
