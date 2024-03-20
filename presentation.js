const business = require('./business')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
let app = express()

app.use(bodyParser.urlencoded())
app.use(cookieParser())

app.get('/', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let verifiedUser = business.verifiedUser(username, password)
  if(verifiedUser) {
    res.redirect('/main')
  }
  else {
    res.render('invalid')
  }
})

app.post('/', (req, res) => {
  
})

app.get('/main', (req, res) => {
  
})

app.get('/map', (req, res) => {
  
})

app.get('/map/:option', (req, res) => {
  
})

app.get('/checklist', (req, res) => {
  
})

app.get('/settings', (req, res) => {
  
})
