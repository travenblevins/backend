
const Eventemitter = require('events')
class plant extends Eventemitter {
    constructor() {
        super()
        this.size = 0
        this.hasBeenPlanted = false
        this.Listeners()
    }

    Listeners() {
        this.once('plantSeed', this.plantSeed)
        this.on('water', this.water)
        this.on('bugAttack', this.bugAttack)
        this.on('harvest', this.harvest)
        this.on('error', this.error)
    }

    plantSeed() {
        this.size = 1
        this.hasBeenPlanted = true
        console.log('Seed has been planted')
    }
    water() {
        if(this.hasBeenPlanted) {
            this.size++
            console.log(`You poured water, new plant size is ${this.size}`)
        } else {
            console.log('Seed needs to be planted first')
        }
    }
    bugAttack() {
        if(this.hasBeenPlanted) {
            this.size--
            console.log(`Bugs attacked your plant, new plant size is ${this.size}`)
        } else {
            console.log('Seed needs to be planted first')
        }
    }
    harvest() {
        if(this.hasBeenPlanted) {
            console.log(`Current plant size is ${this.size} and it has been harvested`)
            this.removeAllListeners()
        } else {
            console.log('Seed needs to be planted first')
        }
    }
    error() {
        console.log('error found')
    }
}

const plant1 = new plant()

const net = require('net');

// Create the server
const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('end', () => {
        console.log('Client disconnected');
    });

    socket.on('data', data => {
        data = data.toString().trim();
        console.log('Msg from client: ' + data);
        if (data === 'exit') {
            socket.end();
        } else if (data === 'plantSeed') {
            plant1.emit('plantSeed');
            socket.write('Seed has been planted\n');
        } else if (data === 'water') {
            plant1.emit('water');
            socket.write(`You poured water, new plant size is ${plant1.size}\n`);
        } else if (data === 'bugAttack') {
            plant1.emit('bugAttack');
            socket.write(`Bugs attacked, new plant size is ${plant1.size}\n`);
        } else if (data === 'harvest') {
            plant1.emit('harvest');
            socket.write('Plant has been harvested\n');
        } else if (data === 'quit') {
            plant1.emit('quit');
            socket.write('Exiting plant game\n');
            socket.end();
        } else {
            socket.write('Invalid command\n');
        }
    });

    socket.write('Welcome to the plant server type one of these commands: plantSeed, water, bugAttack, harvest, quit\n');
    // Echo back data to the client
    socket.pipe(socket);
});

// Handle server errors
server.on('error', err => {
    console.error(err);
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server is up on port 3000');
});



//Client code
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