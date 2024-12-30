import axios from '@/app/lib/api/axios'
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

  const endpoint = '/member/info'
  const url = `${apiUrl}${endpoint}`

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })

    return response
  } catch (error) {
    logger.error('사용자 정보 조회 실패:', error)
    throw error
  }
}
