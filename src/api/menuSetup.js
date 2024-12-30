import axios from '@/app/lib/api/axios'

export const getSetupMenuApi = () => axios.get('/setup/menu') // 회원설정메뉴확인
export const getSetupMenuDeleteApi = (menuCd) => axios.get(`/setup/menu/delete/${menuCd}`) // 메뉴선택해제
export const getSetupMenuSelectApi = (menuCd) => axios.get(`/setup/menu/select/${menuCd}`) // 메뉴선택
