'use client'

import { create } from 'zustand'
import { logger } from '~/lib/logger'
import { devtools } from 'zustand/middleware'
import moment from 'moment'
import { postPaidServicePageApi } from '@/api/paidService'
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
    check: undefined,
    start: moment(new Date()).subtract(1, 'month').format('yyyy-MM'),
    end: moment(new Date()).format('yyyy-MM'),
    srvTyCdId: { cris: [{ value: '' }] },
    srvReqStatCd: { cris: [{ value: '' }] },
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
  isLoading: false,
  viewMode: 'list'
}

const usePaidServiceStore = create(
  devtools((set, get) => ({
    ...initialState,

    setLoading: (isLoading) => set({ isLoading }),

    setPaidServiceListData: (data) => set({ data }),

    setPaidServiceListParam: (param) =>
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

    fetchPaidServicePageFilter: async () => {
      try {
        set({ isLoading: true })
        const state = get()
        const requestParam = state.param

        const response = await apiAxios.post('/paid-services/filter', requestParam)

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
        return await get().fetchPaidServicePageFilter()
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
        return await get().fetchPaidServicePageFilter()
      } catch (error) {
        logger.error('페이지 사이즈 변경 실패:', error)
        throw error
      }
    },

    fetchPaidServiceListData: async (param = null) => {
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
          srvTyCdId: state.param.srvTyCdId.cris?.[0]?.value ? state.param.srvTyCdId : null,
          srvReqStatCd: state.param.srvReqStatCd.cris?.[0]?.value ? state.param.srvReqStatCd : null,
          search: state.param.search.cris?.[0]?.value ? state.param.search : null
        }

        const { data } = await postPaidServicePageApi(requestParam)
        set({ data })

        dialogStore.closeLoadingDialog()
      } catch (error) {
        logger.error('유료 서비스 목록 조회 실패:', error)
        const dialogStore = useDialogStore.getState()
        dialogStore.closeLoadingDialog()
        dialogStore.openAlertDialog({
          description: ERROR_TEXT
        })
      }
    },

    toggleViewMode: () =>
      set((state) => ({
        viewMode: state.viewMode === 'list' ? 'calendar' : 'list'
      })),

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

const usePaidServiceHook = () => {
  const store = usePaidServiceStore()
  const paidServiceInitialState = initialState

  const state = {
    data: store.data,
    param: store.param,
    isLoading: store.isLoading,
    pagination: store.pagination,
    viewMode: store.viewMode
  }

  const actions = {
    setLoading: (isLoading) => store.setLoading(isLoading),
    setPaidServiceListData: (data) => store.setPaidServiceListData(data),
    setPaidServiceListParam: (param) => store.setPaidServiceListParam(param),
    setPaidServiceListParamAndFetch: async (param) => {
      store.setPaidServiceListParam(param)
      return await store.fetchPaidServicePageFilter()
    },
    fetchPaidServiceListData: (param) => store.fetchPaidServiceListData(param),
    fetchPaidServicePageFilter: () => store.fetchPaidServicePageFilter(),
    handlePageChange: (newPage) => store.handlePageChange(newPage),
    handlePageSizeChange: () => store.handlePageSizeChange(),
    toggleViewMode: () => store.toggleViewMode(),
    resetPagination: () => store.resetPagination(),
    reset: () => store.reset()
  }

  return { state, actions, paidServiceInitialState }
}

export { usePaidServiceStore, usePaidServiceHook }
