'use client'

import { useMemo } from 'react'
import { create } from 'zustand'
import { logger } from '~/lib/logger'
import { devtools } from 'zustand/middleware'
import { ERROR_TEXT } from '@/constants'
import { apiAxios } from '@/app/lib/api/apiAxios'
import { axios } from '@/paths'
import { postAction } from '@/app/actions/api'
import { produce } from 'immer'
import api from '@/utils/api'

// 유틸리티 함수
const isClientSide = () => typeof window !== 'undefined'
const DEFAULT_PAGE_SIZE = 10
const isMobile =
  isClientSide() &&
  (/Mobi/i.test(window.navigator.userAgent) || window.navigator.userAgent.includes('webview'))

// 초기 상태 관련 상수
const DEFAULT_PAGINATION = {
  page: 0,
  size: isMobile ? 5 : DEFAULT_PAGE_SIZE,
  totalPages: 0,
  totalCount: 0
}

const DEFAULT_SEARCH = {
  cris: [{ op: 'EQ', value: '' }]
}

const DEFAULT_PAGE = {
  page: 0,
  size: isMobile ? 5 : DEFAULT_PAGE_SIZE
}

// 초기 상태 정의
const initialState = {
  isLoading: false,
  error: null,
  gpTyCdList: [],
  groupList: [],
  mainGroupData: null,
  memberData: null,
  param: {
    mbrNo: null,
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
          op: 'EQ',
          value: ''
        }
      ]
    }
  },
  mainGroupParam: {
    columnName: '',
    orderType: 'DESC',
    gpTyCd: '',
    search: DEFAULT_SEARCH,
    page: DEFAULT_PAGE
  },
  memberParam: {
    columnName: '',
    orderType: 'DESC',
    gmbrStatCd: '',
    search: DEFAULT_SEARCH,
    page: DEFAULT_PAGE
  },
  pagination: DEFAULT_PAGINATION
}

// 에러 핸들러
const handleError = (error, message) => {
  logger.error(message, error)
  throw new Error(message)
}

const useGroupStore = create(
  devtools((set, get) => ({
    ...initialState,

    // 기본 상태 업데이트 액션
    setLoading: (isLoading) =>
      set(
        produce((state) => {
          state.isLoading = isLoading
        })
      ),

    setGroupListData: (data) =>
      set(
        produce((state) => {
          state.groupList = data
        })
      ),

    setTemp: (state) =>
      set(
        produce((draft) => {
          draft.temp = state
        })
      ),

    setGpTyCdList: (newList) =>
      set(
        produce((state) => {
          state.gpTyCdList = newList
        })
      ),

    setMainGroupListData: (data) =>
      set(
        produce((state) => {
          state.mainGroupData = data
        })
      ),

    setGroupMemberListData: (data) =>
      set(
        produce((state) => {
          state.memberData = data
        })
      ),

    // 파라미터 업데이트 액션
    setGroupListParam: (param) =>
      set(
        produce((state) => {
          state.param = {
            ...state.param,
            ...param,
            page: { page: 0, size: DEFAULT_PAGE_SIZE }
          }
        })
      ),

    setMainGroupListParam: (param) =>
      set(
        produce((state) => {
          state.mainGroupParam = { ...state.mainGroupParam, ...param }
        })
      ),

    setGroupMemberListParam: (param) =>
      set(
        produce((state) => {
          state.memberParam = { ...state.memberParam, ...param }
        })
      ),

    // API 요청 액션
    fetchCodeList: async () => {
      try {
        set({ isLoading: true })
        // const response = await axios.get('/setup/totalcode/004')
        const response = await api.get('/setup/totalcode/004')
        if (response.success) {
          set({ gpTyCdList: response.data, isLoading: false })
        } else {
          set({ error: response.error, isLoading: false })
        }

        // set({ gpTyCdList: response, isLoading: false })
        // set(produce((state) => {
        //   state.gpTyCdList = response
        //   state.isLoading = false
        // }))
      } catch (error) {
        set({ error, isLoading: false })
        handleError(error, '코드 목록 조회 실패')
      }
    },

    fetchGroupFilterFirst: async (mbrNoParam) => {
      try {
        set({ isLoading: true })
        const response = await postAction('/group/filter', {
          mbrNo: mbrNoParam,
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
                op: 'EQ',
                value: ''
              }
            ]
          }
        })

        set(
          produce((state) => {
            state.groupList = response.items
            state.pagination = {
              page: response.page,
              size: response.size,
              totalPages: response.totalPages,
              totalCount: response.totalCount
            }
            state.isLoading = false
          })
        )
      } catch (error) {
        set({ isLoading: false })
        handleError(error, '그룹 목록 조회 실패')
      }
    },

    fetchGroupFilterByPage: async (mbrNoParam, pageParam) => {
      try {
        set({ isLoading: true })
        const response = await postAction('/group/filter', {
          mbrNo: mbrNoParam,
          ...get().param,
          page: {
            page: pageParam - 1,
            size: 10
          },
          search: {
            cris: [
              {
                op: 'EQ',
                value: ''
              }
            ]
          }
        })

        set(
          produce((state) => {
            state.groupList = response.items
            state.pagination = {
              page: response.page,
              size: response.size,
              totalPages: response.totalPages,
              totalCount: response.totalCount
            }
            state.isLoading = false
          })
        )
      } catch (error) {
        set({ isLoading: false })
        handleError(error, '그룹 목록 조회 실패')
      }
    },

    fetchGroupFilterBySelect: async (gpTyCdParam, gpStateParam, searchStringParam, mbrNoParam) => {
      try {
        set({ isLoading: true })
        const response = await postAction('/group/filter', {
          mbrNo: mbrNoParam,
          ...get().param,
          gpTyCd: gpTyCdParam,
          atLev: gpStateParam !== 0 ? gpStateParam : null,
          page: {
            page: 0,
            size: 10
          },
          search: {
            cris: [
              {
                op: 'EQ',
                value: searchStringParam || ''
              }
            ]
          }
        })

        set(
          produce((state) => {
            state.groupList = response.items
            state.pagination = {
              page: response.page,
              size: response.size,
              totalPages: response.totalPages,
              totalCount: response.totalCount
            }
            state.isLoading = false
          })
        )
      } catch (error) {
        set({ isLoading: false })
        handleError(error, '그룹 목록 조회 실패')
      }
    },

    fetchGroupListData: async () => {
      try {
        set({ isLoading: true })
        const response = await apiAxios.get('/group/list')
        set(
          produce((state) => {
            state.groupList = response
            state.isLoading = false
          })
        )
      } catch (error) {
        set({ isLoading: false })
        handleError(error, '그룹 목록 조회 실패')
      }
    },

    fetchGroupServiceListData: async (param = null, dialogActions) => {
      if (!dialogActions) {
        throw new Error('dialogActions is required')
      }

      try {
        dialogActions.openLoadingDialog()
        set({ isLoading: true })

        if (param) {
          set(
            produce((state) => {
              state.param = { ...state.param, ...param }
            })
          )
        }

        const state = get()
        const requestParam = {
          ...state.param,
          search: DEFAULT_SEARCH,
          gpTyCd: state.param.gpTyCd || null
        }

        const response = await apiAxios.post('/group/list', requestParam)
        set(
          produce((state) => {
            state.groupList = response.data
            state.isLoading = false
          })
        )
      } catch (error) {
        set({ isLoading: false })
        handleError(error, '그룹 서비스 목록 조회 실패')
        dialogActions.openAlertDialog({
          description: ERROR_TEXT
        })
      } finally {
        dialogActions.closeLoadingDialog()
      }
    },

    // 페이징 관련 액션
    handlePageChange: async (newPage) => {
      try {
        set(
          produce((state) => {
            state.param.page = { page: newPage, size: DEFAULT_PAGE_SIZE }
          })
        )
        return await get().fetchGroupPageFilter()
      } catch (error) {
        handleError(error, '페이지 변경 실패')
      }
    },

    handlePageSizeChange: async () => {
      try {
        set(
          produce((state) => {
            state.param.page = DEFAULT_PAGE
          })
        )
        return await get().fetchGroupPageFilter()
      } catch (error) {
        handleError(error, '페이지 사이즈 변경 실패')
      }
    },

    // 초기화 액션
    resetPagination: () => {
      set(
        produce((state) => {
          state.pagination = DEFAULT_PAGINATION
          state.param.page = DEFAULT_PAGE
        })
      )
    },

    reset: () => set(() => ({ ...initialState }))
  }))
)

// 최적화된 커스텀 훅
const useGroupHook = () => {
  const data = useGroupStore((state) => state.data)
  const param = useGroupStore((state) => state.param)
  const isLoading = useGroupStore((state) => state.isLoading)
  const mainGroupData = useGroupStore((state) => state.mainGroupData)
  const memberData = useGroupStore((state) => state.memberData)
  const gpTyCdList = useGroupStore((state) => state.gpTyCdList)
  const pagination = useGroupStore((state) => state.pagination)
  const temp = useGroupStore((state) => state.temp)

  const api = useMemo(() => {
    return {
      fetchCodeList: useGroupStore.getState().fetchCodeList,
      fetchGroupFilterFirst: useGroupStore.getState().fetchGroupFilterFirst,
      fetchGroupFilterByPage: useGroupStore.getState().fetchGroupFilterByPage,
      fetchGroupFilterBySelect: useGroupStore.getState().fetchGroupFilterBySelect,
      fetchGroupListData: useGroupStore.getState().fetchGroupListData,
      fetchGroupServiceListData: useGroupStore.getState().fetchGroupServiceListData,
      handlePageChange: useGroupStore.getState().handlePageChange,
      handlePageSizeChange: useGroupStore.getState().handlePageSizeChange,
      resetPagination: useGroupStore.getState().resetPagination,
      reset: useGroupStore.getState().reset
    }
  }, [])

  return {
    data,
    param,
    isLoading,
    mainGroupData,
    memberData,
    gpTyCdList,
    pagination,
    temp
  }
}

export { useGroupStore, useGroupHook }
