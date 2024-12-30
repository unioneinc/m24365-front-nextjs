import axios from '@/app/lib/api/axios'

export const getMatchingListApi = () => axios.get('/matching/list') // 매칭요청목록
export const getMatchingRequestListApi = (raySeq) => axios.get(`/matching/request/list/${raySeq}`) // 매칭요청신청목록
export const postMatchingApi = (param) => axios.post('/matching', param) // 매칭요청등록
export const getMatchingApi = (raySeq) => axios.get(`/matching/${raySeq}`) // 매칭요청상세
export const postMatchingUpdateApi = (param) => axios.post('/matching/update', param) // 매칭요청수정
export const getMatchingCloseApi = (raySeq) => axios.get(`/matching/close/${raySeq}`) // 매칭요청마감
export const postMatchingReplyApi = (param) => axios.post('/matching/reply', param) // 매칭요청문의하기
export const postMatchingReplyDeleteApi = (param) => axios.post('/matching/reply/delete', param) // 매칭요청문의삭제
export const postMatchingRequestApi = (param) => axios.post('/matching/request', param) // 매칭요청신청
export const postMatchingRequestAcceptApi = (param) => axios.post('/matching/request/accept', param) // 매칭요청수락/거절
export const postMatchingRequestDeleteApi = (param) => axios.post('/matching/request/delete', param) // 매칭요청삭제
export const postMatchingRequestUpdateApi = (param) => axios.post('/matching/request/update', param) // 매칭요청수정
export const getMatchingContractListApi = () => axios.get('/matching/contract/list') // 매칭계약목록
export const postMatchingContractApi = (param) => axios.post('/matching/contract', param) // 매칭계약생성
export const getMatchingContractApi = (conId) => axios.get(`/matching/contract/${conId}`) // 매칭계약상세
export const getMatchingContractUpdateApi = (param) =>
  axios.post('/matching/contract/update', param) // 매칭계약수정
export const getMatchingContractCompleteApi = (conId) =>
  axios.get(`/matching/contract/complete/${conId}`) // 매칭계약승인
export const getMatchingContractHtmlApi = (conId) => axios.get(`/matching/contract/html/${conId}`) // 매칭계약HTML
