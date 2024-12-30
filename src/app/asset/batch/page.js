// src/app/asset/batch/page.js
'use client'

import React from 'react'
import AssetBatch from './AssetBatch'
import { SkeletonLoading } from '@/paths'
import { Suspense } from 'react'

export default function AssetBatchPage() {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <AssetBatch />
    </Suspense>
  )
}
