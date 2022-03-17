const express = require('express')
const Controller = require('./controller/controller.js')
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth');

const app = express()
app.use(basicAuth({
    users: { 'user': 'pass' },
    unauthorizedResponse: '{ "Error" : "Wrong or No credentials provided"}'
}))

app.use(bodyParser.json())

Controller(app);

app.listen(3000);
console.log('listening to port 3000');