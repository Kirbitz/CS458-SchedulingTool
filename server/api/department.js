const dbClient = require('./dbClient')
const { verifyJWTAuthToken } = require('./dataHelper')

// Query for searching employees
const searchEmployeesCallback = async (req, res) => {
  // Verify and add the user ID to the request
  try {
    verifyJWTAuthToken(req, res)
  } catch (error) {
    return
  }

  try {
    // Get the search data from the URL and check that it is a valid search item
    const searchData = (req.params.search).trim()
    if (searchData.match('^[a-zA-Z]+$') || searchData.match('/^[0-9]+$/')) {
      // This query searches for a user name or ID that is LIKE the search data
      res.status(200).json(await dbClient.select('User.userId', 'User.userName')
        .from('User')
        .whereILike('User.userId', `%${searchData}%`)
        .orWhereILike('User.userName', `%${searchData}%`))
    } else {
      throw new Error('Invalid Search')
    }
  } catch (error) {
    // 2 kinds of errors, malformed input or nondescript server error
    if (error.message === 'Invalid Search') {
      res.status(400).json({
        message: 'Invalid combination of characters: use alphabetical or digits - not both'
      })
    } else {
      res.status(500).json({
        message: 'Server error while searching for employees'
      })
    }
  }
}

// Request should contain a department ID, response should return list of employees in that department
const getEmployeesFromDepartmentCallback = async (req, res) => {
  // Verify and add the user ID to the request
  console.log('starting getEmployees')
  try {
    verifyJWTAuthToken(req, res)
    console.log('JWT verified')
  } catch (error) {
    return
  }

  // Main code for endpoint
  try {
    // Get the departments that the user belongs to and place the IDs into an array
    const tempIds = await module.exports.getDepartmentsFromUserId(req.body.userId, res)
    console.log('TempIds', tempIds)
    const deptIds = []
    tempIds.forEach(element => {
      deptIds.push(element.deptId)
    })
    console.log('DeptIds', deptIds)

    const deptName = await module.exports.getDepartmentNameFromDeptId(deptIds[0])
    console.log('DeptName', deptName)

    // Query the employees from the departments the logged in user is a manager of
    const employeeList = await dbClient.select('_userDept.userId', 'User.userName')
      .from('_userDept')
      .whereIn('_userDept.deptId', deptIds)
      .andWhere('isManager', 1)
      .join('User', 'User.userId', '_userDept.userId')
      .then((result) => { return result })
    console.log('EmployeeList', employeeList)

    res.status(200).json({
      depName: deptName[0].deptName,
      depId: deptIds[0],
      depEmployees: employeeList
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Error while getting employees from department'
    })
  }
}

// Use the userId from the token to get the departments that user manages. Return the list of deptIds and names
const getDepartmentsFromUserId = async (userId, res) => {
  console.log('starting getDepartmentsFromUserId')
  return (await dbClient.select('_userDept.deptId')
    .from('_userDept')
    .where('userId', '=', userId)
    .andWhere('isManager', 1))
}

const getDepartmentNameFromDeptId = async (deptId) => {
  console.log('starting getDepartmentNameFromDeptId')
  return (await dbClient.select('Department.deptName')
    .from('Department')
    .where('Department.deptId', '=', deptId))
}

const addEmployeeToDeptCallback = async (req, res) => {

}

// Callback/wrapper for deleting an employee
const deleteEmployeeFromDeptCallback = async (req, res) => {
  // Verify and add the user ID to the request
  try {
    verifyJWTAuthToken(req, res)
  } catch (error) {
    return
  }

  // Grab the data
  const data = req.body
  console.log('Data for delete employee:', data)
  try {
    // Execute query and get rows affected
    const response = (await dbClient.select('*')
      .from('_userDept')
      .where('userId', data.userId)
      .andWhere('deptId', data.deptId)
      .del())

    console.log('Delete employee', response)

    // If no rows are affected, 404
    if (response === 0) {
      res.status(404).json({
        message: 'No employee with that id found'
      })
      return
    }
    // Otherwise, good job
    res.status(202).json({
      message: 'Employee deleted'
    })
  } catch (error) {
    // Catch all for unexpected stuff
    console.log(error)
    res.status(500).json({
      error: {
        message: 'Internal server error while deleting employee'
      }
    })
  }
}

module.exports = {
  searchEmployeesCallback,
  getEmployeesFromDepartmentCallback,
  addEmployeeToDeptCallback,
  deleteEmployeeFromDeptCallback,
  getDepartmentsFromUserId,
  getDepartmentNameFromDeptId
}
