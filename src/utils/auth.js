// src/utils/auth.js
'use server'
import { cookies } from 'next/headers'
export async function syncLocalStorageTokenToCookie() {
  if (typeof window !== 'undefined') {
    // 1. localStorage에서 토큰 읽기
    const token = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')

    if (!token || !userId) {
      console.log('localStorage에 토큰이 없습니다.')
      return false
    }

    try {
      // 2. API 요청을 통해 서버의 쿠키에 설정
      const response = await fetch('/api/auth/setToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token,
          userId: userId
        })
      })

      if (!response.ok) {
        throw new Error('쿠키 설정 실패')
      }

      // 3. 쿠키 설정 확인
      const cookieToken = cookies().get('accessToken')?.value
      const cookieUserId = cookies().get('userId')?.value
      console.log('cookieToken', cookieToken)
      console.log('cookieUserId', cookieUserId)

      return true
    } catch (error) {
      console.error('localStorage 토큰을 쿠키로 동기화 중 오류:', error)
      return false
    }
  }
  return false
}
