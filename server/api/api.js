const Express = require('express')
const RateLimiters = require('./rateLimiters.js')
const { loginCallback } = require('./login.js')
const { validateNewAccountCallback } = require('./validateAccount.js')
const { shiftViewGETCallback } = require('./shiftView')

const router = new Express.Router()
router.use(Express.urlencoded({ extended: true }))
router.use(Express.json())
router.use(RateLimiters.loginLimiter)

router.post('/login', loginCallback)
router.post('/create_new_account', validateNewAccountCallback)
router.get('/shift_view', shiftViewGETCallback)

module.exports = router
