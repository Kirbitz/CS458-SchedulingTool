const dbClient = require('./dbClient')

// This function is just to see if I can even write a test
const getEndpointName = async (req, res) => {
  res.status(200).json({
    test: 'good',
    endpoint: 'department.js'
  })
}

// Request should contain a department ID, response should return list of employees in that department
const getEmployeesFromDepartment = async (req, res) => {
  const deptId = req.body.deptId
  res.status(200).json(await dbClient.select('ud.userId', 'u.userName')
    .from('_UserDept ud')
    .join('User u', 'u.userID', 'ud.userID')
    .where('ud.deptId', '=', deptId)
    .then(result => {
      return result
    }))
}

// Create a department
const postDepartment = async (req, res) => {
  const request = req.body
  res.status(201).json(await dbClient
    .insert({
      deptName: request.deptName,
      deptLocation: request.deptLocation,
      deptHourCap: request.deptHourCap
    })
    .into('Department')
    .onConflict(res.status(409).json({
      error: 'Conflict while inserting data'
    })))
}

// FUNCTIONS FOR CREATING AN EMPLOYEE
const postEmployeeCallback = async (req, res) => {
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

const insertEmployees = async (data) => {
  await dbClient.transaction(async trx => {
    // Create the User tuple
    await createEmployee(data, trx)
    // Fill the join table based on the current manager/department
    await createEmployeeDepartmentJoin(data, trx)
  })
}

const createEmployee = async (data, trx) => {
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

const createEmployeeDepartmentJoin = async (data, trx) => {
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
const deleteEmployeeCallback = async (req, res) => {
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
const deleteEmployee = async (data) => {
  await dbClient.transaction(async trx => {
    removeEmployee(data, trx)
    removeEmployeeFromDepartment(data, trx)
  })
}

// Delete the employee from the user table
const removeEmployee = async (data, trx) => {
  const request = data.body
  await dbClient
    .from('User')
    .where('userId', '=', request.userId)
    .del()
    .transacting(trx)
}

// Delete the employee from the junction table
const removeEmployeeFromDepartment = async (data, trx) => {
  const request = data.body
  await dbClient
    .from('User')
    .where('userId', '=', request.userId)
    .andWhere('deptId', '=', request.deptId)
    .del()
    .transacting(trx)
}

module.exports = {
  getEndpointName,
  getEmployeesFromDepartment,
  postDepartment,
  postEmployeeCallback,
  insertEmployees,
  deleteEmployeeCallback,
  deleteEmployee
}
