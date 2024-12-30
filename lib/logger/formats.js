// lib/logger/formats.js

export const formatLogMessage = (level, message, context = {}, error = null) => {
  // 기본 메시지 처리
  let output = message

  // context가 객체이고 비어있지 않은 경우 추가
  if (typeof context === 'object' && Object.keys(context).length > 0) {
    output = `${output} ${JSON.stringify(context)}`
  }

  // error 객체가 있는 경우 추가
  if (error) {
    output = `${output}\nError: ${error.message}\n${error.stack}`
  }

  return output
}
