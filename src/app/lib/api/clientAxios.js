// app/lib/api/clientAxios.js
'use client'

import axios from 'axios'

// 클라이언트 사이드 axios 인스턴스 생성
const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://193.123.248.57:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// 요청 인터셉터 - 토큰 추가
clientAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 응답 인터셉터 - 에러 처리
clientAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 인증 에러 처리
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default clientAxios
