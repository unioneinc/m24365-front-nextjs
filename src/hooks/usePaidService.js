// src/hooks/usePaidService.js
'use client'

import api from '@/utils/api'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { logger } from '~/lib/logger'

/**
 * usePaidService 훅
 * @param {Object} pagination - usePagination 훅에서 반환된 객체
 */
const usePaidService = (pagination) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [paidServiceList, setPaidServiceList] = useState([])
  const [paidServiceTypeList, setPaidServiceTypeList] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedKeyword, setDebouncedKeyword] = useState('')

  const {
    currentPage,
    totalPages,
    totalCount,
    paginationRange,
    setPagination,
    goToPage,
    goToPrevPage,
    goToNextPage,
    goToFirstPage,
    goToLastPage
  } = pagination

  const router = useRouter()

  // 클라이언트 사이드에서만 localStorage 접근
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || '' : ''

  // 로그인 토큰 유효성 검사 및 리다이렉션
  useEffect(() => {
    if (!token || token.length === 0) {
      router.push('/login')
    }
  }, [token, router])

  /**
   * 유료 서비스 유형 코드 목록 조회
   */
  const fetchCodeList = useCallback(async () => {
    try {
      setIsLoading(true)
      const resApi = await api.get('/setup/totalcode/004', {}, token)
      if (resApi.success) {
        setPaidServiceTypeList(resApi.data)
      } else {
        setPaidServiceTypeList([])
      }
    } catch (error) {
      logger.error('fetchCodeList error:', error)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [token])

  /**
   * 유료 서비스 목록 조회
   */
  const fetchPaidServiceFilter = useCallback(
    async (mbrNoParam) => {
      if (!mbrNoParam) {
        console.warn('fetchPaidServiceFilter called without mbrNoParam')
        return
      }

      try {
        setIsLoading(true)
        const currentPageNumber =
          pagination && pagination.currentPage ? pagination.currentPage - 1 : 0

        const resApi = await api.post(
          '/paid-service/filter',
          {
            mbrNo: mbrNoParam,
            atLev: null,
            columnName: null,
            paidServiceStatCd: null,
            paidServiceTyCd: null,
            orderType: 'DESC',
            page: {
              page: currentPageNumber,
              size: 10
            },
            search: {
              cris: [
                {
                  op: 'LIKE',
                  value: searchKeyword
                }
              ]
            }
          },
          {},
          token
        )

        if (resApi && resApi.success && resApi.data) {
          setPaidServiceList(resApi.data.items || [])

          // pagination 객체가 존재하고 setPagination 함수가 있는 경우에만 실행
          if (pagination && typeof pagination.setPagination === 'function') {
            const pageNumber = resApi.data.page || 0
            pagination.setPagination({
              currentPage: pageNumber + 1,
              totalPages: resApi.data.totalPages || 1,
              totalCount: resApi.data.totalCount || 0
            })
          }
        } else {
          setPaidServiceList([])
        }
      } catch (error) {
        console.error('fetchPaidServiceFilter error:', error)
        setError(error)
        setPaidServiceList([])
      } finally {
        setIsLoading(false)
      }
    },
    [pagination, searchKeyword, token]
  )

  // 유료 서비스 유형 코드 목록 최초 조회
  useEffect(() => {
    fetchCodeList()
  }, [fetchCodeList])

  // 검색어 디바운스 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(searchKeyword)
    }, 500) // 500ms 후에 검색 실행

    return () => clearTimeout(timer)
  }, [searchKeyword])

  // 검색어 변경 핸들러
  const handleSearchChange = useCallback((keyword) => {
    setSearchKeyword(keyword)
  }, [])

  return {
    actions: {
      fetchCodeList,
      fetchPaidServiceFilter,
      goToPage,
      goToPrevPage,
      goToNextPage,
      goToFirstPage,
      goToLastPage,
      handleSearchChange
    },
    state: {
      paidServiceTypeList,
      isLoading,
      error,
      paidServiceList,
      currentPage,
      totalPages,
      totalCount,
      paginationRange,
      searchKeyword
    }
  }
}
export { usePaidService }
