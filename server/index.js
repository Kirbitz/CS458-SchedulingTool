const Express = require('express')
const path = require('path')
const rateLimiter = require('express-rate-limit')

const app = new Express()

// Logs all request made to the server
app.use((req, response, next) => {
  console.log(`${req.method} at ${req.path}`)
  next()
})

app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false
}))

app.use(Express.static('public'))

app.get(['/login', '/dashboard', '/master-schedule', '/employee-schedule', '/staff', '/department', '/settings'], (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

module.exports = app
