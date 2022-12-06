const dbClient = require('./dbClient')
const { verifyJWTAuthToken } = require('./dataHelper')

const shiftViewGETCallback = async (req, res) => {
  // try {
  //   verifyJWTAuthToken(req, res)
  // } catch (err) {
  //   // The Auth token could not be verified
  //   return
  // }

  req.body.userId = 3
  const shiftViewData = req.body

  // slices off the time
  shiftViewData.date = shiftViewData.date.slice(0, 10)

  const deptId = await getDepartmentId(shiftViewData)
  const timeBlocks = await getTimeBlocks(shiftViewData, deptId)
  const employees = await getEmployees(shiftViewData, deptId)

  const formattedEmployees = []

  for (let i = 0; i < employees.length; i++) {
    const employeeInfo = {
      employeeId: employees[i].userId,
      employeeName: employees[i].userName
    }

    // push to the array
    formattedEmployees.push(employeeInfo)
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
  return dbClient.select('timeId', 'timeStart', 'timeEnd', 'Position.positionName', 'User.userId', 'User.userName')
    .from('TimeBlock')
    .leftJoin('User', 'TimeBlock.userId', 'User.userId')
    .leftJoin('Position', 'TimeBlock.positionId', 'Position.positionId')
    .whereLike('timeStart', `${shiftViewData.date}%`)
    .andWhere('TimeBlock.positionId', '=', shiftViewData.positionId)
    .andWhere('TimeBlock.deptId', '=', deptId)
    .then(result => {
      return result
    })
}

const getEmployees = (shiftViewData, deptId) => {
  return dbClient.select('userName', 'User.userId')
    .from('User')
    .where('_userDept.deptId', '=', deptId)
    .andWhere('_userPos.posId', '=', shiftViewData.positionId)
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
