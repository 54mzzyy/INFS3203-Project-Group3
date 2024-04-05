const business = require('./business')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars')
let app = express()

app.use(bodyParser.urlencoded())
app.use(cookieParser())

app.set('views', __dirname + '/templates')
app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars.engine())

app.get('/', (req, res) => {
  res.render('login')
})

app.post('/', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let verifiedUser = business.verifiedUser(username, password)
  if(verifiedUser) {
    res.redirect('/home')
  }
  else {
    res.render('invalid')
  }
})

app.get('/home', (req, res) => {
  res.render('home')
})

app.get('/map', (req, res) => {
  res.render('map')
})

app.get('/map/:option', (req, res) => {
  res.render('map_food')
})

app.get('/checklist', (req, res) => {
  res.render('checklist')
})


app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/profile', (req, res) => {
  res.render('profile')
})

app.get('/logout', async (req,res) => {
  await business.deleteSession(req.cookies.session)
  res.redirect('/')
})

app.listen(8000, () => {
  console.log("App is running")
})
