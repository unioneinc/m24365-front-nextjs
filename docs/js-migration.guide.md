# Next.js TypeScript에서 JavaScript 마이그레이션 가이드

## ⚠️ 중요 사항

### 프로젝트 환경 설정

- Next.js: 14.1.0
- React: 18.2.0
- Material UI: @mui/material 5.15.11
- App Router 방식 사용

### ‼️ 패키지 호환성 (매우 중요)

**반드시 package.json의 의존성을 확인해야 합니다!**

- 모든 라이브러리 설치 전 package.json의 버전 호환성 검토
- 새로운 라이브러리 추가 시 기존 의존성과의 호환성 확인 필수
- peer dependency 충돌 주의

## 1. 변환 기본 원칙

### 1.1 파일 변환 규칙

- .tsx → .js 확장자 변경
- .ts → .js 확장자 변경
- 모든 타입 관련 import 제거
- 세미콜론(;) 제거 (특별한 경우 제외)

### 1.2 타입 제거 규칙

- interface / type 정의 제거
- 제네릭 타입 제거
- 타입 어노테이션 제거
- React.FC 등 타입 지정자 제거

## 2. 컴포넌트 변환 가이드

### 2.1 함수형 컴포넌트

```javascript
// 변환 전 (TypeScript)
interface Props {
  name: string
  age?: number
  onClick: () => void
}

const Component: React.FC<Props> = ({ name, age, onClick }) => {
  return (
    <div onClick={onClick}>
      {name} {age}
    </div>
  )
}

// 변환 후 (JavaScript)
const Component = ({ name, age, onClick }) => {
  return (
    <div onClick={onClick}>
      {name} {age}
    </div>
  )
}
```

### 2.2 훅 사용 컴포넌트

```javascript
// 변환 전 (TypeScript)
interface User {
  id: number
  name: string
}

const UserComponent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect((): void => {
    fetchUser()
  }, [])

  return <div>{user?.name}</div>
}

// 변환 후 (JavaScript)
const UserComponent = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser()
  }, [])

  return <div>{user?.name}</div>
}
```

### 2.3 Material UI 컴포넌트

```javascript
// 변환 전 (TypeScript)
interface ButtonProps {
  variant?: 'text' | 'contained' | 'outlined'
  onClick: () => void
}

const CustomButton: React.FC<ButtonProps> = ({ variant = 'contained', onClick }) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
    >
      Click me
    </Button>
  )
}

// 변환 후 (JavaScript)
const CustomButton = ({ variant = 'contained', onClick }) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
    >
      Click me
    </Button>
  )
}
```

## 3. API 및 서비스 변환

### 3.1 API 호출

```javascript
// 변환 전 (TypeScript)
interface Response {
  data: any[]
  status: number
}

async function fetchData(): Promise<Response> {
  const response = await axios.get('/api/data')
  return response
}

// 변환 후 (JavaScript)
async function fetchData() {
  const response = await axios.get('/api/data')
  return response
}
```

### 3.2 커스텀 훅

```javascript
// 변환 전 (TypeScript)
interface UseCounterProps {
  initialValue?: number
}

const useCounter = ({ initialValue = 0 }: UseCounterProps) => {
  const [count, setCount] = useState<number>(initialValue)
  return { count, setCount }
}

// 변환 후 (JavaScript)
const useCounter = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue)
  return { count, setCount }
}
```

## 4. Next.js App Router 특화 가이드

### 4.1 페이지 컴포넌트

```javascript
// app/page.js
export default function Page() {
  return <div>페이지 컴포넌트</div>
}
```

### 4.2 레이아웃 컴포넌트

```javascript
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
```

## 5. 품질 관리

### 5.1 PropTypes 사용 (선택사항)

```javascript
import PropTypes from 'prop-types'

const Component = ({ name, age }) => {
  return (
    <div>
      {name} {age}
    </div>
  )
}

Component.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
}
```

### 5.2 테스트 코드 변환

```javascript
// 변환 전 (TypeScript)
describe('Component', (): void => {
  it('renders correctly', (): void => {
    render(<Component name="test" />)
  })
})

// 변환 후 (JavaScript)
describe('Component', () => {
  it('renders correctly', () => {
    render(<Component name="test" />)
  })
})
```

## 6. 라이브러리 설치 가이드

### 6.1 필수 라이브러리 설치

```bash
# 기본 의존성
yarn add @mui/material@5.15.11 @mui/icons-material@6.2.1 @emotion/react@^11.14.0 @emotion/styled@^11.14.0

# 개발 의존성
yarn add -D @testing-library/react@^16.1.0 @testing-library/jest-dom@^6.6.3
```

### 6.2 선택적 라이브러리

```bash
# PropTypes (타입 체크가 필요한 경우)
yarn add prop-types

# 상태관리
yarn add zustand@4.5.1 immer@^10.1.1

# API 통신
yarn add axios@^1.7.9
```

## 7. 주의사항 및 팁

### 7.1 코드 스타일

- 세미콜론 사용하지 않기
- ES6+ 문법 적극 활용
- 일관된 들여쓰기 유지
- 명확한 변수/함수명 사용

### 7.2 성능 최적화

- React.memo 적절히 사용
- useMemo, useCallback 활용
- 불필요한 리렌더링 방지
- 이미지 최적화 (Next/Image 사용)

### 7.3 디버깅

- Console.log 활용
- React Developer Tools 사용
- Network 탭 모니터링
- 에러 바운더리 구현

## 8. 문제 해결 가이드

### 8.1 일반적인 오류

- 타입 관련 오류: PropTypes 도입 고려
- 호환성 오류: package.json 버전 확인
- 빌드 오류: 불필요한 타입 import 확인

### 8.2 성능 이슈

- 번들 사이즈 최적화
- 코드 스플리팅 활용
- 레이지 로딩 구현
- 캐싱 전략 수립
