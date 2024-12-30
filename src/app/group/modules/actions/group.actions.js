'use server'

// import { apiServiceGeneric } from '@/app/lib/apiServiceUtils'
import { apiServiceGeneric } from '@/app/lib/apiServiceUtils'
/**
 * 토탈 코드 정보를 조회합니다.
 * @param cdTyNo - 코드 타입 번호
 * @returns 토탈 코드 정보 배열
 * @throws API URL이 정의되지 않은 경우 또는 API 호출 실패 시 에러
 */
export async function getSetupTotalcode(cdTyNo) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error('API URL이 환경 변수에 정의되지 않았습니다')
  }

  try {
    const response = await apiServiceGeneric(`${apiUrl}/setup/totalcode/${cdTyNo}`, {
      method: 'GET',
      revalidate: 3600 // 1시간 캐시
    })

    return response.data
  } catch (error) {
    console.error('토탈코드 조회 실패:', error)
    throw error
  }
}

/**
 * 특정 그룹의 상세 정보를 조회합니다.
 * @param id - 조회할 그룹의 ID
 * @returns 그룹 상세 정보
 * @throws API URL이 정의되지 않은 경우 또는 API 호출 실패 시 에러
 */
export async function fetchGroupDetail(id) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error('API URL이 환경 변수에 정의되지 않았습니다')
  }

  try {
    const response = await apiServiceGeneric(`${apiUrl}/api/group/${id}`, {
      method: 'GET'
    })
    return response.data
  } catch (error) {
    console.error('그룹 데이터 조회 실패:', error)
    throw error
  }
}

/**
 * 특정 그룹의 권한 레벨을 조회합니다.
 * @param gpId - 그룹 ID
 * @param mbrNo - 회원 번호
 * @returns 권한 레벨 정보
 * @throws API URL이 정의되지 않은 경우 또는 API 호출 실패 시 에러
 */
export async function fetchAuthorityLevel(gpId, mbrNo) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error('API URL이 환경 변수에 정의되지 않았습니다')
  }
  console.log('gpId', gpId)
  console.log('mbrNo', mbrNo)

  try {
    const response = await apiServiceGeneric(`${apiUrl}/group/member/auth/${gpId}/${mbrNo}`, {
      method: 'GET'
    })
    console.log('AuthorityLevelResponse is[', response, ']')
    return response.data
  } catch (error) {
    console.error('권한 레벨 조회 실패:', error)
    throw error
  }
}

/**
 * 그룹 초대를 수락합니다.
 * @param gmbrSeq - 그룹 멤버 시퀀스 번호
 * @throws API URL이 정의되지 않은 경우 또는 API 호출 실패 시 에러
 */
export async function invitationAgree(gmbrSeq) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error('API URL이 환경 변수에 정의되지 않았습니다')
  }

  try {
    await apiServiceGeneric(`${apiUrl}/api/group/invitation/agree/${gmbrSeq}`, {
      method: 'POST'
    })
    await fetchGroupDetail(gmbrSeq)
  } catch (error) {
    console.error('초대 수락 실패:', error)
    throw error
  }
}

/**
 * 그룹 초대를 거절합니다.
 * @param gmbrSeq - 그룹 멤버 시퀀스 번호
 * @throws API URL이 정의되지 않은 경우 또는 API 호출 실패 시 에러
 */
export async function invitationRefuse(gmbrSeq) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error('API URL이 환경 변수에 정의되지 않았습니다')
  }

  try {
    await apiServiceGeneric(`${apiUrl}/api/group/invitation/refuse/${gmbrSeq}`, {
      method: 'POST'
    })
    await fetchGroupDetail(gmbrSeq)
  } catch (error) {
    console.error('초대 거절 실패:', error)
    throw error
  }
}

/**
 * 그룹 멤버를 삭제합니다.
 * @param gmbrSeq - 삭제할 그룹 멤버의 시퀀스 번호
 * @throws API URL이 정의되지 않은 경우 또는 API 호출 실패 시 에러
 */
export async function deleteMember(gmbrSeq) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error('API URL이 환경 변수에 정의되지 않았습니다')
  }

  try {
    await apiServiceGeneric(`${apiUrl}/api/group/member/${gmbrSeq}`, {
      method: 'DELETE'
    })
    await fetchGroupDetail(gmbrSeq)
  } catch (error) {
    console.error('멤버 삭제 실패:', error)
    throw error
  }
}

/**
 * 그룹장을 변경합니다.
 * @param groupId - 그룹 ID
 * @param newLeaderId - 새로운 그룹장의 ID
 * @throws API URL이 정의되지 않은 경우 또는 API 호출 실패 시 에러
 */
export async function changeGroupLeader(groupId, newLeaderId) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error('API URL이 환경 변수에 정의되지 않았습니다')
  }

  try {
    await apiServiceGeneric(`${apiUrl}/api/group/leader/change`, {
      method: 'POST',
      body: JSON.stringify({
        groupId,
        newLeaderId
      })
    })
    await fetchGroupDetail(groupId)
  } catch (error) {
    console.error('그룹장 변경 실패:', error)
    throw error
  }
}
