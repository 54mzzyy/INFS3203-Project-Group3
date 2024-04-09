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

app.post('/', async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let verifiedUser = await business.verifyUser(username, password)
  if(verifiedUser) {
    res.redirect('/home')
  }
  else {
    res.send('Invalid Credentials')
  }
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email
  await business.addUser(username, password, email)
  res.redirect('/login')
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

app.get('/language', (req, res) => {
  res.render('language')
})

app.get('/profile', (req, res) => {
  res.render('profile')
})

app.get('/trips', async (req, res) => {
  let trips = await business.generateTrips()
  res.render('trips', {
    trips: trips
  })
})

app.get('/logout', async (req,res) => {
  await business.deleteSession(req.cookies.session)
  res.redirect('/')
})

app.listen(8000, () => {console.log("App is running")})