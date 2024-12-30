// src/app/group/member/page.js
'use client'

import React from 'react'
import GroupMemberView from './GroupMemberView'
import { SkeletonLoading } from '@/paths'
import { Suspense } from 'react'

const GroupMemberPage = () => {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <GroupMemberView />
    </Suspense>
  )
}

export default GroupMemberPage
