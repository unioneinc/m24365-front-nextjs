'use client'
import React from 'react'
import PaidService from './PaidService'
import { SkeletonLoading } from '@/paths'
import { Suspense } from 'react'

export default function PaidServicePage() {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <PaidService />
    </Suspense>
  )
}
