import axios from '@/app/lib/api/axios'

export const getMaintenanceListApi = () => axios.get('/maintenance/list') // 서비스목록
export const postMaintenanceApi = (param) => axios.post('/maintenance', param) // 서비스생성
export const getMaintenanceApi = (srvId) => axios.get(`/maintenance/${srvId}`) // 서비스상세
export const getMaintenanceCustomerApi = (srvId) => axios.get(`/maintenance/customer/${srvId}`) // 서비스상세(외부용)
export const postMaintenanceRequestApi = (param) => axios.post('/maintenance/request', param) // 점검계획승인요청
export const getMaintenanceAgreeApi = (srvId) => axios.get(`/maintenance/agree/${srvId}`) // 점검계획승인
export const postMaintenanceRefuseApi = (param) => axios.post('/maintenance/refuse', param) // 점검계획반려
export const getMaintenanceStartApi = (srvId) => axios.get(`/maintenance/start/${srvId}`) // 점검시작
export const postMaintenanceSaveApi = (param) => axios.post('/maintenance/save', param) // 보고서저장
export const postMaintenanceFinishApi = (param) => axios.post('/maintenance/finish', param) // 점검완료승인요청
export const getMaintenanceFinishAgreeApi = (srvId) =>
  axios.get(`/maintenance/finish/agree/${srvId}`) // 점검완료승인
export const postMaintenanceFinishRefuseApi = (param) =>
  axios.post('/maintenance/finish/refuse', param) // 점검완료반려
export const getMaintenanceCompletePdfApi = (srvId, check) =>
  axios.get(`/maintenance/complete/pdf/${srvId}/${check}`) // 완료보고서PDF
export const getMaintenanceListCompleteApi = () => axios.get('/maintenance/list/complete') // 유지보수완료리스트
export const postMaintenancePageCompleteApi = (param) =>
  axios.post('/maintenance/page/complete', param) // 유지보수완료리스트(페이징)
export const postMaintenanceUpdatePlaneApi = (param) =>
  axios.post('/maintenance/update/plane', param) // 유지보수수정(계획)
export const postMaintenanceUpdateCompleteApi = (param) =>
  axios.post('/maintenance/update/complete', param) // 유지보수수정(완료)
export const postMaintenanceEndApi = (param) => axios.post('/maintenance/end', param) // 유지보수종결(중단)
export const getMaintenanceDeleteApi = (srvId) => axios.get(`/maintenance/delete/${srvId}`) // 유지보수삭제
export const getMaintenanceEvaluateListApi = () => axios.get('/maintenance/evaluate/list') // 서비스(엔지니어)평가항목목록
export const postMaintenanceEvaluateApi = (param) => axios.post('/maintenance/evaluate', param) // 서비스(엔지니어)평가
export const getMaintenanceEvaluateApi = (srvId) => axios.get(`/maintenance/evaluate/${srvId}`) // 서비스(엔지니어)평가보기
export const postMaintenanceListFilterApi = (param) => axios.post('/maintenance/filter', param) // 서비스목록(필터링)
export const getMaintenanceCheckMailApi = (srvId, srvTpiTyCd) =>
  axios.get(`/maintenance/check/mail/${srvId}/${srvTpiTyCd}`) // 외부메일 내용확인
export const getMaintenanceAutoApi = (gpId) => axios.get(`/maintenance/auto/${gpId}`) // 자동선택값
export const getMaintenanceRegularApi = (date) => axios.get(`/maintenance/regular/${date}`) // 정기점검 조회(date:yyyy-mm)
export const getMaintenanceContractRegularApi = (date) =>
  axios.get(`/maintenance/contract/regular/${date}`) // 정기점검 계약 목록(date:yyyy-mm)
export const getMaintenanceSelectListApi = (start, end) =>
  axios.get(`/maintenance/select/list/${start}/${end}`) // 해당 기간에 유지보수가 존재하는 그룹 목록

export const postCaseOpenApi = (param) => axios.post('/case/open', param) // 케이스오픈
export const getCaseCloseApi = (srvId) => axios.get(`/case/close/${srvId}`) // 케이스클로즈
export const getCaseApi = (srvId, gmbrSeq) => axios.get(`/case/${srvId}/${gmbrSeq}`) // 케이스상세
export const postCaseApi = (param) => axios.post('/case', param) // 메세지보내기
export const postCaseMemberInviteApi = (param) => axios.post('/case/member/invite', param) // 참석자추가
export const postCaseMemberDeleteApi = (param) => axios.post('/case/member/delete', param) // 참석자제거
export const postReportMonth = (apvMbrNo, date, gpId, mbrNo) =>
  axios.post('/maintenance/report/month', {
    apvMbrNo,
    date,
    gpId,
    mbrNo
  })
