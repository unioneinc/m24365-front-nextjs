# TypeScript에서 JavaScript로의 변환 가이드

## 1. 주요 변경사항

### 1.1 타입 정보 제거

- `@ts-nocheck` 주석 제거
- 타입 인터페이스 및 타입 선언 제거
- 함수 매개변수의 타입 정보 제거

### 1.2 코드 구조 변경

- 코드 로직은 그대로 유지
- 세미콜론(;) 제거
- 기존 함수형 구조 유지

## 2. 주요 기능 설명

### 2.1 상태 관리

- Zustand를 사용한 상태 관리 구현
- `initialState`를 통한 기본 상태 정의
- devtools 미들웨어를 통한 디버깅 지원

### 2.2 인증 관련 기능

- 로그인 상태 관리 (-1: 초기값, 1: 로그인성공, 0: 로그아웃/실패)
- 사용자 정보 관리
- 로딩 상태 관리
- 페이지 타이틀 관리

### 2.3 주요 메서드

- `setLoading`: 로딩 상태 설정
- `setAuthentication`: 인증 상태 설정
- `setTitle`: 페이지 타이틀 설정
- `getAuthentication`: 사용자 인증 정보 조회
- `login`: 로그인 처리
- `logout`: 로그아웃 처리
- `reset`: 스토어 초기화

## 3. 의존성 설치

프로젝트에 필요한 패키지들을 설치하기 위해 다음 명령어를 실행하세요:

```bash
yarn add zustand @mui/material moment axios
```

## 4. 주의사항

1. 브라우저 환경에서만 사용 가능한 API들이 포함되어 있으므로, SSR 환경에서 사용시 주의가 필요합니다.
2. axios 인스턴스는 별도로 구성해야 합니다.
3. 라우터 객체는 Next.js의 라우터를 사용합니다.
4. 토큰 관리는 localStorage를 사용하므로 보안에 주의가 필요합니다.

## 5. 사용 예시

```javascript
const { login, logout, myinfo } = useAuthStore()

// 로그인
await login(
  {
    username: 'user',
    password: 'pass'
  },
  router
)

// 로그아웃
await logout(router)

// 현재 사용자 정보 확인
console.log(myinfo)
```
