'use client'

import { create } from 'zustand'
import { logger } from '~/lib/logger'
import { devtools } from 'zustand/middleware'
import { postAssetsPageApi } from '@/api/asset'
// import useDialogStore from './dialog'
import { ERROR_TEXT } from '@/constants'
import { apiAxios } from '@/app/lib/api/apiAxios'

const isClientSide = () => typeof window !== 'undefined'
const DEFAULT_PAGE_SIZE = 10
const isMobile =
  isClientSide() &&
  (/Mobi/i.test(window.navigator.userAgent) || window.navigator.userAgent.includes('webview'))

export const initialState = {
  data: [],
  asstCateCdList: [],
  param: {
    columnName: '',
    orderType: '',
    year: '2024',
    month: null,
    asstCateCd: null,
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

const useAssetStore = create(
  devtools((set, get) => ({
    ...initialState,

    setLoading: (isLoading) => set({ isLoading }),
    setAsstCateCdList: (asstCateCdList) => set({ asstCateCdList }),
    setAssetListData: (data) => set({ data }),

    setAssetListParam: (param) =>
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

    fetchAssetListData: async () => {
      try {
        const response = await apiAxios.get('/assets/list')
        set((state) => ({
          ...state,
          data: response
        }))
      } catch (error) {
        logger.error('자산 목록 조회 실패:', error)
      }
    },

    fetchAsstCateCdList: async () => {
      try {
        const response = await apiAxios.get('/assets/category')
        set((state) => ({
          ...state,
          asstCateCdList: response
        }))
      } catch (error) {
        logger.error('Error:', error)
      }
    },

    fetchAssetPageFilter: async () => {
      try {
        set({ isLoading: true })
        const state = get()
        const requestParam = state.param

        const response = await apiAxios.post('/assets/filter', requestParam)

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
        return await get().fetchAssetPageFilter()
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
        return await get().fetchAssetPageFilter()
      } catch (error) {
        logger.error('페이지 사이즈 변경 실패:', error)
        throw error
      }
    },

    fetchAssetServiceListData: async (param = null) => {
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
          search: { cris: [{ value: '' }] },
          asstCateCd: state.param.asstCateCd.cris?.[0]?.value ? state.param.asstCateCd : null
        }

        const { data } = await postAssetsPageApi(requestParam)
        set({ data })

        dialogStore.closeLoadingDialog()
      } catch (error) {
        logger.error('자산 서비스 목록 조회 실패:', error)
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

const useAssetHook = () => {
  const store = useAssetStore()
  const assetInitialState = initialState

  const state = {
    data: store.data,
    param: store.param,
    isLoading: store.isLoading,
    asstCateCdList: store.asstCateCdList,
    pagination: store.pagination
  }

  const actions = {
    setLoading: (isLoading) => store.setLoading(isLoading),
    setAssetListData: (data) => store.setAssetListData(data),
    setAsstCateCdList: (asstCateCdList) => store.setAsstCateCdList(asstCateCdList),
    setAssetListParam: (param) => store.setAssetListParam(param),
    setAssetListParamAndFetch: async (param) => {
      store.setAssetListParam(param)
      return await store.fetchAssetPageFilter()
    },
    fetchAssetListData: () => store.fetchAssetListData(),
    fetchAssetServiceListData: (param = null) => store.fetchAssetServiceListData(param),
    fetchAsstCateCdList: () => store.fetchAsstCateCdList(),
    fetchAssetPageFilter: () => store.fetchAssetPageFilter(),
    handlePageChange: (newPage) => store.handlePageChange(newPage),
    handlePageSizeChange: () => store.handlePageSizeChange(),
    resetPagination: () => store.resetPagination(),
    reset: () => store.reset()
  }

  return { state, actions, assetInitialState }
}

export { useAssetStore, useAssetHook }
