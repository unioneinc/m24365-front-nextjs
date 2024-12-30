// src/hooks/useGroup.js
'use client'

import api from '@/utils/api'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { logger } from '~/lib/logger'

/**
 * useAsset 훅
 * @param {Object} pagination - usePagination 훅에서 반환된 객체
 */
const useAsset = (pagination) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [assetList, setAssetList] = useState([])
  const [assetTypeList, setAssetTypeList] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedKeyword, setDebouncedKeyword] = useState('')
  const [asstCateCdList, setAsstCateCdList] = useState([])

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
   * 자산 카테고리 코드 목록 조회
   */
  const fetchAssetCategoryCodeList = useCallback(async () => {
    try {
      setIsLoading(true)
      const resApi = await api.get('/assets/category', {}, token)
      if (resApi.success) {
        setAsstCateCdList(resApi.data)
      } else {
        setAsstCateCdList([])
      }
    } catch (error) {
      logger.error('fetchAssetCategoryCodeList error:', error)
      setError(error)
    } finally {
      setIsLoading(false)
      console.log('fetchAssetCategoryCodeList finally', asstCateCdList)
    }
  }, [token])

  /**
   * 자산 목록 조회
   * @param {string} mbrNoParam - 회원 번호 파라미터
   */
  const fetchAssetFilter = useCallback(
    async (mbrNoParam) => {
      if (!mbrNoParam) {
        console.warn('fetchAssetFilterFirst called without mbrNoParam')
        return
      }

      try {
        setIsLoading(true)
        const currentPageNumber =
          pagination && pagination.currentPage ? pagination.currentPage - 1 : 0

        console.log('fetchAssetFilter currentPageNumber', currentPageNumber)

        const resApi = await api.post(
          '/assets/filter',
          {
            // mbrNo: mbrNoParam,
            // atLev: null,
            // columnName: null,
            // gmbrStatCd: null,
            // gpTyCd: null,
            // orderType: 'DESC',
            // page: {
            //   page: currentPageNumber,
            //   size: 10
            // },
            // search: {
            //   cris: [
            //     {
            //       op: 'LIKE',
            //       value: searchKeyword
            //     }
            //   ]
            // }
            // gpId: null,
            // gpNm: null,
            columnName: '',
            orderType: '',
            year: '2024',
            month: null,
            asstCateCd: null,
            search: {
              cris: [
                {
                  value: ''
                }
              ]
            },
            page: {
              page: currentPageNumber,
              size: 10
            }
          },
          {},
          token
        )

        if (resApi && resApi.success && resApi.data) {
          setAssetList(resApi.data.items || [])
          console.log('fetchAssetFilter resApi.data', resApi.data)
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
          setAssetList([])
        }
      } catch (error) {
        console.error('fetchAssetFilter error:', error)
        setError(error)
        setAssetList([])
      } finally {
        setIsLoading(false)
      }
    },
    [pagination, searchKeyword, token]
  )

  // 그룹 유형 코드 목록 최초 조회
  useEffect(() => {
    fetchAssetCategoryCodeList()
  }, [fetchAssetCategoryCodeList])

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
      fetchAssetCategoryCodeList,
      fetchAssetFilter,
      goToPage,
      goToPrevPage,
      goToNextPage,
      goToFirstPage,
      goToLastPage,
      handleSearchChange
    },
    state: {
      assetTypeList,
      asstCateCdList,
      isLoading,
      error,
      assetList,
      currentPage,
      totalPages,
      totalCount,
      paginationRange,
      searchKeyword
    }
  }
}
export { useAsset }
