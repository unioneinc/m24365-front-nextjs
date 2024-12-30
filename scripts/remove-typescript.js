const fs = require('fs')
const path = require('path')

const iconsDir = path.join(__dirname, '..', 'src', 'static', 'icons')

// TypeScript 타입 제거 함수
function removeTypeScript(content) {
  return content.replace(/: React\.FC<React\.SVGProps<SVGSVGElement>>/g, '')
}

// 파일 처리 함수
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const updatedContent = removeTypeScript(content)
    fs.writeFileSync(filePath, updatedContent)
    console.log(`Processed: ${path.basename(filePath)}`)
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error)
  }
}

// .jsx 파일 찾기 및 처리
fs.readdirSync(iconsDir)
  .filter((file) => file.endsWith('.jsx'))
  .forEach((file) => {
    const filePath = path.join(iconsDir, file)
    processFile(filePath)
  })

console.log('TypeScript removal completed!')
