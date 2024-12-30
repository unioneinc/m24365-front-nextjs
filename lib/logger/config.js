// lib/logger/config.js

class ClientLogger {
  constructor() {
    this.logLevel = process.env.NEXT_PUBLIC_LOG_LEVEL || 'info'
    this.logLevels = {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4
    }
  }

  shouldLog(level) {
    return this.logLevels[level] <= this.logLevels[this.logLevel]
  }

  formatMessage(level, message, context = {}, error) {
    const timestamp = new Date().toISOString()
    const { module, function: func, ...rest } = context
    const prefix = [module, func].filter(Boolean).join('::')
    const contextStr =
      Object.keys(rest).length > 0 ? `\nContext: ${JSON.stringify(rest, null, 2)}` : ''
    const errorStr = error ? `\nError: ${error.message}\nStack: ${error.stack}` : ''

    return `[${timestamp}] [${level.toUpperCase()}]${prefix ? ` [${prefix}]` : ''} ${message}${contextStr}${errorStr}`
  }

  error(message, context, error) {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, context, error))
    }
  }

  warn(message, context) {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context))
    }
  }

  info(message, context) {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, context))
    }
  }

  http(message, context) {
    if (this.shouldLog('http')) {
      console.log(this.formatMessage('http', message, context))
    }
  }

  debug(message, context) {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, context))
    }
  }
}

// 싱글톤 인스턴스 생성 및 내보내기
const logger = new ClientLogger()
export default logger
