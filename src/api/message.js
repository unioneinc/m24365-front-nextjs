import axios from '@/app/lib/api/axios'

export const postMessageApi = (param) => axios.post('/message', param) // 쪽지보내기
export const getMessageDetailApi = (msgId, msgRecvMbrNo) =>
  axios.get(`/message/${msgId}/${msgRecvMbrNo}`) // 쪽지상세조회
export const getMessageDeleteApi = (msgId, msgRecvMbrNo) =>
  axios.get(`/message/delete/${msgId}/${msgRecvMbrNo}`) // 쪽지삭제
export const getMessageListReceiveApi = () => axios.get('/message/list/receive') // 받은쪽지목록
export const getMessageListSentApi = () => axios.get('/message/list/sent') // 보낸쪽지목록
export const postMessagePageReceiveApi = (param) => axios.post('/message/page/receive', param) // 받은쪽지목록(pageable)
export const postMessagePageSentApi = (param) => axios.post('/message/page/sent', param) // 보낸쪽지목록(pageable)
