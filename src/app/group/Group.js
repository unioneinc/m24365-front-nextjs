'use client'

import { useGroupStore } from '@/stores/modules.zustand/group'
import { useEffect, useState } from 'react'
// import { useGroupHook } from '@/stores/modules.zustand/group'
import { useAuthStore } from '@/stores/modules.zustand/authentication'
// import { useStore } from '@/stores/storeZustand'
import { logger } from '~/lib/logger'
import GroupView from './GroupViewPT'

const Group = () => {
  // const router = useRouter()
  // const { createNewGroup, getSetupTotalcode } = useGroupApi()

  const [mounted, setMounted] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const gpTyCdList = useGroupStore((state) => state.gpTyCdList)
  const groupList = useGroupStore((state) => state.groupList)
  const getMemberInfo = useAuthStore((state) => state.getMemberInfo)
  const setMyinfo = useAuthStore((state) => state.setMyinfo)
  const myinfo = useAuthStore((state) => state.myinfo)
  const setGpTyCdList = useGroupStore((state) => state.setGpTyCdList)
  const fetchCodeList = useGroupStore((state) => state.fetchCodeList)
  const fetchGroupFilterFirst = useGroupStore((state) => state.fetchGroupFilterFirst)

  useEffect(() => {
    fetchCodeList()
  }, [])

  useEffect(() => {
    fetchGroupFilterFirst(myinfo.mbrNo)
  }, [])

  useEffect(() => {
    logger.info('groupList is', groupList)
  }, [groupList])

  const renderContent = () => {
    if (!groupList.length) {
      return <div>데이터를 불러오는 중...</div>
    }
    return <GroupView />
  }

  return <div>{renderContent()}</div>
}

export default Group
