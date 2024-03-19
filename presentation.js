const business = require('./business')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars')
let app = express()

app.use(bodyParser.urlencoded())
app.use(cookieParser())

app.get('/', (req, res) => {
  
})
