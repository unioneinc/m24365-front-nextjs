import axios from '@/app/lib/api/axios'

export const postSurveyApi = (param) => axios.post('/survey', param) // 설문등록
export const getSurveyDetailApi = (survId) => axios.get(`/survey/${survId}`) // 설문상세조회
export const getSurveyCloseApi = (survId) => axios.get(`/survey/close/${survId}`) // 설문마감
export const getSurveyDeleteApi = (survId) => axios.get(`/survey/delete/${survId}`) // 설문삭제
export const getSurveyListApi = () => axios.get('/survey/list') // 설문목록
export const getSurveyGroupApi = (survId) => axios.get(`/survey/refGroup/${survId}`) // 관계그룹 & 관계직책 목록
export const postSurveyReplyApi = (param) => axios.post('/survey/reply', param) // 설문응답제출
export const getSurveyReplyApi = (survId) => axios.get(`/survey/reply/${survId}`) // 설문응답조회(관리자)
export const getSurveyReplyOneApi = (survId) => axios.get(`/survey/replyOne/${survId}`) // 설문응답조회(작성회원)
export const postSurveyUpdateApi = (param) => axios.post('/survey/update', param) // 설문수정
export const getSurveyCheckReplyApi = (survId) => axios.get(`/survey/checkReply/${survId}`) // 설문응답여부확인
export const postSurveyPageApi = (param) => axios.post('/survey/page', param) // 설문목록(페이징)
