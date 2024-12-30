'use client'
import React, { useEffect } from 'react'
import { useAuthStore } from '@/stores/modules.zustand/authentication'

const BasicComponent = () => {
  const myinfo = useAuthStore((state) => state.myinfo)

  useEffect(() => {
    console.log('in MainPage myinfo', myinfo)
  }, [myinfo])

  return (
    <div>
      <h1>메인 페이지</h1>
      <p>2024.12.30</p>
      <br />
      <span>
        * 현재 작동 기능
        <br />
        - 로그인 <br />
        - 처음 로그인 시 인증 기능 테스트 <br />
        - 토큰 만료시 로그인 화면으로 redirect 확인 <br />
        <br />
        - 그룹 목록 조회 <br />
        - 그룹 목록 조회 기능 테스트 <br />
        - 페이지네이션 기능 테스트 <br />
        - Dropdown 연동 X <br />
        - Search Box 연동 테스트 <br />
        - 검색 기능 테스트 <br />
        <br />
        - 자산 조회 테스트 <br />
        - Pagination 기능 테스트 <br />
        - Dropdown 연동 X <br />
        - Search Box X <br />
      </span>
    </div>
  )
}

export default BasicComponent
