// app/lib/api/serverActionWrapper.js
'use client'

import { getAction, postAction, putAction, deleteAction } from '@/app/actions/api'

// 클라이언트에서 토큰을 가져와서 서버 액션을 호출하는 래퍼 함수들
export const withAuth = {
  get: async (url) => {
    const token = localStorage.getItem('accessToken')
    return getAction(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
  },

  post: async (url, data) => {
    const token = localStorage.getItem('accessToken')
    return postAction(url, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
  },

  put: async (url, data) => {
    const token = localStorage.getItem('accessToken')
    return putAction(url, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
  },

  delete: async (url) => {
    const token = localStorage.getItem('accessToken')
    return deleteAction(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
}

// import { withAuth } from '@/app/lib/api/serverActionWrapper'
// const response = await withAuth.get('/api/some-endpoint')
