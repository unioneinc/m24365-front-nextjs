// src/app/actions/member/memberInfo.js

'use server'

// import { apiService } from '@/app/lib/api/apiService'
import { logger } from '~/lib/logger'
import { getAction } from '@/app/actions/api'

/**
 * 사용자 정보를 조회하는 함수
 * @returns Promise 사용자 정보
 * @throws Error API 호출 실패시 에러
 */
export async function fetchMemberInfo() {
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL
  // if (!apiUrl) {
  //   throw new Error('API URL이 환경 변수에 정의되지 않았습니다.')
  // }

  // const endpoint = '/member/info'
  // const url = `${apiUrl}${endpoint}`

  try {
    const response = await getAction('/member/info')
    console.log('getMemberInfo response', response)
    return response
  } catch (error) {
    logger.error('사용자 정보 조회 실패:', error)
    throw error
  }
}

/**
 * 사용자 정보를 조회하고 에러 처리하는 래퍼 함수
 * @returns Promise
 */
export async function getMemberInfo() {
  try {
    const memberInfo = await fetchMemberInfo()
    return memberInfo
  } catch (error) {
    logger.error('사용자 정보 조회 중 오류 발생:', error)
    return null
  }
}
