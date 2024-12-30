// import axios from './axios'
import axios from '@/app/lib/api/axios'

export const getAuthorityCodeApi = () => axios.get('/authority/code') // 권한식별번호목록
export const postAuthorityUseApi = (param) => axios.post('/authority/use', param) // 권한부여
export const postAuthorityDeleteApi = (param) => axios.post('/authority/delete', param) // 권한제거
