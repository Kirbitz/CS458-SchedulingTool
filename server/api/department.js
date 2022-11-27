const { response } = require('express')
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
  res.status(200).json(await dbClient.select('_userDept.userId', 'User.userName')
    .from('_userDept')
    .join('User', 'User.userId', '_userDept.userId')
    .where('_userDept.deptId', '=', deptId)
    .then(result => {
      return result
    }))
}

// Create a department
const postDepartmentCallback = async (req, res) => {
  const employeeData = req.body
  try {
    module.exports.postDepartment(employeeData)
    res.status(201).json({
      message: 'Department created'
      // For some reason I can't get the ID back from the knex call
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: {
        message: 'Internal server error while creating department'
      }
    })
  }
}

async function postDepartment (req) {
  await dbClient
    .insert({
      deptName: req.deptName,
      deptLocation: req.deptLocation,
      deptHourCap: req.deptHourCap
    })
    .into('Department')
}

// Get department
const getDepartments = async (req, res) => {
  res.status(200).json(await dbClient
    .select('deptId', 'deptName', 'deptLocation', 'deptHourCap')
    .from('Department')
    .then(result => { return result }))
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
      userHours: 0
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
  postDepartmentCallback,
  postDepartment,
  getDepartments,
  postEmployeeCallback,
  insertEmployees,
  deleteEmployeeCallback,
  deleteEmployee
}
