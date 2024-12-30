const fs = require('fs')
const path = require('path')

// postman.json 파일 읽기
const readPostmanFile = () => {
  try {
    const postmanData = fs.readFileSync('postman.json', 'utf8')
    return JSON.parse(postmanData)
  } catch (error) {
    console.error('Error reading postman.json:', error)
    throw error
  }
}

// 각 name별로 파일 생성
const splitByName = () => {
  try {
    const postmanJson = readPostmanFile()
    const outputDir = 'split_collections'

    // 출력 디렉토리 생성
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir)
    }

    // 최상위 items를 순회하며 name별로 파일 생성
    postmanJson.item.forEach((item) => {
      const fileName = `${item.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`
      const filePath = path.join(outputDir, fileName)

      // 새로운 collection 객체 생성
      const newCollection = {
        info: {
          _postman_id: postmanJson.info._postman_id,
          name: item.name,
          schema: postmanJson.info.schema
        },
        item: [item]
      }

      // 파일 쓰기
      fs.writeFileSync(filePath, JSON.stringify(newCollection, null, 2))
      console.log(`Created file: ${fileName}`)
    })

    console.log('Split complete!')
  } catch (error) {
    console.error('Error splitting collection:', error)
  }
}

// 실행
splitByName()
