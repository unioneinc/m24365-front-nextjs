const fs = require('fs')
const path = require('path')

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []

  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles)
    } else {
      if (path.extname(file) === '.js') {
        arrayOfFiles.push(path.join(dirPath, file))
      }
    }
  })

  return arrayOfFiles
}

function removeSemicolons(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8')

    // 여러 줄 주석 처리를 위한 상태 변수
    let isInMultilineComment = false

    const lines = content.split('\n').map((line) => {
      // 여러 줄 주석 시작 확인
      if (line.includes('/*')) {
        isInMultilineComment = true
        return line
      }

      // 여러 줄 주석 종료 확인
      if (line.includes('*/')) {
        isInMultilineComment = false
        return line
      }

      // 여러 줄 주석 내부인 경우 그대로 반환
      if (isInMultilineComment) {
        return line
      }

      // for 문 처리
      if (line.trim().startsWith('for (')) {
        return line
      }

      // 한 줄 주석이 있는 경우
      if (line.includes('//')) {
        // 주석 앞의 세미콜론 제거
        return line.replace(/;(\s*\/\/.*)$/, '$1')
      }

      // catch 문 처리
      if (line.trim().startsWith('catch')) {
        return line
      }

      // 일반적인 경우의 세미콜론 제거
      // 객체나 함수 내부의 세미콜론은 유지
      let modifiedLine = line
      if (
        !line.trim().startsWith('{') &&
        !line.trim().startsWith('}') &&
        !line.includes('=>') &&
        !line.includes('produce')
      ) {
        modifiedLine = line.replace(/;(\s*)$/, '$1')
      }

      return modifiedLine
    })

    const modifiedContent = lines.join('\n')

    if (content !== modifiedContent) {
      fs.writeFileSync(filePath, modifiedContent)
      console.log(`수정됨: ${filePath}`)
    }
  } catch (error) {
    console.error(`파일 처리 중 오류 발생: ${filePath}`, error)
  }
}

function main() {
  const rootDir = process.argv[2] || '.'

  if (!fs.existsSync(rootDir)) {
    console.error('지정된 디렉토리가 존재하지 않습니다')
    process.exit(1)
  }

  const allFiles = getAllFiles(rootDir)
  console.log(`총 ${allFiles.length}개의 .js 파일을 찾았습니다`)

  allFiles.forEach((file) => {
    removeSemicolons(file)
  })
}

main()
