// excel 출력 시 필요한 항목들을 생성한다.
export const headers = [
  {
    id: 'asstOwnsGpNm',
    label: '그룹명'
  },
  {
    id: 'asstNm',
    label: '자산명'
  },
  {
    id: 'asstCateCdNmL',
    label: '자산분류-대분류'
  },
  {
    id: 'asstCateCdNmM',
    label: '자산분류-중분류'
  },
  {
    id: 'asstCateCdNm',
    label: '자산분류-소분류'
  },
  {
    id: 'asstStatCd',
    label: '자산상태'
  },
  {
    id: 'asstMdNm',
    label: '모델명'
  },
  {
    id: 'asstMk',
    label: '제조사'
  },
  {
    id: 'asstCrlNo',
    label: '시리얼'
  },
  {
    id: 'asstInstDate',
    label: '자산 설치일'
  },
  {
    id: 'asstLoct',
    label: '자산위치'
  },
  {
    id: 'acqPt',
    label: '취득경로'
  },
  {
    id: 'asstInfo',
    label: '자산정보'
  },
  {
    id: 'asstAcqMtct',
    label: '취득단가(원)'
  },
  {
    id: 'asstMtct',
    label: '유지보수료(원)'
  }
]

export const excludes = [
  {
    id: 'gpRgnCdId',
    label: '소속지역'
  },
  {
    id: 'gpMgCd',
    label: '관리코드'
  },
  {
    id: 'asstDusDate',
    label: '자산 폐기일'
  },
  {
    id: 'asstJobNm',
    label: '자산 업무명'
  },
  {
    id: 'asstAddr',
    label: '자산주소'
  }
]
