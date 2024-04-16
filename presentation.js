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
    let sessionData = await business.startSession({data: username})
    res.cookie('session', sessionData.sessionNumber, {expires: sessionData.expiry})
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

app.get('/home', async (req, res) => {
  let sessionData = await business.getSessionData(req.cookies.session)
    if(sessionData) {
        res.render('home')
    }
    else {
        res.redirect('/')
    }
})

app.get('/map', async (req, res) => {
  let sessionData = await business.getSessionData(req.cookies.session)
    if(sessionData) {
        res.render('map')
    }
    else {
        res.redirect('/')
    }
})

app.get('/map/:option', (req, res) => {
  res.render('map_food')
})

app.get('/checklist', async (req, res) => {
  let sessionData = await business.getSessionData(req.cookies.session)
    if(sessionData) {
        res.render('checklist')
    }
    else {
        res.redirect('/')
    }
})

app.get('/language', (req, res) => {
  res.render('language')
})

app.get('/profile', async (req, res) => {
  let sessionData = await business.getSessionData(req.cookies.session)
    if(sessionData) {
        res.render('profile')
    }
    else {
        res.redirect('/')
    }
  res.render('profile')
})

app.get('/trips', async (req, res) => {
  let sessionData = await business.getSessionData(req.cookies.session)
    if(sessionData) {
        res.render('trips')
    }
    else {
        res.redirect('/')
    }
})

app.get('/currency', async (req, res) => {
  let sessionData = await business.getSessionData(req.cookies.session)
    if(sessionData) {
        res.render('currency')
    }
    else {
        res.redirect('/')
    }
})

app.get('/logout', async (req,res) => {
  await business.deleteSession(req.cookies.session)
  res.redirect('/')
})

app.listen(8000, () => {console.log("App is running")})