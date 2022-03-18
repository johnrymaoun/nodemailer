const express = require('express')
const Controller = require('./controller/controller.js')
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')
const https = require('https')
const path = require('path')
const fs = require('fs')

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

const sslServer = https.createServer(
  {
    key: '',
    cert: ''
  },
  app
)

sslServer.listen(3443, () => console.log('https server'))