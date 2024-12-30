'use server'

import { cookies } from 'next/headers'
import { apiService } from './apiService'
import { getAction, postAction } from '@/app/actions/api'
import { redirect } from 'next/navigation'

// 회원 정보 조회
export async function getMemberInfo() {
  try {
    // const response = await apiService('/member/info', {
    //   method: 'GET'
    // })
    console.log('getMemberInfo before getAction')
    const response = await getAction('/member/info')
    console.log('getMemberInfo after getAction', response)
    return { success: true, data: response.data }
  } catch (error) {
    console.log('getMemberInfo error', error)
    return { success: false, error: error.message }
  }
}

// 로그인
export async function login(mbrId, mbrPw) {
  try {
    // const response = await apiService(
    //   `/login?mbrId=${encodeURIComponent(mbrId)}&mbrPw=${encodeURIComponent(mbrPw)}`,
    //   {
    //     method: 'POST'
    //   }
    // )
    console.log('login before postAction')
    const response = await postAction(
      `/login?mbrId=${encodeURIComponent(mbrId)}&mbrPw=${encodeURIComponent(mbrPw)}`,
      null
    )
    console.log('login after postAction', response)

    // 토큰 저장
    cookies().set('authToken', response.data.token)
    cookies().set('userId', mbrId)

    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// 로그아웃
export async function logout() {
  try {
    // await apiService('/logout', {
    //   method: 'GET'
    // })
    await getAction('/logout')

    // 토큰 삭제
    cookies().delete('authToken')
    cookies().delete('userId')

    redirect('/login')
  } catch (error) {
    return { success: false, error: error.message }
  }
}
