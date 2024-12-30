const fs = require('fs')
const path = require('path')

// 제외할 폴더 목록
const EXCLUDED_DIRECTORIES = [
  'node_modules',
  '.next',
  'dist',
  'build',
  'out',
  'public',
  'static',
  'scripts'
]

// export 정보를 저장할 객체 구조
const exportInfo = {
  // 파일 경로를 키로 사용
  // "/src/components/Button.jsx": {
  //   defaultExport: "Button",
  //   namedExports: ["ButtonGroup", "ButtonSize"]
  //   importPath: "@/components/Button"
  // }
}

// export 구문을 분석하는 함수
function analyzeExports(content, filePath, projectRoot) {
  const defaultExportRegex = /export\s+default\s+(?:function\s+)?([A-Za-z0-9_$]+)/g
  const namedExportRegex = /export\s+(?:const|let|var|function|class)\s+([A-Za-z0-9_$]+)/g
  const namedExportsRegex = /export\s*{([^}]+)}/g

  const relativeFilePath = path.relative(projectRoot, filePath)
  const importPath = relativeFilePath.startsWith('src/')
    ? `@/${relativeFilePath.slice(4).replace(/\.(js|jsx)$/, '')}`
    : `~/${relativeFilePath.replace(/\.(js|jsx)$/, '')}`

  const exports = {
    defaultExport: null,
    namedExports: new Set(),
    importPath,
    filePath: relativeFilePath
  }

  // default export 분석
  let match
  while ((match = defaultExportRegex.exec(content)) !== null) {
    if (exports.defaultExport) {
      console.log(`Warning: Multiple default exports found in ${relativeFilePath}`)
    }
    exports.defaultExport = match[1]
  }

  // named export 분석
  while ((match = namedExportRegex.exec(content)) !== null) {
    exports.namedExports.add(match[1])
  }

  // export { ... } 구문 분석
  while ((match = namedExportsRegex.exec(content)) !== null) {
    const exportNames = match[1].split(',').map((name) => {
      const trimmed = name.trim()
      const asMatch = trimmed.match(/(\w+)\s+as\s+(\w+)/)
      return asMatch ? asMatch[2] : trimmed
    })
    exportNames.forEach((name) => exports.namedExports.add(name))
  }

  // 중복 체크
  exports.namedExports = Array.from(exports.namedExports)
  return exports
}

function shouldExcludePath(filePath, duplicates) {
  // index.js 파일이나 같은 디렉토리의 파일들 중 하나라도 index.js가 있으면 제외
  const currentDir = path.dirname(filePath)
  const hasIndexInSameDir = duplicates.some((p) => {
    const dir = path.dirname(p)
    const isIndex = p.endsWith('/index.js') || p.endsWith('/index.jsx')
    return dir === currentDir && isIndex
  })

  return hasIndexInSameDir
}

function processExports(projectRoot) {
  function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const exports = analyzeExports(content, filePath, projectRoot)

    if (exports.defaultExport || exports.namedExports.length > 0) {
      exportInfo[filePath] = exports
    }
  }

  function traverseDirectory(currentPath) {
    const files = fs.readdirSync(currentPath)

    files.forEach((item) => {
      if (item.startsWith('.') || EXCLUDED_DIRECTORIES.includes(item)) {
        return
      }

      const fullPath = path.join(currentPath, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        traverseDirectory(fullPath)
      } else if (item.match(/\.(js|jsx)$/)) {
        processFile(fullPath)
      }
    })
  }

  traverseDirectory(projectRoot)

  // 중복된 export 이름 찾기
  const exportNames = new Map() // name -> [파일 경로들]

  Object.entries(exportInfo).forEach(([filePath, info]) => {
    if (info.defaultExport) {
      const paths = exportNames.get(info.defaultExport) || []
      paths.push(info.filePath)
      exportNames.set(info.defaultExport, paths)
    }

    info.namedExports.forEach((name) => {
      const paths = exportNames.get(name) || []
      paths.push(info.filePath)
      exportNames.set(name, paths)
    })
  })

  // 중복된 export 이름 출력
  exportNames.forEach((paths, name) => {
    if (paths.length > 1) {
      const pathsByDir = paths.reduce((acc, p) => {
        const dir = path.dirname(p)
        if (!acc[dir]) acc[dir] = []
        acc[dir].push(p)
        return acc
      }, {})

      // 서로 다른 디렉토리에 있는 실제 중복만 체크
      let duplicates = []
      Object.values(pathsByDir).forEach((dirPaths) => {
        if (dirPaths.length === 1) {
          duplicates.push(dirPaths[0])
        }
      })

      // 중복 파일 중 index.js와 같은 디렉토리의 파일은 제외
      duplicates = duplicates.filter((p) => !shouldExcludePath(p, paths))

      // 남은 중복이 2개 이상인 경우에만 출력
      if (duplicates.length > 1) {
        console.log(`\n중복된 export 이름 발견: "${name}"`)
        console.log('다음 파일들에서 발견됨:')
        duplicates.sort().forEach((p) => console.log(`  - ${p}`))
      }
    }
  })

  return exportInfo
}

function main() {
  // 명령줄 인자에서 프로젝트 루트 경로 가져오기
  const projectRoot = path.resolve(process.argv[2] || '.')

  if (!fs.existsSync(projectRoot)) {
    console.error(`Error: Directory ${projectRoot} does not exist`)
    process.exit(1)
  }

  const exportsFile = path.join(projectRoot, 'exports.json')

  // 기존 exports.json 파일 삭제
  if (fs.existsSync(exportsFile)) {
    fs.unlinkSync(exportsFile)
  }

  console.log(`프로젝트 루트 경로: ${projectRoot}`)
  console.log('프로젝트의 export 정보를 분석합니다...')
  const exports = processExports(projectRoot)

  // 새로운 exports.json 생성
  fs.writeFileSync(exportsFile, JSON.stringify(exports, null, 2))
  console.log('\nexports.json 파일이 생성되었습니다')
}

main()
