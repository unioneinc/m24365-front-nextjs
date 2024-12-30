// src/app/layout.js

// import { useState, useEffect } from 'react'
import { Roboto } from 'next/font/google'
import '../styles/globals.css'
// import { logger } from '~/lib/logger'
import ThemeRegistry from '@/app/modules/theme/ThemeRegistry'
// import LoginPage from '@/app/login/page'
import ClientLayout from '@/app/modules/layout/ClientLayout'
// import { SkeletonLoading } from '@/paths'
// import NotFound from './not-found'
import { cookies } from 'next/headers'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})

export default function MainLayout({ children }) {
  const accessToken = cookies().get('accessToken')
  const userId = cookies().get('userId')

  return (
    <html lang="ko" className={roboto.variable}>
      <body suppressHydrationWarning>
        <ThemeRegistry>
          {/* {!isAuthenticated ? (
            <LoginPage />
          ) : (
            <ClientLayout accessToken={accessToken} userId={userId}>
              {children}
            </ClientLayout>
          )} */}
          {/* <ClientLayout accessToken={accessToken} userId={userId}> */}
          <ClientLayout>{children}</ClientLayout>
        </ThemeRegistry>
      </body>
    </html>
  )
}
