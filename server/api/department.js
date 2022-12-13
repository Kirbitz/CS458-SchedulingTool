const dbClient = require('./dbClient')
const { verifyJWTAuthToken, errorOccurred } = require('./dataHelper')

// Query for searching employees
const searchEmployeesCallback = async (req, res) => {
  try {
    // Verify and add the user ID to the request
    verifyJWTAuthToken(req)

    // Get the search data from the URL and check that it is a valid search item
    const searchData = (req.params.search).trim()

    if (searchData.match('^[a-zA-Z]+$') || searchData.match('^[0-9]+$')) {
      // This query searches for a user name or ID that is LIKE the search data
      res.status(200).json(await dbClient.select('User.userId', 'User.userName')
        .from('User')
        .whereILike('User.userId', `%${searchData}%`)
        .orWhereILike('User.userName', `%${searchData}%`))
    } else {
      throw new Error('Missing/Invalid Data', { cause: { error: { status: 400, message: 'Invalid Search Data' } } })
    }
  } catch (error) {
    // 2 kinds of errors, malformed input or nondescript server error
    errorOccurred(error, res)
  }
}

// Request should contain a department ID, response should return list of employees in that department
const getEmployeesFromDepartmentCallback = async (req, res) => {
  // Main code for endpoint
  try {
    // Verify and add the user ID to the request
    verifyJWTAuthToken(req)

    // Get the department name from only the first department the user manages
    const deptName = await getDepartmentNameFromDeptId(req.body.deptId)

    // Query the employees from the departments the logged in user is a manager of
    const employeeList = await dbClient
      .from('_userDept')
      .join('User', 'User.userId', '_userDept.userId')
      .where('_userDept.deptId', req.body.deptId)
      .select('_userDept.userId', 'User.userName')
      .then((result) => { return result })

    res.status(200).json({
      depName: deptName[0].deptName,
      deptId: req.body.deptId,
      depEmployees: employeeList
    })
  } catch (error) {
    errorOccurred(error, res)
  }
}

const getDepartmentNameFromDeptId = async (deptId) => {
  return (await dbClient
    .from('Department')
    .where('Department.deptId', deptId)
    .select('Department.deptName'))
}

const addEmployeeToDepartmentCallback = async (req, res) => {
  try {
    // Grab the deptId
    verifyJWTAuthToken(req)
    const departmentId = req.body.deptId

    // Grab the list of employees
    const employeeList = req.body.depEmployees

    if (!employeeList) {
      throw new Error('Missing/Invalid Data', { cause: { error: { status: 400, message: 'Missing Required Data' } } })
    }

    if (employeeList.length <= 0) {
      throw new Error('Missing/Invalid Data', { cause: { error: { status: 400, message: 'Required Data is Invalid' } } })
    }

    // Iterate through and insert into the database
    for (const employee of employeeList) {
      await dbClient
        .insert({
          userId: employee.userId,
          deptId: departmentId
        })
        .into('_userDept')
    }
    res.status(201).json({
      message: 'Employee placed into department'
    })
  } catch (error) {
    // Catch all for unexpected stuff
    errorOccurred(error, res)
  }
}

// Callback/wrapper for deleting an employee
const deleteEmployeeFromDeptCallback = async (req, res) => {
  // Grab the data
  const data = req.body
  try {
    verifyJWTAuthToken(req)
    const departmentId = req.body.deptId
    const depEmployees = data.depEmployees

    if (!depEmployees) {
      throw new Error('Missing/Invalid Data', { cause: { error: { status: 400, message: 'Missing Required Data' } } })
    }

    if (depEmployees.length <= 0) {
      throw new Error('Missing/Invalid Data', { cause: { error: { status: 400, message: 'Required Data is Invalid' } } })
    }

    // Execute query and get rows affected
    for (const employee of depEmployees) {
      const response = (await dbClient
        .from('_userDept')
        .where('userId', employee.userId)
        .andWhere('deptId', departmentId)
        .del())
      // If no rows are affected, 404
      if (response === 0) {
        throw new Error('Not Found', { cause: { error: { status: 404, message: 'No employee with that id found' } } })
      }
    }
    // Otherwise, good job
    res.status(202).json({
      message: 'Employee deleted'
    })
  } catch (error) {
    // Catch all for unexpected stuff
    errorOccurred(error, res)
  }
}

module.exports = {
  searchEmployeesCallback,
  getEmployeesFromDepartmentCallback,
  addEmployeeToDepartmentCallback,
  deleteEmployeeFromDeptCallback
}
