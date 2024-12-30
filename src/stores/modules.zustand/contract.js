'use client'

import { create } from 'zustand'
import { logger } from '~/lib/logger'
import { devtools } from 'zustand/middleware'
import moment from 'moment'
import { postContractPageApi } from '@/api/contract'
import { useDialogStore } from './dialog'
import { ERROR_TEXT } from '@/constants'
import { apiAxios } from '@/app/lib/api/apiAxios'

const isClientSide = () => typeof window !== 'undefined'
const DEFAULT_PAGE_SIZE = 10
const isMobile =
  isClientSide() &&
  (/Mobi/i.test(window.navigator.userAgent) || window.navigator.userAgent.includes('webview'))

const initialState = {
  data: [],
  param: {
    columnName: '',
    orderType: '',
    conTyCdId: { cris: [{ value: '' }] },
    search: { cris: [{ value: '' }] },
    page: {
      page: 0,
      size: isMobile ? 5 : DEFAULT_PAGE_SIZE
    },
    date: moment().format('yyyy-MM')
  },
  pagination: {
    page: 0,
    size: isMobile ? 5 : DEFAULT_PAGE_SIZE,
    totalPages: 0,
    totalCount: 0
  },
  isLoading: false
}

const useContractStore = create(
  devtools((set, get) => ({
    ...initialState,

    setLoading: (isLoading) => set({ isLoading }),

    setContractListData: (data) => set({ data }),

    setContractListParam: (param) =>
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

    fetchContractListData: async () => {
      const dialogStore = useDialogStore.getState()

      try {
        dialogStore.openLoadingDialog()
        const state = get()

        const requestParam = {
          ...state.param,
          conTyCdId: state.param.conTyCdId.cris?.[0]?.value ? state.param.conTyCdId : null
        }

        const { data } = await postContractPageApi(requestParam)
        set({ data })

        dialogStore.closeLoadingDialog()
      } catch (error) {
        logger.error('계약 목록 조회 실패:', error)
        if (error.response?.status === 401) {
          const currentPath = window.location.pathname
          window.location.href = `/login?redirectTo=${currentPath}`
          return
        }
        dialogStore.openAlertDialog({
          description: ERROR_TEXT
        })
        dialogStore.closeLoadingDialog()
      }
    },

    fetchContractModifyListData: async () => {
      try {
        dialogStore.openLoadingDialog()
        const state = get()

        const response = await apiAxios.post('/contract/modify', {
          ...state.param,
          search: { cris: [{ value: '' }] },
          conTyCdId: { cris: [{ value: 'R' }] }
        })

        set({
          data: response.items,
          pagination: {
            page: response.page,
            size: response.size,
            totalPages: response.totalPages,
            totalCount: response.totalCount
          }
        })
      } catch (error) {
        logger.error('계약 수정 요청 목록 조회 실패:', error)
        const dialogStore = useDialogStore.getState()
        dialogStore.openAlertDialog({
          description: ERROR_TEXT
        })
      } finally {
        dialogStore.closeLoadingDialog()
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
        return await get().fetchContractListData()
      } catch (error) {
        logger.error('페이지 변경 실패:', error)
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

const useContractHook = () => {
  const store = useContractStore()
  const contractInitialState = initialState

  const state = {
    data: store.data,
    param: store.param,
    isLoading: store.isLoading,
    pagination: store.pagination
  }

  const actions = {
    setLoading: (isLoading) => store.setLoading(isLoading),
    setContractListData: (data) => store.setContractListData(data),
    setContractListParam: (param) => store.setContractListParam(param),
    setContractListParamAndFetch: async (param) => {
      store.setContractListParam(param)
      return await store.fetchContractListData()
    },
    fetchContractListData: () => store.fetchContractListData(),
    fetchContractModifyListData: () => store.fetchContractModifyListData(),
    handlePageChange: (newPage) => store.handlePageChange(newPage),
    resetPagination: () => store.resetPagination(),
    reset: () => store.reset()
  }

  return { state, actions, contractInitialState }
}

export { useContractStore, useContractHook }
