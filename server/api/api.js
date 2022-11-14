const Express = require('express')
const cookieParser = require('cookie-parser')
const RateLimiters = require('./rateLimiters.js')
const { loginCallback } = require('./login.js')
const { validateNewAccountCallback } = require('./validateAccount.js')

const router = new Express.Router()
router.use(Express.urlencoded({ extended: true }))
router.use(Express.json())
router.use(cookieParser())
router.use(RateLimiters.loginLimiter)

router.post('/login', loginCallback)
router.post('/create_new_account', validateNewAccountCallback)

module.exports = router
