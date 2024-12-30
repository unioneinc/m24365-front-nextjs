'use server'

import { Agent } from 'undici'
import { redirect } from 'next/navigation'

const dispatcher = new Agent({
  connect: {
    rejectUnauthorized: false
  }
})

async function apiService(url, options = {}) {
  const { method = 'GET', body, headers = {}, revalidate = 0, retries = 2 } = options

  const defaultHeaders = {
    'Content-Type': 'application/json'
  }

  const mergedHeaders = { ...defaultHeaders, ...headers }
  let lastError = null

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const cacheBuster = revalidate ? `${url.includes('?') ? '&' : '?'}_=${Date.now()}` : ''
      const fetchOptions = {
        method,
        headers: mergedHeaders,
        body: body ? JSON.stringify(body) : undefined,
        next: revalidate ? { revalidate } : undefined
      }

      if (process.env.NODE_ENV === 'development') {
        fetchOptions.dispatcher = dispatcher
      }

      const response = await fetch(`${url}${cacheBuster}`, fetchOptions)

      if (!response.ok) {
        const errorBody = await response.text()

        if (response.status === 401) {
          redirect('/login')
        }

        throw new Error(`API 호출 실패: ${response.status} ${response.statusText}\n${errorBody}`)
      }

      const contentType = response.headers.get('content-type')
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text()

      return { data, status: response.status }
    } catch (error) {
      lastError = error
      if (attempt === retries) {
        console.error('API 호출 중 최종 오류:', {
          url,
          method,
          attempt: attempt + 1,
          error: lastError
        })
        throw lastError
      }
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000))
    }
  }

  throw lastError
}

async function apiServiceGeneric(url, options = {}) {
  const { method = 'GET', body, headers = {}, revalidate = 0, retries = 2, params } = options

  const defaultHeaders = {
    'Content-Type': 'application/json'
  }

  const mergedHeaders = { ...defaultHeaders, ...headers }
  let lastError = null

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const cacheBuster = revalidate ? `${url.includes('?') ? '&' : '?'}_=${Date.now()}` : ''
      const fetchOptions = {
        method,
        headers: mergedHeaders,
        body: body ? JSON.stringify(body) : undefined,
        next: revalidate ? { revalidate } : undefined,
        params
      }

      if (process.env.NODE_ENV === 'development') {
        fetchOptions.dispatcher = dispatcher
      }

      const response = await fetch(`${url}${cacheBuster}`, fetchOptions)

      if (!response.ok) {
        const errorBody = await response.text()

        if (response.status === 401) {
          redirect('/login')
        }

        throw new Error(`API 호출 실패: ${response.status} ${response.statusText}\n${errorBody}`)
      }

      const contentType = response.headers.get('content-type')
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text()

      return { data, status: response.status }
    } catch (error) {
      lastError = error
      if (attempt === retries) {
        console.error('API 호출 중 최종 오류:', {
          url,
          method,
          attempt: attempt + 1,
          error: lastError
        })
        throw lastError
      }
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000))
    }
  }

  throw lastError
}

// 사용 예시
export async function getUserProfile() {
  const response = await apiService('https://api.example.com/user/profile')
  return response.data
}

export async function createPost(postData) {
  const response = await apiService('https://api.example.com/posts', {
    method: 'POST',
    body: postData
  })
  return response.data
}

export { apiService, apiServiceGeneric }
