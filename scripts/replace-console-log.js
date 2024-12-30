const fs = require('fs')
const path = require('path')

// logger import 문 추가 여부를 확인하는 함수
function hasLoggerImport(content) {
  return content.includes("import { logger } from '~/lib/logger'")
}

// logger import 문을 추가하는 함수
function addLoggerImport(content) {
  // 첫 번째 import 문을 찾아서 그 뒤에 logger import를 추가
  const importRegex = /^import.*$/m
  const match = content.match(importRegex)
  if (match) {
    return content.replace(match[0], `${match[0]}\nimport { logger } from '~/lib/logger'`)
  }
  // import 문이 없는 경우 파일 맨 앞에 추가
  return `import { logger } from '~/lib/logger'\n\n${content}`
}

// console.log를 logger로 변환하는 함수
function replaceConsoleLog(content) {
  // console.log 패턴을 찾아서 logger로 변환
  const patterns = [
    {
      regex: /console\.log\((.*?)\)/g,
      replacement: 'logger.info($1)'
    },
    {
      regex: /console\.error\((.*?)\)/g,
      replacement: 'logger.error($1)'
    },
    {
      regex: /console\.warn\((.*?)\)/g,
      replacement: 'logger.warn($1)'
    },
    {
      regex: /console\.debug\((.*?)\)/g,
      replacement: 'logger.debug($1)'
    }
  ]

  let modifiedContent = content
  let hasConsoleLog = false

  patterns.forEach(({ regex, replacement }) => {
    if (regex.test(modifiedContent)) {
      hasConsoleLog = true
      modifiedContent = modifiedContent.replace(regex, replacement)
    }
  })

  // console.log가 있었고 logger import가 없는 경우에만 import 추가
  if (hasConsoleLog && !hasLoggerImport(modifiedContent)) {
    modifiedContent = addLoggerImport(modifiedContent)
  }

  return modifiedContent
}

// 파일을 처리하는 함수
function processFile(filePath) {
  // JS/JSX 파일만 처리
  if (!/\.(js|jsx)$/.test(filePath)) {
    return
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const modifiedContent = replaceConsoleLog(content)

    // 내용이 변경된 경우에만 파일 쓰기
    if (content !== modifiedContent) {
      fs.writeFileSync(filePath, modifiedContent, 'utf8')
      console.log(`Updated: ${filePath}`)
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error)
  }
}

// 디렉토리를 재귀적으로 순회하는 함수
function processDirectory(directory) {
  const items = fs.readdirSync(directory)

  items.forEach((item) => {
    const fullPath = path.join(directory, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // node_modules와 .next는 제외
      if (item !== 'node_modules' && item !== '.next') {
        processDirectory(fullPath)
      }
    } else {
      processFile(fullPath)
    }
  })
}

// src 디렉토리 처리 시작
const srcDir = path.join(__dirname, '..', 'src')
console.log('Starting to process files in:', srcDir)
processDirectory(srcDir)
console.log('Finished processing files')
