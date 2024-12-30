// lib/logger/index.js
import { transport } from './transport'

class Logger {
  static instance = null

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

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  shouldLog(level) {
    return this.logLevels[level] <= this.logLevels[this.logLevel]
  }

  log(level, ...args) {
    if (!this.shouldLog(level)) return
    transport.consoleOutput({ level, message: args })
  }

  error(...args) {
    this.log('error', ...args)
  }

  warn(...args) {
    this.log('warn', ...args)
  }

  info(...args) {
    this.log('info', ...args)
  }

  http(...args) {
    this.log('http', ...args)
  }

  debug(...args) {
    this.log('debug', ...args)
  }
}

export const logger = Logger.getInstance()
export default logger
