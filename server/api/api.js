const Express = require('express')
const RateLimiters = require('./rateLimiters.js')
const { loginCallback } = require('./login.js')
<<<<<<< HEAD
const { retrieveDay } = require('./retrieveShiftData.js')
=======
const { validateNewAccountCallback } = require('./validateAccount.js')
>>>>>>> main

const router = new Express.Router()
router.use(Express.urlencoded({ extended: true }))
router.use(Express.json())
router.use(RateLimiters.loginLimiter)

router.post('/login', loginCallback)
<<<<<<< HEAD
router.get('/day', retrieveDay)
=======
router.post('/create_new_account', validateNewAccountCallback)
>>>>>>> main

module.exports = router
