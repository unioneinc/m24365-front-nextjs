// src/app/maintenance/regular/page.js
'use client'
import React from 'react'
import MaintenanceRegular from './MaintenanceRegular'
import { SkeletonLoading } from '@/paths'
import { Suspense } from 'react'

export default function MaintenanceRegularPage() {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      {' '}
      <MaintenanceRegular />
    </Suspense>
  )
}
