'use client'
// @ts-nocheck
export const CONTRACT_TYPE = {
  MAINTENANCE: '00701', // 유지보수
  PROJECT: '00702', // 프로젝트
  MATCHING: '00703', // 중계
  PAID: '00704' // 유상
  // REGULAR: '00705', // 정기점검
}

export const CONTRACT_STATUS = {
  WAITING: '00801', // 대기
  APPROVED: '00802', // 승인
  AVAILABLE: '00803', // 유효
  EXPIRED: '00804' // 만료
}

export const CONTRACT_ASSET_TYPE = {
  CONTRACTED: '01901', // 계약체결자산
  ADDITIONAL: '01902' // 체결이후추가자산
}

export const CONTRACT_ASSET_STATUS = {
  AVAILABLE: '02001', // 유효
  INVALIDITY: '02002' // 무효
}

export const CONTRACT_MODIFY_REQUEST = {
  REQUESTED: '05701', // 계약수정요청
  APPROVED: '05702', // 계약수정요청 승인
  REFUSED: '05703', // 계약수정요청 거절
  COMPLETED: '05704' // 계약수정완료
}

export const CONTRACT_RELATED_TARGET = {
  GROUP: '02101', // 그룹
  MEMBER: '02102' // 회원
}

export const CONTRACT_REGULAR_CYCLE = {
  MONTH: '05501', // 월
  QUATER: '05502', // 분기
  HALF_YEAR: '05503' // 반기
}
