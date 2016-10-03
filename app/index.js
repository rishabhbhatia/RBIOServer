// app/index.js
const calc = require('./calc')
const fs = require('fs')
const http = require('http')
const port = 3000

/*fs.readFile('./app/hello.txt', 'utf-8', function (err, content) {  
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
console.log(`The result is: ${result}`)	*/	

const requestHandler = (request, response) => {  
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})