// /tests/api/group/group.mock.js
export const mockGroupData = {
  sampleGroup: {
    gpId: 1000000506,
    gpMgCd: 'code93',
    gpNm: 'grouptest93',
    gpRgnCdId: '05201',
    groupMemberList: [
      {
        gmbrDutTyCd: '01705',
        mbrNo: 1000000206
      }
    ],
    parentGpId: 1000000331
  },

  sampleGroupList: {
    content: [
      {
        gpId: 1000000506,
        gpNm: 'grouptest93'
      }
    ],
    totalElements: 1,
    totalPages: 1,
    size: 10,
    number: 0
  }
}
