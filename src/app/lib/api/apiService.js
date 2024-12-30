// src/app/lib/api/apiService.js
'use server'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://193.123.248.57:8080'

export const apiService = async function (method, url, data = null, config = {}) {
  console.log('')
  console.log('apiService', method, url, data, config)
  console.log('')
  try {
    // baseURL과 상대경로 조합
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`
    console.log('apiService url:', url)
    // const fullUrl = `${BASE_URL}${url}`

    console.log('API Request:', {
      method,
      url: fullUrl,
      hasData: !!data,
      data,
      config
    })

    const requestConfig = {
      ...config,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      credentials: 'include',
      body: data && typeof data === 'object' ? JSON.stringify(data) : data // 문자열 중복 변환 방지
    }

    // if(data) {
    //   requestConfig.body = JSON.stringify(data)
    // }

    const response = await fetch(fullUrl, requestConfig)
    console.log('apiService response', response)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const result = await response.json()
    console.log('API Response:', result)
    return result
  } catch (error) {
    console.error(`${method} 요청 실패:`, error)
    throw error
  }
}
