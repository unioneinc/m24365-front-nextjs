// app/lib/api/apiAxios.js
'use client'

import { getAction, postAction, putAction, deleteAction } from '@/app/actions/api'

// GET 요청
export async function get(url) {
  console.log('get', url)

  try {
    // console.log('before getAction', url)
    return await getAction(url)
  } catch (error) {
    console.error('GET 요청 실패:', error)
    throw error
  }
}

// POST 요청
export async function post(url, param = {}) {
  console.log('apiAxios post', url, param)
  try {
    const response = await postAction(url, param)
    console.log('apiAxios post response', response)
    return response
  } catch (error) {
    console.error('apiAxios post 요청 실패:', error)
    throw error
  }
}

// PUT 요청
export async function put(url, param = {}) {
  try {
    return await putAction(url, param)
  } catch (error) {
    console.error('apiAxios put 요청 실패:', error)
    throw error
  }
}

// DELETE 요청
export async function deleteReq(url) {
  try {
    return await deleteAction(url)
  } catch (error) {
    console.error('DELETE 요청 실패:', error)
    throw error
  }
}

const apiAxios = {
  get,
  post,
  put,
  delete: deleteReq
}

export { apiAxios }
