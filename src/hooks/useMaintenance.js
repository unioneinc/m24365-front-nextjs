// src/hooks/useMaintenance.js
'use client'

import api from '@/utils/api'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { logger } from '~/lib/logger'

/**
 * useMaintenance 훅
 * @param {Object} pagination - usePagination 훅에서 반환된 객체
 */
const useMaintenance = (pagination) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [maintenanceList, setMaintenanceList] = useState([])
  const [maintenanceTypeList, setMaintenanceTypeList] = useState([])
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
   * 유지보수 유형 코드 목록 조회
   */
  const fetchCodeList = useCallback(async () => {
    try {
      setIsLoading(true)
      const resApi = await api.get('/setup/totalcode/009', {}, token)
      console.log('Maintenance fetchCodeList resApi', resApi)
      if (resApi.success) {
        setMaintenanceTypeList(resApi.data)
      } else {
        setMaintenanceTypeList([])
      }
    } catch (error) {
      logger.error('fetchCodeList error:', error)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [token])

  /**
   * 유지보수 목록 조회
   * @param {string} mbrNoParam - 회원 번호 파라미터
   */
  const fetchMaintenanceFilter = useCallback(
    async (mbrNoParam) => {
      if (!mbrNoParam) {
        console.warn('fetchMaintenanceFilter called without mbrNoParam')
        return
      }

      try {
        setIsLoading(true)
        const currentPageNumber =
          pagination && pagination.currentPage ? pagination.currentPage - 1 : 0

        const resApi = await api.post(
          '/maintenance/filter',
          {
            check: 'Y',
            columnName: '',
            gpId: null,
            month: '08',
            year: '2024',
            orderType: '',
            page: {
              page: 0,
              size: 10
            },
            search: {
              cris: [
                {
                  value: ''
                }
              ]
            },
            srvStat: null,
            srvTyCdId: null
          },
          {},
          token
        )

        if (resApi && resApi.success && resApi.data) {
          setMaintenanceList(resApi.data.items || [])

          if (pagination && typeof pagination.setPagination === 'function') {
            const pageNumber = resApi.data.page || 0
            pagination.setPagination({
              currentPage: pageNumber + 1,
              totalPages: resApi.data.totalPages || 1,
              totalCount: resApi.data.totalCount || 0
            })
          }
        } else {
          setMaintenanceList([])
        }
      } catch (error) {
        console.error('fetchMaintenanceFilter error:', error)
        setError(error)
        setMaintenanceList([])
      } finally {
        setIsLoading(false)
      }
    },
    [pagination, searchKeyword, token]
  )

  // 유지보수 유형 코드 목록 최초 조회
  useEffect(() => {
    fetchCodeList()
  }, [fetchCodeList])

  // 검색어 디바운스 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(searchKeyword)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchKeyword])

  // 검색어 변경 핸들러
  const handleSearchChange = useCallback((keyword) => {
    setSearchKeyword(keyword)
  }, [])

  return {
    actions: {
      fetchCodeList,
      fetchMaintenanceFilter,
      goToPage,
      goToPrevPage,
      goToNextPage,
      goToFirstPage,
      goToLastPage,
      handleSearchChange
    },
    state: {
      maintenanceTypeList,
      isLoading,
      error,
      maintenanceList,
      currentPage,
      totalPages,
      totalCount,
      paginationRange,
      searchKeyword
    }
  }
}

export { useMaintenance }
