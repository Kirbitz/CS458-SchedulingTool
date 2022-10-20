const Express = require('express')
const dbConfig = require('./database.config.js')
const knex = require('knex')(dbConfig)
const router = new Express.Router()

router.get('/studentList', (req, res) => {
  res.send(knex.select('USER(), CURRENT_USER()')
    .then(result => {
      return result
    }))
})

router.get('/helloWorld', (req, res) => {
  res.send('Hello World')
})

module.exports = router
