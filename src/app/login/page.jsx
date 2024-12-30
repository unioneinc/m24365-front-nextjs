// src/app/login/page.js

'use client'

import LoginSection from '@/app/login/LoginSection'
import { useApi } from '@/hooks/useApi'
import { useAuthStore } from '@/stores/modules.zustand/authentication'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { logger } from '~/lib/logger'
import styles from './login.module.scss'
import api from '@/utils/api'

const LoginPage = () => {
  // user Hooks
  const { request, apiState } = useApi()
  const myinfo = useAuthStore((state) => state.myinfo)
  const setMyInfo = useAuthStore((state) => state.setMyInfo)
  // useState
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const [loginUrl, setLoginUrl] = useState('')

  const handleLoginWithAxios = async (data) => {
    console.log('loginWithAxios')

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
    // URL 생성
    const url =
      baseUrl +
      '/login?mbrId=' +
      encodeURIComponent(data.username) +
      '&mbrPw=' +
      encodeURIComponent(data.password)

    console.log('loginUrl', url)

    // 요청 데이터 및 헤더 설정
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json' // 추가
      },
      timeout: 10000,
      withCredentials: false
    }

    try {
      // Axios를 사용한 POST 요청
      const response = await axios.post(url, {}, config) //
      // 응답 상태 및 데이터 출력

      console.log('Axios 응답 상태:', response.status)

      // Authorization 헤더 추출
      const token = response.headers['authorization']
      console.log('Authorization 토큰:', token)

      // 토큰 저장
      if (token) {
        localStorage.setItem('accessToken', token)
      } else {
        console.warn('Authorization 헤더가 응답에 포함되지 않았습니다.')
      }
      console.log('before log response.status')
      console.log('axios response.state:', response.status)
      if (response.status === 200) {
        handleLoginSuccess(response.data)
      }
      return 200
    } catch (error) {
      console.error('로그인 요청 실패:', error)
      // 에러 처리를할 것 -> alert Modal
      throw error
    }
  }

  // const handleLogin = async (data) => {
  //   console.log('handleLogin')
  //   const url = '/login?mbrId=' + encodeURIComponent(data.username) + '&mbrPw=' + encodeURIComponent(data.password)
  //   const resApi = await request('post', '/login', {}, '')
  // }

  const handleLoginSuccess = async (data) => {
    console.log('handleLoginSuccess')
    // console.warn('apiState.headers:', apiState.headers)

    const savedToken = localStorage.getItem('accessToken')
    logger.info('savedToken:', savedToken)
    if (savedToken && savedToken.length > 0) {
      setAccessToken(savedToken)
    }

    //------------------------------------------------------------------------------------------------
    const resApi = await api.get('/member/info', {}, savedToken)
    console.log('LoginPage resApi:', resApi)
    //------------------------------------------------------------------------------------------------

    // myinfo 저장
    setMyInfo(resApi.data)

    // 리다이렉트 처리
    const searchParams = new URLSearchParams(window.location.search)
    const redirectTo = searchParams.get('redirectTo')
    logger.info('리다이렉트 URL:', redirectTo)

    // 리다이렉트 URL이 /login으로 시작하면 홈으로 이동
    const targetUrl = !redirectTo || redirectTo.startsWith('/login') ? '/' : redirectTo
    logger.info('최종 리다이렉트 URL:', targetUrl)

    setIsModalOpen(false)
    router.push(targetUrl)
  }
  const showErrorMessage = (message) => {
    setError(message)
  }

  // useEffect
  useEffect(() => {
    console.log('LoginPage mounted')
  }, [])
  // useApiHooks state 처리
  useEffect(() => {
    if (apiState.success && apiState.data) {
      // 로그인 성공 처리
      handleLoginSuccess(apiState.data)
    } else if (!apiState.loading && apiState.error) {
      // 에러 메시지 표시
      showErrorMessage(apiState.error)
    }
  }, [apiState])
  // useAuthHooks state 처리
  useEffect(() => {
    if (apiState.success && apiState.data) {
      setMyInfo(apiState.data)
    }
    logger.info('login myinfo:', myinfo)
  }, [myinfo, apiState, setMyInfo])

  return (
    <Fragment>
      <div className={styles['login-page']}>
        <div className={styles['bg-section']}>
          <div className={styles['symbolFrame']}>
            <div className={styles['symbolFrame__logo']}>
              <Image src="/images/login/ci.png" alt="ci" width={180} height={36} />
            </div>
            <div className={styles['symbolFrame__title']}>
              <div className={styles['title-text']}>
                <Image src="/images/login/welcome.png" alt="welcome" width={283} height={120} />
              </div>
              <div className={styles['title-text-1']}>
                <Image src="/images/login/message.png" alt="welcome" width={471} height={20} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles['login-section']}>
          <LoginSection onSubmit={handleLoginWithAxios} />
        </div>
      </div>
      {error && <div className={styles['error-message']}>{error}</div>}
    </Fragment>
  )
}

export default LoginPage
