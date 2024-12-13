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


// Create a user input object with process.stdin.
let userInput = process.stdin;
// Set input character encoding.
userInput.setEncoding('utf-8');
// Prompt user to input data in console.
console.log("Welcome to the plant game, please enter a command:\nplantSeed, water, bugAttack, harvest, exit");
// Do the following after user click the enter key.
userInput.on('data', function (data) {
// User input exit.
if(data === 'exit\n'){
// Program exit.
console.log("Bye. Thanks for playing");
process.exit();
} else if (data === 'plantSeed\n') {
    data === 'plantSeed\n',
    plant1.emit('plantSeed')
} else if (data === 'water\n') {
    data === 'water\n'
    plant1.emit('water')
} else if (data === 'bugAttack\n') {
    plant1.emit('bugAttack')
} else if (data === 'harvest\n') {
    plant1.emit('harvest')
}

});