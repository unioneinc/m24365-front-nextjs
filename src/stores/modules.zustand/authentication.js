// src/stores/modules.zustand/authentication.js

'use client'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { logger } from '~/lib/logger'
import { getAction } from '@/app/actions/api'
import { produce } from 'immer' // Immer의 produce 함수 직접 임포트
import axios from '@/api/axios'

export const useAuthStore = create((set, get) => ({
  // 초기 상태 정의
  loggedIn: -1,
  myinfo: null,
  isLoading: false,
  error: null,
  accessToken: null,

  // 상태 업데이트 액션

  // 단순 상태 업데이트 예시
  setTemp: () => {
    set(
      produce((state) => {
        state.temp = {
          prop1: 'value1',
          prop2: 'value2'
        }
      })
    )
  },

  // 사용자 정보 설정
  setMyInfo: (response) => {
    console.log('in useAuthStore setMyInfo', response)
    set(
      produce((state) => {
        state.myinfo = response
      })
    )
  },

  // 액세스 토큰 설정
  setAccessToken: (token) => {
    set(
      produce((state) => {
        state.accessToken = token
      })
    )
  },

  // 로그인 액션
  login: async (mbrId, mbrPw) => {
    try {
      // 로딩 상태 활성화
      set(
        produce((state) => {
          state.isLoading = true
        })
      )

      logger.info('로그인 시도 중...')

      // 로그인 API 호출
      const response = await axios.get(
        `/login?mbrId=${encodeURIComponent(mbrId)}&mbrPw=${encodeURIComponent(mbrPw)}`,
        null
      )
      logger.info('로그인 응답:', response)

      if (!response) throw new Error('유효하지 않은 응답입니다.')

      const accessToken = response.accessToken
      const memberInfo = response.memberInfo

      // localStorage에 토큰 및 사용자 정보 저장
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('myInfo', JSON.stringify(memberInfo))

      // 상태 업데이트
      set(
        produce((state) => {
          state.accessToken = accessToken
          state.myinfo = memberInfo
          state.loggedIn = 1
          state.isLoading = false
        })
      )

      return {
        success: true,
        data: response
      }
    } catch (apiError) {
      logger.error('로그인 실패:', apiError)
      set(
        produce((state) => {
          state.isLoading = false
          state.error = apiError.message || '로그인에 실패했습니다.'
        })
      )
      return {
        success: false,
        error: apiError.message || '로그인에 실패했습니다.'
      }
    }
  },

  // 로그아웃 액션
  logout: () => {
    // localStorage에서 토큰 및 사용자 정보 제거
    localStorage.removeItem('accessToken')
    localStorage.removeItem('myInfo')

    // 상태 초기화
    set(
      produce((state) => {
        state.loggedIn = 0
        state.myinfo = null
        state.isLoading = false
        state.accessToken = null
        state.error = null
      })
    )
  }
}))
