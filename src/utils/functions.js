// src/utils/functions.js
'use client'
import React from 'react'
import { Grid, Typography } from '@mui/material'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { red, grey } from '@mui/material/colors' // _orange, _blue, _green,
// import { openLoadingDialog, closeLoadingDialog, openAlertDialog } from '@/app/modules/common'
// import store, { history } from '@/stores/store'
import {
  CODE_NAME,
  MAINTENANCE,
  ERROR_TEXT,
  ASSET_DELETE_ERROR_TEXT,
  PAID_DELETE_ERROR_TEXT,
  CONTRACT_DELETE_ERROR_TEXT
} from '@/constants'
// import EllipsisTooltip from '@/app/modules/components/Common/Atoms/EllipsisTooltip'
import styled from '@emotion/styled'
import IconBeforeProgress from '@/static/icons'
import IconInProgress from '@/static/icons'
import IconBeforeApproval from '@/static/icons'
import IconApproved from '@/static/icons'
import IconEvaluated from '@/static/icons'
// import { ReactComponent as BeforeProgressIcon } from '@/static/icons/before-progress.svg'
// import { ReactComponent as InProgressIcon } from '@/static/icons/in-progress.svg'
// import { ReactComponent as BeforeApprovalIcon } from '@/static/icons/before-approval.svg'
// import { ReactComponent as ApprovedIcon } from '@/static/icons/approved.svg'
// import { ReactComponent as EvaluatedIcon } from '@/static/icons/evaluated.svg'
//import { sendLog, sendLogConsole } from '@/app/utils/logger'
import { logger } from '~/lib/logger'
import { useRouter } from 'next/router'
import { cookies } from 'next/headers'
export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken')
  } else {
    const cookies = document.cookie
    const accessToken = cookies.split('; ').find((row) => row.startsWith('accessToken='))
    if (accessToken) {
      return accessToken.split('=')[1]
    }
  }
  return ''
}

export async function setLocalTokenToCookie(token, userId) {
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/auth/setToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, userId })
      })

      if (!response.ok) {
        throw new Error('토큰 설정 실패')
      }

      const result = await response.json()
      return result.success
    } catch (error) {
      console.error('쿠키 설정 중 오류 발생:', error)
      throw error
    }
  }
}

const ViewTypography = styled(Typography)`
  color: #424242;
  font-size: 14px;
  font-weight: 400;
`
const { MAINTENANCE_MANAGER_TYPE, MAINTENANCE_STATUS } = MAINTENANCE

export const callApi = async (param) => {
  const {
    api,
    message,
    callback,
    errorCallback,
    errorMessage,
    urls,
    restMethod
    // assetDeleteError = false,
    // paidDeleteError = false,
    // contractDeleteError = false,
    // dialogType,
  } = param

  // const router = useRouter()

  const startTime = new Date().toISOString()
  const apiDetails = api

  try {
    // openLoadingDialog()

    const res = await Promise.all(api)

    // sendLog({
    //   status: 'success',
    //   startTime: new Date().toISOString(),
    //   apiDetails: { url: urls , method: restMethod },
    //   response:  JSON.stringify(res.map(r => r.data)),
    //   errorMessage:'none'
    // });

    sendLogConsole({
      status: 'success',
      startTime: new Date().toISOString(),
      apiDetails: { url: urls, method: restMethod },
      response: JSON.stringify(res.map((r) => r.data)),
      errorMessage: 'none'
    })

    if (message) {
      //   openAlertDialog({
      //     content: message,
      //     callback
      //   })
    } else if (callback) {
      callback(res.map((r) => r.data))
    }
  } catch (e) {
    // console.log('callApi Error ---');
    logger.error('callApi Error ---', e)

    if (e.response) {
      if (e.response.status === 401) {
        // router.push('/login')
      } else if (e.response.status === 403) {
        // router.push('/error403')
      } else if (e.response.status === 500) {
        if (errorMessage && typeof errorMessage === 'function') {
          //   openAlertDialog({
          //     content: errorMessage(e),
          //     callback: () => errorCallback?.(e)
          //   })
        } else {
          //   openAlertDialog({
          //     content: ERROR_TEXT,
          //     callback: () => errorCallback?.(e)
          //   })
        }
      }
    } else {
      logger.error('callApi Error ---', ERROR_TEXT)
      //   openAlertDialog({
      //     content: ERROR_TEXT,
      //     dialogType: 'dialog4',
      //     callback: () => {
      //       if (errorCallback) errorCallback(e)
      //     }
      //   })
    }
  } finally {
    // closeLoadingDialog()
  }
}

// 시간단위변환
export function secondsToHms(d) {
  if (!d) return '-'
  const h = Math.floor(d / 3600)
  const m = Math.ceil((d % 3600) / 60)
  // const s = Math.floor(d % 3600 % 60)

  const hDisplay = h > 0 ? `${h}시간 ` : ''
  const mDisplay = m > 0 ? `${m}분` : ''
  // const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";

  // return hDisplay + mDisplay + sDisplay;
  return hDisplay + mDisplay
}

// 유지보수 디스플레이
// export function calcSrvNm(rowData, flag) {
//   const myMbrNo = store.getState().authentication.myinfo.mbrNo.toString()
//   if (!rowData[flag === 'approver' || flag === 'managerMain' ? 'resMaintenanceManagerList' : flag])
//     return '-'
//   switch (flag) {
//     // 점검유형
//     case 'srvTyCdId':
//       return (
//         <Grid container>
//           {/* <Grid item>{CODE_NAME[rowData.srvTyCdId].replace('점검', '')}</Grid> */}
//           <Grid item>{CODE_NAME[rowData.srvTyCdId]}</Grid>
//           {/* srvReqId 있으면 SR 혹은 유상서비스 */}
//           {rowData.srvReqId &&
//             // paySrvReqTy 있으면 유상서비스
//             (rowData.paySrvReqTy ? (
//               <Grid item>
//                 <AttachMoneyIcon fontSize="small" color="primary" />
//               </Grid>
//             ) : (
//               <Grid item>
//                 <HeadsetMicIcon fontSize="small" color="primary" />
//               </Grid>
//             ))}
//         </Grid>
//       )
//     // 점검제목
//     case 'srvTit':
//       return (
//         <Grid container alignItems="center">
//           <Grid item style={{ width: rowData.srvRptClsDt ? 150 : null }}>
//             <EllipsisTooltip tooltipTitle={rowData.srvTit}>{rowData.srvTit || '-'}</EllipsisTooltip>
//           </Grid>
//           {/* srvRptCrtDt 있으면 케이스오픈된 건 */}
//           {rowData.srvRptClsDt ? (
//             <Grid item style={{ paddingLeft: 5 }}>
//               {/* srvRptClsDt: 9999-12-31 00:00(클로즈전) 실제날짜(클로즈됨) */}
//               <ErrorOutlineIcon
//                 style={{
//                   verticalAlign: 'middle',
//                   color: rowData.srvRptClsDt === '9999-12-31 00:00' ? red[500] : grey[500]
//                 }}
//               />
//               {rowData.srvRptClsDt === '9999-12-31 00:00' ? '(Case Open)' : '(Case Closed)'}
//             </Grid>
//           ) : null}
//         </Grid>
//       )
//     // 승인담당자
//     case 'approver':
//       return (
//         rowData.resMaintenanceManagerList.find(
//           (m) => m.srvTpiTyCd === MAINTENANCE_MANAGER_TYPE.APPROVER
//         )?.gmbrSeqNm || '-'
//       )
//     // 점검담당자(정)
//     case 'managerMain':
//       return (
//         rowData.resMaintenanceManagerList.find(
//           (m) => m.srvTpiTyCd === MAINTENANCE_MANAGER_TYPE.MANAGER_MAIN
//         )?.gmbrSeqNm || '-'
//       )
//     // 점검상태
//     case 'srvStat':
//       return (
//         <Grid container alignItems="center">
//           <ViewTypography>
//             {(rowData.srvStat === MAINTENANCE_STATUS.BEFORE_PROGRESS && (
//               <>
//                 작업대기 <BeforeProgressIcon style={{ marginLeft: '4px' }} />
//               </>
//             )) ||
//               (rowData.srvStat === MAINTENANCE_STATUS.IN_PROGRESS && (
//                 <>
//                   작업진행 <InProgressIcon style={{ marginLeft: '4px' }} />
//                 </>
//               )) ||
//               // 승인전 혹은 반려일때 자기가 승인담당자 혹은 점검담당자(정/부)이면 '완료승인대기' 아니면 '완료보고'
//               ((rowData.srvStat === MAINTENANCE_STATUS.BEFORE_APPROVAL ||
//                 rowData.srvStat === MAINTENANCE_STATUS.REFUSED) &&
//               (rowData.engineerMbrNo === myMbrNo || rowData.managerMbrNo === myMbrNo) ? (
//                 <>
//                   승인대기 <BeforeApprovalIcon style={{ marginLeft: '4px' }} />
//                 </>
//               ) : null) ||
//               ((rowData.srvStat === MAINTENANCE_STATUS.BEFORE_APPROVAL ||
//                 rowData.srvStat === MAINTENANCE_STATUS.REFUSED) &&
//               (rowData.engineerMbrNo !== myMbrNo || rowData.managerMbrNo !== myMbrNo) ? (
//                 <>
//                   승인대기 <BeforeApprovalIcon style={{ marginLeft: '4px' }} />
//                 </>
//               ) : null) ||
//               (rowData.srvStat === MAINTENANCE_STATUS.APPROVED && (
//                 <>
//                   평가대기 <ApprovedIcon style={{ marginLeft: '4px' }} />
//                 </>
//               )) ||
//               (rowData.srvStat === MAINTENANCE_STATUS.EVALUATED && (
//                 <>
//                   완료보고 <EvaluatedIcon style={{ marginLeft: '4px' }} />
//                 </>
//               ))}
//           </ViewTypography>
//         </Grid>
//       )
//     default:
//       return '-'
//   }
// }
//24.08.28
export const getBreakpoint = () => {
  const width = window.innerWidth

  if (width >= 1920) return 'xl'
  if (width >= 1280) return 'desktop'
  if (width >= 1024) return 'laptop'
  if (width >= 960) return 'md'
  if (width >= 640) return 'tablet'
  if (width >= 600) return 'sm'
  return 'xs'
}

export const callApiQuery = async (param) => {
  const { api, message, callback, errorCallback, errorMessage, urls, restMethod } = param

  try {
    openLoadingDialog()
    const res = await Promise.all(api)

    if (message) {
      openAlertDialog({
        content: message,
        callback
      })
    } else if (callback) {
      callback(res.map((r) => r.data))
    }
  } catch (e) {
    console.log(e)
    if (e.response) {
      if (e.response.status === 401) {
        history.push('/login')
      } else if (e.response.status === 403) {
        history.push('/error403')
      } else if (e.response.status === 500) {
        if (errorMessage && typeof errorMessage === 'function') {
          openAlertDialog({
            content: errorMessage(e),
            callback: () => errorCallback?.(e)
          })
        } else {
          openAlertDialog({
            content: ERROR_TEXT,
            callback: () => errorCallback?.(e)
          })
        }
      }
    } else {
      openAlertDialog({
        content: ERROR_TEXT,
        dialogType: 'dialog4',
        callback: () => {
          if (errorCallback) errorCallback(e)
        }
      })
    }
  } finally {
    closeLoadingDialog()
  }
}
