const Express = require('express')
const path = require('path')
const dataRouter = require('./api/api.js')

const app = new Express()

// Logs all request made to the server
app.use((req, response, next) => {
  console.log(`${req.method} at ${req.path}`)
  next()
})

app.use(Express.static('public'))

app.use('/api', dataRouter)

// POST - creates a new account with the given information
// Chain calls CreateAccountCallback if everything validates
app.post('/create_new_account', validateNewAccountCallback)

app.get(['/login', '/dashboard', '/master-schedule', '/employee-schedule', '/staff', '/department', '/settings'], (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

module.exports = app
