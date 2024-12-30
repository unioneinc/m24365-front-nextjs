import axios from '@/app/lib/api/axios'

export const getBoardListApi = (postTyCdId) => axios.get(`/board/list/${postTyCdId}`) // 게시판목록
export const postBoardApi = (param) => axios.post('/board', param) // 게시판등록
export const getBoardApi = (postId) => axios.get(`/board/${postId}`) // 게시판상세
export const postBoardUpdateApi = (param) => axios.post('/board/update', param) // 게시판수정
export const postBoardDeleteApi = (postId) => axios.get(`/board/delete/${postId}`) // 게시판삭제
export const postBoardReplyApi = (param) => axios.post('/board/reply', param) // 게시판댓글등록
export const postBoardReplyUpdateApi = (param) => axios.post('/board/reply/update', param) // 게시판댓글수정
export const postBoardReplyDeleteApi = (param) => axios.post('/board/reply/delete', param) // 게시판댓글삭제
