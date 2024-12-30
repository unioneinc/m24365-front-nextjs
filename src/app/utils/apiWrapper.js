// src/app/utils/apiWrapper.js
'use client'
import { postGroupApi, postGroupListApi, postGroupUpdateApi } from '@/api/group'
import { getSetupTotalcodeApi } from '@/api/common'
import axios from 'axios'

const DEFAULT_CONFIG = {
  validateStatus: (status) => status >= 200 && status < 300,
  timeout: 30000
}

const handleError = (error) => {
  if (error.response) {
    console.error('Response Error:', error.response.data)
    throw new Error(error.response.data.message || '서버 에러가 발생했습니다')
  } else if (error.request) {
    console.error('Request Error:', error.request)
    throw new Error('서버로부터 응답이 없습니다')
  } else {
    console.error('Error:', error.message)
    throw new Error('요청 중 에러가 발생했습니다')
  }
}

// API 래퍼 함수 수정
const createApiWrapper = (apiFunction, defaultData = {}) => {
  return async (customData = {}) => {
    try {
      // GET 요청의 경우 직접 파라미터 전달
      if (apiFunction === getSetupTotalcodeApi) {
        const response = await apiFunction(customData)
        return response
      }

      // POST 요청의 경우 기존 로직 유지
      const mergedData = { ...defaultData, ...customData }
      const response = await apiFunction(mergedData)
      return response.data
    } catch (error) {
      handleError(error)
    }
  }
}

// 그룹 API Wrapper
export const groupApiWrapper = {
  createGroup: createApiWrapper(postGroupApi, {
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
  }),

  getGroupList: createApiWrapper(postGroupListApi, {
    atLev: null,
    columnName: null,
    gmbrStatCd: null,
    gpTyCd: null,
    orderType: 'DESC',
    page: {
      page: 0,
      size: 10
    },
    search: {
      cris: [
        {
          value: ''
        }
      ]
    }
  }),

  updateGroup: createApiWrapper(postGroupUpdateApi, {
    gpId: null,
    gpMgCd: null,
    gpNm: null,
    gpRgnCdId: null,
    groupMemberList: [],
    updateMemberList: []
  }),

  // getSetupTotalcode wrapper 수정
  getSetupTotalcode: createApiWrapper(getSetupTotalcodeApi)
}

export const useGroupApi = () => {
  const createNewGroup = async (data) => {
    try {
      const result = await groupApiWrapper.createGroup(data)
      return result
    } catch (error) {
      console.error('그룹 생성 중 에러:', error)
      throw error
    }
  }

  const getGroups = async (params) => {
    try {
      const result = await groupApiWrapper.getGroupList(params)
      return result
    } catch (error) {
      console.error('그룹 목록 조회 중 에러:', error)
      throw error
    }
  }

  // getSetupTotalcode 함수 수정
  const getSetupTotalcode = async (code) => {
    try {
      const result = await groupApiWrapper.getSetupTotalcode(code)
      return result
    } catch (error) {
      console.error('Total Code 조회 중 에러:', error)
      throw error
    }
  }

  return {
    createNewGroup,
    getGroups,
    getSetupTotalcode
  }
}
