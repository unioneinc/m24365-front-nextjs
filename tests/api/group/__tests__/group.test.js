// tests/api/group/__tests__/group.test.js
import axios from 'axios'
import { groupApi } from '../group.api'

jest.mock('axios')

describe('Group API Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Group CRUD Operations', () => {
    // 기존 테스트 코드들...
    it('should fetch group list successfully', async () => {
      // Given
      const mockData = {
        data: {
          content: [{ gpId: 1, gpNm: 'Test Group' }],
          totalElements: 1
        }
      }
      axios.get.mockResolvedValueOnce(mockData)

      // When
      const response = await groupApi.getGroupList()

      // Then
      expect(axios.get).toHaveBeenCalledWith('/group/list')
      expect(response).toEqual(mockData)
    })

    it('should create new group successfully', async () => {
      // Given
      const newGroup = {
        gpMgCd: 'code93',
        gpNm: 'grouptest93',
        gpRgnCdId: '05201',
        groupMemberList: [{ gmbrDutTyCd: '01705', mbrNo: 1000000206 }]
      }
      const mockResponse = {
        data: { gpId: 1000000506 }
      }
      axios.post.mockResolvedValueOnce(mockResponse)

      // When
      const response = await groupApi.createGroup(newGroup)

      // Then
      expect(axios.post).toHaveBeenCalledWith('/group', newGroup)
      expect(response).toEqual(mockResponse)
    })

    it('should get group details successfully', async () => {
      // Given
      const gpId = 1000000506
      const mockResponse = {
        data: {
          gpId: gpId,
          gpNm: 'grouptest93',
          gpRgnCdId: '05201'
        }
      }
      axios.get.mockResolvedValueOnce(mockResponse)

      // When
      const response = await groupApi.getGroupDetail(gpId)

      // Then
      expect(axios.get).toHaveBeenCalledWith(`/group/${gpId}`)
      expect(response).toEqual(mockResponse)
    })

    it('should get group members successfully', async () => {
      // Given
      const gpId = 1000000506
      const mockResponse = {
        data: {
          content: [{ gmbrSeq: 1, mbrNo: 1000000206, mbrNm: '홍길동' }]
        }
      }
      axios.get.mockResolvedValueOnce(mockResponse)

      // When
      const response = await groupApi.getGroupMembers(gpId)

      // Then
      expect(axios.get).toHaveBeenCalledWith(`/group/member/${gpId}`)
      expect(response).toEqual(mockResponse)
    })

    it('should invite group member successfully', async () => {
      // Given
      const inviteData = [
        {
          gmbrDutTyCd: '01705',
          gpId: 1000000506,
          mbrNo: 1000000312
        }
      ]
      const mockResponse = { data: { success: true } }
      axios.post.mockResolvedValueOnce(mockResponse)

      // When
      const response = await groupApi.inviteGroupMember(inviteData)

      // Then
      expect(axios.post).toHaveBeenCalledWith('/group/invite', inviteData)
      expect(response).toEqual(mockResponse)
    })

    it('should change group manager successfully', async () => {
      // Given
      const changeData = {
        gpId: 1000000506,
        gmbrSeq: 2
      }
      const mockResponse = { data: { success: true } }
      axios.post.mockResolvedValueOnce(mockResponse)

      // When
      const response = await groupApi.changeGroupManager(changeData)

      // Then
      expect(axios.post).toHaveBeenCalledWith('/group/change', changeData)
      expect(response).toEqual(mockResponse)
    })
  })

  describe('Group Member Operations', () => {
    it('should get member search list successfully', async () => {
      // Given
      const mockResponse = {
        data: {
          content: [{ mbrNo: 1000000206, mbrNm: '홍길동', mbrId: 'hong' }]
        }
      }
      axios.get.mockResolvedValueOnce(mockResponse)

      // When
      const response = await groupApi.getGroupMemberSearchList()

      // Then
      expect(axios.get).toHaveBeenCalledWith('/group/member/search/list')
      expect(response).toEqual(mockResponse)
    })

    it('should get member history successfully', async () => {
      // Given
      const params = {
        gpId: 1000000430,
        mbrNo: 1000000206,
        start: '2024-08-01',
        end: '2024-08-31'
      }
      const mockResponse = {
        data: {
          content: [{ srvId: 1000002133, srvTit: '테스트 서비스' }]
        }
      }
      axios.get.mockResolvedValueOnce(mockResponse)

      // When
      const response = await groupApi.getGroupMemberHistory(
        params.gpId,
        params.mbrNo,
        params.start,
        params.end
      )

      // Then
      expect(axios.get).toHaveBeenCalledWith(
        `/group/member/history/${params.gpId}/${params.mbrNo}/${params.start}/${params.end}`
      )
      expect(response).toEqual(mockResponse)
    })
  })

  describe('Company Group Operations', () => {
    it('should upload company logo successfully', async () => {
      // Given
      const logoData = new FormData()
      logoData.append('file', new Blob())
      const mockResponse = { data: { fileNo: 1000000123 } }
      axios.post.mockResolvedValueOnce(mockResponse)

      // When
      const response = await groupApi.uploadCompanyLogo(logoData)

      // Then
      expect(axios.post).toHaveBeenCalledWith('/group/company/logo', logoData)
      expect(response).toEqual(mockResponse)
    })

    it('should get company member list successfully', async () => {
      // Given
      const mockResponse = {
        data: {
          content: [{ mbrNo: 1000000206, mbrNm: '홍길동', atLev: 2 }]
        }
      }
      axios.get.mockResolvedValueOnce(mockResponse)

      // When
      const response = await groupApi.getCompanyMemberList()

      // Then
      expect(axios.get).toHaveBeenCalledWith('/group/company/member/list')
      expect(response).toEqual(mockResponse)
    })
  })

  describe('Excel Operations', () => {
    it('should upload company member excel successfully', async () => {
      // Given
      const excelData = new FormData()
      excelData.append('file', new Blob())
      const mockResponse = { data: { success: true } }
      axios.post.mockResolvedValueOnce(mockResponse)

      // When
      const response = await groupApi.uploadCompanyMemberXls(excelData)

      // Then
      expect(axios.post).toHaveBeenCalledWith('/group/company/member/xls', excelData)
      expect(response).toEqual(mockResponse)
    })
  })
})
