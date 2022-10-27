const Express = require('express')
const dbConfig = require('./database.config.js')
const knex = require('knex')(dbConfig)
const router = new Express.Router()

router.get('/studentList', async (req, res) => {
  res.send(await knex.select('User.userName', 'TimeBlock.timeStart', 'TimeBlock.timeEnd', 'TimeBlock.timeType')
    .from('_UserTime')
    .join('User', '_UserTime.userID', 'User.userID')
    .rightJoin('TimeBlock', '_UserTime.timeID', 'TimeBlock.timeID')
    .then(result => {
      return result
    }))
})

router.get('/helloWorld', (req, res) => {
  res.send('Hello World')
})

module.exports = router
