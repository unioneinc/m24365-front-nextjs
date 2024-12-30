// app/global-error.js (전역 에러 핸들링)
'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div style={{ padding: '20px' }}>
          <h2>예상치 못한 오류가 발생했습니다</h2>
          <button onClick={() => reset()}>다시 시도</button>
        </div>
      </body>
    </html>
  )
}
