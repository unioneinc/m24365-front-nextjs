'use client'

import { createContext, useContext, useState } from 'react'
import { useStore } from '@/stores/storeZustand'
import {
  fetchGroupFilterFirst,
  fetchGroupFilterByPage,
  fetchGroupFilterBySelect
} from '@/app/actions/group/groupFilter'
import { getSetupTotalcode } from '@/app/group/modules/actions/group.actions'
import { mapGroupTypeToCode, mapStatusToLevel } from '@/app/group/modules/utils/group.utils'
import { getGroupMemberAuthLevel } from '@/app/actions/group/groupAuth'
import { useGroupStore } from '@/stores/groupStore'
import { useRouter } from 'next/navigation'

const processGroupList = (data) => {
  if (!data || !data.items) {
    return {
      GroupList: [],
      totalCount: 0,
      totalPages: 0
    }
  }

  const GroupList = data.items.map((item) => ({
    id: item.gpId,
    isMainGroup: false, // 기본값
    company: item.gpComNm || '',
    groupType: item.gpTyCd || '',
    groupName: item.gpNm || '',
    groupLeader: item.gpCrtMbrNm || '',
    location: item.gpRgnCdId || '',
    locationText: item.gpRgnCdId || '',
    managementCode: item.gpMgCd || '',
    myRole: item.gmbrDutTyCd || '',
    myRoleText: item.gmbrDutTyCd || '',
    level: item.atLev || 0,
    levelText: String(item.atLev || ''),
    groupMemberStatus: item.gmbrStatCd || '',
    status: item.gpStatCd || '',
    totGmbrCnt: item.totGmbrCnt || 0
  }))

  return {
    GroupList,
    totalCount: data.totalCount || 0,
    totalPages: data.totalPages || 0
  }
}

const initialState = {
  groupList: [],
  filteredGroupList: [],
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
  searchKeyword: '',
  groupType: '전체',
  status: '전체',
  isLoading: true,
  error: null
}

export const GroupContext = createContext(initialState)

export const GroupProvider = ({ children }) => {
  const { myInfo } = useStore()
  const router = useRouter()

  const [state, setState] = useState({
    groupList: [],
    filteredGroupList: [],
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    searchKeyword: '',
    groupType: '전체',
    groupTypeList: [],
    status: '전체',
    isLoading: true,
    error: null,
    searchParams: {
      groupType: '전체',
      status: '전체',
      keyword: ''
    },
    mainGroupId: null
  })

  const actions = {
    setGroupData: (data) => setState((prev) => ({ ...prev, groupList: data })),
    setFilteredGroupList: (data) => setState((prev) => ({ ...prev, filteredGroupList: data })),
    setCurrentPage: (page) => setState((prev) => ({ ...prev, currentPage: page })),
    setTotalPages: (pages) => setState((prev) => ({ ...prev, totalPages: pages })),
    setTotalCount: (count) => setState((prev) => ({ ...prev, totalCount: count })),
    setSearchKeyword: (keyword) => setState((prev) => ({ ...prev, searchKeyword: keyword })),
    setGroupType: (type) => setState((prev) => ({ ...prev, groupType: type })),
    setStatus: (status) => setState((prev) => ({ ...prev, status: status })),
    setGroupTypeList: (list) => setState((prev) => ({ ...prev, groupTypeList: list })),
    setIsLoading: (loading) => setState((prev) => ({ ...prev, isLoading: loading })),
    setError: (error) => setState((prev) => ({ ...prev, error: error })),
    setSearchParams: (params) => setState((prev) => ({ ...prev, searchParams: params })),
    navigateToGroupCreate: async () => {
      try {
        await router.push('/group/create')
      } catch (error) {
        console.error('그룹 생성 페이지 이동 실패:', error)
      }
    },
    setGroupTypeCodeList: (list) => setState((prev) => ({ ...prev, groupTypeCodeList: list })),
    setMainGroup: async (groupId) => {
      try {
        const authLevel = await getGroupMemberAuthLevel(groupId, myInfo?.mbrNo || 0)
        setState((prev) => ({ ...prev, mainGroupId: groupId }))
        setState((prev) => ({
          ...prev,
          filteredGroupList: prev.filteredGroupList.map((item) => ({
            ...item,
            isMainGroup: item.id === groupId
          }))
        }))
        useGroupStore.getState().setMainGroupId(groupId)
      } catch (error) {
        console.error('Failed to set main group:', error)
        throw error
      }
    },
    handleInvitationAgree: async (groupId, seq) => {
      try {
        await getGroupMemberAuthLevel(groupId, myInfo?.mbrNo || 0)
        setState((prev) => ({
          ...prev,
          filteredGroupList: prev.filteredGroupList.map((group) =>
            group.id === groupId ? { ...group, groupMemberStatus: 'ACTIVE' } : group
          )
        }))
      } catch (error) {
        console.error('Failed to handle invitation agree:', error)
        throw error
      }
    },
    handleInvitationRefuse: async (groupId, seq) => {
      try {
        await getGroupMemberAuthLevel(groupId, myInfo?.mbrNo || 0)
        setState((prev) => ({
          ...prev,
          filteredGroupList: prev.filteredGroupList.filter((group) => group.id !== groupId)
        }))
      } catch (error) {
        console.error('Failed to handle invitation refuse:', error)
        throw error
      }
    },
    openBatchUpload: () => setState((prev) => ({ ...prev, batchUploadOpen: true }))
  }

  const api = {
    fetchCodeList: async () => {
      const response = await getSetupTotalcode('004')
      actions.setGroupTypeList(response)
      actions.setGroupTypeCodeList(response)
      return response
    },

    fetchDataFirst: async () => {
      try {
        actions.setIsLoading(true)
        actions.setError(null)
        const data = await fetchGroupFilterFirst(myInfo?.mbrNo || 0)
        const { GroupList, totalCount, totalPages } = processGroupList(data)
        actions.setGroupData(GroupList)
        actions.setFilteredGroupList(GroupList)
        actions.setTotalCount(totalCount)
        actions.setTotalPages(totalPages)
      } catch (error) {
        console.error('Failed to fetch group list:', error)
        actions.setError('그룹 목록을 가져오는 데 실패했습니다.')
      } finally {
        actions.setIsLoading(false)
      }
    },

    fetchDataByPage: async (pageNumber) => {
      try {
        actions.setIsLoading(true)
        actions.setError(null)
        const data = await fetchGroupFilterByPage(pageNumber, myInfo?.mbrNo || 0)
        const { GroupList, totalCount, totalPages } = processGroupList(data)
        actions.setGroupData(GroupList)
        actions.setFilteredGroupList(GroupList)
        actions.setTotalCount(totalCount)
        actions.setTotalPages(totalPages)
        actions.setCurrentPage(pageNumber)
      } catch (error) {
        console.error('Failed to fetch group list:', error)
        actions.setError('그룹 목록을 가져오는 데 실패했습니다.')
      } finally {
        actions.setIsLoading(false)
      }
    },

    fetchDataByFilter: async (groupType, status, searchString) => {
      try {
        actions.setIsLoading(true)
        actions.setError(null)
        const gpTyCd = mapGroupTypeToCode(groupType)
        const atLev = mapStatusToLevel(status)
        const searchKeyword = searchString !== '' ? searchString : undefined
        const data = await fetchGroupFilterBySelect(
          gpTyCd,
          atLev,
          searchKeyword,
          myInfo?.mbrNo || 0
        )
        const { GroupList, totalCount, totalPages } = processGroupList(data)
        actions.setGroupData(GroupList)
        actions.setFilteredGroupList(GroupList)
        actions.setTotalCount(totalCount)
        actions.setTotalPages(totalPages)
        actions.setCurrentPage(1)
      } catch (error) {
        console.error('Failed to fetch filtered group list:', error)
        actions.setError('필터링된 그룹 목록을 가져오는 데 실패했습니다.')
      } finally {
        actions.setIsLoading(false)
      }
    },

    handleMainGroupToggle: async (groupId, checked) => {
      try {
        const authLevel = await getGroupMemberAuthLevel(groupId, myInfo?.mbrNo || 0)
        setState((prev) => ({ ...prev, mainGroupId: checked ? groupId : null }))
        setState((prev) => ({
          ...prev,
          filteredGroupList: prev.filteredGroupList.map((item) => ({
            ...item,
            isMainGroup: item.id === groupId ? checked : false
          }))
        }))
        useGroupStore.getState().setMainGroupId(groupId)
      } catch (error) {
        console.error('Failed to handle main group toggle:', error)
        throw error
      }
    }
  }

  const value = {
    state,
    actions,
    api
  }

  return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
}

export const useGroup = () => {
  const context = useContext(GroupContext)
  if (!context) {
    throw new Error('useGroup must be used within a GroupProvider')
  }
  return context
}
