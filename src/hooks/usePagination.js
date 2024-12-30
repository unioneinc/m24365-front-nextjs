'use client'
import { useMemo, useState } from 'react'

const PAGE_SIZE = 5

function usePagination() {
  // 현재 페이지, 전체 페이지 수, 전체 데이터 수 상태 관리
  const [currentPage, setCurrentPage] = useState(1) // 초기 페이지를 1로 설정
  const [totalPages, setTotalPages] = useState(1) // 초기 전체 페이지 수를 1로 설정
  const [totalCount, setTotalCount] = useState(0) // 초기 전체 데이터 수를 0으로 설정

  /**
   * 외부 데이터로부터 페이지 정보를 설정하는 함수
   * @param {Object} data - 외부로부터 받은 데이터
   * @param {number} data.currentPage - 기본 페이지 번호
   * @param {number} data.totalPages - 전체 페이지 수
   * @param {number} data.totalCount - 전체 데이터 수
   */
  const setPagination = (data) => {
    setCurrentPage(data.currentPage || 1) // 기본값 1 설정
    setTotalPages(data.totalPages || 1) // 기본값 1 설정
    setTotalCount(data.totalCount || 0) // 기본값 0 설정
  }

  /**
   * 특정 페이지로 이동하는 함수
   * @param {number} page - 이동할 페이지 번호
   */
  const goToPage = (page) => {
    // 범위를 벗어나지 않도록 조정
    const targetPage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(targetPage)
  }

  /**
   * 이전 페이지 그룹으로 이동하는 함수
   */
  const goToPrevPage = () => {
    const currentGroup = Math.floor((currentPage - 1) / PAGE_SIZE)
    const prevGroupStart = (currentGroup - 1) * PAGE_SIZE + 1
    goToPage(Math.max(1, prevGroupStart))
  }

  /**
   * 다음 페이지 그룹으로 이동하는 함수
   */
  const goToNextPage = () => {
    const currentGroup = Math.floor((currentPage - 1) / PAGE_SIZE)
    const nextGroupStart = (currentGroup + 1) * PAGE_SIZE + 1
    goToPage(Math.min(nextGroupStart, totalPages))
  }

  /**
   * 첫 페이지로 이동하는 함수
   */
  const goToFirstPage = () => {
    goToPage(1)
  }

  /**
   * 마지막 페이지로 이동하는 함수
   */
  const goToLastPage = () => {
    goToPage(totalPages)
  }

  /**
   * useMemo를 사용하여 현재 페이지와 전체 페이지 수에 따른 페이지 범위를 계산
   */
  const paginationRange = useMemo(() => {
    const pageSize = PAGE_SIZE // 한 번에 표시할 페이지 수
    const currentGroup = Math.floor((currentPage - 1) / pageSize) // 현재 그룹 계산
    const range = []

    const start = currentGroup * pageSize + 1 // 그룹의 시작 페이지
    const end = Math.min(start + pageSize - 1, totalPages) // 그룹의 끝 페이지

    for (let i = start; i <= end; i++) {
      range.push(i)
    }

    return range
  }, [currentPage, totalPages]) // currentPage 또는 totalPages가 변경될 때 재계산

  return {
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
  }
}

export { usePagination }
