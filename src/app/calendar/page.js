// src/app/calendar/page.js
'use client'

import CalendarView from './CalendarView'
import { SkeletonLoading } from '@/paths'
import { Suspense } from 'react'

export default function CalendarPage() {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <CalendarView />
    </Suspense>
  )
}
