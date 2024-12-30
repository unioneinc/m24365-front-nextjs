// app/api/auth/setToken/route.js
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { token, userId } = await request.json()

  // 서버 사이드에서 쿠키 설정
  cookies().set('accessToken', token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development',
    secure: false, // 개발 환경에서 쿠키 설정
    sameSite: 'strict',
    path: '/'
  })

  cookies().set('userId', userId, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development',
    secure: false, // 개발 환경에서 쿠키 설정
    sameSite: 'strict',
    path: '/'
  })

  return NextResponse.json({ success: true })
}
