const Express = require('express')
const { genericLimiter } = require('./RateLimiter.js')
const router = require('./endpoints.js')
const app = new Express()

// Logs all request made to the server
app.use((req, response, next) => {
  console.log(`${req.method} at ${req.path}`)
  next()
})

app.use('/data', router)

app.use('/timeBlocks', genericLimiter)

app.use(Express.static('public'))

app.get('*', (req, res) => {
  res.redirect('/')
})

module.exports = app
