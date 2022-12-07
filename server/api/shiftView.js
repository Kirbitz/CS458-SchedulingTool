const dbClient = require('./dbClient')
const { verifyJWTAuthToken, errorOccurred } = require('./dataHelper')

const shiftViewGETCallback = async (req, res) => {
  try {
    await verifyJWTAuthToken(req, res)

    const shiftViewData = req.body

    if (!shiftViewData.date || !shiftViewData.positionId) {
      throw new Error('Missing/Invalid Data', { cause: { error: { status: 400, message: 'Missing Required Data' } } })
    }

    // slices off the time
    shiftViewData.date = shiftViewData.date.slice(0, 10)

    const timeBlocks = await getTimeBlocks(shiftViewData)
    const employees = await getEmployees(shiftViewData)

    const formattedEmployees = []

    for (const employee of employees) {
      const employeeInfo = {
        employeeId: employee.userId,
        employeeName: employee.userName
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

    for (const timeBlock of timeBlocks) {
      const timeBlockInfo = {
        timeID: timeBlock.timeId,
        startTime: timeBlock.timeStart,
        endTime: timeBlock.timeEnd,
        positionName: timeBlock.positionName,
        assignedToID: timeBlock.userId,
        assignedToName: timeBlock.userName
      }

      formattedTimeBlocks.push(timeBlockInfo)
    }

    res.status(200).json({
      timeblocks: formattedTimeBlocks,
      employees: formattedEmployees
    }).end()
  } catch (err) {
    errorOccurred(err, res)
  }
}

const shiftViewPOSTCallback = async (req, res) => {
  try {
    await verifyJWTAuthToken(req, res)

    const shiftData = req.body

    // get timeblock id and user id
    if (shiftData.records?.length === 0) {
      throw new Error('Missing/Invalid Data', { cause: { error: { status: 400, message: 'Missing Required Data' } } })
    }

    if (!shiftData?.isManager) {
      throw new Error('Unauthorized', { cause: { error: { status: 401, message: 'Invalid Authorization Level' } } })
    }

    for (let i = 0; i < shiftData.records.length; ++i) {
      if (!shiftData.records[i].timeBlockId || !shiftData.records[i].employeeId) {
        console.log('error')
        throw new Error('Missing/Invalid Data', { cause: { error: { status: 400, message: 'Missing Required Data' } } })
      }

      await assignShiftToUser(shiftData.records[i].timeBlockId, shiftData.records[i].employeeId)
    }

    // return success
    res.status(200)
      .json({
        success: {
          status: 200,
          message: 'Assigned Successfully'
        }
      })
      .end()
  } catch (err) {
    errorOccurred(err, res)
  }
}

const getTimeBlocks = (shiftViewData) => {
  return dbClient.select('timeId', 'timeStart', 'timeEnd', 'Position.positionName', 'User.userId', 'User.userName')
    .from('TimeBlock')
    .leftJoin('User', 'TimeBlock.userId', 'User.userId')
    .leftJoin('Position', 'TimeBlock.positionId', 'Position.positionId')
    .whereLike('timeStart', `${shiftViewData.date}%`)
    .andWhere('TimeBlock.positionId', '=', shiftViewData.positionId)
    .andWhere('TimeBlock.deptId', '=', shiftViewData.deptId)
    .then(result => {
      return result
    })
}

const getEmployees = (shiftViewData) => {
  return dbClient.select('userName', 'User.userId')
    .from('User')
    .where('_userDept.deptId', '=', shiftViewData.deptId)
    .andWhere('_userPos.posId', '=', shiftViewData.positionId)
    .join('_userDept', 'User.userId', '_userDept.userId')
    .leftJoin('_userPos', 'User.userId', '_userPos.userId')
    .then(result => {
      return result
    })
}

const assignShiftToUser = (timeBlockId, userId) => {
  return dbClient.from('TimeBlock').where('timeId', '=', timeBlockId)
    .update('userId', userId)
}

module.exports = {
  shiftViewGETCallback,
  shiftViewPOSTCallback
}
