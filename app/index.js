// app/index.js
const calc = require('./calc')
const fs = require('fs')

fs.readFile('./app/hello.txt', 'utf-8', function (err, content) {  
  if (err) {
    return console.log(err)
  }

  console.log(content)
})

const numbersToAdd = [  
  3,
  4,
  10,
  2
]

const result = calc.sum(numbersToAdd)  
console.log(`The result is: ${result}`)		