'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { create } from 'zustand'
// import List from '@/components/Maintenance/List'
// import ListWeb from '@/components/Maintenance/_ListWeb'
// import ListMobile from '@/components/Maintenance/_ListMobile'
import { getSetupTotalcodeApi } from '@/api/common'
import { callApi } from '@/utils/functions'
// import ExcelDownloadDialog, { useExcelDialogOpen } from '@/components/ExcelDownloadDialog'

export default function Maintenance() {
  return <div>Maintenance</div>
}

// Zustand store 생성
// const useMaintenanceStore = create((set) => ({
//   data: null,
//   param: {},
//   viewMode: 'list',
//   setData: (data) => set({ data }),
//   setParam: (param) => set({ param }),
//   toggleViewMode: () =>
//     set((state) => ({
//       viewMode: state.viewMode === 'list' ? 'grid' : 'list'
//     })),
//   fetchMaintenanceList: async () => {
//     // API 호출 로직 구현
//     const response = await fetch('/api/maintenance/list')
//     const data = await response.json()
//     set({ data })
//   }
// }))

// const headers = [
//   {
//     id: 'srvTyCdId',
//     label: '구분'
//   },
//   {
//     id: 'srvTit',
//     label: '제목'
//   }
//   // ... 나머지 headers 동일
// ]

// const excludes = [
//   {
//     id: 'startEv',
//     label: '출동시간(점)'
//   }
//   // ... 나머지 excludes 동일
// ]

// const emptyIsNull = (text) => (text?.length === 0 ? null : text)

// export default function Maintenance() {
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   const { data, param, setParam, fetchMaintenanceList, toggleViewMode } = useMaintenanceStore()
//   const [srvTyCdIdList, setSrvTyCdIdList] = useState([])
//   const [isOpenExcelDialog, xlsDownload, closeExcelDialog] = useExcelDialogOpen()

//   const fetchCodeList = () =>
//     callApi({
//       api: [getSetupTotalcodeApi('009')],
//       callback: ([res]) => setSrvTyCdIdList(res),
//       urls: '/setup/totalcode/009',
//       restMethod: 'GET'
//     })

//   useEffect(() => {
//     const params = {}
//     searchParams.forEach((value, key) => {
//       if (key === 'search') {
//         params[key] = { cris: [{ value }] }
//       } else {
//         params[key] = value
//       }
//     })
//     setParam({ ...param, ...params })
//     fetchCodeList()
//     fetchMaintenanceList()
//   }, [searchParams])

//   if (!data) return null

//   return (
//     <>
//       <List
//         srvTyCdIdList={srvTyCdIdList}
//         data={data}
//         param={param}
//         setParam={setParam}
//         fetchData={fetchMaintenanceList}
//         xlsDownload={xlsDownload}
//         onClickToggleViewMode={toggleViewMode}
//       />
//       <ExcelDownloadDialog
//         thing="점검 목록"
//         headers={headers}
//         excludes={excludes}
//         open={isOpenExcelDialog}
//         onClose={closeExcelDialog}
//         param={{
//           ...param,
//           type: 's',
//           year: param.year === '전체' ? null : param.year?.toString(),
//           month: param.month === '전체' ? null : param.month,
//           srvTyCdId: emptyIsNull(param.srvTyCdId),
//           srvStat: emptyIsNull(param.srvStat)
//         }}
//       />
//     </>
//   )
// }
