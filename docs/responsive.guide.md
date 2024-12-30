````markdown
# Next.js 반응형 구현 가이드 (useMediaQuery)

## 1. 기본 구성

### 1.1 필수 패키지 설치

```bash
yarn add @mui/material @emotion/react @emotion/styled sass
```
````

### 1.2 Theme 설정

```javascript
// app/theme/theme.js
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // 모바일
      sm: 600, // 태블릿
      md: 900, // 작은 데스크톱
      lg: 1200, // 중간 데스크톱
      xl: 1536 // 큰 데스크톱
    }
  }
})

export default theme
```

## 2. 컴포넌트 구조 설계

### 2.1 기본 컴포넌트 구조

```javascript
// app/group/page.js
'use client'

import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

function GroupPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      {isMobile ? (
        // 모바일용 컴포넌트
      ) : (
        // 데스크톱용 컴포넌트
      )}
    </>
  )
}

export default GroupPage
```

### 2.2 컴포넌트 분리

```javascript
// app/group/components/MobileView.js
function MobileView({ data }) {
  return <div className={styles.container}>{/* 모바일 전용 UI */}</div>
}

// app/group/components/DesktopView.js
function DesktopView({ data }) {
  return <div className={styles.container}>{/* 데스크톱 전용 UI */}</div>
}
```

## 3. 스타일 가이드

### 3.1 기본 SCSS 구조

```scss
// styles/variables.scss
// 1920px 기준 변환 함수
@function vw($px) {
  @return calc(100vw * ($px / 1920));
}

// vh 변환 함수 (1080px 기준)
@function vh($px) {
  @return calc(100vh * ($px / 1080));
}
```

### 3.2 컴포넌트 스타일 예시

```scss
// components/DesktopView.module.scss
.container {
  display: flex
  width: 100%
  max-width: 1920px
  margin: 0 auto

  .content {
    width: vw(500)  // 500px -> 반응형
    min-width: 300px
    max-width: 500px

    padding: vw(20)

    // 폰트 크기
    .title {
      font-size: vw(24)
      min-font-size: 16px
      max-font-size: 24px
    }
  }
}
```

## 4. 반응형 구현 원칙

### 4.1 레이아웃

- flex 기반 레이아웃 유지
- vw/vh 단위 사용으로 비율 유지
- min/max 값 설정으로 극단적 크기 방지
- gap은 vw 함수로 비율 계산

### 4.2 폰트

- 최소/최대 폰트 크기 지정
- vw 단위로 비율 설정
- 가독성 고려한 크기 조절

### 4.3 여백과 간격

- padding/margin도 vw 함수 사용
- 최소 여백 보장
- flex gap도 vw 단위 사용

## 5. 브라우저/디바이스 대응

### 5.1 크로스 브라우저

- Safari, Chrome, Firefox 호환성 확인
- -webkit-, -moz- 등 벤더 프리픽스 확인
- flex gap 지원 확인

### 5.2 디바이스 대응

- 태블릿 중간 사이즈 확인
- 모바일 가로/세로 모드 확인
- 다양한 해상도 테스트

## 6. 성능 최적화

### 6.1 이미지 최적화

- next/image 컴포넌트 사용
- 적절한 이미지 사이즈 선택
- WebP 포맷 사용 권장

### 6.2 렌더링 최적화

- 불필요한 리렌더링 방지
- React.memo 적절히 사용
- useCallback, useMemo 활용

## 7. 주의사항

1. 'use client' 지시문 필수
2. hydration 오류 주의
3. SSR 초기 렌더링 고려
4. useMediaQuery는 클라이언트 사이드 전용
5. flex 레이아웃 오버플로우 주의

```

```
