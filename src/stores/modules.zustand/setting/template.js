import { create } from 'zustand'
import { logger } from '~/lib/logger'
import { devtools } from 'zustand/middleware'
import { getSetupTemplateListApi } from '@/api/template'
import { useDialogStore } from '../dialog'
import { ERROR_TEXT } from '@/constants'

const initialState = {
  data: null,
  param: {
    keyword: ''
  },
  isLoading: false
}

const useTemplateStore = create(
  devtools((set, get) => ({
    ...initialState,

    // 로딩 상태 제어
    setLoading: (isLoading) => set({ isLoading }),

    // 템플릿 목록 데이터 설정
    setTemplateListData: (data) => set({ data }),

    // 템플릿 목록 파라미터 설정
    setTemplateListParam: (param) =>
      set((state) => ({
        param: {
          ...state.param,
          ...param
        }
      })),

    // 템플릿 목록 데이터 조회
    fetchTemplateListData: async (param = null) => {
      try {
        const dialogStore = useDialogStore.getState()
        dialogStore.openLoadingDialog()

        // 파라미터 설정
        if (param) {
          set((state) => ({
            param: { ...state.param, ...param }
          }))
        }

        const response = await getSetupTemplateListApi('t')
        set({ data: response.data })

        dialogStore.closeLoadingDialog()
      } catch (error) {
        logger.error('템플릿 목록 조회 실패:', error)
        const dialogStore = useDialogStore.getState()
        dialogStore.closeLoadingDialog()

        if (error.response?.status === 401) {
          const router = get().router
          if (router) {
            router.push('/login')
          }
        } else {
          dialogStore.openAlertDialog({
            content: ERROR_TEXT
          })
        }
      }
    },

    // 스토어 초기화
    reset: () => set(initialState)
  }))
)

export default useTemplateStore
