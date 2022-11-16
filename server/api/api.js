const Express = require('express')
const RateLimiters = require('./rateLimiters.js')
const { loginCallback } = require('./login.js')
const { retrieveShiftData } = require('./retrieveShiftData.js')
const { validateNewAccountCallback } = require('./validateAccount.js')

const router = new Express.Router()
router.use(Express.urlencoded({ extended: true }))
router.use(Express.json())
router.use(RateLimiters.loginLimiter)

router.post('/login', loginCallback)
router.get('/day', retrieveShiftData)
router.post('/create_new_account', validateNewAccountCallback)

module.exports = router
