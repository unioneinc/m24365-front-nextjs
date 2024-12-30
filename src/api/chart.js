import axios from '@/app/lib/api/axios'

export const getChartsApi = (year, gpId) => axios.get(`/charts/${year}/${gpId}`) // 연도별그룹별 통계
export const postChartsMaintenance = (param) => axios.post('/charts/maintenance', param) // 그룹별 유지보수목록
export const getChartsTotalApi = (before, after) => axios.get(`/charts/total/${before}/${after}`) // 전체차트
export const getChartsServiceMonthApi = (start, end) =>
  axios.get(`/charts/service/month/${start}/${end}`) // 월별서비스통계
export const postChartsServiceAssetsApi = (param) => axios.post('/charts/service/Assets', param) // 자산서비스통계
export const postChartsServiceAssetsListApi = (param) =>
  axios.post('/charts/service/Assets/list', param) // 자산서비스통계, 선택목록
export const postChartsServiceManagerApi = (param) => axios.post('/charts/service/manager', param) // 엔지니어서비스통계
export const postChartsServiceManagerMyApi = (param) =>
  axios.post('/charts/service/manager/my', param) // 엔지니어서비스통계(나만)
export const postChartsMaintenancePastApi = (param) => axios.post('/charts/maintenance/past', param) // 보고서 출력용 차트
