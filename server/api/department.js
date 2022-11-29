const dbClient = require('./dbClient')

// Request should contain a department ID, response should return list of employees in that department
const getEmployeesFromDepartment = async (req, res) => {
  const deptId = req.body.deptId
  res.status(200).json(await dbClient.select('_userDept.userId', 'User.userName')
    .from('_userDept')
    .join('User', 'User.userId', '_userDept.userId')
    .where('_userDept.deptId', deptId)
    .then((result) => { return result }))
}

// Create a department
const postDepartmentCallback = async (req, res) => {
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
      message: 'Department created with ID: ' + response
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
  res.status(200).json(await dbClient
    .select('deptId', 'deptName', 'deptLocation', 'deptHourCap')
    .from('Department')
    .then(result => { return result }))
}

// Callback/wrapper for deleting an employee
const deleteEmployeeFromDeptCallback = async (req, res) => {
  // Grab the data
  const data = req.body
  try {
    // Execute query and get rows affected
    const response = await dbClient
      .from('_userDept')
      .where('userId', data.userId)
      .andWhere('deptId', data.deptId)
      .del()

    // If no rows are affected, 404
    if (response === 0) {
      res.status(404).json({
        message: 'No employee with id ' + data.userId + ' found'
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
  getEmployeesFromDepartment,
  postDepartmentCallback,
  getDepartments,
  deleteEmployeeFromDeptCallback
}
