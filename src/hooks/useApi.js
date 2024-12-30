import { useState, useCallback, useRef } from 'react'
import api from '@/utils/api'

const useApi = () => {
  const [apiState, setApiState] = useState({
    loading: false,
    success: false,
    error: null,
    data: null,
    headers: {},
    endpoint: '',
    statusCode: null // 상태코드 - 200 , 401 , 404 , 500 ...
  })

  const stateRef = useRef(apiState)

  const updateState = useCallback((updater) => {
    setApiState((prevState) => {
      const newState = updater(prevState)
      stateRef.current = newState
      return newState
    })
  }, [])

  // 에러 상태 업데이트를 위한 헬퍼 함수
  const setErrorState = useCallback((status, message, endpoint = '') => {
    updateState(() => ({
      loading: false,
      success: false,
      error: {
        status,
        message
      },
      data: null,
      headers: {},
      endpoint,
      statusCode:
        status === 'INVALID_ENDPOINT'
          ? 400
          : status === 'INVALID_METHOD'
            ? 405
            : status === 'NO_RESPONSE'
              ? 503
              : status === 'INVALID_RESPONSE_FORMAT'
                ? 502
                : status === 'UNEXPECTED_ERROR'
                  ? 500
                  : null
    }))
    return stateRef.current
  }, [])

  const request = useCallback(async (method, endpoint, data = {}, token = null) => {
    console.log('In apiHook endpoint', endpoint)

    // endpoint validation
    if (!endpoint) {
      return setErrorState('INVALID_ENDPOINT', 'Endpoint is required')
    }

    // method validation
    method = method.toLowerCase()
    const validMethods = ['get', 'post', 'put', 'delete']
    if (!validMethods.includes(method)) {
      return setErrorState('INVALID_METHOD', `Invalid HTTP method: ${method}`, endpoint)
    }

    // 초기 로딩 상태 설정
    updateState((prevState) => ({
      ...prevState,
      loading: true,
      error: null,
      data: null
    }))

    try {
      // API 호출
      const response = await api[method](
        endpoint,
        method === 'get' || method === 'delete' ? data : data,
        method === 'get' || method === 'delete' ? token : {},
        method === 'get' || method === 'delete' ? undefined : token
      )

      // response 객체 유효성 검사
      if (!response || typeof response !== 'object') {
        return setErrorState('NO_RESPONSE', 'No response received', endpoint)
      }

      const { data: responseData, error: responseError, success, headers, statusCode } = response

      // success 속성 타입 체크
      if (typeof success !== 'boolean') {
        return setErrorState(
          'INVALID_RESPONSE_FORMAT',
          'Invalid response format - success property is missing or invalid',
          endpoint
        )
      }

      // 정상적인 응답 처리
      updateState(() => ({
        loading: false,
        success: success && !responseError,
        error: responseError
          ? {
              status: statusCode,
              message: responseError
            }
          : null,
        data: responseData,
        headers: headers || {},
        endpoint,
        statusCode: statusCode
      }))

      return stateRef.current
    } catch (err) {
      // 예외 처리
      return setErrorState(
        'UNEXPECTED_ERROR',
        err.message || 'An unexpected error occurred',
        endpoint
      )
    }
  }, [])

  return {
    request,
    apiState
  }
}

export { useApi }
