// @/utils/lodashUtils.js
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import remove from 'lodash/remove'
import some from 'lodash/some'
import flow from 'lodash/flow'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import curry from 'lodash/curry'
import compose from 'lodash/flow'
import memoize from 'lodash/memoize'
import debounce from 'lodash/debounce'
import chain from 'lodash/chain'
import pickBy from 'lodash/pickBy'
import throttle from 'lodash/throttle'

export const fpMap = map
export const fpIsEmpty = isEmpty
export const fpRemove = remove
export const fpSome = some
export const fpFlow = flow
export const fpGet = get
export const fpIsNil = isNil
export const fpCurry = curry
export const fpCompose = compose
export const fpMemoize = memoize
export const fpDebounce = debounce
export const fpChain = chain
export const fpPickBy = pickBy
export const fpThrottle = throttle
