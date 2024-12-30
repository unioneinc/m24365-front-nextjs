// utils/api.js
// import { logger } from '~/lib/logger'

const requestApi = async (
  endpoint,
  { method = 'GET', headers = {}, body = null } = {},
  token = ''
) => {
  try {
    let authToken = token

    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      ...headers
    }

    if (authToken && typeof authToken === 'string' && authToken.trim().length > 0) {
      if (!authToken.startsWith('Bearer ')) {
        authToken = `Bearer ${authToken}`
      }
      defaultHeaders['Authorization'] = authToken
    }

    const config = {
      method,
      headers: defaultHeaders,
      body: body && typeof body === 'object' ? JSON.stringify(body) : body
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
    const totalUrl = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`

    console.log('API 요청:', {
      url: endpoint,
      options: config,
      token: authToken
    })

    //-------------------------------------------------------------
    const response = await fetch(totalUrl, config)
    //-------------------------------------------------------------

    console.log('fetch 응답 상태:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      headers: Object.fromEntries(response.headers.entries())
    })

    const contentType = response.headers.get('content-type')
    console.log('Content-Type:', contentType)
    console.log('api.js response', response)
    // console.log('@@ api.js response headers', response.headers)

    // 응답 처리를 구조화된 형태로 변경
    const responseHeaders = Object.fromEntries(response.headers.entries())
    // const responseHeaders = response.headers
    // console.warn('api.js responseHeaders token', responseHeaders.get('authorization'))
    const accessToken = responseHeaders['authorization']
    console.log('api.js responseHeaders ')
    console.log('api.js responseHeaders token', accessToken)

    if (contentType && contentType.includes('text/html')) {
      const textData = await response.text()
      return {
        data: textData,
        error: null,
        success: true,
        headers: responseHeaders,
        endpoint: endpoint,
        statusCode: response.status
      }
    }

    if (contentType.includes('application/json')) {
      const jsonData = await response.json()
      return {
        data: jsonData,
        error: null,
        success: true,
        headers: responseHeaders,
        endpoint: endpoint,
        statusCode: response.status
      }
    }

    return {
      data: null,
      error: `지원하지 않는 content-type입니다: ${contentType}`,
      success: false,
      headers: responseHeaders,
      endpoint: endpoint,
      statusCode: response.status
    }
  } catch (error) {
    console.error('API 요청 실패:', error)
    return {
      data: null,
      error: error.message || 'unknown error occurred in api.js',
      success: false,
      headers: {},
      endpoint: endpoint,
      statusCode: response.status
    }
  }
}

const api = {
  get: (endpoint, headers = {}, token = null) =>
    requestApi(endpoint, { method: 'GET', headers }, token),

  post: (endpoint, data, headers = {}, token = null) =>
    requestApi(endpoint, { method: 'POST', body: data, headers }, token),

  put: (endpoint, data, headers = {}, token = null) =>
    requestApi(endpoint, { method: 'PUT', body: data, headers }, token),

  delete: (endpoint, headers = {}, token = null) =>
    requestApi(endpoint, { method: 'DELETE', headers }, token)
}

export default api

//예시코드
// pages/some-page.js
//import { requestApi } from '~/utils/api'

export function ApiUsePage() {
  if (typeof window !== 'undefined') {
    const fetchData = async () => {
      try {
        //------------------------------------------------------------------------------------------------
        const token = 'your-auth-token' // 예시 토큰
        const result = await requestApi(
          '/api/users',
          {
            method: 'GET',
            headers: {
              'Custom-Header': 'value'
            }
          },
          token
        )
        //------------------------------------------------------------------------------------------------
        if (result.success) {
          console.log('데이터:', result.data)
        } else {
          console.error('에러:', result.error)
        }
      } catch (error) {
        console.error('요청 실패:', error)
      }
    }
  }

  // 컴포넌트 내용...
}

// components/UserList.js
//import api from '~/utils/api'

export function ApiUseComponent() {
  if (typeof window !== 'undefined') {
    const getUsers = async () => {
      //------------------------------------------------------------------------------------------------
      const token = localStorage.getItem('accessToken')
      const result = await api.get('/api/users', {}, token)
      //------------------------------------------------------------------------------------------------

      if (result.success) {
        return result.data
      }
      throw new Error(result.error)
    }
  }

  // 컴포넌트 내용...
}
