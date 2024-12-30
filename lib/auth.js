// src/lib/auth.js
import * as jose from 'jose'
import { logger as log } from './logger/index'

const SECRET_KEY = 'jXn2r5u8x/A?D(G+KbPeShVkYp3s6v9y$B&E)H@McQfTjWnZq4t7w!z%C*F-JaNd'

export async function getAuthentication(tokenHeader) {
  const context = {
    module: 'auth',
    function: 'getAuthentication'
  }

  if (!tokenHeader) {
    log.debug('No token provided', context)
    return null
  }

  try {
    const token = tokenHeader.replace('Bearer ', '')
    const secretKey = new TextEncoder().encode(SECRET_KEY)

    log.debug('Verifying token', { ...context, tokenLength: token.length })

    const { payload } = await jose.jwtVerify(token, secretKey, {
      algorithms: ['HS512']
    })

    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < now) {
      log.warn('Token expired', {
        ...context,
        expiration: new Date(payload.exp * 1000).toISOString(),
        now: new Date(now * 1000).toISOString()
      })
      throw new Error('기간만료')
    }

    const mbrNo = String(payload.mbrNo)
    const mbrId = payload.mbrId
    const authorities = (payload.role || []).map((role) => ({ authority: role }))

    log.info('Token verified successfully', {
      ...context,
      mbrId,
      authorities: authorities.map((a) => a.authority)
    })

    const userDetails = {
      mbrNo: parseInt(mbrNo),
      mbrId,
      mbrPw: '',
      authorities
    }

    return {
      userDetails,
      authorities
    }
  } catch (error) {
    log.error(
      'Token verification failed',
      context,
      error instanceof Error ? error : new Error('Unknown error')
    )
    throw error
  }
}

export async function verifyToken(token) {
  const context = {
    module: 'auth',
    function: 'verifyToken'
  }

  try {
    const auth = await getAuthentication(token)
    if (auth) {
      log.debug('Token verified', context)
      return { expired: false, userDetails: auth.userDetails }
    }
    log.warn('No auth result', context)
    return { expired: false, userDetails: null }
  } catch (error) {
    if (error instanceof Error && error.message === '기간만료') {
      log.warn('Token expired', context)
      return { expired: true, userDetails: null }
    }
    log.error(
      'Token verification error',
      context,
      error instanceof Error ? error : new Error('Unknown error')
    )
    return { expired: false, userDetails: null }
  }
}

export async function authenticateRequest(request) {
  const context = {
    module: 'auth',
    function: 'authenticateRequest',
    url: request.url
  }

  const tokenHeader = request.headers.get('authorization')
  log.debug('Authenticating request', { ...context, hasToken: !!tokenHeader })

  try {
    const auth = await getAuthentication(tokenHeader)
    if (auth) {
      log.info('Request authenticated', { ...context, userId: auth.userDetails.mbrId })
      return { authenticated: true, user: auth.userDetails }
    }
    log.warn('Authentication failed', context)
    return { authenticated: false, error: 'Authentication failed' }
  } catch (error) {
    if (error instanceof Error && error.message === '기간만료') {
      log.warn('Token expired during request', context)
      return { authenticated: false, error: '토큰 만료' }
    }
    log.error(
      'Request authentication error',
      context,
      error instanceof Error ? error : new Error('Unknown error')
    )
    return { authenticated: false, error: 'Authentication failed' }
  }
}
