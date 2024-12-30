# Zustand 상태 관리 가이드

## 1. Store 생성 기본 패턴

### 1.1 기본 Store 생성

```typescript
import { create } from 'zustand'

const useStore = create((set, get) => ({
  // 상태
  count: 0,
  text: 'hello',

  // 액션
  increment: () => set((state) => ({ count: state.count + 1 })),
  setText: (newText) => set({ text: newText })
}))
```

## 2. Set 패턴

### 2.1 단순 값 설정

```typescript
// ✅ 올바른 방식
setText: (newText) => set({ text: newText })

// ❌ 잘못된 방식 - 불필요한 중첩과 state 매개변수
setText: (state) => set(() => ({ text: value }))
```

### 2.2 이전 상태를 참조해야 하는 경우

```typescript
// ✅ 올바른 방식
increment: () => set((state) => ({ count: state.count + 1 }))
addToList: (item) => set((state) => ({ items: [...state.items, item] }))
```

### 2.3 객체 업데이트

```typescript
// ✅ 올바른 방식 (이전 상태 유지)
updateUser: (newData) =>
  set((state) => ({
    user: { ...state.user, ...newData }
  }))

// ❌ 잘못된 방식 (이전 상태 손실)
updateUser: (newData) => set({ user: newData })
```

## 3. Immer 사용 패턴

### 3.1 기본 Immer 설정

```typescript
import { create } from 'zustand'
import { produce } from 'immer'

const useStore = create((set) => ({
  nested: {
    obj: { count: 0 }
  },

  updateNested: () =>
    set(
      produce((state) => {
        state.nested.obj.count += 1
      })
    )
}))
```

### 3.2 복잡한 객체 업데이트

```typescript
const useStore = create((set) => ({
  user: {
    profile: {
      name: 'Kim',
      settings: {
        theme: 'dark'
      }
    }
  },

  // ✅ Immer를 사용한 중첩 객체 업데이트
  updateTheme: (newTheme) =>
    set(
      produce((state) => {
        state.user.profile.settings.theme = newTheme
      })
    )
}))
```

## 4. 다른 컴포넌트에서 Store 사용하기

### 4.1 상태 구독

```typescript
// Component.tsx
import { useStore } from './store'

function Component() {
  // 단일 상태 구독
  const count = useStore((state) => state.count)

  // 여러 상태 구독
  const { text, setText } = useStore((state) => ({
    text: state.text,
    setText: state.setText
  }))

  return (
    <div>
      <p>Count: {count}</p>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  )
}
```

### 4.2 성능 최적화

```typescript
// 선택자 함수를 컴포넌트 외부로 분리
const selectUser = (state) => state.user
const selectCount = (state) => state.count

function OptimizedComponent() {
  const user = useStore(selectUser)
  const count = useStore(selectCount)

  return <div>{/* ... */}</div>
}
```

## 5. 비동기 액션 처리

### 5.1 기본 비동기 액션

```typescript
const useStore = create((set) => ({
  data: null,
  isLoading: false,

  fetchData: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch('/api/data')
      const data = await response.json()
      set({ data, isLoading: false })
    } catch (error) {
      set({ error, isLoading: false })
    }
  }
}))
```

### 5.2 이전 상태를 참조하는 비동기 액션

```typescript
const useStore = create((set, get) => ({
  items: [],

  addItemAsync: async (newItem) => {
    const response = await fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(newItem)
    })
    const savedItem = await response.json()

    set((state) => ({
      items: [...state.items, savedItem]
    }))
  }
}))
```

## 6. Get 패턴

### 6.1 다른 상태를 참조해야 하는 경우

```typescript
const useStore = create((set, get) => ({
  user: null,
  posts: [],

  // get을 사용하여 현재 상태 참조
  fetchUserPosts: async () => {
    const user = get().user
    if (!user) return

    const response = await fetch(`/api/users/${user.id}/posts`)
    const posts = await response.json()
    set({ posts })
  }
}))
```

## 7. 주의사항과 Best Practices

### 7.1 상태 업데이트 시 주의사항

- 항상 불변성을 유지해야 합니다
- 객체나 배열 업데이트 시 이전 상태를 참조하세요
- 복잡한 중첩 객체는 Immer 사용을 고려하세요

### 7.2 성능 최적화

- 필요한 상태만 구독하세요
- 선택자 함수를 컴포넌트 외부로 분리하세요
- 큰 객체는 작은 단위로 나누어 관리하세요

### 7.3 TypeScript 사용 시 팁

```typescript
interface State {
  count: number
  text: string
  increment: () => void
  setText: (text: string) => void
}

const useStore = create<State>((set) => ({
  count: 0,
  text: '',
  increment: () => set((state) => ({ count: state.count + 1 })),
  setText: (text) => set({ text })
}))
```

## immder produce 사용시 팁

Immer의 produce 사용 예시

````markdown
## 3. Immer Produce 패턴

### 3.1 기본적인 produce 사용

```typescript
import { create } from 'zustand'
import { produce } from 'immer'

const useStore = create((set) => ({
  user: {
    name: 'Kim',
    age: 30,
    addresses: [
      { id: 1, city: 'Seoul' },
      { id: 2, city: 'Busan' }
    ]
  },

  // 단순 업데이트
  updateName: (newName) =>
    set(
      produce((state) => {
        state.user.name = newName
      })
    ),

  // 배열 수정
  addAddress: (newAddress) =>
    set(
      produce((state) => {
        state.user.addresses.push(newAddress)
      })
    ),

  // 조건부 업데이트
  updateAddress: (id, city) =>
    set(
      produce((state) => {
        const address = state.user.addresses.find((addr) => addr.id === id)
        if (address) {
          address.city = city
        }
      })
    )
}))
```
````

### 3.2 복잡한 중첩 상태 업데이트

```typescript
const useComplexStore = create((set) => ({
  organization: {
    departments: [
      {
        id: 1,
        name: 'IT',
        teams: [
          {
            id: 101,
            name: 'Frontend',
            members: [{ id: 1001, name: 'Kim', role: 'developer' }]
          }
        ]
      }
    ]
  },

  // 깊은 중첩 상태 업데이트
  updateMemberRole: (deptId, teamId, memberId, newRole) =>
    set(
      produce((state) => {
        const dept = state.organization.departments.find((d) => d.id === deptId)
        if (dept) {
          const team = dept.teams.find((t) => t.id === teamId)
          if (team) {
            const member = team.members.find((m) => m.id === memberId)
            if (member) {
              member.role = newRole
            }
          }
        }
      })
    )
}))
```

### 3.3 상태 배열 조작

```typescript
const useArrayStore = create((set) => ({
  todos: [
    { id: 1, text: '할 일 1', completed: false },
    { id: 2, text: '할 일 2', completed: true }
  ],

  // 배열 항목 추가
  addTodo: (text) =>
    set(
      produce((state) => {
        state.todos.push({
          id: Date.now(),
          text,
          completed: false
        })
      })
    ),

  // 배열 항목 업데이트
  toggleTodo: (id) =>
    set(
      produce((state) => {
        const todo = state.todos.find((t) => t.id === id)
        if (todo) {
          todo.completed = !todo.completed
        }
      })
    ),

  // 배열 항목 제거
  removeTodo: (id) =>
    set(
      produce((state) => {
        state.todos = state.todos.filter((t) => t.id !== id)
      })
    )
}))
```

### 3.4 비동기 작업과 함께 사용

```typescript
const useAsyncStore = create((set) => ({
  data: {
    items: [],
    loading: false,
    error: null
  },

  fetchItems: async () => {
    set(
      produce((state) => {
        state.data.loading = true
        state.data.error = null
      })
    )

    try {
      const response = await fetch('/api/items')
      const items = await response.json()

      set(
        produce((state) => {
          state.data.items = items
          state.data.loading = false
        })
      )
    } catch (error) {
      set(
        produce((state) => {
          state.data.error = error.message
          state.data.loading = false
        })
      )
    }
  }
}))
```

```

이 예시들은 Immer의 produce를 사용하여:
1. 중첩된 객체 수정
2. 배열 조작
3. 조건부 업데이트
4. 비동기 상태 관리

등 다양한 상황에서의 상태 업데이트를 보여줍니다. Immer를 사용하면 불변성을 신경 쓰지 않고도 상태를 직접 수정하는 것처럼 코드를 작성할 수 있습니다.
```
