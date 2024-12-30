'use client'

import { create } from 'zustand'
import { logger } from '~/lib/logger'
import { devtools } from 'zustand/middleware'
import { postNotificationPageApi, postNotificationNonePageApi } from '@/api/notification'
import { useDialogStore } from './dialog'
import { ERROR_TEXT } from '@/constants'

const isClientSide = () => typeof window !== 'undefined'
const DEFAULT_PAGE_SIZE = 10
const isMobile =
  isClientSide() &&
  (/Mobi/i.test(window.navigator.userAgent) || window.navigator.userAgent.includes('webview'))

export const initialState = {
  data: [],
  param: {
    column: null,
    columnName: null,
    mbrNo: 0,
    oderType: null,
    page: {
      offset: 0,
      page: 0,
      size: isMobile ? 5 : DEFAULT_PAGE_SIZE
    }
  },
  pagination: {
    page: 0,
    size: isMobile ? 5 : DEFAULT_PAGE_SIZE,
    totalPages: 0,
    totalCount: 0
  },
  isLoading: false
}

const useNotificationStore = create(
  devtools((set, get) => ({
    ...initialState,

    setLoading: (isLoading) => set({ isLoading }),

    setNotificationListData: (data) => set({ data }),

    setNotificationListParam: (param) =>
      set((state) => ({
        param: {
          ...state.param,
          ...param,
          page: {
            ...state.param.page,
            page: 0,
            size: DEFAULT_PAGE_SIZE
          }
        }
      })),

    fetchNotificationListData: async (param = null) => {
      try {
        const dialogStore = useDialogStore.getState()
        dialogStore.openLoadingDialog()

        if (param) {
          set((state) => ({
            param: {
              ...state.param,
              ...param,
              page: {
                ...state.param.page,
                ...(param?.page || {})
              }
            }
          }))
        }

        const state = get()
        let response

        if (state.param.page.size > 0) {
          response = await postNotificationPageApi(state.param)
        } else {
          response = await postNotificationNonePageApi(state.param)
        }

        set({
          data: response.data,
          pagination: {
            page: response.page,
            size: response.size,
            totalPages: response.totalPages,
            totalCount: response.totalCount
          }
        })

        dialogStore.closeLoadingDialog()
      } catch (error) {
        logger.error('알림 목록 조회 실패:', error)
        const dialogStore = useDialogStore.getState()
        dialogStore.closeLoadingDialog()
        dialogStore.openAlertDialog({
          description: ERROR_TEXT
        })
      }
    },

    handlePageChange: async (newPage) => {
      try {
        set((state) => ({
          param: {
            ...state.param,
            page: {
              ...state.param.page,
              page: newPage,
              size: DEFAULT_PAGE_SIZE
            }
          }
        }))
        return await get().fetchNotificationListData()
      } catch (error) {
        logger.error('페이지 변경 실패:', error)
        throw error
      }
    },

    handlePageSizeChange: async () => {
      try {
        set((state) => ({
          param: {
            ...state.param,
            page: {
              page: 0,
              size: DEFAULT_PAGE_SIZE
            }
          }
        }))
        return await get().fetchNotificationListData()
      } catch (error) {
        logger.error('페이지 사이즈 변경 실패:', error)
        throw error
      }
    },

    resetPagination: () => {
      set((state) => ({
        pagination: {
          page: 0,
          size: DEFAULT_PAGE_SIZE,
          totalPages: 0,
          totalCount: 0
        },
        param: {
          ...state.param,
          page: {
            page: 0,
            size: DEFAULT_PAGE_SIZE
          }
        }
      }))
    },

    reset: () => set(initialState)
  }))
)

const useNotificationHook = () => {
  const store = useNotificationStore()
  const notificationInitialState = initialState

  const state = {
    data: store.data,
    param: store.param,
    isLoading: store.isLoading,
    pagination: store.pagination
  }

  const actions = {
    setLoading: (isLoading) => store.setLoading(isLoading),
    setNotificationListData: (data) => store.setNotificationListData(data),
    setNotificationListParam: (param) => store.setNotificationListParam(param),
    setNotificationListParamAndFetch: async (param) => {
      store.setNotificationListParam(param)
      return await store.fetchNotificationListData()
    },
    fetchNotificationListData: (param = null) => store.fetchNotificationListData(param),
    handlePageChange: (newPage) => store.handlePageChange(newPage),
    handlePageSizeChange: () => store.handlePageSizeChange(),
    resetPagination: () => store.resetPagination(),
    reset: () => store.reset()
  }

  return { state, actions, notificationInitialState }
}

export { useNotificationStore, useNotificationHook }
