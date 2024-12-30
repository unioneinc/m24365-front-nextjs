//src/types/v2/group.js
import PropTypes from 'prop-types'

// 그룹 생성 요청 타입
export const GroupCreateRequest = PropTypes.shape({
  gpNm: PropTypes.string.isRequired, // 그룹명
  gpTyCd: PropTypes.string.isRequired, // 그룹유형코드
  gpRgnCdId: PropTypes.string.isRequired, // 지역코드
  gpMgCd: PropTypes.string, // 관리코드
  gpLim: PropTypes.number // 그룹제한수
})

// 그룹 응답 타입
export const GroupResponse = PropTypes.shape({
  gpId: PropTypes.number.isRequired, // 그룹ID
  gpNm: PropTypes.string.isRequired, // 그룹명
  gpTyCd: PropTypes.string.isRequired, // 그룹유형코드
  gpRgnCdId: PropTypes.string.isRequired, // 지역코드
  gpMgCd: PropTypes.string.isRequired, // 관리코드
  gpStatCd: PropTypes.string.isRequired, // 그룹상태코드
  gpCrtDate: PropTypes.string.isRequired, // 생성일자
  gpCrtMbrNo: PropTypes.number.isRequired, // 생성자회원번호
  totGmbrCnt: PropTypes.number.isRequired // 전체그룹원수
})

// 그룹 상세 정보 타입
export const GroupDetail = PropTypes.shape({
  gpId: PropTypes.number.isRequired, // 그룹 ID
  gpNm: PropTypes.string.isRequired, // 그룹명
  gpTyCd: PropTypes.string.isRequired, // 그룹 유형 코드
  gpStatCd: PropTypes.string.isRequired, // 그룹 상태 코드
  gpRgnCdId: PropTypes.string.isRequired, // 지역 코드
  gpMgCd: PropTypes.string.isRequired, // 관리 코드
  gpCom: PropTypes.number.isRequired, // 회사 그룹
  gpComNm: PropTypes.string.isRequired, // 회사 그룹명
  gpLim: PropTypes.number.isRequired, // 그룹 제한 인원
  gpCrtMbrNo: PropTypes.number.isRequired, // 생성자 회원번호
  gpCrtMbrNoName: PropTypes.string.isRequired, // 생성자 이름
  gpCrtDate: PropTypes.string.isRequired, // 생성일자
  totGmbrCnt: PropTypes.number.isRequired, // 총 멤버 수
  groupMemberList: PropTypes.arrayOf(
    PropTypes.shape({
      // GroupMemberItem 타입 정의
    })
  ),
  assetsList: PropTypes.arrayOf(
    PropTypes.shape({
      // GroupAssetItem 타입 정의
    })
  ).isRequired
})

// 그룹 수정 요청 타입
export const UpdateGroupRequest = PropTypes.shape({
  gpId: PropTypes.number.isRequired, // 그룹 ID
  gpNm: PropTypes.string, // 그룹명
  gpTyCd: PropTypes.string, // 그룹 유형 코드
  gpRgnCdId: PropTypes.string, // 지역 코드
  gpMgCd: PropTypes.string, // 관리 코드
  gpLim: PropTypes.number // 그룹 제한 수
})

// 그룹 멤버 권한 타입
export const GroupMemberAuth = PropTypes.shape({
  atLev: PropTypes.number, // 권한 레벨
  gpId: PropTypes.number, // 그룹 ID
  mbrNo: PropTypes.number // 회원 번호
})

// 상수 정의
export const GROUP_MEMBER_DUTY_TYPE = {
  CEO: '01701', // 회사대표
  TEAM_LEADER: '01704', // 팀장
  TEAM_MEMBER: '01705', // 원
  PROJECT_MANAGER: '01706', // 프로젝트담당자
  WORK_MANAGER: '01707', // 업무담당자
  INTEGRATED_MAINTENANCE_SUPERVISOR: '01708', // 통합유지보수관리자
  INTEGRATED_MAINTENANCE_MANAGER: '01709', // 통합유지보수담당자
  MAINTENANCE_MANAGER_MAIN: '01710', // 유지보수담당자(정)
  MAINTENANCE_MANAGER_SUB: '01711', // 유지보수담당자(부)
  MAINTENANCE_MANAGER_APPROVER: '01712' // 유지보수관리자(승인담당자)
}

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

// 그룹 멤버 검색 타입
export const GroupMemberSearch = PropTypes.shape({
  page: PropTypes.shape({
    offset: PropTypes.number,
    page: PropTypes.number,
    size: PropTypes.number
  }),
  search: PropTypes.shape({
    keyword: PropTypes.string
  }),
  gpId: PropTypes.number,
  orderType: PropTypes.string
})

// 그룹 멤버 응답 타입
export const GroupMemberResponse = PropTypes.shape({
  items: PropTypes.arrayOf(
    PropTypes.shape({
      // ResGroupMemberSearchList 타입 정의
    })
  ),
  offset: PropTypes.number,
  page: PropTypes.number,
  size: PropTypes.number,
  totalCount: PropTypes.number,
  totalPages: PropTypes.number
})

// 그룹 초대 멤버 응답 타입
export const ResGroupInviteMember = PropTypes.shape({
  gpCom: PropTypes.number, // 회사 번호
  gpComNm: PropTypes.string, // 회사명
  mbrCell: PropTypes.string, // 연락처
  mbrEmail: PropTypes.string, // 이메일
  mbrId: PropTypes.string, // 회원 ID
  mbrNm: PropTypes.string, // 회원 이름
  mbrNo: PropTypes.number, // 회원 번호
  mgrTyCd: PropTypes.string, // 관리자 유형 코드
  shrChk: PropTypes.string // 공유 체크
})

// 그룹 멤버 상세 타입
export const GroupMemberDetail = PropTypes.shape({
  atLev: PropTypes.number, // 권한
  cell: PropTypes.string, // 연락처
  email: PropTypes.string, // 이메일
  gmbrDutPrior: PropTypes.string, // 그룹관계자직책우선순위
  gmbrDutTyCd: PropTypes.string, // 그룹관계자직책구분코드
  gmbrSeq: PropTypes.number, // 그룹관계자순번
  gmbrStatCd: PropTypes.string, // 그룹관계자상태코드
  gmbrTyCd: PropTypes.string, // 그룹관계자구분코드
  gpCom: PropTypes.number, // 회사그룹식별번호
  mbrId: PropTypes.string, // 회원ID
  mbrNo: PropTypes.number, // 회원식별번호
  mgrTyCd: PropTypes.string, // 회원유형코드
  name: PropTypes.string, // 이름
  shrChk: PropTypes.string // 공유여부
})

// 그룹 자산 상세 타입
export const GroupAssetDetail = PropTypes.shape({
  asstCateCd: PropTypes.string, // 자산분류코드
  asstCateCdNm: PropTypes.string, // 자산분류코드이름
  asstCrlNo: PropTypes.string, // 자산시리얼번호
  asstCrtMbrNm: PropTypes.string, // 자산생성회원이름
  asstCrtMbrNo: PropTypes.number, // 자산생성회원번호
  asstId: PropTypes.number, // 자산식별번호
  asstLoct: PropTypes.string, // 자산위치
  asstMdNm: PropTypes.string, // 자산모델이름
  asstMk: PropTypes.string, // 자산제조사
  asstNm: PropTypes.string, // 자산이름
  asstOwnsGpId: PropTypes.number, // 자산소유그룹식별번호
  asstOwnsGpNm: PropTypes.string, // 자산소유그룹이름
  asstStatCd: PropTypes.string, // 자산상태코드
  companyNm: PropTypes.string, // 자산소속회사이름
  lastChgDt: PropTypes.string // 등록일
})

// 그룹 상세 조회 응답 타입
export const ResGroupDetail = PropTypes.shape({
  assetsList: PropTypes.arrayOf(GroupAssetDetail), // 자산 목록
  gpCom: PropTypes.number, // 회사그룹식별번호
  gpComNm: PropTypes.string, // 회사그룹이름
  gpCrtDate: PropTypes.string, // 그룹생성일자
  gpCrtMbrNo: PropTypes.number, // 그룹생성회원번호
  gpCrtMbrNoName: PropTypes.string, // 그룹생성회원이름
  gpId: PropTypes.number, // 그룹식별번호
  gpLim: PropTypes.number, // 그룹제한인원수
  gpMgCd: PropTypes.string, // 그룹관리코드
  gpNm: PropTypes.string, // 그룹명
  gpRgnCdId: PropTypes.string, // 그룹지역코드
  gpStatCd: PropTypes.string, // 그룹상태코드
  gpTyCd: PropTypes.string, // 그룹유형코드
  groupMemberList: PropTypes.arrayOf(GroupMemberDetail), // 그룹원 목록
  totGmbrCnt: PropTypes.number // 총그룹관계자수
})
