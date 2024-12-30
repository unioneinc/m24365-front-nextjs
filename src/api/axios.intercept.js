// 'use client'

import originalAxios from 'axios'

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken')
  }
  return null
}

const instance = originalAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
})

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request Details:', {
      fullURL: config.baseURL + config.url,
      endpoint: config.url,
      method: config.method?.toUpperCase(),
      params: config.params,
      requestBody: config.data,
      headers: config.headers
    })

    // localStorage에서 토큰 가져오기
    const token = localStorage.getItem('accessToken')

    if (token) {
      // Bearer 접두사가 없는 경우 추가
      config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`
    } else {
      console.warn('⚠️ No auth token found')

      // 선택적: 공개 경로가 아닌 경우 로그인 페이지로 리다이렉트
      const publicPaths = ['/login', '/signup', '/api/auth/login']
      if (!publicPaths.some((path) => config.url?.startsWith(path))) {
        window.location.href = '/login'
      }
    }

    return config
  },
  (error) => {
    console.error('❌ Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    console.log('✅ API Response Details:', {
      endpoint: response.config.url,
      status: response.status,
      statusText: response.statusText,
      responseData: response.data,
      headers: response.headers
    })
    return response
  },
  (error) => {
    console.error('❌ Response error:', {
      endpoint: error.config?.url,
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data
    })
    return Promise.reject(error)
  }
)

export default instance
export const axios = instance
