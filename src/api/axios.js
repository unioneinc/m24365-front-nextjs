'use client'
import axios from 'axios'

// 기본 axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 요청 인터셉터를 사용해 Authorization 헤더를 동적으로 추가
instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = token
    }
  }
  return config
})

export default instance
