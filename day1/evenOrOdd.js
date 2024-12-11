let odd = []
let even = []


let numOdd = 0
for(let i = 1; i < 21; i++) {
    if(i % 2 !== 0) {
        numOdd++
        let item = `${numOdd} -> ${i}`
        odd.push(item)
    }
}

let numEven = 0
for(let i = 1; i < 21; i++) {
    if (i % 2 === 0) {
        numEven++
        let item = `${numEven} -> ${i}`
        even.push(item)
    }
}

let input = 'odd'

if(input === 'even') {
    console.log(even.join('\n'))
} else if(input === 'odd') {
    console.log(odd.join('\n'))
}