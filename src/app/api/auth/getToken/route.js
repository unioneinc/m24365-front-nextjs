import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const token = cookies().get('accessToken')?.value
  const userId = cookies().get('userId')?.value
  return NextResponse.json({ token, userId })
}
