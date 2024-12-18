const fs = require('fs')

// //readfile
// fs.readFile('./chat.log', 'utf8', (err, data) => {
//   console.log(`file length: ${data.length}`)
// })
// console.log('Started to read file')

//readstream
const readStream = fs.createReadStream('./chat.log', 'utf8')
const writeStream = fs.createWriteStream('./newChat.log', 'utf8')

let data = ''

readStream.once('data', () => {
    console.log('Started to read file')
})
readStream.on('data', (chunk) => {
    console.log(`    chunk: ${chunk.length}`)
    data += chunk
    writeStream.write(chunk)
})

readStream.on('end', () => {
    console.log(`Finished reading file: ${data.length}`)
    writeStream.close()
})