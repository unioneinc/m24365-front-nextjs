// src/app/maintenance/page.js

'use client'
// import Maintenance from './Maintenance'
import React from 'react'
import MaintenanceView from './MaintenanceView'
import { SkeletonLoading } from '@/paths'
import { Suspense } from 'react'

export default function MaintenancePage() {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <MaintenanceView />
    </Suspense>
  )
}
