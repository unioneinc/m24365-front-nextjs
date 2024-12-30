// src/app/serviceRequest/page.js
'use client'

import React from 'react'
import ServiceRequestView from './ServiceRequestView'
import { SkeletonLoading } from '@/paths'
import { Suspense } from 'react'

export default function ServiceRequestPage() {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <ServiceRequestView />
    </Suspense>
  )
}
