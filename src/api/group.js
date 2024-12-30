import axios from './axios.intercept'
// todo -> axios를 새로 정의해서 사용할 것 import axios from '@/app/lib/api/axios'

export const getGroupListApi = () => axios.get('/group/list') // 그룹목록
export const postGroupListApi = (param) => axios.post('/group/list/page', param) // 그룹목록(페이징)
export const postGroupApi = (param) => axios.post('/group', param) // 그룹생성
export const getGroupApi = (gpId) => axios.get(`/group/${gpId}`) // 그룹상세
export const getGroupMemberApi = (gpId) => axios.get(`/group/member/${gpId}`) // 그룹관계자목록
export const getGroupMemberSearchApi = (gpTyCd) => axios.get(`/group/member/search/${gpTyCd}`) // 그룹초대멤버검색
export const postGroupConnectApi = (param) => axios.post('/group/connect', param) // 그룹참조
export const postGroupInviteApi = (param) => axios.post('/group/invite', param) // 그룹초대
export const getGroupAgreeApi = (gpId, gmbrSeq) => axios.get(`/group/agree/${gpId}/${gmbrSeq}`) // 그룹승인
export const getGroupRefuseApi = (gpId, gmbrSeq) => axios.get(`/group/refuse/${gpId}/${gmbrSeq}`) // 그룹거절
export const getGroupMemberDeleteApi = (gpId, gmbrSeq) =>
  axios.get(`/group/member/delete/${gpId}/${gmbrSeq}`) // 그룹탈퇴
export const postGroupUpdateApi = (param) => axios.post('/group/update', param) // 그룹수정
export const postGroupChangeApi = (param) => axios.post('/group/change', param) // 그룹장이���
export const getGroupMemberSearchListApi = () => axios.get('/group/member/search/list') // 그룹원 조회목록
export const postGroupMemberSearchPageApi = (param) =>
  axios.post('/group/member/search/page', param) // 그룹원 조회목록(페이징)
export const getGroupMemberHistoryApi = (gpId, mbrNo, start, end) =>
  axios.get(`/group/member/history/${gpId}/${mbrNo}/${start}/${end}`) // 그룹원상세
export const getGroupMainSelectApi = (gpId) => axios.get(`/group/main/select/${gpId}`) // 메인그룹지정
export const getGroupCompanyApi = () => axios.get('/group/company') // 회사그룹정보(사업자전용)
export const getGroupCompanyMemberListApi = () => axios.get('/group/company/member/list') // 회사그룹원목록(사업자전용)
export const postGroupCompanyMemberPageApi = (param) =>
  axios.post('/group/company/member/page', param) // 회사그룹원목록(페이징)(사업자전용)
export const getGroupCompanyMemberDeleteApi = (gpId, mbrNo) =>
  axios.get(`/group/company/member/delete/${gpId}/${mbrNo}`) // 회사그룹원퇴사탈퇴(사업자전용)
export const postGroupMemberApi = (param) => axios.post('/group/member', param) // 회원등록
export const postGroupMemberUpdateApi = (param) => axios.post('/group/member/update', param) // 회원수정
export const getGroupInviteListApi = (gpCom, flag, gpId) =>
  axios.get(`/group/invite/list/${gpCom}/${flag}/${gpId}`) // 회원초대목록
export const getGroupSelectListApi = (check) => axios.get(`/group/select/list/${check}`) // 쓰기가능그룹목록(그룹-g, 서비스관련-s, 자산/계약/기타-a, 그룹전체-t, admin권한이상-i, master권한이상-e)
export const getGroupMemberAuthApi = (gpId, mbrNo) =>
  axios.get(`/group/member/auth/${gpId}/${mbrNo}`) // 그룹의그룹원권한
export const postGroupCompanyLogoApi = (param) => axios.post('/group/company/logo', param) // 회사로고등록
export const getGroupMemberSelectApi = (mbrNo) => axios.get(`/group/member/select/${mbrNo}`) // 그룹원그룹목록
export const postGroupCompanyMemberXlsApi = (param) =>
  axios.post('/group/company/member/xls', param) // 회원일괄등록(사업자전용)
export const postGroupXlsApi = (param) => axios.post('/group/xls', param) // 그룹 일괄등록
export const postGroupFilterApi = (param) => axios.post(`/group/filter`, param) // 그룹 필터 초기 데이터 조회,
