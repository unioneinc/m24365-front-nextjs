import axios from '@/app/lib/api/axios'

export const getNotificationSetupListApi = () => axios.get('/notification/setup/list') // 알림설정목록
export const getNotificationSetupApi = (param) => axios.post('/notification/setup', param) // 알림설정
export const getNotificationReadApi = (notiSeq) => axios.get(`/notification/read/${notiSeq}`) // 알림읽기
export const getNotificationReadAllApi = () => axios.get('/notification/read/all') // 알림모두읽기
export const getNotificationListApi = () => axios.get('/notification/list') // 알림전체내역
export const getNotificationNoneListApi = () => axios.get('/notification/unread/list') // 미확인알림내역
export const postNotificationPageApi = (param) => axios.post('/notification/filter', param) // 알림전체내역(페이징)
export const postNotificationNonePageApi = (param) =>
  axios.post('/notification/unread/filter', param) // 미확인알림내역(페이징)
