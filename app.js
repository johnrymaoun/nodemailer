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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

Controller(app);

app.listen(3000);
console.log('listening to port 3000');
