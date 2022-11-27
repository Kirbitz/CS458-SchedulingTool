const Express = require('express')
const RateLimiters = require('./rateLimiters.js')
const { loginCallback } = require('./login.js')
const { validateNewAccountCallback } = require('./validateAccount.js')
const { getEndpointName, getEmployeesFromDepartment, postDepartmentCallback, postEmployeeCallback, getDepartments } = require('./department.js')

const router = new Express.Router()
router.use(Express.urlencoded({ extended: true }))
router.use(Express.json())
router.use(RateLimiters.loginLimiter)

router.post('/login', loginCallback)
router.post('/create_new_account', validateNewAccountCallback)

// Get list of employees based on department
router.get('/getEmployees', getEmployeesFromDepartment)
// Create a department (not sure if this is needed)
router.post('/postDepartment', postDepartmentCallback)
// Get all departments
router.get('/getDepartments', getDepartments)
// Create employees and place them in the department of the creating manager
router.post('/postEmployee', postEmployeeCallback)

router.get('/testDepartment', getEndpointName)

module.exports = router
