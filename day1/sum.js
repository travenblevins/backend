let odd = []
let even = []


for(let i = 1; i < 21; i++) {
    if(i % 2 !== 0) {
        let item = `${i}`
        odd.push(item)
    } else {
        let item = `${i}`
        even.push(item)
    }
}

let evenSum = even.reduce((acc, curr) => acc + parseInt(curr), 0)
let oddSum = odd.reduce((acc, curr) => acc + parseInt(curr), 0)
let oddAverage = oddSum / odd.length

console.log(evenSum)
console.log(oddAverage)