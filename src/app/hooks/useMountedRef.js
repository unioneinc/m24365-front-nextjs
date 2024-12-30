// src/hooks/useMountedRef.js
'use client'

import { useRef, useEffect } from 'react'

export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const runIfMounted = async (callback) => {
    try {
      const result = await callback()
      if (mountedRef.current) {
        return result
      }
    } catch (error) {
      if (mountedRef.current) {
        throw error
      }
    }
  }

  return { runIfMounted }
}
