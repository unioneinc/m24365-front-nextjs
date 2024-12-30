import { create } from 'zustand'
import { logger } from '~/lib/logger'
import { devtools } from 'zustand/middleware'
import { getGroupCompanyApi, postGroupCompanyMemberPageApi } from '@/api/group'
import { useDialogStore } from './dialog'
import { ERROR_TEXT } from '@/constants'

const isClientSide = () => typeof window !== 'undefined'

const initialState = {
  data: null,
  memberListParam: {
    columnName: '',
    orderType: '',
    gmbrStatCd: '',
    search: { cris: [{ value: '' }] },
    page: {
      page: 0,
      size:
        isClientSide() &&
        (/Mobi/i.test(window.navigator.userAgent) || window.navigator.userAgent.includes('webview'))
          ? 5
          : 10
    }
  },
  isLoading: false
}

const useCompanyStore = create(
  devtools((set, get) => ({
    ...initialState,

    // 로딩 상태 제어
    setLoading: (isLoading) => set({ isLoading }),

    // 회사 데이터 설정
    setCompanyData: (data) => set({ data }),

    // 회사 멤버 목록 파라미터 설정
    setCompanyMemberListParam: (param) =>
      set((state) => ({
        memberListParam: {
          ...state.memberListParam,
          ...param,
          page: {
            ...state.memberListParam.page,
            ...(param.page || {})
          }
        }
      })),

    // 회사 데이터 조회
    fetchCompanyData: async (param = null) => {
      try {
        const dialogStore = useDialogStore.getState()
        dialogStore.openLoadingDialog()

        // 파라미터 설정
        if (param) {
          set((state) => ({
            data: { ...state.data, ...param }
          }))
        }

        const state = get()
        const { gpId } = state.data || {}

        const [companyData, memberListData] = await Promise.all([
          getGroupCompanyApi(gpId),
          postGroupCompanyMemberPageApi(gpId, {
            ...state.memberListParam,
            search: state.memberListParam.search.cris?.[0]?.value
              ? state.memberListParam.search
              : null
          })
        ])

        set({
          data: {
            ...companyData.data,
            memberList: memberListData.data
          }
        })

        dialogStore.closeLoadingDialog()
      } catch (error) {
        logger.error('회사 데이터 조회 실패:', error)
        const dialogStore = useDialogStore.getState()
        dialogStore.closeLoadingDialog()
        dialogStore.openAlertDialog({
          content: ERROR_TEXT
        })
      }
    },

    // 스토어 초기화
    reset: () => set(initialState)
  }))
)

export { useCompanyStore }
