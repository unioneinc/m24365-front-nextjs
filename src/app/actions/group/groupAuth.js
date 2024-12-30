'use server'

/**
 * 그룹 멤버의 권한 정보를 조회하는 함수
 * @param {number} gpId - 그룹 식별 번호
 * @param {number} mbrNo - 회원 식별 번호
 * @returns {Promise<Object>} - 그룹 멤버 권한 정보
 * @throws {Error} - API 호출 실패시 에러
 */
export async function fetchGroupMemberAuth(gpId, mbrNo) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error('API URL이 환경 변수에 정의되지 않았습니다.')
  }

  const endpoint = `/group/member/auth/${gpId}/${mbrNo}`
  const url = `${apiUrl}${endpoint}`

  console.log('API URL:', url)
  console.log('그룹 ID:', gpId)
  console.log('회원 번호:', mbrNo)

  try {
    const response = await apiService(url, {
      method: 'GET',
      revalidate: 60 // 60초 캐시
    })

    console.log('서버 응답 데이터:', response.data)

    return response.data
  } catch (error) {
    console.error('그룹 멤버 권한 조회 실패:', error)
    throw error
  }
}

/**
 * 그룹 멤버 권한 조회를 실행하는 함수
 * @param {number} gpId - 그룹 식별 번호
 * @param {number} mbrNo - 회원 식별 번호
 * @returns {Promise<number>} - 권한 레벨
 */
export async function getGroupMemberAuthLevel(gpId, mbrNo) {
  try {
    const authData = await fetchGroupMemberAuth(gpId, mbrNo)
    return authData.atLev
  } catch (error) {
    console.error('권한 레벨 조회 실패:', error)
    throw error
  }
}

// 클라이언트 컴포넌트에서 사용
// const authLevel = await getGroupMemberAuthLevel(gpId, mbrNo)
