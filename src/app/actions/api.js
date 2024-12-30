// app/actions/api.js
'use server'

import { headers } from 'next/headers'
import { apiService } from '../lib/api/apiService'

// 헤더에서 Authorization 토큰을 가져오는 함수
async function getAuthConfig() {
  const headersList = headers()
  const authorization = headersList.get('Authorization')

  return {
    headers: {
      Authorization: authorization || ''
    }
  }
}

async function getAction(url) {
  console.log('getAction: url is', url)
  const config = await getAuthConfig()
  console.log('getAction , getAuthConfig', url, config)
  return apiService('GET', url, null, config)
}

async function postAction(urlString, param) {
  console.log('postAction: url is', urlString, 'param is', param)
  const config = await getAuthConfig()
  return apiService('POST', urlString, param, config)
}

async function putAction(url, param) {
  const config = await getAuthConfig()
  return apiService('PUT', url, param, config)
}

async function deleteAction(url) {
  const config = await getAuthConfig()
  return apiService('DELETE', url, null, config)
}

export { getAction, postAction, putAction, deleteAction }
