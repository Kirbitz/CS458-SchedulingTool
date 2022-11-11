const Express = require('express')
const RateLimiters = require('./rateLimiters.js')
const { loginCallback } = require('./login.js')

const router = new Express.Router()
router.use(Express.urlencoded({ extended: true }))
router.use(Express.json())
router.use(RateLimiters.loginLimiter)

router.get('/test', (req, res) => {
  if (process.env.PORT === '3000') {
    res.status(200).json({
      message: 'hello world'
    })
  }
  res.status(404).json({
    message: 'not found'
  })
})

router.post('/login', loginCallback)

module.exports = router
