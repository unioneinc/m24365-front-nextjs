// GroupData 상수 및 옵션 정의
export const GROUP_TYPE_OPTIONS = [
  { label: '그룹전체', value: '' },
  { label: '회사', value: '00401' },
  { label: '업무', value: '00403' }
]

export const AUTHORITY_LEVEL = {
  MASTER: 1,
  ADMIN: 2,
  MEMBER: 3
}

export const STATUS_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '멤버(Member)', value: String(AUTHORITY_LEVEL.MEMBER) },
  { label: '어드민(Admin)', value: String(AUTHORITY_LEVEL.ADMIN) },
  { label: '마스터(Master)', value: String(AUTHORITY_LEVEL.MASTER) }
]

export const GROUP_TYPE = {
  COMPANY: '00401',
  DEPARTMENT: '00402',
  TASK: '00403',
  VENDOR: '00404',
  PROJECT: '00405'
}

// 위치 매핑 함수
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

// 역할 매핑 함수
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

// 그룹 멤버 상태 코드 매핑
const mapGroupMemberStatusCode = (statusCode) => {
  switch (statusCode) {
    case '01601':
      return '활성'
    case '01604':
      return '대기'
    case '01605':
      return '요청'
    case '01603':
      return '제명'
    default:
      return '기타'
  }
}

// 권한 레벨 매핑
const mapAtLev = (status) => {
  switch (status) {
    case 1:
      return 'master'
    case 2:
      return 'admin'
    case 3:
      return 'member'
    default:
      return 'pending'
  }
}

const mapAtLevText = (status) => {
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

const mapGroupType = (gpTyCd) => {
  switch (gpTyCd) {
    case '00401':
      return '회사'
    case '00402':
      return '부서'
    case '00403':
      return '업무'
    case '00404':
      return '업체'
    case '00405':
      return '프로젝트'
    default:
      return '기타'
  }
}

// 데이터 포맷팅 함수
export const formatGroupData = (data) => {
  if (!data || !Array.isArray(data.items)) {
    throw new Error('데이터 형식이 올바르지 않습니다.')
  }

  const formattedData = data.items.map((item) => ({
    id: item.gpId || 0,
    isMainGroup: item.mainCheck === 'Y',
    company: item.gpComNm || '',
    groupType: mapGroupType(item.gpTyCd || ''),
    groupName: item.gpNm || '',
    groupLeader: item.gpCrtMbrNm || '',
    location: item.gpRgnCdId || '',
    locationText: mapLocation(item.gpRgnCdId || ''),
    managementCode: item.gpMgCd || '',
    myRole: mapMyRole(item.gmbrDutTyCd || ''),
    myRoleText: mapMyRole(item.gmbrDutTyCd || ''),
    level: mapAtLev(item.atLev || 0),
    levelText: mapAtLevText(item.atLev || 0),
    groupMemberStatus: mapGroupMemberStatusCode(item.gmbrStatCd || '')
  }))

  return {
    formattedData,
    totalCount: data.totalCount,
    totalPages: data.totalPages
  }
}
