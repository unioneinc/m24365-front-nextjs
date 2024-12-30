// app/contract/Contract.js
'use client'

import React, { useEffect } from 'react'
// import List from '@/components/Contract/List'
import { getSetupTotalcodeApi } from '@/api/common'
import { callApi } from '@/utils/functions'
// import ExcelDownloadDialog, { crisToString, useExcelDialogOpen } from '../ExcelDownloadDialog'
import { create } from 'zustand'

// excel 출력 항목 정의
const headers = [
  { id: 'conTyCdId', label: '계약유형' },
  { id: 'conNm', label: '계약명' },
  { id: 'mbrNm', label: '등록자' },
  { id: 'gpNm', label: '그룹명' },
  { id: 'conSgDate', label: '계약체결일' },
  { id: 'conStDate', label: '시작일' },
  { id: 'conEdDate', label: '종료일' },
  { id: 'conAm', label: '금액(원)' },
  { id: 'ccmNm', label: '담당업체' },
  { id: 'rckCnt', label: '점검횟수' },
  { id: 'asstCnt', label: '자산개수' }
]

const excludes = [
  { id: 'conChkCylCd', label: '점검주기' },
  { id: 'gpRgnCdId', label: '소속지역' },
  { id: 'gpMgCd', label: '관리코드' },
  { id: 'conCt', label: '내용' }
]

// Zustand store 생성
const useContractStore = create((set) => ({
  data: null,
  param: {
    page: { page: 1 }
  },
  conTyCdIdList: [],
  setData: (data) => set({ data }),
  setParam: (param) => set({ param }),
  setConTyCdIdList: (list) => set({ conTyCdIdList: list }),
  fetchContractListData: async () => {
    // API 호출 로직 구현
    // const response = await fetchAPI()
    // set({ data: response })
  }
}))

export default function ListContainer() {
  // const { data, param, conTyCdIdList, setParam, setConTyCdIdList, fetchContractListData } =
  //   useContractStore()

  // const fetchCodeList = () =>
  //   callApi({
  //     api: [getSetupTotalcodeApi('007')],
  //     callback: ([res]) => setConTyCdIdList(res),
  //     urls: '/setup/totalcode/007',
  //     restMethod: 'GET'
  //   })

  // useEffect(() => {
  //   console.log('Contract List Container Mounted -------------------------------------------')
  //   fetchCodeList()
  // }, [])

  // useEffect(() => {
  //   setParam((prevParam) => ({
  //     ...prevParam,
  //     page: {
  //       ...prevParam.page,
  //       page: 1
  //     }
  //   }))
  // }, [])

  // useEffect(() => {
  //   console.log('Fetching contract list data Calling -------------------------------------------')
  //   fetchContractListData()
  // }, [param])

  // const [excelDialogOpen, xlsDownload, closeExcelDialog] = useExcelDialogOpen()

  if (!data) return null

  return (
    <>
      <div>Contract</div>
      {/* <List
        conTyCdIdList={conTyCdIdList}
        data={data}
        param={param}
        setParam={setParam}
        fetchData={fetchContractListData}
        xlsDownload={xlsDownload}
      /> */}
      {/* <ExcelDownloadDialog
        thing="계약 목록"
        open={excelDialogOpen}
        headers={headers}
        excludes={excludes}
        param={{
          ...param,
          type: 'c',
          conTyCdId: param.conTyCdId ? crisToString(param.conTyCdId) : null,
          month: param.month === '전체' ? null : param.month,
          year: param.year === '전체' ? null : param.year?.toString()
        }}
        onClose={closeExcelDialog}
      /> */}
    </>
  )
}
