# ESLint 가이드 및 코드 품질 개선 방안

## 주요 문제점 및 해결 방안

### 1. Console.log 사용 (no-console)

현재 상태:

- 개발 환경에서는 console.log 허용
- 프로덕션 환경에서는 경고 표시

해결 방안:

```javascript
// 기존 코드
console.log('디버그 메시지')

// 개선된 코드
import { logger } from '~/lib/logger'
logger.info('디버그 메시지')
logger.error('에러 메시지')
logger.debug('디버그 정보')
```

### 2. 미사용 변수 (no-unused-vars)

현재 상태:

- 미사용 변수에 대한 경고 발생
- 특히 이벤트 핸들러와 컴포넌트 props에서 자주 발생

해결 방안:

```javascript
// 의도적으로 사용하지 않는 매개변수
function handleClick(_event) {
  // _event는 사용하지 않음을 명시
}

// 구조 분해 할당에서 필요없는 속성 제외
const { used, _unused, ...rest } = props
```

### 3. Next.js 이미지 최적화 (@next/next/no-img-element)

현재 상태:

- HTML `<img>` 태그 사용으로 인한 성능 저하 가능성
- 이미지 최적화 기능 미사용

해결 방안:

```javascript
// 기존 코드
;<img src="/images/logo.png" alt="로고" />

// 개선된 코드
import Image from 'next/image'
;<Image
  src="/images/logo.png"
  alt="로고"
  width={100}
  height={100}
  priority={true} // 중요한 이미지의 경우
/>
```

### 4. 익명 내보내기 (import/no-anonymous-default-export)

현재 상태:

- 설정 파일 등에서 익명 객체 직접 내보내기 사용

해결 방안:

```javascript
// 기존 코드
export default {
  // 설정
}

// 개선된 코드
const config = {
  // 설정
}
export default config
```

## 빌드 시 주의사항

### 1. 타입 관련 오류

- PropTypes 정의 추가
- 컴포넌트 props 타입 명시
- TypeScript 도입 고려

### 2. 미사용 Import

- 사용하지 않는 import 제거
- 동적 import 사용 검토
- 번들 크기 최적화

### 3. 접근성 (Accessibility)

- 이미지에 alt 텍스트 추가
- ARIA 레이블 추가
- 키보드 네비게이션 지원

### 4. 성능 최적화

- 이미지 최적화
- 코드 스플리팅
- 번들 크기 최적화
- 불필요한 리렌더링 방지

## ESLint 규칙 설정

.eslintrc.js:

```javascript
module.exports = {
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_'
      }
    ],
    '@next/next/no-img-element': 'warn',
    'import/no-anonymous-default-export': 'off'
  }
}
```

## 점진적 개선 계획

1. 단계별 접근:

   - 중요한 오류부터 해결
   - 성능에 직접적인 영향을 미치는 문제 우선 처리
   - 접근성 문제 해결
   - 코드 품질 개선

2. 우선순위:

   - 빌드 실패 유발 오류
   - 런타임 오류 가능성
   - 성능 관련 경고
   - 코드 스타일 경고

3. 모니터링:
   - 정기적인 lint 검사
   - 빌드 로그 확인
   - 성능 메트릭 모니터링
