const http = require('http');
const fs = require('fs');
const path = require('path');

http
    .createServer((request, response) => {
        if(request.url == '/') {
            fs.readFile('./public/index.html', (error, html) => {
                response.writeHead(200, { 'Content-Type': 'text/html' })
                response.end(html)
            })
        }
        else if (request.url.match(/.css$/)) {
            const cssPath = path.join(__dirname, 'public', request.url)
            const fileStream = fs.createReadStream(cssPath, 'utf-8')
            response.writeHead(200, { 'Content-Type': 'text/css' })

            fileStream.pipe(response)
        }
        else if (request.url.match(/.jpg$/)) {
            const imgPath = path.join(__dirname, 'public', request.url)
            const fileStream = fs.createReadStream(imgPath)
            response.writeHead(200, { 'Content-Type': 'image/jpg' })

            fileStream.pipe(response)
        }
        else {
            response.writeHead(404, { 'Content-Type': 'text/html' })
            response.end('404 File not foud')
        }
    })
    .listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    })