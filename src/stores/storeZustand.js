import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
// import { _logger } from '~/lib/logger'
import { produce } from 'immer'
// import _ from 'lodash'
import { fetchMemberInfo } from '@/app/actions/member/memberInfo'

// isMember 유틸리티 함수
const isMember = (member) => {
  return member.mbrNo !== undefined
}

// GroupMemberListItem을 SelectedGroupMemberItem으로 변환하는 유틸리티 함수
const convertToSelectedMember = (member) => {
  return {
    id: isMember(member) ? String(member.mbrNo) : String(member.tempSeq || ''),
    username: member.mbrId || '',
    name: member.name || '',
    phone: member.cell || '',
    email: member.email || '',
    role: member.gmbrDutTyCd || 'MEMBER'
  }
}

export const useStore = create(
  devtools((set, get) => ({
    // 초기 상태
    myInfo: null,
    accessToken: null,
    currentGroup: null,
    SelectMemberList: [],
    groupMemberList: [],

    // 사용자 정보 관련 액션
    fetchMyInfo: async () => {
      console.log('useStore:fetchMyInfo before call')
      try {
        const memberInfo = await fetchMemberInfo()
        set(
          produce((state) => {
            state.myInfo = memberInfo
          })
        )
        get()
        // console.log('useStore:fetchMyInfo', memberInfo,state.myInfo) // todo : 틀린 코드
        // 상태 업데이트 후 현재 상태를 가져오기 위해 get() 사용
        // const currentState = get()
        // console.log('useStore:fetchMyInfo', memberInfo, currentState.myInfo)
      } catch (_error) {
        // _logger.error('사용자 정보 조회 실패:', _error)
        set(
          produce((state) => {
            state.myInfo = null
          })
        )
      }
    },

    // 그룹 관련 액션
    setCurrentGroup: (group) => {
      set(
        produce((state) => {
          state.currentGroup = group
        })
      )
      get()
    },

    // 멤버 관리 액션들
    addSelectedMember: (member) => {
      set(
        produce((state) => {
          const selectedMember = convertToSelectedMember(member)
          state.SelectMemberList = _.unionBy([...state.SelectMemberList, selectedMember], 'id')
        })
      )
      get()
    },

    removeSelectedMember: (id) => {
      set(
        produce((state) => {
          state.SelectMemberList = _.reject(state.SelectMemberList, ['id', id])
        })
      )
      get()
    },

    clearSelectedMembers: () =>
      set(
        produce((state) => {
          state.SelectMemberList = []
        })
      ),

    setSelectedMembers: (members) => {
      set(
        produce((state) => {
          state.SelectMemberList = members
        })
      )
      get()
    },

    // 상태 설정 액션들
    setMyInfo: (info) => {
      set(
        produce((state) => {
          state.myInfo = info
        })
      )
      get()
    },

    setGroupMemberList: (members) => {
      set(
        produce((state) => {
          state.groupMemberList = members
        })
      )
      get()
    },

    setAccessToken: (token) => {
      // _logger.info('useStore:setAccessToken:Access Token:', token) // token을 확인하기 위한 console.log
      set(
        produce((state) => {
          state.accessToken = token
        })
      )
      get()
    }
  }))
)
