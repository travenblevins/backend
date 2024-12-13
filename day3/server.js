const net = require('net');
const server = net.createServer((socket) => {
    console.log('Client connected')
    socket.on('end', () => {
        console.log('Client disconnected')
    })
    socket.on('data', data => {
        console.log('Msg from client' + data.toString())
        if(data.toString().trim() === 'exit') {
            socket.end()
        }
    })
    socket.write('Welcome to echo server\n')
    //Send data back to the client
    socket.pipe(socket)
    
    server.on('error', err => {
        console.log(err)
    })
    server.listen(3000, () => {
        console.log('Server is up on port 3000')
    })
})