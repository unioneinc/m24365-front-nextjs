import { logger } from '~/lib/logger'

// src/app/utils/saveToken.js
;('use client')

export const saveToken = (token) => {
  logger.info('saveToken 호출 완료')
  try {
    localStorage.setItem('accessToken', token)
  } catch (error) {
    logger.error('saveToken 오류 발생:', error)
  }
}
