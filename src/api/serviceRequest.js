// import axios from './axios'
import axios from '@/app/lib/api/axios'

export const getServiceRequestListApi = () => axios.get('/serviceRequest/list') // SR목록
export const postServiceRequestPageApi = (param) => axios.post('/serviceRequest/page', param) // SR목록(필터적용)
export const postServiceRequestApi = (param) => axios.post('/serviceRequest', param) // SR등록
export const getServiceRequestApi = (srvReqId) => axios.get(`/serviceRequest/${srvReqId}`) // SR상세
export const getServiceRequestReceiveApi = (srvReqId) =>
  axios.get(`/serviceRequest/receive/${srvReqId}`) // SR접수
export const postServiceRequestUpdateApi = (param) => axios.post('/serviceRequest/update', param) // SR수정
export const getServiceRequestDeleteApi = (srvReqId) =>
  axios.get(`/serviceRequest/delete/${srvReqId}`) // SR삭제
