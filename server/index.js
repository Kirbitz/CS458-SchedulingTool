const Express = require('express')
const path = require('path')
const dataRouter = require('./api/api.js')
const cors = require('cors')

const app = new Express()

app.use(cors())

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
