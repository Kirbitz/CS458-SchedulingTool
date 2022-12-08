const Express = require('express')
const RateLimiters = require('./rateLimiters.js')

const { loginCallback } = require('./login.js')
const { createAccountCallback } = require('./createAccount.js')
const { collectTimeBlockData, createModifyTimeBlockData, deleteTimeBlockData } = require('./timeBlockData.js')
const { searchEmployeesCallback, getEmployeesFromDepartmentCallback, addEmployeeToDepartmentCallback, deleteEmployeeFromDeptCallback } = require('./department.js')

const router = new Express.Router()
router.use(Express.urlencoded({ extended: true }))
router.use(Express.json())
router.use(RateLimiters.loginLimiter)

router.post('/login', loginCallback)
router.post('/create_new_account', createAccountCallback)

router.get('/collect_time_blocks/:startDate?/:endDate?', collectTimeBlockData)
router.post('/create_modify_time_blocks', createModifyTimeBlockData)
router.delete('/delete_time_blocks', deleteTimeBlockData)

// Search for an employee by partial ID or partial name
router.get('/searchEmployees/:search', searchEmployeesCallback)
// Get list of employees based on department
router.get('/getEmployees', getEmployeesFromDepartmentCallback)
// Add employee to a department
router.post('/addEmployee', addEmployeeToDepartmentCallback)
// Delete an employee and the respective join table entry
router.delete('/deleteEmployee', deleteEmployeeFromDeptCallback)

module.exports = router
