const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
  if (request.url === '/') {
    fs.readFile('./data/inventory.json', (error, data) => {
      if (error) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Server error');
        return;
      }
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(data); // data is already in JSON format
    });
  } else if (request.url === '/instock') {
    fs.readFile('./data/inventory.json', (error, data) => {
      if (error) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Server error');
        return;
      }
      const inventory = JSON.parse(data); // Parse the JSON data
      const inStock = inventory.filter(item => item.avail === 'In stock');
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(inStock));
    });
  } else if (request.url === '/onbackorder') {
    fs.readFile('./data/inventory.json', (error, data) => {
      if (error) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Server error');
        return;
      }
      const inventory = JSON.parse(data); // Parse the JSON data
      const onBackOrder = inventory.filter(item => item.avail === 'On backorder');
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(onBackOrder));
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<h1>Data not found</h1>');
  }
}).listen(3000, () => {
  console.log('Server is running on port 3000');
});
