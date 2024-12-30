'use client'

import clientAxios from '@/app/lib/api/clientAxios'
import { logger } from '~/lib/logger'

export const postLoginApi = ({ mbrId, mbrPw }) =>
  clientAxios.post(`/login?mbrId=${encodeURIComponent(mbrId)}&mbrPw=${encodeURIComponent(mbrPw)}`) // 로그인
export const getLogoutApi = () => clientAxios.get('/logout') // 로그아웃
export const getMemberInfoApi = () => {
  logger.info('getMemberInfoApi 호출')
  return clientAxios.get('/member/info') // 마이인포 불러오기
}
export const postMemberUpdateApi = (param) => clientAxios.post('/member/update', param) // 마이인포 업데이트
export const getMemberWithdrawApi = () => clientAxios.get('/member/withdraw') // 회원탈퇴
export const getMemberApi = (mbrNo) => clientAxios.get(`/member/${mbrNo}`) // 사용자상세
export const postPasswordUpdateApi = (param) => clientAxios.post('/member/update/pw', param) // 비밀번호 변경
export const postPasswordWaitApi = () => clientAxios.post('/member/update/wait-pw-dt') // 비밀번호 다음에 변경하기
export const postMemberCheckMbrPwApi = (param) => clientAxios.post('/member/check/identity', param) // 비밀번호 체크
export const postMemberSendTempPwMbrPwApi = (param) =>
  clientAxios.post('/member/send/temp-pw', param) // 임시비밀번호 발송
