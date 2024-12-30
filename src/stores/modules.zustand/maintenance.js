'use client'

import { create } from 'zustand'
import { logger } from '~/lib/logger'
import { devtools } from 'zustand/middleware'
import moment from 'moment'
import { postMaintenanceListFilterApi } from '@/api/maintenance'
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
    check: 'Y',
    columnName: '',
    orderType: '',
    year: moment(new Date()).format('yyyy'),
    month: moment(new Date()).format('MM'),
    srvTyCdId: null,
    srvStat: null,
    gpId: null,
    search: {
      cris: [
        {
          value: ''
        }
      ]
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
  viewMode: false,
  isLoading: false
}

const prepareApiRequest = (param) => {
  return {
    check: param.check || 'Y',
    columnName: param.columnName || '',
    gpId: param.gpId || null,
    month: param.month || moment(new Date()).format('MM'),
    year: param.year || moment(new Date()).format('yyyy'),
    orderType: param.orderType || '',
    page: {
      page: param.page?.page || 0,
      size: param.page?.size || DEFAULT_PAGE_SIZE
    },
    search: {
      cris: Array.isArray(param.search?.cris) ? param.search.cris : [{ value: '' }]
    },
    srvStat: param.srvStat || null,
    srvTyCdId: param.srvTyCdId || null
  }
}

const useMaintenanceStore = create(
  devtools((set, get) => ({
    ...initialState,

    setLoading: (isLoading) => set({ isLoading }),

    setMaintenanceListData: (data) => set({ data }),

    setMaintenanceListParam: (param) =>
      set((state) => ({
        param: { ...state.param, ...param }
      })),

    toggleMaintenanceListViewMode: () =>
      set((state) => ({
        viewMode: !state.viewMode
      })),

    fetchMaintenanceListData: async (param = null) => {
      try {
        const dialogStore = useDialogStore.getState()
        dialogStore.openLoadingDialog()

        if (param) {
          set((state) => ({
            param: { ...state.param, ...param }
          }))
        }

        const state = get()
        const requestParam = prepareApiRequest({
          ...state.param,
          search: state.param.search.cris?.[0]?.value
            ? state.param.search
            : initialState.param.search
        })

        const response = await apiAxios.post('/maintenance/list', requestParam)
        set({ data: response })

        dialogStore.closeLoadingDialog()
      } catch (error) {
        logger.error('유지보수 목록 조회 실패:', error)
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
        return await get().fetchMaintenanceListData()
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
        return await get().fetchMaintenanceListData()
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

const useMaintenanceHook = () => {
  const store = useMaintenanceStore()
  const maintenanceInitialState = initialState

  const state = {
    data: store.data,
    param: store.param,
    isLoading: store.isLoading,
    viewMode: store.viewMode,
    pagination: store.pagination
  }

  const actions = {
    setLoading: (isLoading) => store.setLoading(isLoading),
    setMaintenanceListData: (data) => store.setMaintenanceListData(data),
    setMaintenanceListParam: (param) => store.setMaintenanceListParam(param),
    toggleMaintenanceListViewMode: () => store.toggleMaintenanceListViewMode(),
    fetchMaintenanceListData: (param = null) => store.fetchMaintenanceListData(param),
    handlePageChange: (newPage) => store.handlePageChange(newPage),
    handlePageSizeChange: () => store.handlePageSizeChange(),
    resetPagination: () => store.resetPagination(),
    reset: () => store.reset()
  }

  return { state, actions, maintenanceInitialState }
}

export { useMaintenanceStore, useMaintenanceHook }
