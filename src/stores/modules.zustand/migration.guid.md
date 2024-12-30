# Redux에서 Zustand로의 변환 가이드

## 1. 기본 구조 변환

### Redux 코드의 기본 구조

```javascript
// Redux 구조
const GET_DATA = 'GET_DATA'
const SET_DATA = 'SET_DATA'

const initialState = {
  data: null,
  loading: false
}

export const getData = () => ({ type: GET_DATA })
export const setData = (payload) => ({ type: SET_DATA, payload })

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload }
    default:
      return state
  }
}
```

### Zustand로 변환된 구조

```javascript
// Zustand 구조
import { create } from 'zustand'

const useStore = create((set) => ({
  data: null,
  loading: false,
  setData: (data) => set({ data }),
  getData: async () => {
    // 비동기 로직 구현
  }
}))
```

## 2. Redux-Saga에서 Async/Await로의 변환

### Saga 코드

```javascript
function* dataSaga() {
  try {
    yield put(openLoadingDialog())
    const { data } = yield call(apiCall)
    yield put(setData(data))
  } catch (e) {
    yield put(setError(e.message))
  } finally {
    yield put(closeLoadingDialog())
  }
}
```

### Zustand async/await 변환

```javascript
const useStore = create((set) => ({
  getData: async () => {
    try {
      set({ loading: true })
      const { data } = await apiCall()
      set({ data })
      return { success: true }
    } catch (error) {
      set({ error: error.message })
      return { error: error.message }
    } finally {
      set({ loading: false })
    }
  }
}))
```

## 3. 상태 관리 패턴 변환

### Redux 액션/리듀서 패턴

```javascript
// 액션 타입
const SET_AUTH = 'SET_AUTH'
const SET_USER = 'SET_USER'

// 액션 생성자
export const setAuth = (auth) => ({ type: SET_AUTH, payload: auth })
export const setUser = (user) => ({ type: SET_USER, payload: user })

// 리듀서
function reducer(state, action) {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, auth: action.payload }
    case SET_USER:
      return { ...state, user: action.payload }
    default:
      return state
  }
}
```

### Zustand 직접 상태 변경 패턴

```javascript
const useStore = create((set) => ({
  auth: null,
  user: null,
  setAuth: (auth) => set({ auth }),
  setUser: (user) => set({ user }),
  // 복합 업데이트
  updateUserAndAuth: (user, auth) =>
    set((state) => ({
      ...state,
      user,
      auth
    }))
}))
```

## 4. 미들웨어 변환

### Redux 미들웨어

```javascript
// Redux Thunk
const fetchUserThunk = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const user = await fetchUser()
    dispatch(setUser(user))
  } catch (error) {
    dispatch(setError(error))
  }
  dispatch(setLoading(false))
}
```

### Zustand 미들웨어

```javascript
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const useStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        fetchUser: async () => {
          set({ loading: true })
          try {
            const user = await fetchUser()
            set({ user })
          } catch (error) {
            set({ error })
          }
          set({ loading: false })
        }
      }),
      {
        name: 'user-storage'
      }
    )
  )
)
```

## 5. 모범 사례와 패턴

### 1) 상태 초기화

```javascript
const initialState = {
  user: null,
  loading: false,
  error: null
}

const useStore = create((set) => ({
  ...initialState,
  reset: () => set(initialState)
}))
```

### 2) 계산된 값 처리

```javascript
const useStore = create((set, get) => ({
  todos: [],
  completedTodos: () => get().todos.filter((todo) => todo.completed)
}))
```

### 3) 비동기 작업 처리

```javascript
const useStore = create((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchData: async () => {
    try {
      set({ loading: true, error: null })
      const response = await apiCall()
      set({ data: response.data })
      return { success: true }
    } catch (error) {
      set({ error: error.message })
      return { error: error.message }
    } finally {
      set({ loading: false })
    }
  }
}))
```

## 6. Next.js 14와의 통합

### 클라이언트 컴포넌트에서 사용

```javascript
'use client'

import useStore from '@/stores/store'

export default function ClientComponent() {
  const { data, fetchData } = useStore()

  // 컴포넌트 로직
}
```

### 서버 컴포넌트 고려사항

- Zustand 스토어는 클라이언트 컴포넌트에서만 사용
- 서버 컴포넌트에서는 직접적인 상태 접근 대신 props로 전달
- 하이드레이션 이슈 방지를 위한 적절한 초기 상태 설정 필요

## 7. 주의사항

1. 상태 변경은 항상 `set` 함수를 통해서만 수행
2. 비동기 작업은 async/await 패턴 사용
3. 큰 상태 객체는 적절히 분할하여 관리
4. 디버깅을 위해 devtools 미들웨어 활용
5. 필요한 경우에만 persist 미들웨어 사용

## 8. 성능 최적화

1. 선택적 구독으로 불필요한 리렌더링 방지

```javascript
// 필요한 상태만 구독
const data = useStore((state) => state.data)
```

2. 메모이제이션 활용

```javascript
const selectUser = (state) => state.user
const user = useStore(selectUser)
```

이 가이드는 Redux/Redux-Saga에서 Zustand로의 마이그레이션을 수행할 때 참고할 수 있는 기본적인 패턴과 사례를 제공합니다. 프로젝트의 특성과 요구사항에 따라 적절히 수정하여 사용하시기 바랍니다.
