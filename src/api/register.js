import axios from '@/app/lib/api/axios'

export const getRegisterTosApi = () => axios.get('/tos') // 약관
export const getRegisterIdCheckApi = (mbrId) => axios.get(`/member/check/id/${mbrId}`) // 아이디 중복검사
export const getRegisterCompanyCheckApi = (cmRegNo) => axios.get(`/member/check/company/${cmRegNo}`) // 사업자등록번호 중복검사
export const postRegisterApi = (param) => axios.post('/member', param) // 회원가입(사업자등록)
