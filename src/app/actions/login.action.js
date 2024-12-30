'use server'

import { postLoginApi } from '@/app/utils/auth'
import { logger } from '~/lib/logger'
import { cookies } from 'next/headers'
import { _getBaseUrl } from '@/app/utils/baseUrl'
// import { saveToken } from '@/app/utils/saveToken';
// import { useStore } from '@/stores/storeZustand';

export async function loginUser(formData, token) {
  const id = formData.get('username')
  const password = formData.get('password')
  // const store = useStore();
  // const setAccessToken = store.setAccessToken;

  logger.info('loginUser - formData:', formData)
  logger.info('id:', id)
  logger.info('password:', password)

  if (!id || !password) {
    logger.error('로그인 실패: 아이디 또는 비밀번호가 제공되지 않았습니다.')
    return { success: false, error: '아이디와 비밀번호를 모두 입력해주세요.' }
  }

  logger.info('로그인 시도:', id)

  try {
    const response = await postLoginApi({ mbrId: id, mbrPw: password })

    logger.info('Response Type:', typeof response)
    logger.info('Response Keys:', Object.keys(response || {}))
    logger.info('response in login.action.js rawdata:', response)
    logger.info('Response Token:', response)
    logger.info('로그인 응답:', JSON.stringify(response, null, 2))

    if (response.success) {
      logger.info('                               ')
      logger.info('로그인 성공:', response.token)
      logger.info('                               ')
    }

    if (!response.success) {
      logger.error('로그인 실패:', response.error)
      return { success: false, error: response.error }
    }
    // postLogApi return 값
    // return {
    //     success: true,
    //     message: '로그인 성공',
    //     token: token || '',
    //     ...responseData,
    //   };

    logger.info('response in login.action.js:', response)

    // const token = response.success ? response.token : undefined;

    // const token = 'token' in response ? response.token : undefined;
    //@ts-ignore
    const token = response.success ? response.token : undefined

    // TODO:

    const cookiesStore = await cookies()

    cookiesStore.set('authToken', token || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })

    cookiesStore.set('userId', id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })

    logger.info('로그인 성공')
    return { success: true, message: '로그인 성공', token }
  } catch (error) {
    logger.error('로그인 중 오류 발생:', error)
    return { success: false, error: '로그인 처리 중 오류가 발생했습니다.' }
  }
}
