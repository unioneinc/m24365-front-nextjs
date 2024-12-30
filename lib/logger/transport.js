// lib/logger/transport.js

export class LogTransport {
  constructor() {
    this.apiEndpoint = process.env.NEXT_PUBLIC_LOGGING_SERVICE_URL
  }

  async sendLog(logData) {
    if (process.env.NODE_ENV === 'development') {
      this.consoleOutput(logData)
      return
    }

    if (!this.apiEndpoint) {
      this.consoleOutput(logData)
      return
    }

    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logData)
      })
    } catch (error) {
      console.error('Failed to send log to logging service:', error)
    }
  }

  formatLogData(logData) {
    const { level, message } = logData
    if (Array.isArray(message)) {
      return message
        .map((item) => (typeof item === 'object' ? JSON.stringify(item, null, 2) : item))
        .join(' ')
    }
    return typeof message === 'object' ? JSON.stringify(message, null, 2) : message
  }

  consoleOutput(logData) {
    const formattedMessage = this.formatLogData(logData)

    switch (logData.level.toLowerCase()) {
      case 'error':
        console.error(formattedMessage)
        break
      case 'warn':
        console.warn(formattedMessage)
        break
      case 'info':
        console.info(formattedMessage)
        break
      case 'debug':
        console.debug(formattedMessage)
        break
      default:
        console.log(formattedMessage)
    }
  }
}

export const transport = new LogTransport()
