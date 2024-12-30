// app/error.js (500 에러 페이지)
'use client'

export default function Error() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">500 - 서버 오류</h2>
        <p>서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
      </div>
    </div>
  )
}
