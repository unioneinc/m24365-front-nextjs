'use client'

import { create } from 'zustand'
import { logger } from '~/lib/logger'
import { devtools } from 'zustand/middleware'
import { apiAxios } from '@/app/lib/api/apiAxios'
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
    searchConditionNameList: [
      { id: 'title', label: '제목' },
      { id: 'content', label: '내용' }
    ],
    searchCondition: { type: 'title', value: '' },
    serviceRequestDateCondition: {
      type: '',
      startDate: '',
      endDate: ''
    },
    categoryCode: null,
    serviceCondition: {
      requestStatus: null,
      requestType: null,
      serviceNo: null,
      requestDateType: null,
      requestDateValue: null
    },
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

const useServiceRequestStore = create(
  devtools((set, get) => ({
    ...initialState,

    setLoading: (isLoading) => set({ isLoading }),

    setServiceRequestListData: (data) => set({ data }),

    setServiceRequestListParam: (param) =>
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

    fetchServiceRequestListData: async () => {
      try {
        const response = await apiAxios.get('/service-requests/list')
        set((state) => ({
          ...state,
          data: response
        }))
      } catch (error) {
        logger.error('서비스 요청 목록 조회 실패:', error)
      }
    },

    fetchServiceRequestPageFilter: async () => {
      try {
        set({ isLoading: true })
        const state = get()
        const requestParam = state.param

        const response = await apiAxios.post('/service-requests/filter', requestParam)

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
        return await get().fetchServiceRequestPageFilter()
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
        return await get().fetchServiceRequestPageFilter()
      } catch (error) {
        logger.error('페이지 사이즈 변경 실패:', error)
        throw error
      }
    },

    fetchServiceRequestData: async (param = null) => {
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
          ...state.param
        }

        const { data } = await apiAxios.post('/service-requests', requestParam)
        set({ data })

        dialogStore.closeLoadingDialog()
      } catch (error) {
        logger.error('서비스 요청 조회 실패:', error)
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

const useServiceRequestHook = () => {
  const store = useServiceRequestStore()
  const serviceRequestInitialState = initialState

  const state = {
    data: store.data,
    param: store.param,
    isLoading: store.isLoading,
    pagination: store.pagination
  }

  const actions = {
    setLoading: (isLoading) => store.setLoading(isLoading),
    setServiceRequestListData: (data) => store.setServiceRequestListData(data),
    setServiceRequestListParam: (param) => store.setServiceRequestListParam(param),
    setServiceRequestListParamAndFetch: async (param) => {
      store.setServiceRequestListParam(param)
      return await store.fetchServiceRequestPageFilter()
    },
    fetchServiceRequestListData: () => store.fetchServiceRequestListData(),
    fetchServiceRequestData: (param = null) => store.fetchServiceRequestData(param),
    fetchServiceRequestPageFilter: () => store.fetchServiceRequestPageFilter(),
    handlePageChange: (newPage) => store.handlePageChange(newPage),
    handlePageSizeChange: () => store.handlePageSizeChange(),
    resetPagination: () => store.resetPagination(),
    reset: () => store.reset()
  }

  return { state, actions, serviceRequestInitialState }
}

export { useServiceRequestStore, useServiceRequestHook }
