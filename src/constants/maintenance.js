'use client'
// @ts-nocheck
export const MAINTENANCE_TYPE = {
  REGULAR: '00901', // 정기점검
  WORK: '00902', // 작업점검
  FAIL: '00903', // 장애점검
  ASSET: '00000' // 자산통계(자산관리)
}

export const MAINTENANCE_STATUS = {
  BEFORE_PROGRESS: '01007', // 대기
  IN_PROGRESS: '01008', // 진행
  BEFORE_APPROVAL: '01010', // 완료승인요청
  REFUSED: '01011', // 반려
  APPROVED: '01012', // 승인
  EVALUATED: '01015' // 평가완료
}

export const MAINTENANCE_IMPORTANCE_TYPE = {
  UPPER: '03301', // 상
  MIDDLE: '03302', // 중
  LOWER: '03303' // 하
}

export const MAINTENANCE_LOG_TYPE = {
  MODIFY: '01102', // 일정변경
  REGIST: '01105', // 점검등록
  START: '01107', // 작업시작
  COMPLETE: '01109', // 작업완료
  APPROVAL: '01106' // 완료전달
}

export const MAINTENANCE_LOG_STATE = {
  REQUEST: '01201', // 요청
  REFUSE: '01202', // 반려
  APPROVE: '01203', // 승인
  WORK: '01204', // 작업
  MODIFY: '01205' // 수정
}

export const MAINTENANCE_ASSET_STATUS = {
  WAITING: '01301', // 대기
  PROGRESS: '01302', // 진행
  COMPLETE: '01303', // 완료
  REGIST: '01304' // 등록
}

export const MAINTENANCE_MANAGER_TYPE = {
  APPROVER: '01401', // 승인담당자
  REFERRER: '01402', // 참조자(비회원)
  MANAGER_MAIN: '01403', // 점검담당자(정)
  MANAGER_SUB: '01404' // 점검담당자(부)
}

export const MAINTENANCE_FAIL_TYPE = {
  EMERGENCY: '03501', // 긴급장애
  NORMAL: '03502' // 일반장애
}

export const SERVICE_REQUEST_STATUS = {
  WAITING: '04401', // 요청대기
  BEFORE_PROGRESS: '04402', // 작업대기
  IN_PROGRESS: '04403', // 작업진행
  COMPLETED: '04404', // 작업완료
  CLOSED: '04405', // 종결
  REFUSED: '04406' // 요청반려
}
