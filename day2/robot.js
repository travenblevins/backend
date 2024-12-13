const Eventemitter = require('events')

class Robot extends Eventemitter {
    constructor(name){
        super()
        this.name = name
        this.activated = false
        this.registerListeners()
    }

    registerListeners() {
        this.once('activate', this.activateListener)
        this.on('speak', this.speakListener)
        this.on('error', this.errorListener)
    }
    speakListener(said){
        if (this.activated) {
            console.log(`${this.name}: ${said}`)
        }
    }
    errorListener() {
        console.log('Error found')
    }
    activateListener() {
        this.activated = true
        console.log(`${this.name} activated`)
    }
}

const myRobot = new Robot('Bob')
const anotherRobot = new Robot('Jerry')



myRobot.emit('activate')
myRobot.emit('speak', 'hello there')
anotherRobot.emit('activate')
anotherRobot.emit('speak', 'Hi I am Jerry')
anotherr