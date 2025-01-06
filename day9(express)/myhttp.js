var http = require('http');
const myServer = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>Easy and Fast!</h1>");
    response.end();
})

myServer.listen(3000, () => {
    console.log('Server is running on port 3000');
}) 

// node myhttp.js