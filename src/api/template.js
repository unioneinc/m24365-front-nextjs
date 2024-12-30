// import axios from './axios'
import axios from '@/app/lib/api/axios'

export const getSetupTemplateListApi = (check) => axios.get(`/setup/template/list/${check}`) // 템플릿목록(check: 전체목록(공용/서비스/계약/기타)(t), 서비스관련양식(s), 계약서(c))
export const postSetupTemplateApi = (param) => axios.post('/setup/template', param) // 템플릿등록
export const getSetupTemplateApi = (docuTmplId) => axios.get(`/setup/template/${docuTmplId}`) // 템플릿상세
export const postSetupTemplateUpdateApi = (param) => axios.post('/setup/template/update', param) // 템플릿수정
export const getSetupTemplateDeleteApi = (docuTmplId) =>
  axios.get(`/setup/template/delete/${docuTmplId}`) // 템플릿삭제
// export const postSetupTemplateAutoApi = (param) => axios.post('/setup/template/auto', param) // 공용 템플릿 자동입력
export const postSetupTemplateAutoApi = (param) => axios.post('/setup/template/auto/service', param) // 서비스 템플릿 자동입력
export const postSetupTemplateAutoContractApi = (param) =>
  axios.post('/setup/template/auto/contract', param) // 계약서 템플릿 자동입력
