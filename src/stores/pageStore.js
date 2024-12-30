import { create } from 'zustand'

const initialState = {
  currentPage: 0,
  pageSize: 10,
  totalItems: 0,
  totalPages: 0
}

const usePaginationStore = create((set, get) => ({
  // Initial state
  ...initialState,

  // Actions
  setCurrentPage: (page) => {
    set({ currentPage: page })
  },

  setPageSize: (size) => {
    set({ pageSize: size })
    get().calculateTotalPages()
  },

  setTotalItems: (total) => {
    set({ totalItems: total })
    get().calculateTotalPages()
  },

  resetPagination: () => {
    set(initialState)
  },

  calculateTotalPages: () => {
    const { totalItems, pageSize } = get()
    const totalPages = Math.ceil(totalItems / pageSize)
    set({ totalPages })
  }
}))

// 편의를 위한 커스텀 훅
export const usePaginationActions = () => {
  const store = usePaginationStore()

  return {
    setCurrentPage: store.setCurrentPage,
    setPageSize: store.setPageSize,
    setTotalItems: store.setTotalItems,
    resetPagination: store.resetPagination
  }
}

// 상태값만 가져오는 커스텀 훅
export const usePaginationState = () => {
  return usePaginationStore((state) => ({
    currentPage: state.currentPage,
    pageSize: state.pageSize,
    totalItems: state.totalItems,
    totalPages: state.totalPages
  }))
}

// 모바일 디바이스 체크를 위한 유틸리티
export const getDefaultPageSize = () => {
  const isMobile =
    typeof window !== 'undefined' &&
    (/Mobi/i.test(window.navigator.userAgent) || window.navigator.userAgent.includes('webview'))

  return isMobile ? 5 : 10
}

const usePageHook = () => {
  const store = usePaginationStore()
  const pageInitialState = initialState

  const state = {
    currentPage: store.currentPage,
    pageSize: store.pageSize,
    totalItems: store.totalItems,
    totalPages: store.totalPages
  }

  const actions = {
    setCurrentPage: (page) => {
      store.setCurrentPage(page)
    },
    setPageSize: (size) => {
      store.setPageSize(size)
    },
    setTotalItems: (total) => {
      store.setTotalItems(total)
    },
    resetPagination: () => {
      store.resetPagination()
    },
    calculateTotalPages: () => {
      store.calculateTotalPages()
    }
  }

  return { state, actions, pageInitialState }
}

export { usePaginationStore, usePageHook }
