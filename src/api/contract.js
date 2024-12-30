import axios from '@/app/lib/api/axios'
import { logger } from '~/lib/logger'

export const getContractListApi = (date) => axios.get(`/contract/list/${date}`) // 계약리스트(전체)
export const getContractGroupApi = (gpId) => axios.get(`/contract/group/${gpId}`) // 그룹별 계약리스트
export const postContractApi = (param) => axios.post('/contract', param) // 계약등록
export const getContractApi = (conId) => axios.get(`/contract/${conId}`) // 계약상세
export const getContractAssetsApi = (conId) => axios.get(`/contract/assets/${conId}`) // 계약자산목록
export const postContractUpdateApi = (param) => axios.post('/contract/update', param) // 계약수정
export const getContractDeleteApi = (conId) => axios.get(`/contract/delete/${conId}`) // 계약삭제
// Start of Selection
export const postContractPageApi = (param) => {
  logger.info('Sending request to /contract/filter with parameters:', param)
  return axios.post('/contract/filter', param) // 계약리스트(페이징)
}
export const getContractListModifyApi = (conId) => axios.get(`/contract/list/modify/${conId}`) // 계약수정목록
export const getContractModifyApi = (conUpId, conUpCd) =>
  axios.get(`/contract/modify/${conUpId}/${conUpCd}`) // 계약수정 승인 및 거절
export const postContractModifyRequestApi = (param) => axios.post('/contract/modify/request', param) // 계약수정 요청
