const dbClient = require('./dbClient')
const { verifyJWTAuthToken } = require('./dataHelper')

const shiftViewGETCallback = async (req, res) => {
  // try {
  //   verifyJWTAuthToken(req, res)
  // } catch (err) {
  //   // The Auth token could not be verified
  //   return
  // }

  const shiftViewData = req.body

  // slices off the time
  shiftViewData.date = shiftViewData.date.slice(0, 8)

  const deptId = 1 // await getDepartmentId(shiftViewData)
  const timeBlocks = await getTimeBlocks(shiftViewData, deptId)
  const employees = await getEmployees(shiftViewData, deptId)

  const formattedEmployees = []

  for (let i = 0; i < employees.length; i++) {
    // check if the employee has already been formatted
    const formattedEmployee = formattedEmployees.find(obj => obj.employeeId === employees[i].userId)

    if (!formattedEmployee) {
      // format it if not
      const employeeInfo = {
        employeeId: employees[i].userId,
        employeeName: employees[i].userName,
        positionIDs: [
          employees[i].posId
        ]
      }

      // push to the array
      formattedEmployees.push(employeeInfo)
    } else {
      // employee data is already formatted and in the array
      // new position found for employee
      formattedEmployee.positionIDs.push(employees[i].posId)
      // sorts in alphabetical order
      formattedEmployee.positionIDs.sort((a, b) => { return a - b })
    }
  }

  // sort employees alphabetically by first name
  formattedEmployees.sort((a, b) => {
    if (a.employeeName < b.employeeName) return -1
    if (a.employeeName > b.employeeName) return 1
    return 0
  })

  const formattedTimeBlocks = []

  for (let i = 0; i < timeBlocks.length; i++) {
    const timeBlockInfo = {
      timeID: timeBlocks[i].timeId,
      startTime: timeBlocks[i].timeStart,
      endTime: timeBlocks[i].timeEnd,
      positionID: timeBlocks[i].positionId,
      positionName: timeBlocks[i].positionName,
      assignedToID: timeBlocks[i].userId,
      assignedToName: timeBlocks[i].userName
    }

    formattedTimeBlocks.push(timeBlockInfo)
  }

  res.status(200).json({
    timeblocks: formattedTimeBlocks,
    employees: formattedEmployees
  }).end()
}

const getTimeBlocks = (shiftViewData, deptId) => {
  return dbClient.select('timeId', 'timeStart', 'timeEnd', 'Position.positionId', 'Position.positionName', 'User.userId', 'User.userName')
    .from('TimeBlock')
    .leftJoin('User', 'TimeBlock.userId', 'User.userId')
    .leftJoin('Position', 'TimeBlock.positionId', 'Position.positionId')
    .whereLike('timeStart', `${shiftViewData.date}%`)
    .andWhere('TimeBlock.deptId', '=', deptId)
    .then(result => {
      return result
    })
}

const getEmployees = (shiftVeiwData, deptId) => {
  return dbClient.select('userName', 'User.userId', '_userPos.posId')
    .from('User')
    .where('_userDept.deptId', '=', deptId)
    .join('_userDept', 'User.userId', '_userDept.userId')
    .leftJoin('_userPos', 'User.userId', '_userPos.userId')
    .then(result => {
      return result
    })
}

const getDepartmentId = (shiftViewData) => {
  return dbClient.select('deptId')
    .from('_userDept')
    .where('userId', '=', shiftViewData.userId)
    .andWhere('isManager', '=', 1)
    .then(result => {
      return result[0].deptId
    })
}

module.exports = {
  shiftViewGETCallback
}
