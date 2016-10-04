const express = require('express')
const app = express()
const port = 3000
app.use((request, response, next) => {
    console.log(request.headers)
    console.log("111")
    next()
})
app.use((request, response, next) => {
    request.name = "Rishabh Bhatia"
    console.log("222")
    next()
})
app.get('/', (request, response) => {
    console.log("333")
    response.json({
        lead: request.name
    })
})
app.get('/home', (request, response) => {
    response.send('Welcome home!')
})
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})