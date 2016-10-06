const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = 3000
var pg = require("pg")
var conString = "pg://postgres:computer@08@localhost:5432/rbio";
var client = new pg.Client(conString);
client.connect();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use((request, response, next) => {
    // console.log(request.headers)
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
app.get('/users', function(req, res, next) {
    getUsers(req, res)
})
app.post('/users', function(req, res) {
    createUser(req, res);
})
var getUsers = function(req, res) {
    client.query('SELECT name, age FROM users;', [], function(err, result) {
        if (err) {
            return next(err)
        }
        var allUsers = result.rows;
        var activeUsers = {};
        
        if(allUsers[0].name === "rishabh")
        {
        	activeUsers = allUsers[0]
        }
        res.json(activeUsers)
    })
};
var createUser = function(req, res) {
    var user = JSON.stringify(req.body);
    var userObject = JSON.parse(user);
    var name = userObject.name;
    var age = userObject.age;
    console.log(userObject)
    console.log(name)
    console.log(age)
        
    // Creat table and insert 2 records into it
    client.query("CREATE TABLE IF NOT EXISTS users(name varchar(64), age smallint)");
    client.query("INSERT INTO users(name,age) values($1,$2)", [name, age]);
    res.send('successfully registered')
};
app.use((err, request, response, next) => {
    // log the error, for now just console.log
    console.log(err)
    response.status(400).send('Something broke!')
})
app.listen(port, "192.168.1.7", (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})