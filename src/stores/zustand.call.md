# Zustand 상태 관리 가이드

## 1. Store 정의

```javascript
'use client'

import { create } from 'zustand'

export const useAuthStore = create((set, get) => ({
  // 상태 정의
  loggedIn: -1,
  myinfo: null,
  isLoading: false,

  // 액션 정의
  setMyinfo: (data) => set({ myinfo: data }),
  setLoading: (status) => set({ isLoading: status }),

  // 복잡한 액션 정의
  getAuthentication: async () => {
    const state = get() // 현재 상태 가져오기
    set({ isLoading: true }) // 상태 업데이트

    try {
      const response = await someAPI()
      set({
        myinfo: response,
        isLoading: false
      })
    } catch (error) {
      set({ isLoading: false })
    }
  }
}))
```

## 2. 컴포넌트에서 상태 사용하기

### 2.1 기본적인 상태 가져오기

```javascript
// 단일 상태 가져오기
const myinfo = useAuthStore((state) => state.myinfo)

// 여러 상태 가져오기 (구조분해 할당 사용)
const { loggedIn, isLoading } = useAuthStore((state) => ({
  loggedIn: state.loggedIn,
  isLoading: state.isLoading
}))
```

### 2.2 주의해야 할 구조분해 할당

```javascript
// ❌ 잘못된 사용
const { myinfo } = useAuthStore((state) => state.myinfo) // 오류!

// ✅ 올바른 사용
const myinfo = useAuthStore((state) => state.myinfo) // 값 직접 선택

// ✅ 구조분해를 사용하고 싶다면
const { myinfo } = useAuthStore((state) => ({
  myinfo: state.myinfo
}))
```

### 2.3 액션 가져오기

```javascript
// 단일 액션 가져오기
const getAuthentication = useAuthStore((state) => state.getAuthentication)

// 여러 액션 함께 가져오기
const { setMyinfo, setLoading } = useAuthStore((state) => ({
  setMyinfo: state.setMyinfo,
  setLoading: state.setLoading
}))
```

## 3. Store 내부와 외부에서의 차이점

### 3.1 Store 내부에서 상태 업데이트

```javascript
// Store 내부
const someAction = () => {
  // ✅ set 함수 직접 사용
  set({ myinfo: newData })

  // ❌ store의 액션 직접 호출 불가
  // setMyinfo(newData)  // 작동하지 않음!

  // ✅ 현재 상태 가져오기
  const state = get()
  console.log(state.myinfo)
}
```

### 3.2 컴포넌트에서 상태 업데이트

```javascript
// 컴포넌트 내부
const Component = () => {
  // ✅ store의 액션 사용
  const setMyinfo = useAuthStore((state) => state.setMyinfo)

  const handleClick = () => {
    setMyinfo(newData)
  }
}
```

## 4. 자주 하는 실수와 해결방법

### 4.1 구조분해 할당 실수

```javascript
// ❌ 잘못된 방법
const { data } = useAuthStore((state) => state.data) // 오류!

// ✅ 올바른 방법
const data = useAuthStore((state) => state.data) // 직접 선택
```

### 4.2 상태 업데이트 실수

```javascript
// ❌ 잘못된 방법 (React useState 스타일)
setMyinfo((state) => ({
  ...state,
  newData
}))

// ✅ 올바른 방법
setMyinfo(newData) // 직접 값 전달
```

## 5. 성능 최적화

### 5.1 선택적 상태 구독

```javascript
// ❌ 불필요한 리렌더링 발생
const store = useAuthStore() // 전체 상태를 구독

// ✅ 필요한 상태만 구독
const myinfo = useAuthStore((state) => state.myinfo)
const isLoading = useAuthStore((state) => state.isLoading)
```

### 5.2 메모이제이션 활용

```javascript
import { useMemo } from 'react'
import { shallow } from 'zustand/shallow'

// 1. useMemo를 사용한 메모이제이션
const Component = () => {
  // selector 함수를 메모이제이션
  const selectMyinfo = useMemo(
    () => (state) => state.myinfo,
    [] // 의존성 배열이 비어있으므로 컴포넌트 마운트시 한번만 생성
  )

  const myinfo = useAuthStore(selectMyinfo)
}

// 2. 컴포넌트 외부에서 selector 정의
const selectMyinfo = (state) => state.myinfo
const selectUserData = (state) => ({
  myinfo: state.myinfo,
  isLoading: state.isLoading
})

const Component = () => {
  // 메모이제이션된 selector 사용
  const myinfo = useAuthStore(selectMyinfo)

  // shallow 비교를 사용한 최적화
  const { myinfo, isLoading } = useAuthStore(selectUserData, shallow)
}
```

### 5.3 shallow 비교를 사용한 최적화

```javascript
import { shallow } from 'zustand/shallow'

const Component = () => {
  // 여러 상태를 선택할 때 shallow 비교 사용
  const { myinfo, isLoading } = useAuthStore(
    (state) => ({
      myinfo: state.myinfo,
      isLoading: state.isLoading
    }),
    shallow // 객체의 얕은 비교를 통해 불필요한 리렌더링 방지
  )
}
```

## 6. 패키지 설치

```bash
yarn add zustand
```

## 7. 최적화 예제

### 7.1 잘못된 최적화

```javascript
const Component = () => {
  // ❌ 매 렌더링마다 새로운 selector 함수 생성
  const data = useAuthStore((state) => ({
    myinfo: state.myinfo,
    otherData: state.otherData
  }))
}
```

### 7.2 올바른 최적화

```javascript
// 컴포넌트 외부에 selector 정의
const selectMyinfo = (state) => state.myinfo
const selectOtherData = (state) => state.otherData

const Component = () => {
  // ✅ 메모이제이션된 selector 사용
  const myinfo = useAuthStore(selectMyinfo)
  const otherData = useAuthStore(selectOtherData)

  // 또는 shallow 비교 사용
  const { value1, value2 } = useAuthStore(
    (state) => ({
      value1: state.value1,
      value2: state.value2
    }),
    shallow
  )
}
```
