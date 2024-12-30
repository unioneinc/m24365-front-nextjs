'use client'
// @ts-nocheck
export const GROUP_TYPE = {
  COMPANY: '00401', // 회사
  DEPARTMENT: '00402', // 부서
  WORK: '00403', // 업무
  PROJECT: '00404', // 프로젝트
  CUSTOMER: '00405', // 고객사
  PARTNER: '00406' // 거래처
}

export const GROUP_STATUS = {
  AVAILABLE: '00501', // 유효
  INVALIDITY: '00502', // 무효
  CLOSURE: '00503' // 폐쇄
}

export const GROUP_REGION = {
  SEOUL: '05201',
  GYEONGGI: '05202',
  INCHEON: '05203',
  GANGWON: '05204',
  CHUNGNAM: '05205',
  DAEJEON: '05206',
  CHUNGBUK: '05207',
  SEJONG: '05208',
  BUSAN: '05209',
  ULSAN: '05210',
  DAEGU: '05211',
  GYEONGBUK: '05212',
  GYEONGNAM: '05213',
  JEONNAM: '05214',
  GWANGJU: '05215',
  JEONBUK: '05216',
  JEJU: '05217'
}

export const GROUP_MEMBER_TYPE = {
  LEADER: '01501', // 그룹장
  MEMBER: '01502' // 그룹원
}

export const GROUP_MEMBER_STATUS = {
  AVAILABLE: '01601', // 유효
  INVALIDITY: '01602', // 무효
  SECESSION: '01603', // 탈퇴
  WAITING: '01604', // 대기
  REQUEST: '01605' // 요청
}

export const GROUP_MEMBER_DUTY_TYPE = {
  CEO: '01701', // 회사대표
  TEAM_LEADER: '01704', // 팀장
  TEAM_MEMBER: '01705', // 팀원
  PROJECT_MANAGER: '01706', // 프로젝트담당자
  WORK_MANAGER: '01707', // 업무담당자
  INTEGRATED_MAINTENANCE_SUPERVISOR: '01708', // 통합유지보수관리자
  INTEGRATED_MAINTENANCE_MANAGER: '01709', // 통합유지보수담당자
  MAINTENANCE_MANAGER_MAIN: '01710', // 유지보수담당자(정)
  MAINTENANCE_MANAGER_SUB: '01711', // 유지보수담당자(부)
  MAINTENANCE_MANAGER_APPROVER: '01712' // 유지보수관리자(승인담당자)
}

export const REFERENCE_GROUP_TYPE = {
  UPPER: '01801', // 상위그룹
  COOPERATION: '01802' // 협력그룹
}

export const REFERENCE_GROUP_STATUS = {
  AVAILABLE: '03401', // 유효
  INVALIDITY: '03402' // 무효
}
