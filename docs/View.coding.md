# View 컴포넌트 코딩 패턴 가이드

## 1. 페이지네이션 처리

### 잘못된 방식

```javascript
// 로컬 상태로 관리
const [currentPage, setCurrentPage] = useState(1)

// 전체 페이지를 직접 표시
[...Array(pagination.totalPages)].map((_, i) => (
  <Button onClick={() => setCurrentPage(i + 1)}>
))
```

### 올바른 방식

```javascript
// pagination 훅 사용
const pagination = usePagination()

// paginationRange 사용하여 표시
Array.isArray(pagination.paginationRange) &&
  pagination.paginationRange.map((pageNum) => (
    <Button onClick={() => pagination.goToPage(pageNum)}>
))
```

### 주의사항

- 페이지 상태는 로컬이 아닌 pagination 훅으로 관리
- 전체 페이지가 아닌 paginationRange 사용
- pagination.goToPage() 메소드 사용

## 2. API 호출 패턴

### 잘못된 방식

```javascript
const resApi = await api.post(
  '/api/endpoint',
  data,
  token // 잘못된 인자 순서
)
```

### 올바른 방식

```javascript
const resApi = await api.post(
  '/api/endpoint',
  data,
  {}, // options 객체 추가
  token
)
```

### 주의사항

- API 호출 시 options 객체 누락하지 않기
- 토큰은 마지막 인자로 전달

## 3. 디버깅 로그

### 잘못된 방식

```javascript
useEffect(() => {
  logger.info('현재 페이지:', currentPage) // 로컬 상태 로깅
}, [currentPage])
```

### 올바른 방식

```javascript
useEffect(() => {
  logger.info('현재 페이지:', pagination.currentPage) // pagination 훅 상태 로깅
}, [pagination.currentPage])
```

### 주의사항

- 상태 관리 주체의 데이터를 로깅
- 중복된 상태 관리 피하기

## 4. 버튼 이벤트 처리

### 잘못된 방식

```javascript
<Button
  onClick={() => setCurrentPage(i + 1)} // 로컬 상태 변경
  disabled={currentPage === i + 1} // 로컬 상태로 비교
>
```

### 올바른 방식

```javascript
<Button
  onClick={() => pagination.goToPage(pageNum)} // pagination 메소드 사용
  disabled={pagination.currentPage === pageNum} // pagination 상태로 비교
>
```

### 주의사항

- 상태 관리 주체의 메소드 사용
- 상태 비교도 동일한 주체의 데이터 사용

## 5. 코드 일관성 유지

### 주의사항

- 동일한 기능은 동일한 패턴으로 구현
- 상태 관리는 한 곳에서만 수행
- 컴포넌트 간 코드 스타일 통일
