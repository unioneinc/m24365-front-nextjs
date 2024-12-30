# Zustand API 호출 및 상태 업데이트 가이드

## 올바른 방법

### 1. 기본적인 API 호출 패턴

```javascript
const useStore = create((set, get) => ({
  data: null,
  isLoading: false,
  error: null,

  // ✅ 올바른 방법
  fetchData: async () => {
    try {
      set({ isLoading: true })
      const response = await apiClient.get('/data')
      set({ data: response, isLoading: false })
    } catch (error) {
      set({ error, isLoading: false })
    }
  }
}))
```

### 2. Immer를 사용한 상태 업데이트

```javascript
import { produce } from 'immer'

const useStore = create((set) => ({
  data: [],

  // ✅ Immer를 사용한 올바른 방법
  updateData: async () => {
    try {
      set({ isLoading: true })
      const response = await apiClient.get('/data')
      set(
        produce((state) => {
          state.data = response
          state.isLoading = false
        })
      )
    } catch (error) {
      set({ isLoading: false, error })
    }
  }
}))
```

### 3. 의존적인 상태 업데이트

```javascript
const useStore = create((set, get) => ({
  user: null,
  userPosts: [],

  // ✅ 올바른 방법 - get()을 사용하여 현재 상태 접근
  fetchUserPosts: async () => {
    const currentUser = get().user
    if (!currentUser) return

    try {
      set({ isLoading: true })
      const response = await apiClient.get(`/posts/${currentUser.id}`)
      set({ userPosts: response, isLoading: false })
    } catch (error) {
      set({ error, isLoading: false })
    }
  }
}))
```

## 잘못된 방법

### 1. 상태 업데이트 누락

```javascript
const useStore = create((set) => ({
  data: null,
  isLoading: false,

  // ❌ 잘못된 방법 - loading 상태 업데이트 누락
  fetchData: async () => {
    try {
      // isLoading true로 설정 누락
      const response = await apiClient.get('/data')
      set({ data: response })
      // isLoading false로 설정 누락
    } catch (error) {
      console.error(error)
    }
  }
}))
```

### 2. 비동기 상태 처리 오류

```javascript
const useStore = create((set) => ({
  data: null,

  // ❌ 잘못된 방법 - 비동기 처리 중 상태 일관성 깨짐
  fetchData: async () => {
    set({ isLoading: true })
    const response = await apiClient.get('/data')
    set({ data: response }) // 에러 발생 시 isLoading true로 남음
  }
}))
```

### 3. 중첩된 상태 업데이트 오류

```javascript
const useStore = create((set, get) => ({
  user: {
    profile: {
      name: ''
    }
  },

  // ❌ 잘못된 방법 - 중첩 객체 업데이트 시 불변성 위반
  updateUserName: async (newName) => {
    try {
      await apiClient.patch('/user/profile', { name: newName })
      const currentUser = get().user
      currentUser.profile.name = newName // 직접 수정 금지
      set({ user: currentUser })
    } catch (error) {
      console.error(error)
    }
  }
}))
```

### 4. 상태 업데이트 시점 오류

```javascript
const useStore = create((set) => ({
  data: null,

  // ❌ 잘못된 방법 - API 호출 전 상태 업데이트
  fetchData: async () => {
    set({ data: 'loading...' }) // API 응답 전 상태 변경
    const response = await apiClient.get('/data')
    set({ data: response })
  }
}))
```

## 권장 패턴

### 1. API 호출 시 항상 포함할 요소

```javascript
const useStore = create((set) => ({
  data: null,
  isLoading: false,
  error: null,

  // ✅ 권장되는 완전한 패턴
  fetchData: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await apiClient.get('/data')
      set({
        data: response,
        isLoading: false,
        error: null
      })
    } catch (error) {
      set({
        error,
        isLoading: false,
        data: null // 에러 시 데이터 초기화
      })
    }
  }
}))
```

### 2. 데이터 변환이 필요한 경우

```javascript
const useStore = create((set) => ({
  processedData: null,

  // ✅ 권장되는 데이터 변환 패턴
  fetchAndProcessData: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await apiClient.get('/data')

      const processedData = response.map((item) => ({
        ...item,
        processed: true
      }))

      set({
        processedData,
        isLoading: false,
        error: null
      })
    } catch (error) {
      set({ error, isLoading: false, processedData: null })
    }
  }
}))
```

### 3. 조건부 API 호출

```javascript
const useStore = create((set, get) => ({
  user: null,
  userPosts: [],

  // ✅ 권장되는 조건부 호출 패턴
  fetchUserPostsIfNeeded: async () => {
    const currentUser = get().user
    if (!currentUser) {
      set({ error: new Error('User not found') })
      return
    }

    if (get().userPosts.length > 0) {
      return // 이미 데이터가 있는 경우 중복 호출 방지
    }

    try {
      set({ isLoading: true, error: null })
      const response = await apiClient.get(`/posts/${currentUser.id}`)
      set({ userPosts: response, isLoading: false })
    } catch (error) {
      set({ error, isLoading: false })
    }
  }
}))
```

## 주의사항

1. 모든 API 호출 함수는 try-catch로 감싸서 에러 처리를 해야 합니다.
2. isLoading 상태는 try 블록 시작과 종료 시점에 각각 true/false로 설정합니다.
3. 에러 상태는 catch 블록에서 적절히 처리하고, 성공 시에는 null로 초기화합니다.
4. API 호출 전후로 불필요한 상태 업데이트를 하지 않습니다.
5. 중첩된 객체 상태 업데이트 시 Immer 사용을 권장합니다.

## 추가 팁

- API 호출 결과를 캐싱해야 하는 경우, 별도의 캐시 상태를 관리하는 것이 좋습니다.
- 데이터 변환 로직이 복잡한 경우, 별도의 유틸리티 함수로 분리하는 것이 좋습니다.
- API 호출 중복을 방지하기 위한 디바운스/쓰로틀링을 고려하세요.
