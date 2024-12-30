'use client'

import { create } from 'zustand'
import { logger } from '~/lib/logger'
import { devtools } from 'zustand/middleware'
import { postSurveyPageApi } from '@/api/survey'
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

const useSurveyStore = create(
  devtools((set, get) => ({
    ...initialState,

    setLoading: (isLoading) => set({ isLoading }),

    setSurveyListData: (data) => set({ data }),

    setSurveyListParam: (param) =>
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

    fetchSurveyPageFilter: async () => {
      try {
        set({ isLoading: true })
        const state = get()
        const requestParam = state.param

        const response = await apiAxios.post('/survey/filter', requestParam)

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
        return await get().fetchSurveyPageFilter()
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
        return await get().fetchSurveyPageFilter()
      } catch (error) {
        logger.error('페이지 사이즈 변경 실패:', error)
        throw error
      }
    },

    fetchSurveyListData: async (param = null) => {
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
          search: { cris: [{ value: '' }] }
        }

        const { data } = await postSurveyPageApi(requestParam)
        set({ data })

        dialogStore.closeLoadingDialog()
      } catch (error) {
        logger.error('설문조사 목록 조회 실패:', error)
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

const useSurveyHook = () => {
  const store = useSurveyStore()
  const surveyInitialState = initialState

  const state = {
    data: store.data,
    param: store.param,
    isLoading: store.isLoading,
    pagination: store.pagination
  }

  const actions = {
    setLoading: (isLoading) => store.setLoading(isLoading),
    setSurveyListData: (data) => store.setSurveyListData(data),
    setSurveyListParam: (param) => store.setSurveyListParam(param),
    setSurveyListParamAndFetch: async (param) => {
      store.setSurveyListParam(param)
      return await store.fetchSurveyPageFilter()
    },
    fetchSurveyListData: () => store.fetchSurveyListData(),
    fetchSurveyPageFilter: () => store.fetchSurveyPageFilter(),
    handlePageChange: (newPage) => store.handlePageChange(newPage),
    handlePageSizeChange: () => store.handlePageSizeChange(),
    resetPagination: () => store.resetPagination(),
    reset: () => store.reset()
  }

  return { state, actions, surveyInitialState }
}

export { useSurveyStore, useSurveyHook }
