import axios from '@/app/lib/api/axios'

export const getDashboardApi = (date) => axios.get(`/dashboard/${date}`)
export const getDashboardScheduleApi = (searchDate) =>
  axios.get(`/dashboard/schedule/${searchDate}`) // 간편등록 -> 달력 유지보수 목록
