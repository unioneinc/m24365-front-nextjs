import { create } from 'zustand'
import { logger } from '~/lib/logger'
import { devtools } from 'zustand/middleware'
import { getBoardListApi } from '@/api/board'
import { useDialogStore } from './dialog'
import { ERROR_TEXT } from '@/constants'

const initialState = {
  data: null,
  param: {
    postTyCdId: '',
    inqPostTyCd: '',
    qustPostTyCd: '',
    keyword: ''
  },
  isLoading: false
}

const useBoardStore = create(
  devtools((set, get) => ({
    ...initialState,

    setLoading: (isLoading) => set({ isLoading }),

    setBoardListData: (data) => set({ data }),

    setBoardListParam: (param) =>
      set((state) => ({
        param: { ...state.param, ...param }
      })),

    fetchBoardListData: async (param = null) => {
      try {
        const dialogStore = useDialogStore.getState()
        dialogStore.openLoadingDialog()

        if (param) {
          set((state) => ({
            param: { ...state.param, ...param }
          }))
        }

        const state = get()
        const { data } = await getBoardListApi(state.param)
        set({ data })

        dialogStore.closeLoadingDialog()
      } catch (error) {
        logger.error('게시판 목록 조회 오류:', error)
        useDialogStore.getState().openAlertDialog({ description: ERROR_TEXT })
      }
    },

    reset: () => set(initialState)
  }))
)

export { useBoardStore }
