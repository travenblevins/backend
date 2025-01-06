const https = require('https')
const fs = require('fs')

const options = {
    hostname: 'en.wikipedia.org',
    port: 443,
    path: '/wiki/George_Washington',
    method: 'GET'
}

const request = https.request(options, (response) => {
    
    let responseBody = '';

    console.log('Response from the server started')
    console.log(`Server status code: ${response.statusCode}`)
    console.log('Server Headers: %j', response.headers)

    response.setEncoding('UTF-8')

    response.once('data', (chunk) => {
        console.log(chunk)
    })

    response.on('data', (chunk) => {
        console.log(`--chunk-- ${chunk.length}`)
        responseBody += chunk
    })
    
    response.on('end', () => {
        fs.writeFile('george-washington.html', responseBody, (err) => {
            console.log('File Downloaded')
        })
    })

    response.on('error', (err) => {
        console.log(`Problem with request: ${err.message}`)
    })
})
.end()