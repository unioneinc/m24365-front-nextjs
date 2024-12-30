// import axios from './axios'
import axios from '@/app/lib/api/axios'

const getAdminMemberStatisticApi = () => axios.get('/admin/member/statistic') // 전체회원통계
export const getAdminMemberApi = (mbrNo) => axios.get(`/admin/member/${mbrNo}`) // 회원상세보기(관리자)
export const postAdminMemberApi = () => axios.post('/admin/member') // 회원수정(관리자)
export const postAdminMemberListApi = (param) => axios.post('/admin/member/list', param) // 전체회원목록(page)

export default getAdminMemberStatisticApi
