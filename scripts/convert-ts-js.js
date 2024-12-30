const fs = require('fs')
const path = require('path')

function convertTsToJs(folderPath) {
  // 폴더가 존재하는지 확인
  if (!fs.existsSync(folderPath)) {
    console.error('The specified folder does not exist:', folderPath)
    return
  }

  // 폴더의 파일 및 디렉토리 목록 읽기
  const items = fs.readdirSync(folderPath)

  items.forEach((item) => {
    const fullPath = path.join(folderPath, item)

    // 파일인지 디렉토리인지 확인
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // 디렉토리라면 재귀적으로 처리
      convertTsToJs(fullPath)
    } else if (stat.isFile() && path.extname(item) === '.ts') {
      // .ts 파일이라면 확장자를 .ts로 변경
      const jsFilePath = fullPath.replace(/\.ts$/, '.js')

      // 파일 이름 변경
      fs.renameSync(fullPath, jsFilePath)
      console.log(`Converted: ${fullPath} -> ${jsFilePath}`)
    }
  })
}

// 스크립트를 실행할 때 특정 폴더 경로 전달
const targetFolder = process.argv[2]
if (!targetFolder) {
  console.error('Usage: node convert.js <folderPath>')
  process.exit(1)
}

convertTsToJs(path.resolve(targetFolder))
