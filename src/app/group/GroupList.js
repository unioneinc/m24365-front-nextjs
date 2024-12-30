import React, { useState, useEffect } from 'react'
// API imports
import {
  getGroupAgreeApi,
  getGroupListApi,
  getGroupMainSelectApi,
  getGroupMemberAuthApi,
  getGroupRefuseApi
} from '@/api/group'
import { getSetupTotalcodeApi } from '@/api/common'
import { callApi } from '@/utils/functions'

// Components
// import MainGroupSelectDialog from '@/components/Common/Dialogs/MainGroupSelectDialog';
// import BatchUploadDialog from '@/components/Common/Dialogs/BatchUploadDialog';
// import BatchUploadResultDialog from '@/components/Common/Dialogs/BatchUploadResultDialog';
// import List from '@/components/Group/List';

// Constants
import { GROUP, MEMBER } from '@/constants'
import { GROUP_MEMBER_STATUS } from '@/constants/group'

const { GROUP_TYPE } = GROUP
const { AUTHORITY_LEVEL } = MEMBER

export default function ListContainer() {
  // Local state
  const [gpTyCdList, setGpTyCdList] = useState([])
  const [groupListData, setGroupListData] = useState(null)
  const [mainGroupData, setMainGroupData] = useState({ items: [] })
  const [listParams, setListParams] = useState({}) // 필요한 초기값 설정

  // API 호출 함수들
  const fetchCodeList = async () => {
    try {
      const response = await getSetupTotalcodeApi('004')
      setGpTyCdList(response)
    } catch (error) {
      console.error('Error fetching code list:', error)
    }
  }

  const fetchGroupList = async () => {
    try {
      const response = await getGroupListApi()
      setGroupListData(response)
    } catch (error) {
      console.error('Error fetching group list:', error)
    }
  }

  const fetchMainGroupList = async () => {
    try {
      const response = await getGroupListApi() // 실제 API로 교체 필요
      setMainGroupData({ items: response })
    } catch (error) {
      console.error('Error fetching main group list:', error)
    }
  }

  useEffect(() => {
    fetchCodeList()
    fetchGroupList()
    fetchMainGroupList()
  }, [])

  // 메인그룹 지정
  const selectMainGroup = async (selected) => {
    try {
      await getGroupMainSelectApi(selected[0].id)
      // 성공 처리 로직
      await fetchGroupList() // 리스트 갱신
    } catch (error) {
      console.error('Error selecting main group:', error)
    }
  }

  // 일괄등록
  const openBatchUploadDialog = () => {
    // 일괄등록 다이얼로그 로직
  }

  // 초대 수락/거절 처리
  const invitationAgree = async (gpId, seq) => {
    try {
      await getGroupAgreeApi(gpId, seq)
      await fetchGroupList()
      // 라우팅 처리 필요
    } catch (error) {
      console.error('Error agreeing to invitation:', error)
    }
  }

  const invitationRefuse = async (gpId, seq) => {
    try {
      await getGroupRefuseApi(gpId, seq)
      await fetchGroupList()
      // 라우팅 처리 필요
    } catch (error) {
      console.error('Error refusing invitation:', error)
    }
  }

  // 행 클릭 처리
  const onRowClick = async (g) => {
    if (g.gpTyCd === GROUP_TYPE.COMPANY) {
      try {
        const memberAuth = await getGroupMemberAuthApi(g.gpId, myinfo.mbrNo)
        if (memberAuth.atLev === AUTHORITY_LEVEL.MASTER) {
          // 라우팅 처리 필요
        } else {
          // 권한 부족 알림 처리 필요
        }
      } catch (error) {
        console.error('Error checking member auth:', error)
      }
    } else {
      // 라우팅 처리 필요
    }
  }

  if (!groupListData) return null

  return (
    <>
      <div>Group List Container</div>
      {/* <List
        gpTyCdList={gpTyCdList}
        data={groupListData}
        param={listParams}
        setParam={setListParams}
        selectMainGroup={selectMainGroup}
        onRowClick={onRowClick}
        fetchData={fetchGroupList}
        openBatchUploadDialog={openBatchUploadDialog}
        invitationAgree={invitationAgree}
        invitationRefuse={invitationRefuse}
        myinfo={myinfo} // myinfo 처리 필요
      /> */}
      {/* <MainGroupSelectDialog />
      <BatchUploadDialog />
      <BatchUploadResultDialog /> */}
    </>
  )
}
