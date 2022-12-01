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
    const searchData = req.params.search
    if (searchData.match('([a-zA-Z\\s])') || searchData.match('([\\d])')) {
      res.status(200).json(await dbClient.select('User.userId', 'User.userName')
        .from('User')
        .whereLike('User.userId', '%{searchData}%')
        .orWhereLike('User.userName', '%{searchData}%'))
    } else {
      throw new Error('Invalid Search')
    }
  } catch (error) {
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
const getEmployeesFromDepartment = async (req, res) => {
  // Verify and add the user ID to the request
  try {
    verifyJWTAuthToken(req, res)
  } catch (error) {
    return
  }

  // Main code for endpoint
  try {
    // Get the departments that the user belongs to and place the IDs into an array
    const tempIds = await getDepartmentsFromUserId(req.body.userId, res)
    const deptIds = []
    tempIds.forEach(element => {
      deptIds.push(element.deptId)
    })
    // Query the employees from the departments the logged in user is a manager of
    res.status(200).json(await dbClient.select('_userDept.userId', 'User.userName')
      .from('_userDept')
      .whereIn('_userDept.deptId', deptIds)
      .andWhere('isManager', 1)
      .join('User', 'User.userId', '_userDept.userId')
      .then((result) => { return result }))
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Error while getting employees from department'
    })
  }
}

// Use the userId from the token to get the departments that user manages. Return the list of deptIds
const getDepartmentsFromUserId = async (userId, res) => {
  return (dbClient.select('_userDept.deptId')
    .from('_userDept')
    .where('userId', userId)
    .then((result) => { return result }))
}

// Create a department
const postDepartmentCallback = async (req, res) => {
  // Verify and add the user ID to the request
  try {
    verifyJWTAuthToken(req, res)
  } catch (error) {
    return
  }

  const data = req.body
  try {
    const response = await dbClient
      .into('Department')
      .insert({
        deptName: data.deptName,
        deptLocation: data.deptLocation,
        deptHourCap: data.deptHourCap
      })
    res.status(201).json({
      message: 'Department created with ID: ' + response,
      deptId: response[0]
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

// Get department
const getDepartments = async (req, res) => {
  // Verify and add the user ID to the request
  try {
    verifyJWTAuthToken(req, res)
  } catch (error) {
    return
  }

  res.status(200).json(await dbClient
    .select('deptId', 'deptName', 'deptLocation', 'deptHourCap')
    .from('Department'))
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
  try {
    // Execute query and get rows affected
    const response = await dbClient
      .from('_userDept')
      .where('userId', data.employeeId)
      .andWhere('deptId', data.deptId)
      .del()

    // If no rows are affected, 404
    if (response === 0) {
      res.status(404).json({
        message: 'No employee with id ' + data.employeeId + ' found'
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
  getEmployeesFromDepartment,
  getDepartmentsFromUserId,
  postDepartmentCallback,
  getDepartments,
  deleteEmployeeFromDeptCallback
}
