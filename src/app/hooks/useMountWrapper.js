// hooks/useMountWrapper.js
'use client'

import { useRef, useEffect } from 'react'
import { MountWrapper } from '@/app/utils/MountWrapper'

export const useMountWrapper = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return new MountWrapper(mountedRef)
}
