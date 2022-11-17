const Express = require('express')
const path = require('path')
const dataRouter = require('../server/api/api.js')

const app = new Express()

// Parse JSON bodies into JavaScript objects
app.use(Express.json())

// Logs all request made to the server
app.use((req, response, next) => {
  console.log(`${req.method} at ${req.path}`)
  next()
})

app.use(Express.static('public'))

app.use('/api', dataRouter)

app.get(['/login', '/dashboard', '/master-schedule', '/employee-schedule', '/staff', '/department', '/settings'], (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

module.exports = app
