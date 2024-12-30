import { create } from 'zustand'
import { logger } from '~/lib/logger'
import { devtools } from 'zustand/middleware'
import moment from 'moment'
import { postMaintenanceListFilterApi } from '@/api/maintenance'
import { useDialogStore } from './dialog'
import { ERROR_TEXT } from '@/constants'

const isClientSide = () => typeof window !== 'undefined'

const initialState = {
  data: null,
  param: {
    gpId: null,
    gpNm: null,
    columnName: '',
    orderType: '',
    year: moment(new Date()).format('yyyy'),
    month: moment(new Date()).format('MM'),
    srvTyCdId: '',
    srvStat: '완료보고(C)',
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

const useChartStore = create(
  devtools((set, get) => ({
    ...initialState,

    // 로딩 상태 제어
    setLoading: (isLoading) => set({ isLoading }),

    // 차트 리포트 데이터 설정
    setChartReportData: (data) => set({ data }),

    // 차트 리포트 파라미터 설정
    setChartReportParam: (param) =>
      set((state) => ({
        param: { ...state.param, ...param }
      })),

    // 차트 리포트 데이터 조회
    fetchChartReportData: async (param = null) => {
      try {
        const dialogStore = useDialogStore.getState()
        dialogStore.openLoadingDialog()

        // 파라미터 설정
        if (param) {
          set((state) => ({
            param: { ...state.param, ...param }
          }))
        }

        const state = get()
        // 파라미터 변환 로직
        const requestParam = {
          ...state.param,
          search: state.param.search.cris?.[0]?.value ? state.param.search : null
        }

        const { data } = await postMaintenanceListFilterApi(requestParam)

        // 데이터 가공
        const processedData = {
          ...data,
          content: data.content.map((item) => ({
            ...item,
            srvTyCdId: item.srvTyCdId || '',
            srvIptcTyCd: item.srvIptcTyCd || ''
          }))
        }

        set({ data: processedData })
        dialogStore.closeLoadingDialog()
      } catch (error) {
        logger.error('차트 리포트 데이터 조회 실패:', error)
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

export { useChartStore }
