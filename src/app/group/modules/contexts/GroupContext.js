'use client'

import { createContext, useContext, useState } from 'react'
import { useStore } from '@/stores/storeZustand'
import {
  fetchGroupFilterFirst,
  fetchGroupFilterByPage,
  fetchGroupFilterBySelect
} from '@/app/actions/group/groupFilter'
// import { getSetupTotalcode } from '@/app/group/modules/actions/group.actions'
import { mapGroupTypeToCode, mapStatusToLevel } from '@/app/group/modules/utils/group.utils'
import { getGroupMemberAuthLevel } from '@/app/actions/group/groupAuth'
// import { useModalStore } from '@/stores/modal.store'
// import { AlertDialog } from '@/app/ui/modal/AlertModal'
import { useGroupStore } from '@/stores/groupStore'
import { processGroupList } from '@/app/group/modules/utils/group.utils'
import { useRouter } from 'next/navigation'

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
  error: null,
  mainGroupId: null
}

// Create and export the context
export const GroupContext = createContext()

export const GroupProvider = ({ children }) => {
  const { myInfo } = useStore()
  const router = useRouter()

  const [state, setState] = useState(initialState)

  const actions = {
    setGroupData: (groupList) => setState((prev) => ({ ...prev, groupList })),
    setFilteredGroupList: (filteredGroupList) =>
      setState((prev) => ({ ...prev, filteredGroupList })),
    setTotalCount: (totalCount) => setState((prev) => ({ ...prev, totalCount })),
    setTotalPages: (totalPages) => setState((prev) => ({ ...prev, totalPages })),
    setCurrentPage: (currentPage) => setState((prev) => ({ ...prev, currentPage })),
    setSearchParams: (searchParams) => setState((prev) => ({ ...prev, searchParams })),
    setMainGroup: (mainGroupId) => setState((prev) => ({ ...prev, mainGroupId })),
    setIsLoading: (isLoading) => setState((prev) => ({ ...prev, isLoading })),
    setError: (error) => setState((prev) => ({ ...prev, error })),
    navigateToGroupCreate: () => router.push('/group/create'),
    toggleMainGroup: async (groupId) => {
      try {
        const authLevel = await getGroupMemberAuthLevel(groupId, myInfo?.mbrNo || 0)
        const isCurrentMainGroup = state.mainGroupId === groupId
        actions.setMainGroup(isCurrentMainGroup ? null : groupId)
        setState((prev) => ({
          ...prev,
          filteredGroupList: prev.filteredGroupList.map((item) => ({
            ...item,
            isMainGroup: item.id === groupId ? !isCurrentMainGroup : false
          }))
        }))
        useGroupStore.getState().setMainGroupId(isCurrentMainGroup ? null : groupId)
      } catch (error) {
        console.error('Failed to toggle main group:', error)
        throw error
      }
    },
    handleInvitationAgree: async (groupId, seq) => {
      try {
        // 초대 수락 로직
        console.log('Invitation agreed:', groupId, seq)
      } catch (error) {
        console.error('Failed to agree invitation:', error)
        throw error
      }
    },
    handleInvitationRefuse: async (groupId, seq) => {
      try {
        // 초대 거절 로직
        console.log('Invitation refused:', groupId, seq)
      } catch (error) {
        console.error('Failed to refuse invitation:', error)
        throw error
      }
    }
  }

  const api = {
    fetchDataFirst: async () => {
      actions.setIsLoading(true)
      try {
        const data = await fetchGroupFilterFirst(myInfo?.mbrNo || 0)
        const { GroupList, totalCount, totalPages } = processGroupList(data)
        actions.setGroupData(GroupList)
        actions.setFilteredGroupList(GroupList)
        actions.setTotalCount(totalCount)
        actions.setTotalPages(totalPages)
        actions.setCurrentPage(1)
      } catch (error) {
        console.error('Failed to fetch initial group list:', error)
        actions.setError('그룹 목록을 가져오는 데 실패했습니다.')
      } finally {
        actions.setIsLoading(false)
      }
    },

    fetchDataByFilter: async (groupType, status, searchKeyword) => {
      actions.setIsLoading(true)
      try {
        const data = await fetchGroupFilterBySelect(
          mapGroupTypeToCode(groupType),
          mapStatusToLevel(status),
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

    fetchDataByPage: async (page) => {
      actions.setIsLoading(true)
      try {
        const data = await fetchGroupFilterByPage(
          mapGroupTypeToCode(state.searchParams.groupType),
          mapStatusToLevel(state.searchParams.status),
          state.searchParams.searchKeyword,
          myInfo?.mbrNo || 0,
          page
        )
        const { GroupList, totalCount, totalPages } = processGroupList(data)
        actions.setGroupData(GroupList)
        actions.setFilteredGroupList(GroupList)
        actions.setTotalCount(totalCount)
        actions.setTotalPages(totalPages)
        actions.setCurrentPage(page)
      } catch (error) {
        console.error('Failed to fetch paginated group list:', error)
        actions.setError('페이지별 그룹 목록을 가져오는 데 실패했습니다.')
      } finally {
        actions.setIsLoading(false)
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

// GroupContext.js
export const useGroup = () => {
  const context = useContext(GroupContext)
  if (!context) {
    throw new Error('useGroup must be used within a GroupProvider')
  }
  console.log('useGroup context:', context) // 디버깅 로그 추가
  return context
}
