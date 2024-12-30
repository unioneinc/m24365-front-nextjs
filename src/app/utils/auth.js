// src/app/utils/auth.js
'use server'

import { logger } from '~/lib/logger'

// export function getBaseUrl() {
//   return process.env.NEXT_PUBLIC_API_URL || ''
// }

async function postLoginApi({ mbrId, mbrPw }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
  if (!apiUrl) {
    logger.warn('NEXT_PUBLIC_API_URL이 설정되지 않았습니다.')
    return { success: false, error: 'API URL이 설정되지 않았습니다.' }
  }

  const fullUrl = `${apiUrl}/login?mbrId=${encodeURIComponent(mbrId)}&mbrPw=${encodeURIComponent(mbrPw)}`
  logger.info('Attempting API call to:', fullUrl.replace(mbrPw, '****'))

  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    logger.info('API Response Status:', response.status)
    logger.info('API Response Headers:', Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    logger.info('API Response Body:', responseText)

    // 토큰 추출 (대소문자 구분 없이)
    const token = response.headers.get('authorization') || response.headers.get('Authorization')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    let responseData = {}
    if (responseText && responseText.trim()) {
      try {
        responseData = JSON.parse(responseText)
      } catch (e) {
        logger.error('JSON Parsing Error:', e)
        responseData = { rawResponse: responseText }
      }
    }

    return {
      success: true,
      message: '로그인 성공',
      token: token || '',
      ...responseData
    }
  } catch (error) {
    logger.error('Login API Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '로그인 실패'
    }
  }
}

export { postLoginApi }
