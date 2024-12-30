import axios from '@/app/lib/api/axios'

export const getPaidServiceListApi = () => axios.get('/paid/list') // 유상서비스목록
export const postPaidServiceApi = (param) => axios.post('/paid', param) // 유상서비스등록
export const getPaidServiceApi = (srvReqId) => axios.get(`/paid/${srvReqId}`) // 유상서비스상세
export const getPaidServiceDeleteApi = (srvReqId) => axios.get(`/paid/delete/${srvReqId}`) // 유상서비스삭제
export const getPaidServiceSelectApi = (srvReqId, paySrvReqTy) =>
  axios.get(`/paid/select/${srvReqId}/${paySrvReqTy}`) // 유상서비스수락/반려
export const postPaidServicePageApi = (param) => axios.post('/paid/page', param) // 유상서비스목록(페이징)
