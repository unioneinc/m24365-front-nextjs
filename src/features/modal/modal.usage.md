````markdown:src/features/modal/modal.usage.md
# Modal 컴포넌트 사용 가이드

## 1. 설정

### Provider 설정
최상위 컴포넌트에 ModalProvider를 추가합니다:

```javascript
// app/layout.js 또는 최상위 컴포넌트
import { ModalProvider } from '@/features/modal'

function RootLayout({ children }) {
  return (
    <ModalProvider>
      {children}
    </ModalProvider>
  )
}
````

## 2. 모달 컴포넌트 구현

커스텀 모달 컴포넌트를 생성합니다:

```javascript
import ModalHeader from '@/features/modal/components/modal-header'
import styles from '@/features/modal/components/modal.module.scss'

const CustomModal = ({ isOpen, onClose, onSubmit, data }) => {
  return (
    <div className={styles.modalContent}>
      <ModalHeader title={data.title} onClose={onClose} />
      <div>{/* 모달 컨텐츠 */}</div>
    </div>
  )
}
```

## 3. 모달 사용하기

useModal 훅을 사용하여 모달을 열고 닫습니다:

```javascript
import { useModal } from '@/features/modal'

const MyComponent = () => {
  const { openModal } = useModal()

  const handleOpenModal = async () => {
    try {
      const result = await openModal(CustomModal, {
        data: {
          title: '모달 제목'
          // 추가 데이터
        }
      })
      if (result) {
        // 모달 결과 처리
      }
    } catch (error) {
      // 모달이 취소된 경우
    }
  }
}
```

## 4. 모달 타입

사용 가능한 모달 타입들:

```javascript
// modalTypes.js
const modalTypes = {
  ALERT: 'ALERT',
  CONFIRM: 'CONFIRM',
  CANCEL: 'CANCEL',
  GROUP_SELECT: 'GROUP_SELECT'
  // ... 기타 정의된 타입들
}
```

## 5. 스타일링

### 모달 기본 스타일

```scss
// modal.module.scss
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modalContent {
  background: white;
  border-radius: 12px;
  width: auto;
  height: auto;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: modalShow 0.3s ease-out;
}
```

### 헤더 스타일

```scss
// modal-header.module.scss
.header {
  height: 48px;
  width: 100%;
  padding: 15px 20px;
  background: #273168;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## 6. 에러 처리

모달 사용 시 에러 처리 예시:

```javascript
try {
  const result = await openModal(CustomModal, props)
  // 성공 처리
} catch (error) {
  // 모달이 취소되거나 에러 발생
  console.error('Modal error:', error)
}
```

```

```
