const Express = require('express')
const RateLimiters = require('./rateLimiters.js')

const { loginCallback } = require('./login.js')
const { validateNewAccountCallback } = require('./validateAccount.js')
const { collectTimeBlockData, createModifyTimeBlockData, deleteTimeBlockData } = require('./timeBlockData.js')

const router = new Express.Router()
router.use(Express.urlencoded({ extended: true }))
router.use(Express.json())
router.use(RateLimiters.loginLimiter)

router.post('/login', loginCallback)
router.post('/create_new_account', validateNewAccountCallback)

router.get('/collect_time_blocks/:startDate?/:endDate?', collectTimeBlockData)
router.post('/create_modify_time_blocks', createModifyTimeBlockData)
router.delete('/delete_time_blocks', deleteTimeBlockData)

module.exports = router
