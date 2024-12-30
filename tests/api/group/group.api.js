import axios from 'axios'

export const groupApi = {
  // 기존 API들
  getGroupList: () => axios.get('/group/list'),
  postGroupList: (param) => axios.post('/group/list/page', param),
  createGroup: (param) => axios.post('/group', param),
  getGroupDetail: (gpId) => axios.get(`/group/${gpId}`),
  updateGroup: (param) => axios.post('/group/update', param),
  deleteGroupMember: (gpId, gmbrSeq) => axios.get(`/group/member/delete/${gpId}/${gmbrSeq}`),
  inviteGroupMember: (param) => axios.post('/group/invite', param),

  // 추가된 API들
  getGroupMembers: (gpId) => axios.get(`/group/member/${gpId}`),
  searchGroupMembers: (gpTyCd) => axios.get(`/group/member/search/${gpTyCd}`),
  connectGroup: (param) => axios.post('/group/connect', param),
  agreeGroupInvite: (gpId, gmbrSeq) => axios.get(`/group/agree/${gpId}/${gmbrSeq}`),
  refuseGroupInvite: (gpId, gmbrSeq) => axios.get(`/group/refuse/${gpId}/${gmbrSeq}`),
  changeGroupManager: (param) => axios.post('/group/change', param),
  getGroupMemberSearchList: () => axios.get('/group/member/search/list'),
  postGroupMemberSearchPage: (param) => axios.post('/group/member/search/page', param),
  getGroupMemberHistory: (gpId, mbrNo, start, end) =>
    axios.get(`/group/member/history/${gpId}/${mbrNo}/${start}/${end}`),
  selectMainGroup: (gpId) => axios.get(`/group/main/select/${gpId}`),
  getCompanyGroup: () => axios.get('/group/company'),
  getCompanyMemberList: () => axios.get('/group/company/member/list'),
  postCompanyMemberPage: (param) => axios.post('/group/company/member/page', param),
  deleteCompanyMember: (gpId, mbrNo) => axios.get(`/group/company/member/delete/${gpId}/${mbrNo}`),
  registerMember: (param) => axios.post('/group/member', param),
  updateMember: (param) => axios.post('/group/member/update', param),
  getGroupInviteList: (gpCom, flag, gpId) =>
    axios.get(`/group/invite/list/${gpCom}/${flag}/${gpId}`),
  getGroupSelectList: (check) => axios.get(`/group/select/list/${check}`),
  getMemberAuth: (gpId, mbrNo) => axios.get(`/group/member/auth/${gpId}/${mbrNo}`),
  uploadCompanyLogo: (param) => axios.post('/group/company/logo', param),
  getMemberSelectList: (mbrNo) => axios.get(`/group/member/select/${mbrNo}`),
  uploadCompanyMemberXls: (param) => axios.post('/group/company/member/xls', param),
  uploadGroupXls: (param) => axios.post('/group/xls', param)
}
