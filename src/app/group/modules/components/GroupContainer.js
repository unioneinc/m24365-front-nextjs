'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// import { useModalStore } from '@/stores/modal.store'
// import { useStore } from '@/stores/storeZustand'
import { useAuthStore } from '@/stores/modules.zustand/authentication'
// import { GROUP_TYPE } from '@/constants/group'
// import { getGroupMemberAuthLevel } from '@/app/actions/group/groupAuth'
// import { AlertModal } from '@paths'
// import GroupView from './GroupView'
// import { useGroupStore } from '@/stores/groupStore'
// import { useGroup } from '@/app/group/modules/contexts/GroupContext'

const GroupContainer = () => {
  const { myinfo } = useAuthStore()
  // const { myInfo } = useStore()
  const router = useRouter()
  // const { openModal } = useModalStore()
  // const { setCurrentGroupList } = useGroupStore()

  // const {
  //   state: {
  //     filteredGroupList,
  //     currentPage,
  //     totalPages,
  //     totalCount,
  //     searchParams,
  //     mainGroupId,
  //     isLoading
  //   },
  //   api: { fetchDataFirst, fetchDataByFilter, fetchDataByPage }
  // } = useGroup()

  // const { actions } = useGroup()

  // useEffect(() => {
  //   fetchDataFirst()
  // }, [])

  // const handleSearch = (newParams) => {
  //   actions.setSearchParams(newParams)
  //   fetchDataByFilter(newParams.groupType, newParams.status, newParams.keyword)
  // }

  // const handlePageChange = (page) => {
  //   fetchDataByPage(page)
  // }

  // const showAlert = (title, message, type) => {
  //   openModal({
  //     component: AlertModal,
  //     props: { title, message, type }
  //   })
  // }

  // const handleTableRowClick = async (group) => {
  //   try {
  //     if (group.groupType === GROUP_TYPE.COMPANY) {
  //       if (!myInfo?.mbrNo) {
  //         console.error('사용자 정보가 없습니다')
  //         return
  //       }

  //       const memberAuth = await getGroupMemberAuthLevel(group.id, myInfo.mbrNo)

  //       if (memberAuth === 'MASTER') {
  //         await setCurrentGroupList(group)
  //         router.push(`/group/${group.id}`)
  //       } else {
  //         showAlert('권한 알림', 'Master 권한이 필요합니다!', 'warning')
  //       }
  //     } else {
  //       await setCurrentGroupList(group)
  //       router.push(`/group/${group.id}`)
  //     }
  //   } catch (error) {
  //     console.error('그룹 상세 페이지 이동 실패:', error)
  //     showAlert('오류', '그룹 조회 중 오류가 발생했습니다.', 'error')
  //   }
  // }

  // const handleExcelDownload = () => {
  //   try {
  //     // 엑셀 다운로드 로직...
  //   } catch (error) {
  //     console.error('엑셀 다운로드 실패:', error)
  //     showAlert('오류', '엑셀 파일 다운로드에 실패했습니다.', 'error')
  //   }
  // }

  // const handleMainGroupSelect = async (groupId) => {
  //   try {
  //     await actions.setMainGroup(groupId)
  //     showAlert('성공', '메인 그룹이 지정되었습니다', 'success')
  //   } catch (error) {
  //     console.error('메인 그룹 지정 실패:', error)
  //     showAlert('오류', '메인 그룹 지정 중 오류가 발생했습니다', 'error')
  //   }
  // }

  // const handleInvitationResponse = async (groupId, seq, accept) => {
  //   try {
  //     if (accept) {
  //       await actions.handleInvitationAgree(groupId, seq)
  //       showAlert('성공', '그룹 초대를 수락했습니다', 'success')
  //     } else {
  //       await actions.handleInvitationRefuse(groupId, seq)
  //       showAlert('성공', '그룹 초대를 거절했습니다', 'success')
  //     }
  //     await fetchDataFirst()
  //   } catch (error) {
  //     console.error('초대 응답 처리 실패:', error)
  //     showAlert('오류', '처리 중 오류가 발생했습니다', 'error')
  //   }
  // }

  // const handleMainGroupToggle = async (groupId) => {
  //   try {
  //     await actions.toggleMainGroup(groupId)
  //     await fetchDataFirst()
  //     showAlert('성공', '메인 그룹이 변경되었습니다', 'success')
  //   } catch (error) {
  //     console.error('메인 그룹 토글 실패:', error)
  //     showAlert('오류', '메인 그룹 토글 중 오류가 발생했습니다', 'error')
  //   }
  // }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>GroupView</div>
        // <GroupView
        //   filteredGroupList={filteredGroupList}
        //   currentPage={currentPage}
        //   totalPages={totalPages}
        //   totalCount={totalCount}
        //   searchParams={searchParams}
        //   onTableRowClick={handleTableRowClick}
        //   onGroupTypeChange={(value) => handleSearch({ ...searchParams, groupType: value })}
        //   onStatusChange={(value) => handleSearch({ ...searchParams, status: value })}
        //   onSearchChange={(value) => handleSearch({ ...searchParams, keyword: value })}
        //   onPageChange={handlePageChange}
        //   onExcelDownload={handleExcelDownload}
        //   onGroupRegister={actions.navigateToGroupCreate}
        //   mainGroupId={mainGroupId}
        //   onMainGroupToggle={handleMainGroupToggle}
        // />
      )}
    </div>
  )
}

export default GroupContainer
