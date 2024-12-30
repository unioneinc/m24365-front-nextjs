// app/not-found.js (404 에러 페이지)
'use client'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">404 - 페이지를 찾을 수 없습니다</h2>
        <p>요청하신 페이지가 존재하지 않습니다.</p>
      </div>
    </div>
  )
}

export const NoToken = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">401 - 로그인 후 다시 시도해주세요</h2>
        </div>
      </div>
    </>
  )
}
