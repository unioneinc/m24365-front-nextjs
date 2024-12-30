# Zustand Store 사용 가이드

## 1. Store 구조 개요

프로젝트에는 두 가지 타입의 store가 존재합니다:

1. **독립형 Store** (개별 모듈)

   - 인증(Authentication)
   - 사용자(User)
   - 그룹(Group)
   - 등 각 기능별 독립 store

2. **통합형 Store** (storeZustand.ts)
   - 공통으로 사용되는 UI 상태 관리
   - Dialog, Alert 등 공통 컴포넌트 상태

## 2. 독립형 Store 사용하기

### 2.1 Authentication Store

```typescript
// 스토어 import
import { useAuthStore } from '@/stores/authentication'

// 컴포넌트에서 사용
const LoginComponent = () => {
  const { login, isLoading, myInfo } = useAuthStore()

  const handleLogin = async (credentials) => {
    const result = await login(credentials)
    if (result.success) {
      // 로그인 성공 처리
    }
  }

  return (
    // JSX
  )
}
```

### 2.2 User Store

```typescript
import { useStore } from '@/stores/useStore'

const UserComponent = () => {
  // 상태 구독
  const myInfo = useStore((state) => state.myInfo)
  const selectedMembers = useStore((state) => state.SelectMemberList)

  // 액션 사용
  const { addSelectedMember, removeSelectedMember } = useStore()

  const handleAddMember = (member) => {
    addSelectedMember(member)
  }
}
```

### 2.3 Group Store

```typescript
import { useStore } from '@/stores/useStore'

const GroupComponent = () => {
  const currentGroup = useStore((state) => state.currentGroup)
  const groupMembers = useStore((state) => state.groupMemberList)

  const { setCurrentGroup, setGroupMemberList } = useStore()

  useEffect(() => {
    if (currentGroup) {
      // 그룹 멤버 로드 등의 작업
    }
  }, [currentGroup])
}
```

## 3. 통합형 Store 사용하기 (storeZustand.ts)

### 3.1 기본 사용법

```typescript
import { useCommonStore } from '@/stores/storeZustand'

const CommonComponent = () => {
  // 상태 구독
  const { isLoading, dialogOpen } = useCommonStore()

  // 액션 사용
  const { showDialog, hideDialog, setLoading } = useCommonStore()

  const handleAction = async () => {
    setLoading(true)
    try {
      await someAsyncAction()
      showDialog('성공!')
    } finally {
      setLoading(false)
    }
  }
}
```

### 3.2 Dialog 관리

```typescript
const DialogComponent = () => {
  const { showDialog, hideDialog } = useCommonStore()

  const handleShowConfirm = () => {
    showDialog({
      type: 'confirm',
      title: '확인',
      content: '계속 진행하시겠습니까?',
      onConfirm: () => {
        // 확인 시 처리
      }
    })
  }
}
```

## 4. 성능 최적화

### 4.1 선택적 구독

```typescript
// 좋은 예
const userInfo = useStore((state) => state.myInfo)

// 피해야 할 예 (전체 상태 구독)
const { myInfo, groupMemberList, SelectMemberList } = useStore()
```

### 4.2 불필요한 리렌더링 방지

```typescript
import { shallow } from 'zustand/shallow'

// 여러 상태를 구독할 때 shallow 비교 사용
const { name, email } = useStore(
  (state) => ({
    name: state.myInfo?.name,
    email: state.myInfo?.email
  }),
  shallow
)
```

## 5. 비동기 작업 처리

```typescript
const ProfileComponent = () => {
  const { fetchMyInfo, isLoading } = useAuthStore()

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchMyInfo()
      } catch (error) {
        // 에러 처리
      }
    }
    loadData()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }
}
```

## 6. Store 간 상호작용

필요한 경우 여러 store의 상태나 액션을 조합하여 사용할 수 있습니다:

```typescript
const ComplexComponent = () => {
  // 여러 store 사용
  const { myInfo } = useAuthStore()
  const { currentGroup } = useStore()
  const { showDialog } = useCommonStore()

  const handleComplexAction = async () => {
    if (!myInfo || !currentGroup) {
      showDialog({
        type: 'alert',
        content: '필요한 정보가 없습니다.'
      })
      return
    }

    // 복합 작업 수행
  }
}
```

## 7. 주의사항

1. **서버 컴포넌트에서 사용 금지**

   ```typescript
   // 🚫 잘못된 사용
   export default function ServerComponent() {
     const store = useStore() // 에러 발생!
   }

   // ✅ 올바른 사용
   ;('use client')
   export default function ClientComponent() {
     const store = useStore() // 정상 동작
   }
   ```

2. **상태 초기화**

   ```typescript
   const { reset } = useStore()

   // 로그아웃 시 상태 초기화
   const handleLogout = () => {
     reset()
   }
   ```

3. **비동기 작업 에러 처리**

   ```typescript
   const { fetchData } = useStore()

   try {
     await fetchData()
   } catch (error) {
     console.error('데이터 로드 실패:', error)
     // 에러 처리 로직
   }
   ```

## 8. 개발 도구 활용

### 8.1 Redux DevTools 사용

store가 devtools 미들웨어를 사용하고 있어 Redux DevTools로 상태 변화를 추적할 수 있습니다.

### 8.2 디버깅 팁

```typescript
// 현재 상태 확인
console.log(useStore.getState())

// 특정 상태 변화 구독
useStore.subscribe(
  (state) => state.myInfo,
  (myInfo) => console.log('myInfo changed:', myInfo)
)
```

## 9. 타입스크립트 지원

```typescript
// 타입 정의
interface State {
  myInfo: UserInfo | null
  setMyInfo: (info: UserInfo | null) => void
}

// 타입이 지정된 store 사용
const useStore = create<State>((set) => ({
  myInfo: null,
  setMyInfo: (info) => set({ myInfo: info })
}))
```

이 가이드는 프로젝트의 store 사용에 대한 기본적인 내용을 다룹니다. 추가적인 사용 사례나 특별한 요구사항이 있다면 개별 문서를 참고하시기 바랍니다.
