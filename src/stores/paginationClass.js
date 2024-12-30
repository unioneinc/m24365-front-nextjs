// paginationClass.js
class PaginationManager {
  constructor(
    initialState = {
      currentPage: 0,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0
    }
  ) {
    this.initialState = initialState
  }

  createSlice = (set, get) => ({
    // State
    ...this.initialState,

    // Actions
    setCurrentPage: (page) => {
      set({ currentPage: page })
    },

    setPageSize: (size) => {
      set({ pageSize: size })
      this.calculateTotalPages(get, set)
    },

    setTotalItems: (total) => {
      set({ totalItems: total })
      this.calculateTotalPages(get, set)
    },

    resetPagination: () => {
      set(this.initialState)
    },

    calculateTotalPages: () => {
      const { totalItems, pageSize } = get()
      const totalPages = Math.ceil(totalItems / pageSize)
      set({ totalPages })
    }
  })

  getDefaultPageSize = () => {
    const isMobile =
      typeof window !== 'undefined' &&
      (/Mobi/i.test(window.navigator.userAgent) || window.navigator.userAgent.includes('webview'))

    return isMobile ? 5 : 10
  }
}

export default PaginationManager
