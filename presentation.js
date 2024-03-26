const business = require('./business')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
let app = express()

app.use(bodyParser.urlencoded())
app.use(cookieParser())

// Handlebars will be replaced with react

app.get('/', (req, res) => {
  res.render('login')
})

app.post('/', (req, res) => {
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


app.get('/main', (req, res) => {
  res.render('homepage')
})

app.get('/map', (req, res) => {
  res.render('map')
})

app.get('/map/:option', (req, res) => {
  res.render('map_food')
})

app.get('/checklist', (req, res) => {
  
})

app.get('/settings', (req, res) => {
  
})

app.get('/logout', async (req,res) => {
  res.redirect('/')
})

app.listen(8000, () => {console.log("App is running")})