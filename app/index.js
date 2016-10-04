const express = require('express')
const app = express()
const port = 3000
app.use((request, response, next) => {
    console.log(request.headers)
    next()
})
app.use((request, response, next) => {
    request.name = "Rishabh Bhatia"
    next()
})
app.get('/', (request, response) => {
    response.json({
        lead: request.name
    })
})
app.get('/home', (request, response) => {
    response.send('Welcome home!')
})
app.use((err, request, response, next) => {  
  // log the error, for now just console.log
  console.log(err)
  response.status(400).send('Something broke!')
})
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})