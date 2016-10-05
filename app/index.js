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
app.post('/users', function(req, res) {
    insert_records(req, res);
    res.send('successfully registered')
})
var insert_records = function(req, res) {
	var user = JSON.stringify(req.body);
	var userObject = JSON.parse(user);
	var name = userObject.name;
	var age = userObject.age;

	console.log(userObject)
	console.log(name)
	console.log(age)
        //Drop table if it exists
    client.query("DROP TABLE IF EXISTS users");
    // Creat table and insert 2 records into it
    client.query("CREATE TABLE IF NOT EXISTS users(name varchar(64), age smallint)");
    client.query("INSERT INTO users(name,age) values($1,$2)", [name, age]);
};
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