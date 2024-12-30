Code
CopyInsert

# Modal 사용 가이드

## 개요

이 애플리케이션은 React Context와 Provider를 통해 중앙 집중식 모달 시스템을 구현하고 있습니다. 모달 시스템은 ClientLayout 컴포넌트에서 설정되어 애플리케이션 전체에서 접근 가능합니다.

## 구현 세부사항

### 핵심 컴포넌트

1. `ModalProvider`: 모달 상태를 관리하고 모달 기능을 제공
2. `useModal`: 모달을 제어하기 위한 커스텀 훅
3. [Modal](cci:1://file:///root/apps/next/work/next-m24365/src/app/utils/ResposiveModal.jsx:6:0-57:1): 실제 컨텐츠를 렌더링하는 모달 컴포넌트

## 사용 방법

### 1. 모달 열기

```typescript
const { openModal } = useModal();

// 기본 사용법
openModal({
  content: <모달내용컴포넌트 />,
  title: "모달 제목",
});

// 추가 옵션 사용
openModal({
  content: <모달내용컴포넌트 />,
  title: "모달 제목",
  size: "md", // 사용 가능한 크기: sm, md, lg, xl, full
  closeOnClickOutside: true,
  showCloseButton: true,
});
2. 모달 닫기
Code
CopyInsert
const { closeModal } = useModal();

// 현재 모달 닫기
closeModal();
3. 모달 속성
Code
CopyInsert
interface ModalProps {
  title?: string;
  content: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnClickOutside?: boolean;
  showCloseButton?: boolean;
}
4. 사용 예시
Code
CopyInsert
import { useModal } from '@/components/modal/useModal';

function YourComponent() {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal({
      title: "확인",
      content: (
        <div>
          <p>진행하시겠습니까?</p>
          <button onClick={handleConfirm}>확인</button>
        </div>
      ),
      size: "md",
    });
  };

  return (
    <button onClick={handleOpenModal}>모달 열기</button>
  );
}

### 모범 사례
- 모달을 닫을 때 컨텐츠 정리하기 (필요한 경우 useEffect 사용)
- 컨텐츠에 맞는 적절한 모달 크기 사용
- 모달 컨텐츠 설계 시 모바일 반응형 고려
- 다음과 같은 상황에서 모달 시스템 활용:
  - 확인 대화상자
  - 폼
  - 상세 정보 표시
  - 사용자 집중이 필요한 상호작용
- 참고사항
  - ClientLayout 하위의 모든 컴포넌트에서 모달 시스템 사용 가능
  - 여러 모달을 중첩할 수 있으나, UX를 위해 권장하지 않음
  - 모달 컨텐츠에는 모든 유효한 React 컴포넌트 사용 가능
  - ESC 키를 통한 모달 닫기 등 키보드 이벤트 자동 처리

### 접근성
- 모달이 열릴 때 포커스 자동 이동
- 키보드 탐색 지원
- 스크린 리더 호환성 제공


## 경로

모달 프로바이더 및 컨텍스트:

## CopyInsert
/src/app/providers/index.tsx
/src/app/providers/ModalProvider.tsx

## 모달 컴포넌트:

/src/components/modal/Modal.tsx
/src/components/modal/useModal.ts

## 레이아웃 관련:

/src/app/ClientLayout.tsx

## 모달 스타일:

/src/styles/components/modal.scss
/src/styles/components/modal.scss
또는
/src/components/modal/Modal.module.scss
```
