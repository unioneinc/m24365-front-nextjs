import { GROUP_MEMBER_DUTY_TYPE } from '@/types/v2/group'
// import { GroupList, ResGroupListResponse, GroupLevel } from '@/app/group/modules/types/group.types'
import { CODE_NAME } from '@/constants'
import { GROUP_TYPE, AUTHORITY_LEVEL } from '@/app/group/modules/types/group.types'

export const getGroupNameByCode = (code) => {
  return CODE_NAME[code] || '기타'
}

export const mapLocation = (gpRgnCdId) => {
  switch (gpRgnCdId) {
    case '05201':
      return '서울'
    case '05202':
      return '경기'
    case '05203':
      return '인천'
    case '05204':
      return '강원'
    case '05205':
      return '충남'
    case '05206':
      return '대전'
    case '05207':
      return '충북'
    case '05208':
      return '세종'
    case '05209':
      return '부산'
    case '05210':
      return '울산'
    case '05211':
      return '대구'
    case '05212':
      return '경북'
    case '05213':
      return '경남'
    case '05214':
      return '전남'
    case '05215':
      return '광주'
    case '05216':
      return '전북'
    case '05217':
      return '제주'
    default:
      return '기타'
  }
}

// 나머지 함수들 통합
export const mapMyRole = (gmbrDutTyCd) => {
  switch (gmbrDutTyCd) {
    case GROUP_MEMBER_DUTY_TYPE.CEO:
      return '회사대표'
    case GROUP_MEMBER_DUTY_TYPE.TEAM_LEADER:
      return '팀장'
    case GROUP_MEMBER_DUTY_TYPE.TEAM_MEMBER:
      return '팀원'
    case GROUP_MEMBER_DUTY_TYPE.PROJECT_MANAGER:
      return '프로젝트담당자'
    case GROUP_MEMBER_DUTY_TYPE.WORK_MANAGER:
      return '업무담당자'
    case GROUP_MEMBER_DUTY_TYPE.INTEGRATED_MAINTENANCE_SUPERVISOR:
      return '통합유지보수관리자'
    case GROUP_MEMBER_DUTY_TYPE.INTEGRATED_MAINTENANCE_MANAGER:
      return '통합유지보수담당자'
    case GROUP_MEMBER_DUTY_TYPE.MAINTENANCE_MANAGER_MAIN:
      return '유지보수담당자(정)'
    case GROUP_MEMBER_DUTY_TYPE.MAINTENANCE_MANAGER_SUB:
      return '유지보수담당자(부)'
    case GROUP_MEMBER_DUTY_TYPE.MAINTENANCE_MANAGER_APPROVER:
      return '유지보수관리자(승인담당자)'
    default:
      return '기타'
  }
}
export const GROUP_MEMBER_STATUS = {
  AVAILABLE: '01601', // 유효
  INVALIDITY: '01602', // 무효
  SECESSION: '01603', // 탈퇴
  WAITING: '01604', // 대기
  REQUEST: '01605' // 요청
}

export const mapGroupMemberStatusCode = (statusCode) => {
  switch (statusCode) {
    case GROUP_MEMBER_STATUS.AVAILABLE:
      return 'AVAILABLE'
    case GROUP_MEMBER_STATUS.INVALIDITY:
      return 'INVALIDITY'
    case GROUP_MEMBER_STATUS.SECESSION:
      return 'SECESSION'
    case GROUP_MEMBER_STATUS.WAITING:
      return 'WAITING'
    case GROUP_MEMBER_STATUS.REQUEST:
      return 'REQUEST'
    default:
      return '기타'
  }
}

export const mapAtLev = (status) => {
  switch (status) {
    case 1:
      return 'master'
    case 2:
      return 'admin'
    case 3:
      return 'member'
    default:
      return 'pending' // 기본값
  }
}

export const mapAtLevText = (status) => {
  switch (status) {
    case 1:
      return '마스터(Master)'
    case 2:
      return '어드민(Admin)'
    case 3:
      return '맴버(Member)'
    default:
      return '대기(Pending)'
  }
}

export const mapAuthToText = (auth) => {
  switch (auth) {
    case 'ROLE_ADMIN':
      return 'Admin'
    case 'ROLE_MEMBER':
      return 'Member'
    default:
      return 'Master'
  }
}

export const mapStatusToLevel = (status) => {
  switch (status) {
    case '마스터(Master)':
      return AUTHORITY_LEVEL.MASTER
    case '어드민(Admin)':
      return AUTHORITY_LEVEL.ADMIN
    case '멤버(Member)':
      return AUTHORITY_LEVEL.MEMBER
    case '전체':
      return 0
    default:
      return 0 // 기본값
  }
}

export const mapGroupTypeToCode = (groupType) => {
  switch (groupType) {
    case '회사':
      return GROUP_TYPE.COMPANY
    case '부서':
      return GROUP_TYPE.DEPARTMENT
    case '업무':
      return GROUP_TYPE.TASK
    case '업체':
      return GROUP_TYPE.VENDOR
    case '프로젝트':
      return GROUP_TYPE.PROJECT
    case '전체':
      return ''
    default:
      return '' // 기본값
  }
}

// 반대로 코드를 그룹타입 문자열로 변환하는 기존 함수도 상수를 사용하도록 수정
export const mapGroupType = (gpTyCd) => {
  switch (gpTyCd) {
    case GROUP_TYPE.COMPANY:
      return '회사'
    case GROUP_TYPE.DEPARTMENT:
      return '부서'
    case GROUP_TYPE.TASK:
      return '업무'
    case GROUP_TYPE.VENDOR:
      return '업체'
    case GROUP_TYPE.PROJECT:
      return '프로젝트'
    default:
      return '기타'
  }
}

// API함수를 처리하여 그룹리스트을 생성하는 함수
export const processGroupList = (data) => {
  if (!data || !Array.isArray(data.items)) {
    throw new Error('데이터 형식이 올바르지 않습니다.')
  }

  export const GroupList = data.items.map((item) => ({
    id: item.gpId || 0, // 그룹식별번호
    isMainGroup: item.mainCheck === 'Y', // 메인 그룹 여부
    company: item.gpComNm || '', // 회사그룹 이름
    groupType: mapGroupType(item.gpTyCd || ''), // 그룹유형코드의 매핑된 문자열 값
    groupName: item.gpNm || '', // 그룹 이름
    groupLeader: item.gpCrtMbrNm || '', // 그룹 생성 회원 이름
    location: item.gpRgnCdId || '', // 그룹 지역 코드
    locationText: mapLocation(item.gpRgnCdId || ''), // 그룹 지역 텍스트
    managementCode: item.gpMgCd || '', // 그룹 관리 코드
    myRole: mapMyRole(item.gmbrDutTyCd || ''), // 나의 담당업무
    myRoleText: mapMyRole(item.gmbrDutTyCd || ''), // 나의 담당업무 텍스트
    level: mapAtLev(item.atLev || 0), // 그룹 레벨  '1' master '2'
    levelText: mapAtLevText(item.atLev || 0), // 그룹 레벨 텍스트
    groupMemberStatus: mapGroupMemberStatusCode(item.gmbrStatCd || ''), // 그룹관계자 상태코드 -> 권한관련 코드
    status: mapGroupMemberStatusCode(item.gmbrStatCd || '') // 추가된 필드
  }))

  return {
    GroupList,
    totalCount: data.totalCount,
    totalPages: data.totalPages
  }
}
