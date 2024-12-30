# Pagination 컴포넌트 사용 가이드 (Next.js App Router)

## 개요

Pagination 컴포넌트는 Next.js 13+ App Router 환경에서 사용할 수 있는 클라이언트 사이드 페이지네이션 컴포넌트입니다.

## 특징

- Next.js 13+ App Router 지원
- TypeScript로 작성
- 서버 컴포넌트와 함께 사용 가능
- 클라이언트 사이드 페이지네이션 지원
- WAI-ARIA 접근성 지원

## Props

| Prop 이름    | 타입                            | 필수 여부 | 설명                                    |
| ------------ | ------------------------------- | --------- | --------------------------------------- |
| currentPage  | number                          | 필수      | 현재 페이지 번호                        |
| totalPages   | number                          | 필수      | 전체 페이지 수                          |
| onPageChange | (page: number) => void          | 필수      | 페이지 변경 시 호출되는 핸들러          |
| onPageLoad   | (page: number) => Promise<void> | 필수      | 페이지 데이터 로딩을 위한 비동기 핸들러 |

## 기본 사용법

### 클라이언트 컴포넌트에서 사용

```tsx
// app/_components/DataTable.tsx
'use client'

import { useState } from 'react'
import Pagination from '@/components/ui/pagination'

export default function DataTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<any[]>([])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageLoad = async (page: number) => {
    try {
      const response = await fetch(`/api/data?page=${page}`)
      const result = await response.json()
      setData(result.data)
    } catch (error) {
      console.error('데이터 로딩 실패:', error)
    }
  }

  return (
    <div>
      {/* 데이터 표시 */}
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={handlePageChange}
        onPageLoad={handlePageLoad}
      />
    </div>
  )
}
```

### 서버 컴포넌트와 함께 사용

```tsx
// app/page.tsx
import { Suspense } from 'react'
import DataTable from './_components/DataTable'
import Loading from './loading'

export default async function Page() {
  // 초기 데이터 fetch
  const initialData = await fetchInitialData()

  return (
    <main>
      <h1>데이터 목록</h1>
      <Suspense fallback={<Loading />}>
        <DataTable initialData={initialData} />
      </Suspense>
    </main>
  )
}
```

### URL 기반 페이지네이션

```tsx
// app/posts/[[...page]]/page.tsx
import { Suspense } from 'react'
import PostList from './_components/PostList'

export default async function PostsPage({ params }: { params: { page?: string[] } }) {
  const currentPage = params?.page?.[0] ? parseInt(params.page[0]) : 1

  // 서버에서 초기 데이터 fetch
  const initialData = await fetchPosts(currentPage)

  return (
    <Suspense>
      <PostList initialData={initialData} initialPage={currentPage} />
    </Suspense>
  )
}
```

```tsx
// app/posts/_components/PostList.tsx
'use client'

import { useRouter } from 'next/navigation'
import Pagination from '@/components/ui/pagination'

interface PostListProps {
  initialData: any
  initialPage: number
}

export default function PostList({ initialData, initialPage }: PostListProps) {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [currentPage, setCurrentPage] = useState(initialPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    router.push(`/posts/${page}`)
  }

  const handlePageLoad = async (page: number) => {
    try {
      const response = await fetch(`/api/posts?page=${page}`)
      const newData = await response.json()
      setData(newData)
    } catch (error) {
      console.error('데이터 로딩 실패:', error)
    }
  }

  return (
    <div>
      {/* 데이터 표시 로직 */}
      <Pagination
        currentPage={currentPage}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
        onPageLoad={handlePageLoad}
      />
    </div>
  )
}
```

### API Route 구현 예시

```tsx
// app/api/posts/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  try {
    // 데이터베이스에서 데이터 조회
    const posts = await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    })

    const total = await prisma.post.count()

    return NextResponse.json({
      data: posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    })
  } catch (error) {
    return NextResponse.json({ error: '데이터 조회 실패' }, { status: 500 })
  }
}
```

## 서버 액션과 함께 사용

```tsx
// app/_actions/posts.ts
'use server'

export async function fetchPosts(page: number) {
  const limit = 10
  const skip = (page - 1) * limit

  try {
    const posts = await prisma.post.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    })

    const total = await prisma.post.count()

    return {
      data: posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    }
  } catch (error) {
    throw new Error('데이터 조회 실패')
  }
}
```

```tsx
// app/_components/PostList.tsx
'use client'

import { fetchPosts } from '@/app/_actions/posts'
import Pagination from '@/components/ui/pagination'

export default function PostList({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageLoad = async (page: number) => {
    try {
      const newData = await fetchPosts(page)
      setData(newData)
    } catch (error) {
      console.error('데이터 로딩 실패:', error)
    }
  }

  return (
    <div>
      {/* 데이터 표시 */}
      <Pagination
        currentPage={currentPage}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
        onPageLoad={handlePageLoad}
      />
    </div>
  )
}
```

## 주의사항

1. 컴포넌트는 'use client' 지시어를 포함하고 있으므로, 서버 컴포넌트에서 직접 사용할 수 없습니다.
2. 서버 컴포넌트에서 사용할 때는 반드시 클라이언트 컴포넌트로 감싸서 사용해야 합니다.
3. URL 기반 페이지네이션을 사용할 때는 페이지 파라미터 처리에 주의해야 합니다.
4. 서버 액션을 사용할 때는 에러 처리에 특히 주의해야 합니다.

## 트러블슈팅

1. "해당 컴포넌트는 서버 컴포넌트에서 사용할 수 없습니다" 에러

   - 컴포넌트를 클라이언트 컴포넌트로 감싸서 사용하세요.
   - 'use client' 지시어가 있는 별도의 컴포넌트를 만드세요.

2. Hydration 불일치 에러

   - 초기 페이지 번호가 서버와 클라이언트에서 일치하는지 확인하세요.
   - useState의 초기값이 서버의 데이터와 일치하는지 확인하세요.

3. 페이지 변경 시 데이터가 갱신되지 않는 문제
   - handlePageLoad 함수가 제대로 구현되었는지 확인하세요.
   - API 라우트나 서버 액션이 올바르게 동작하는지 확인하세요.
