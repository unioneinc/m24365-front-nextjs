import PropTypes from 'prop-types'

// 그룹 레벨 타입 상수
export const GROUP_LEVEL = {
  MASTER: 'master',
  ADMIN: 'admin',
  MEMBER: 'member',
  PENDING: 'pending'
}

/**
 * 그룹 목록 페이지네이션 응답 타입
 */
export const ResGroupListResponse = PropTypes.shape({
  items: PropTypes.arrayOf(
    PropTypes.shape({
      // ResGroupList 타입 정의는 아래에서 import
    })
  ),
  offset: PropTypes.number, // 오프셋
  page: PropTypes.number, // 현재 페이지
  size: PropTypes.number, // 페이지 크기
  totalCount: PropTypes.number, // 전체 데이터 수
  totalPages: PropTypes.number // 전체 페이지 수
})

// ResGroupList 타입
export const ResGroupList = PropTypes.shape({
  gpId: PropTypes.number, // 그룹식별번호
  gpNm: PropTypes.string, // 그룹이름
  gpTyCd: PropTypes.string, // 그룹유형코드
  gpCrtDate: PropTypes.string, // 그룹생성일자 (yyyy-MM-dd 형식)
  gpStatCd: PropTypes.string, // 그룹상태코드
  totGmbrCnt: PropTypes.number, // 총그룹관계자수
  gpCrtMbrNo: PropTypes.number, // 그룹생성회원
  gpCrtMbrNm: PropTypes.string, // 그룹생성회원이름 -> 그룹장
  gmbrSeq: PropTypes.number, // 그룹관계자순번
  gmbrStatCd: PropTypes.string, // 그룹관계자상태코드
  gmbrDutTyCd: PropTypes.string, // 그룹관계자직책구분코드
  countWaitMem: PropTypes.number, // 그룹대기인원
  groupRef: PropTypes.string, // 상위참조그룹
  gpRgnCdId: PropTypes.string, // 그룹지역코드
  gpMgCd: PropTypes.string, // 그룹관리코드
  deptStatus: PropTypes.string, // 부서장유무
  gpCom: PropTypes.string, // 회사그룹
  gpComNm: PropTypes.string, // 회사그룹이름
  atLev: PropTypes.number, // 권한
  mainCheck: PropTypes.oneOf(['Y', 'N']) // 메인그룹여부체크값 (Y/N)
})

export const GroupList = PropTypes.shape({
  id: PropTypes.number.isRequired, // 그룹식별번호
  isMainGroup: PropTypes.bool.isRequired, // 메인 그룹 여부
  company: PropTypes.string.isRequired, // 회사그룹 이름
  groupType: PropTypes.string.isRequired, // 그룹유형코드의 매핑된 문자열 값
  groupName: PropTypes.string.isRequired, // 그룹 이름
  groupLeader: PropTypes.string.isRequired, // 그룹 생성 회원 이름
  location: PropTypes.string.isRequired, // 그룹 지역 코드
  locationText: PropTypes.string.isRequired, // 그룹 지역 텍스트
  managementCode: PropTypes.string.isRequired, // 그룹 관리 코드
  myRole: PropTypes.string.isRequired, // 나의 담당업무
  myRoleText: PropTypes.string.isRequired, // 나의 담당업무 텍스트
  level: PropTypes.oneOf(Object.values(GROUP_LEVEL)).isRequired, // 그룹 레벨
  levelText: PropTypes.string.isRequired, // 그룹 레벨 텍스트
  groupMemberStatus: PropTypes.string.isRequired, // 그룹관계자 상태코드
  status: PropTypes.string.isRequired, // 추가된 필드
  totGmbrCnt: PropTypes.number // 총 그룹 멤버 수
})

/**
 * 그룹 멤버 목록 타입
 */
export const GroupMember = PropTypes.shape({
  atLev: PropTypes.number.isRequired, // 권한
  cell: PropTypes.string.isRequired, // 연락처
  email: PropTypes.string.isRequired, // 이메일
  gmbrDutPrior: PropTypes.string.isRequired, // 그룹 관계자 직책 우선순위
  gmbrDutTyCd: PropTypes.string.isRequired, // 그룹 관계자 직책 구분 코드
  gmbrSeq: PropTypes.number.isRequired, // 그룹 멤버 시퀀스
  gmbrStatCd: PropTypes.string.isRequired, // 그룹 멤버 상태 코드
  gmbrTyCd: PropTypes.string.isRequired, // 그룹 멤버 유형 코드
  gpCom: PropTypes.number.isRequired, // 회사 그룹
  mbrId: PropTypes.string.isRequired, // 회원 ID
  mbrNo: PropTypes.number.isRequired, // 회원 번호
  mgrTyCd: PropTypes.string.isRequired, // 관리자 유형 코드
  name: PropTypes.string.isRequired, // 이름
  shrChk: PropTypes.string.isRequired // 공유 여부
})

/**
 * 자산 목록 타입
 */
export const Asset = PropTypes.shape({
  asstCateCd: PropTypes.string.isRequired, // 자산 분류 코드
  asstCateCdNm: PropTypes.string.isRequired, // 자산 분류 코드명
  asstCrlNo: PropTypes.string.isRequired, // 자산 관리 번호
  asstCrtMbrNm: PropTypes.string.isRequired, // 자산 생성자 이름
  asstCrtMbrNo: PropTypes.number.isRequired, // 자산 생성자 번호
  asstId: PropTypes.number.isRequired, // 자산 ID
  asstLoct: PropTypes.string.isRequired, // 자산 위치
  asstMdNm: PropTypes.string.isRequired, // 자산 모델명
  asstMk: PropTypes.string.isRequired, // 자산 제조사
  asstNm: PropTypes.string.isRequired, // 자산명
  asstOwnsGpId: PropTypes.number.isRequired, // 자산 소유 그룹 ID
  asstOwnsGpNm: PropTypes.string.isRequired, // 자산 소유 그룹명
  asstStatCd: PropTypes.string.isRequired, // 자산 상태 코드
  companyNm: PropTypes.string.isRequired, // 회사명
  lastChgDt: PropTypes.string.isRequired // 최종 변경일
})

// 상수 정의
export const GROUP_MEMBER_DUTY = {
  MASTER: 'MASTER',
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER'
}

export const AUTHORITY_LEVEL = {
  NONE: 0,
  READ: 1,
  WRITE: 2,
  ADMIN: 3,
  MASTER: 4,
  MEMBER: 5
}

export const GROUP_TYPE = {
  COMPANY: '00401',
  DEPARTMENT: '00402',
  TASK: '00403',
  VENDOR: '00404',
  PROJECT: '00405'
}

// 그룹 상태 관련 타입들
export const GroupState = PropTypes.shape({
  filteredGroupList: PropTypes.arrayOf(GroupList),
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  searchParams: PropTypes.shape({
    groupType: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    keyword: PropTypes.string.isRequired
  }),
  mainGroupId: PropTypes.number
})

export const GroupAPI = PropTypes.shape({
  fetchDataFirst: PropTypes.func.isRequired,
  fetchDataByFilter: PropTypes.func.isRequired,
  fetchDataByPage: PropTypes.func.isRequired,
  handleMainGroupToggle: PropTypes.func.isRequired
})

export const GroupPresentationProps = PropTypes.shape({
  mainGroupId: PropTypes.number,
  onMainGroupToggle: PropTypes.func.isRequired
})

export const GroupMemberSearch = PropTypes.shape({
  gpCom: PropTypes.number.isRequired,
  gpId: PropTypes.number.isRequired,
  orderType: PropTypes.string.isRequired,
  page: PropTypes.shape({
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired
  }),
  search: PropTypes.shape({
    keyword: PropTypes.string.isRequired
  })
})

// export const GroupList = PropTypes.shape({
//   id: PropTypes.number.isRequired, // 그룹식별번호
//   isMainGroup: PropTypes.bool.isRequired, // 메인 그룹 여부
//   company: PropTypes.string.isRequired, // 회사그룹 이름
//   groupType: PropTypes.string.isRequired, // 그룹유형코드의 매핑된 문자열 값
//   groupName: PropTypes.string.isRequired, // 그룹 이름
//   groupLeader: PropTypes.string.isRequired, // 그룹 생성 회원 이름
//   location: PropTypes.string.isRequired, // 그룹 지역 코드
//   locationText: PropTypes.string.isRequired, // 그룹 지역 텍스트
//   managementCode: PropTypes.string.isRequired, // 그룹 관리 코드
//   myRole: PropTypes.string.isRequired, // 나의 담당업무
//   myRoleText: PropTypes.string.isRequired, // 나의 담당업무 텍스트
//   level: PropTypes.string.isRequired, // 그룹 레벨  '1' master '2'
//   levelText: PropTypes.string.isRequired, // 그룹 레벨 텍스트
//   groupMemberStatus: PropTypes.string.isRequired, // 그룹관계자 상태코드
//   status: PropTypes.string.isRequired, // 추가된 필드
//   totGmbrCnt: PropTypes.number.isRequired // 총 그룹 멤버 수
// })
