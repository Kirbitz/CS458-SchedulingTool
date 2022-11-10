const Express = require('express')
const path = require('path')

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

app.use(Express.static(__dirname, 'public'))
// rate limit requests to 50 attempts per 15 minutes
app.use(loginLimiter)

// POST - checks username and password against database
app.post('/login', loginCallback)

app.get(['/login', '/dashboard', '/master-schedule', '/employee-schedule', '/staff', '/department', '/settings'], (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

module.exports = app
