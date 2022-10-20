const Express = require('express')
const dbConfig = require('./database.config.js')
const knex = require('knex')(dbConfig)
const router = new Express.Router()

router.get('/studentList', (req, res) => {
  res.send(knex.select('userName')
    .from('User')
    .where('userId == 1')
    .then(result => {
      return result
    }))
})

router.get('/helloWorld', (req, res) => {
  res.send('Hello World')
})

module.exports = router
