const Express = require('express')
const path = require('path')

const app = new Express()

// Logs all request made to the server
app.use((req, response, next) => {
  console.log(`${req.method} at ${req.path}`)
  next()
})

app.use(Express.static('public'))

app.get('*', (req, res) => {
  res.sendFile(path.join('public', 'index.html'))
})

module.exports = app
