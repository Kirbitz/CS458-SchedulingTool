const dbClient = require('./dbClient')
const { verifyJWTAuthToken } = require('./dataHelper')

// Query for searching employees
const searchEmployeesCallback = async (req, res) => {
  try {
    // Verify and add the user ID to the request
    verifyJWTAuthToken(req, res)
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
  // Main code for endpoint
  try {
    // Verify and add the user ID to the request
    verifyJWTAuthToken(req, res)
    // Get the departments that the user belongs to and place the IDs into an array
    const tempIds = await getDepartmentsFromUserId(req.body.userId)

    // Get the department name from only the first department the user manages
    const deptName = await getDepartmentNameFromDeptId(tempIds[0])

    // Query the employees from the departments the logged in user is a manager of
    const employeeList = await dbClient.select('_userDept.userId', 'User.userName')
      .from('_userDept')
      .where('_userDept.deptId', tempIds[0])
      .andWhere('isManager', 1)
      .join('User', 'User.userId', '_userDept.userId')
      .then((result) => { return result })

    res.status(200).json({
      depName: deptName,
      depId: tempIds[0],
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
const getDepartmentsFromUserId = async (userId) => {
  console.log('starting getDepartmentsFromUserId:', userId)
  return (await dbClient
    .from('_userDept')
    .where('_userDept.isManager', 1)
    .andWhere('_userDept.userId', userId)
    .select('_userDept.deptId'))
}

const getDepartmentNameFromDeptId = async (deptId) => {
  console.log('starting getDepartmentNameFromDeptId:', deptId)
  return (await dbClient
    .from('Department')
    .where('Department.deptId', deptId)
    .select('Department.deptName'))
}

const addEmployeeToDepartmentCallback = async (req, res) => {
  try {
    // Grab the deptId
    const departmentId = req.body.deptId
    verifyJWTAuthToken(req, res)

    // Grab the list of employees
    const employeeList = req.body.depEmployees

    // Iterate through and insert into the database
    employeeList.forEach(async (employee) => {
      await dbClient
        .insert({
          userId: employee.userId,
          deptId: departmentId
        })
        .into('_userDept')
    })
    res.status(201).json({
      message: 'Employee placed into department'
    })
  } catch (error) {
    // Catch all for unexpected stuff
    console.log(error)
    res.status(500).json({
      error: {
        message: 'Internal server error while inserting employee'
      }
    })
  }
}

// Callback/wrapper for deleting an employee
const deleteEmployeeFromDeptCallback = async (req, res) => {
  // Grab the data
  const data = req.body
  try {
    verifyJWTAuthToken(req, res)
    const departmentId = data.deptId
    const depEmployees = data.depEmployees
    // Execute query and get rows affected
    for (const employee of depEmployees) {
      const response = (await dbClient
        .from('_userDept')
        .where('userId', employee.userId)
        .andWhere('deptId', departmentId)
        .del())
      // If no rows are affected, 404
      console.log('Delete employee response', response)
      if (response === 0) {
        throw new Error('No employee with that id found')
      }
    }
    // Otherwise, good job
    res.status(202).json({
      message: 'Employee deleted'
    })
  } catch (error) {
    // Catch all for unexpected stuff
    console.log(error)
    if (error.message === 'No employee with that id found') {
      res.status(404).json({
        message: error.message
      })
      return
    }
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
  addEmployeeToDepartmentCallback,
  deleteEmployeeFromDeptCallback
}
