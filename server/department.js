const dbClient = require('./dbClient.js')

// Request should contain a department ID, response should return list of employees in that department
async function getEmployeesFromDepartment (req, res) {
  const deptId = req.body.deptId
  res.status(200).json(await dbClient.select('ud.userId', 'u.userName')
    .from('_UserDepartment ud')
    .join('User u', 'u.userID', 'ud.userID')
    .where('ud.deptId', '=', deptId)
    .then(result => {
      return result
    }))
}

// Create a department
async function postDepartment (req, res) {
  const request = req.body
  res.status(200).json(await dbClient
    .insert({
      deptName: request.deptName,
      deptLocation: request.deptLocation,
      deptHourCap: request.deptHourCap
    },
    ['deptId'])
    .into('Department'))
}

// FUNCTIONS FOR CREATING AN EMPLOYEE
async function postEmployeeCallback (req, res) {
  const employeeData = req.body
  try {
    module.exports.insertEmployees(employeeData)
    res.status(201).json({
      message: 'Employee created'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: {
        message: 'Internal server error while creating employee'
      }
    })
  }
}

async function insertEmployees (data) {
  await dbClient.transaction(async trx => {
    // Create the User tuple
    await createEmployee(data, trx)
    // Fill the join table based on the current manager/department
    await createEmployeeDepartmentJoin(data, trx)
  })
}

async function createEmployee (data, trx) {
  const request = data.body
  await dbClient
    .insert({
      userName: request.userName,
      userPermissions: request.userPermissions,
      userHours: request.userHours
    },
    ['userId'])
    .into('User')
    .transacting(trx)
}

async function createEmployeeDepartmentJoin (data, trx) {
  const request = data.body
  await dbClient
    .insert({
      userId: request.userId,
      deptId: request.deptId,
      isManager: request.isManager
    })
    .into('_UserDepartment')
    .transacting(trx)
}

// Callback/wrapper for deleting an employee
async function deleteEmployeeCallback (req, res) {
  const employeeData = req.body
  try {
    module.exports.deleteEmployee(employeeData)
    res.status(202).json({
      message: 'Employee deleted'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: {
        message: 'Internal server error while deleting employee'
      }
    })
  }
}

// Transaction for deleting employee
async function deleteEmployee (data) {
  await dbClient.transaction(async trx => {
    removeEmployee(data, trx)
    removeEmployeeFromDepartment(data, trx)
  })
}

// Delete the employee from the user table
async function removeEmployee (data, trx) {
  const request = data.body
  await dbClient
    .from('User')
    .where('userId', '=', request.userId)
    .del()
    .transacting(trx)
}

// Delete the employee from the junction table
async function removeEmployeeFromDepartment (data, trx) {
  const request = data.body
  await dbClient
    .from('User')
    .where('userId', '=', request.userId)
    .andWhere('deptId', '=', request.deptId)
    .del()
    .transacting(trx)
}

module.exports = {
  getEmployeesFromDepartment,
  postDepartment,
  postEmployeeCallback,
  insertEmployees,
  deleteEmployeeCallback,
  deleteEmployee
}
