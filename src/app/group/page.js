// src/app/group/page.js
'use client'

import React from 'react'
import GroupView from './GroupView'

// import Group from './Group'

// import { GroupProvider } from './modules/contexts/GroupContext'
// import GroupContainer from './modules/components/GroupContainer'
// import GroupView from './modules/components/GroupView'
import { SkeletonLoading } from '@/paths'
import { Suspense } from 'react'

const GroupPage = () => {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <GroupView />
    </Suspense>
  )
}

export default GroupPage
