'use server'

// 그룹 목록 조회 함수
export async function postGroupFilter(request) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error('API URL이 환경 변수에 정의되지 않았습니다.')
  }

  const endpoint = '/group/filter'
  const url = `${apiUrl}${endpoint}`

  console.log('GroupFilter---------------------------------------------------------------')
  console.log('apiUrl', apiUrl)
  console.log('url', url)
  console.log('request', request)

  try {
    const response = await apiService(url, {
      method: 'POST',
      body: {
        ...request
      },
      revalidate: 60
    })

    return response.data
  } catch (error) {
    console.error('그룹 목록 조회 실패:', error)
    throw error
  }
}

// 그룹 목록 조회를 호출하는 함수
export async function fetchGroupFilter(mbrNo) {
  const initialRequest = {
    mbrNo: mbrNo,
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
  }
  return await postGroupFilter(initialRequest)
}

// 첫 페이지 로딩을 위한 함수
export async function fetchGroupFilterFirst(mbrNo) {
  const initialRequest = {
    mbrNo: mbrNo,
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
  }
  return await postGroupFilter(initialRequest)
}

// 페이지 번호로 데이터를 가져오는 함수
export async function fetchGroupFilterByPage(pageNumber, mbrNo) {
  const request = {
    mbrNo: mbrNo,
    orderType: 'DESC',
    page: {
      page: pageNumber - 1,
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
  }

  return await postGroupFilter(request)
}

// 필터 조건으로 데이터를 가져오는 함수
export async function fetchGroupFilterBySelect(gpTyCd, gpState, searchString, mbrNo) {
  const request = {
    mbrNo: mbrNo,
    orderType: 'DESC',
    gpTyCd: gpTyCd ? gpTyCd : undefined,
    atLev: gpState !== 0 ? gpState : undefined,
    page: {
      page: 0,
      size: 10
    },
    search: {
      cris: [
        {
          op: 'EQ',
          value: searchString || ''
        }
      ]
    }
  }
  return await postGroupFilter(request)
}
