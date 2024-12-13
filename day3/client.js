//Client code
const net = require('net');
const client = net.createConnection({port: 3000}, () => {
    console.log('Connected to server')
})
client.on('data', data => {
    console.log('Server: ' + data.toString())
})
client.on('error', err => {
    console.log(err)
    client.end()
    process.exit()
})
process.stdin.setEncoding('utf-8')
process.on('readable', () => {
    let chunk
    while ((chunk = process.stdin.read()) !== null) {
        client.write(chunk)
        if(chunk === 'quit') {
            client.end()
            process.exit()
        }
    }
})