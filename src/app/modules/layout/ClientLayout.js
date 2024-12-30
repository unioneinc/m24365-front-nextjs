// src/app/modules/layout/ClientLayout.jsx

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import styles from '@/app/modules/styles/page.module.scss'
import { useAuthStore } from '@/stores/modules.zustand/authentication'
import { DrawerProvider } from '@/app/modules/contexts/DrawerContext'
import { logger } from '~/lib/logger'
import ModalProvider from '@/features/modal/modal-system'
import Header from './Header'
import SkeletonLoading from '@/app/modules/components/skeleton/SkeletonLoading'
import { useApi } from '@/hooks/useApi'
import { syncLocalStorageTokenToCookie } from '@/utils/auth'
// 동적 임포트 컴포넌트들
const DynamicDrawer = dynamic(() => import('@/app/modules/components/ui/Drawer'), {
  ssr: false,
  loading: () => <SkeletonLoading />
})

const DynamicClientSidebar = dynamic(
  () => import('@/app/modules/components/nav/ClientSidebar').then((mod) => mod.ClientSidebar),
  {
    ssr: false,
    loading: () => <SkeletonLoading />
  }
)

const DynamicFooter = dynamic(() => import('./Footer'), {
  ssr: false,
  loading: () => <SkeletonLoading />
})

const ClientLayout = function ({ children }) {
  const myinfo = useAuthStore((state) => state.myinfo)
  const setMyInfo = useAuthStore((state) => state.setMyInfo)
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const { request, apiState } = useApi()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  const initializeComponent = useCallback(async () => {
    if (typeof window === 'undefined') {
      return
    }
    logger.info('ClientLayout 초기화 시작')

    const accessToken = localStorage.getItem('accessToken')
    const authToken = accessToken || ''

    if (authToken) {
      setAccessToken(authToken)
    }

    if (!authToken) {
      logger.warn('토큰 없음')
      router.replace('/login')
    } else {
      //------------------------------------------------------------------------------------------------
      const resApi = await request('get', '/member/info', {}, authToken)
      //------------------------------------------------------------------------------------------------
      console.log('ClientLayout resApi', resApi)
    }
  }, [request, router, setAccessToken])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    initializeComponent()
  }, [])

  useEffect(() => {
    console.log('useApi state', apiState)
    if (apiState && apiState.success) {
      setMyInfo(apiState.data)
      router.replace('/login') // todo 임시 -> 일부러 login 화면으로 redirect
    } else {
      console.log('no token')
      router.replace('/login')
    }
  }, [apiState, router, setMyInfo])

  useEffect(() => {
    if (myinfo) {
      const localToken = localStorage.getItem('accessToken')
      const mbrId = myinfo.mbrId
      localStorage.setItem('userId', mbrId)
      syncLocalStorageTokenToCookie()
    }
    console.log('myinfo in useEffect', myinfo)
  }, [myinfo])

  if (typeof window === 'undefined') {
    return <SkeletonLoading />
  }

  if (!mounted) {
    return <SkeletonLoading />
  }

  // 7. 정상적으로 초기화 완료 시 레이아웃 렌더링
  return (
    <DrawerProvider>
      <ModalProvider>
        <div className={styles.mainPage}>
          <nav className={styles.nav}>
            <DynamicClientSidebar />
          </nav>
          <Suspense
            fallback={
              <div>
                <SkeletonLoading />
              </div>
            }
          >
            <DynamicDrawer />
          </Suspense>
          <header className={styles.header}>
            <Header />
          </header>
          <main className={styles.content}>{children}</main>
          <footer className={styles.footer}>
            <Suspense
              fallback={
                <div>
                  <SkeletonLoading />
                </div>
              }
            >
              <DynamicFooter />
            </Suspense>
          </footer>
        </div>
      </ModalProvider>
    </DrawerProvider>
  )
}

export default ClientLayout
