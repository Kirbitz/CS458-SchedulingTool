const Express = require('express')
const RateLimiters = require('./rateLimiters.js')
const { loginCallback } = require('./login.js')

const router = new Express.Router()
router.use(Express.urlencoded({ extended: true }))
router.use(Express.json())
router.use(RateLimiters.loginLimiter)

router.get('/test', (req, res) => {
  res.json({
    message: 'hello world'
  })
})

router.post('/login', loginCallback)

module.exports = router
