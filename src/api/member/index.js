import { axios } from '@/app/lib/api'
import { logger } from '~/lib/logger'

/**
 * 사용자 정보를 조회하는 함수
 * @returns {Promise} 사용자 정보를 담은 Promise 객체
 */
export const getMemberInfo = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error('API URL이 환경 변수에 정의되지 않았습니다.')
  }

  const token = localStorage?.getItem('accessToken')

  const endpoint = '/member/info'
  const url = `${apiUrl}${endpoint}`

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.data) {
      throw new Error('응답 데이터가 없습니다')
    }

    return response
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage?.removeItem('accessToken')

      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        const currentPath = window.location.pathname
        const cleanRedirectTo = currentPath.replace(/\/login\?redirectTo=.*/, '')
        const redirectUrl = `/login?redirectTo=${encodeURIComponent(cleanRedirectTo)}`
        window.location.href = redirectUrl
      }
    }
    logger.error('사용자 정보 조회 실패:', error)
    throw error
  }
}
