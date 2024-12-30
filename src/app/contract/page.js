'use client'
import ContractView from './ContractView'
import { SkeletonLoading } from '@/paths'
import { Suspense } from 'react'

export default function ContractPage() {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <ContractView />
    </Suspense>
  )
}
