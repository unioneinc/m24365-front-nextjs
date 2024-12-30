'use client'

import { create } from 'zustand'
import { logger } from '~/lib/logger'
import { devtools } from 'zustand/middleware'
import { getMatchingListApi } from '@/api/matching'
import { useDialogStore } from './dialog'
import { ERROR_TEXT } from '@/constants'
import { apiAxios } from '@/app/lib/api/apiAxios'

const initialState = {
  data: [],
  param: {
    raySeq: '',
    tabIndex: 0,
    rayCateCd: '',
    keyword: ''
  },
  isLoading: false
}

const useMatchingStore = create(
  devtools((set, get) => ({
    ...initialState,

    setLoading: (isLoading) => set({ isLoading }),

    setMatchingListData: (data) => set({ data }),

    setMatchingListParam: (param) =>
      set((state) => ({
        param: { ...state.param, ...param }
      })),

    fetchMatchingListData: async () => {
      try {
        const response = await apiAxios.get('/matching/list')
        set((state) => ({
          ...state,
          data: response
        }))
      } catch (error) {
        logger.error('매칭 목록 조회 실패:', error)
      }
    },

    fetchMatchingServiceListData: async (param = null) => {
      try {
        const dialogStore = useDialogStore.getState()
        dialogStore.openLoadingDialog()

        if (param) {
          set((state) => ({
            param: { ...state.param, ...param }
          }))
        }

        const { data } = await getMatchingListApi()
        set({ data })

        dialogStore.closeLoadingDialog()
      } catch (error) {
        logger.error('매칭 서비스 목록 조회 실패:', error)
        const dialogStore = useDialogStore.getState()
        dialogStore.closeLoadingDialog()
        dialogStore.openAlertDialog({
          description: ERROR_TEXT
        })
      }
    },

    reset: () => {
      set(initialState)
    }
  }))
)

const useMatchingHook = () => {
  const store = useMatchingStore()
  const matchingInitialState = initialState

  const state = {
    data: store.data,
    param: store.param,
    isLoading: store.isLoading
  }

  const actions = {
    setLoading: (isLoading) => store.setLoading(isLoading),
    setMatchingListData: (data) => store.setMatchingListData(data),
    setMatchingListParam: (param) => store.setMatchingListParam(param),
    fetchMatchingListData: () => store.fetchMatchingListData(),
    fetchMatchingServiceListData: (param = null) => store.fetchMatchingServiceListData(param),
    reset: () => store.reset()
  }

  return { state, actions, matchingInitialState }
}

export { useMatchingStore, useMatchingHook }
