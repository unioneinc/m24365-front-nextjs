import axios from '@/app/lib/api/axios'

export const getAssetsListApi = () => axios.get('/assets/list') // 자산리스트(전체)
export const getAssetsGroupApi = (gpId) => axios.get(`/assets/group/list/${gpId}`) // 그룹별 자산리스트
export const postAssetsApi = (param) => axios.post('/assets', param) // 자산등록
export const getAssetsApi = (asstId) => axios.get(`/assets/${asstId}`) // 자산상세
export const postAssetsXlsApi = (param) => axios.post('/assets/excel', param) // 자산일괄등록
export const postAssetsUpdateApi = (param) => axios.post('/assets/update', param) // 자산수정
export const getAssetsDeleteApi = (asstId) => axios.get(`/assets/delete/${asstId}`) // 자산삭제
export const getAssetsChangeIdsApi = (oneAssetId, twoAssetId) =>
  axios.get(`/assets/change/asstId/${oneAssetId}/${twoAssetId}`)
export const getAssetsAsstCateCdApi = () => axios.get('/assets/category') // 자산분류목록
export const postAssetsPageApi = (param) => axios.post('/assets/filter', param) // 자산리스트(pageable)
export const getAssetsAutoApi = (asstId) => axios.get(`/assets/auto/${asstId}`) // 자산자동입력
export const postAssetsDeleteMultiApi = (param) => axios.post('/assets/delete/multi', param) // 자산일괄삭제
export const getAssetsServiceListApi = (asstId) => axios.get(`/assets/service/list/${asstId}`) // 자산상세 - 자산 연관 서비스목록
export const postAssetsServiceListApi = (param) => axios.post('/assets/service/filter', param) // 자산상세 - 자산 연관 서비스목록(페이징)
