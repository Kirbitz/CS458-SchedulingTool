const Express = require('express')
const dbConfig = require('./database.config.js')
const knex = require('knex')(dbConfig)
const router = new Express.Router()

// This query needs to be changed
// Request should contain a department ID, response should return list of employees in that department
async function departmentGET (req, res) {
  const deptId = req.body
  res.send(await knex.select('ud.userId', 'u.userName')
    .from('_UserDepartment ud')
    .join('User u', 'u.userID', 'ud.userID')
    .where('ud.deptId', '=', deptId)
    .then(result => {
      return result
    }))
}

// endpoint for getting employees based on department
router.get('/getEmployees', departmentGET)

module.exports = router
