const Express = require('express')

const app = new Express()
const { loginCallback } = require('./login.js')
const { loginLimiter } = require('./rateLimiters.js')

// Parse JSON bodies into JavaScript objects
app.use(Express.json())

// Logs all request made to the server
app.use((req, response, next) => {
  console.log(`${req.method} at ${req.path}`)
  next()
})

app.use(Express.static('public'))
// rate limit requests to 50 attempts per 15 minutes
app.use(loginLimiter)

// POST - checks username and password against database
app.post('/login', loginCallback)

app.get('*', (req, res) => {
  res.redirect('/')
})

module.exports = app
