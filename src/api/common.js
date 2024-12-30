import axios from './axios.intercept'

export const getSetupTotalcodeApi = (cdTyNo) => axios.get(`/setup/totalcode/${cdTyNo}`) // 토탈코드
export const getSetupTotalcodeAssetsApi = () => axios.get('/setup/totalcode/assets') // 자산분류코드(대)
export const getSetupTotalcodeAssetsAsstTyCdApi = (asstTyCd) => {
  return axios.get(`/setup/totalcode/assets/${asstTyCd}`) // 자산분류 하위코드
}
export const postSearchApi = (param) => axios.post('/search', param) // 전체검색
export const postExcelDownApi = (param) =>
  axios.post('/excel/down', param, { responseType: 'blob' }) // 엑셀다운2

export const getCommonServiceCountApi = () => axios.get('/common/service/count') // SR요청대기 & 유지보수 승인 카운트
export const getCommonUnreadCountApi = () => axios.get('/common/unread/count') // 미확인 알림 & 쪽지 카운트
