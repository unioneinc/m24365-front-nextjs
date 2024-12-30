'use client'

import { create } from 'zustand'
import { logger } from '~/lib/logger'
import { devtools } from 'zustand/middleware'
import { postMessagePageReceiveApi, postMessagePageSentApi } from '@/api/message'
import { useDialogStore } from './dialog'
import { ERROR_TEXT } from '@/constants'
import { apiAxios } from '@/app/lib/api/apiAxios'

const isClientSide = () => typeof window !== 'undefined'
const DEFAULT_PAGE_SIZE = 10
const isMobile =
  isClientSide() &&
  (/Mobi/i.test(window.navigator.userAgent) || window.navigator.userAgent.includes('webview'))

export const initialState = {
  data: [],
  param: {
    type: 'receive',
    columnName: '',
    orderType: '',
    search: { cris: [{ value: '' }] },
    page: {
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

const useMessageStore = create(
  devtools((set, get) => ({
    ...initialState,

    setLoading: (isLoading) => set({ isLoading }),

    setMessageListData: (data) => set({ data }),

    setMessageListParam: (param) =>
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

    fetchMessagePageFilter: async () => {
      try {
        set({ isLoading: true })
        const state = get()
        const requestParam = state.param

        const response = await apiAxios.post(
          state.param.type === 'receive' ? '/messages/receive' : '/messages/sent',
          requestParam
        )

        set((state) => ({
          data: response.items,
          pagination: {
            page: response.page,
            size: response.size,
            totalPages: response.totalPages,
            totalCount: response.totalCount
          },
          isLoading: false
        }))

        return response
      } catch (error) {
        logger.error('데이터 조회 실패:', error)
        set({ isLoading: false })
        throw error
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
        return await get().fetchMessagePageFilter()
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
        return await get().fetchMessagePageFilter()
      } catch (error) {
        logger.error('페이지 사이즈 변경 실패:', error)
        throw error
      }
    },

    fetchMessageListData: async (param = null) => {
      try {
        const dialogStore = useDialogStore.getState()
        dialogStore.openLoadingDialog()

        if (param) {
          set((state) => ({
            param: { ...state.param, ...param }
          }))
        }

        const state = get()
        const requestParam = {
          ...state.param,
          search: state.param.search.cris?.[0]?.value ? state.param.search : null
        }

        let data
        if (state.param.type === 'receive') {
          const response = await postMessagePageReceiveApi(requestParam)
          data = response.data
        } else {
          const response = await postMessagePageSentApi(requestParam)
          data = response.data
        }

        set({ data })
        dialogStore.closeLoadingDialog()
      } catch (error) {
        logger.error('메시지 목록 조회 실패:', error)
        const dialogStore = useDialogStore.getState()
        dialogStore.closeLoadingDialog()
        dialogStore.openAlertDialog({
          description: ERROR_TEXT
        })
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

    reset: () => {
      set(initialState)
    }
  }))
)

const useMessageHook = () => {
  const store = useMessageStore()
  const messageInitialState = initialState

  const state = {
    data: store.data,
    param: store.param,
    isLoading: store.isLoading,
    pagination: store.pagination
  }

  const actions = {
    setLoading: (isLoading) => store.setLoading(isLoading),
    setMessageListData: (data) => store.setMessageListData(data),
    setMessageListParam: (param) => store.setMessageListParam(param),
    setMessageListParamAndFetch: async (param) => {
      store.setMessageListParam(param)
      return await store.fetchMessagePageFilter()
    },
    fetchMessageListData: () => store.fetchMessageListData(),
    fetchMessagePageFilter: () => store.fetchMessagePageFilter(),
    handlePageChange: (newPage) => store.handlePageChange(newPage),
    handlePageSizeChange: () => store.handlePageSizeChange(),
    resetPagination: () => store.resetPagination(),
    reset: () => store.reset()
  }

  return { state, actions, messageInitialState }
}

export { useMessageStore, useMessageHook }
