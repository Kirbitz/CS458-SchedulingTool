const { verifyJWTAuthToken } = require('./dataHelper')

// Database connection with knex
const dbClient = require('./dbClient')

// Collects the timeBlock data from database between a provided start and end date
const collectTimeBlockData = async (req, res) => {
  // Collects start and end dates from URI parameters
  const startDate = req.params.startDate
  const endDate = req.params.endDate

  // Regex pattern, yyyy-mm-dd
  // yyyy - any number
  // mm - number between 01 and 12
  // dd - number between 01 and 31
  const regex = '^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$'

  // Checks the start and end dates exist
  // Returns 400 if either is missing
  if (!startDate || !endDate) {
    res.status(400)
      .json({
        error: {
          status: 400,
          message: 'Missing start date or end date'
        }
      }).end()
    return
  }

  // Checks the start and end dates follow a proper date format
  // Returns 400 if either is in an invalid format
  if (!startDate.match(regex) || !endDate.match(regex)) {
    res.status(400)
      .json({
        error: {
          status: 400,
          message: 'Invalid start date or end date'
        }
      }).end()
    return
  }

  // Validates the user is logged in through JWT authentication
  try {
    verifyJWTAuthToken(req, res)
  } catch (err) {
    return
  }

  // Collects timeBlock data from database
  const _timeBlocks = await getTimeBlocksFromDB(`${startDate}T00:00:00Z`, `${endDate}T23:59:59Z`)

  res.status(200)
    .json({
      success: {
        status: 200,
        timeBlocks: _timeBlocks
      }
    }).end()
}

// Create or modifies a timeBlock based on user input and permissions
const createModifyTimeBlockData = async (req, res) => {
  // Collects data passed in from body
  const timeData = req.body

  // Validates required data exists based on documentation
  if (!timeData.timeStart || !timeData.timeEnd || !(timeData.timeType + 1)) {
    res.status(400)
      .json({
        error: {
          status: 400,
          message: 'Missing Data for Time Block'
        }
      }).end()
    return
  }

  // Removes potential artifacts from date string
  timeData.timeStart = timeData.timeStart.replace('Z', ' ').replace('T', '')
  timeData.timeEnd = timeData.timeEnd.replace('Z', ' ').replace('T', '')

  // Regex pattern, yyyy-mm-dd HH:MM:ss
  // yyyy - any number
  // mm - number between 01 and 12
  // dd - number between 01 and 31
  // HH - number between 00 and 23
  // MM - number between 01 and 59
  // ss - number between 00 and 59
  const regex = '^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01]) (0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$'

  // Validates required parameters based on documentation
  if (!timeData.timeStart.match(regex) || !timeData.timeEnd.match(regex) || !Number.isInteger(timeData.timeType)) {
    res.status(400)
      .json({
        error: {
          status: 400,
          message: 'Invalid Data Provided'
        }
      }).end()
    return
  }

  // Validates the user is logged in through JWT authentication
  try {
    verifyJWTAuthToken(req, res)
  } catch (err) {
    return
  }

  // Runs final part in method connecting to db as to account for potential failure handling
  await createModifyTimeBlockInDB(res, timeData)
}

// Deletes a specific timeBlock from the database
const deleteTimeBlockData = async (req, res) => {
  // Grabs the id of the timeBlock to be deleted
  const _timeId = req.body.timeId

  // Validates the time Id exists and is a number
  if (!_timeId || !Number.isInteger(_timeId)) {
    res.status(400)
      .json({
        error: {
          status: 400,
          message: 'Bad Request - Invalid or Missing Time ID'
        }
      }).end()
    return
  }

  // Validates the user is logged in through JWT authentication
  try {
    verifyJWTAuthToken(req, res)
  } catch (err) {
    return
  }

  // Tries to remove timeBlock from database
  // Throws 500 error if the removal fails
  try {
    await deleteTimeBlockInDB(_timeId)

    res.status(202)
      .json({
        success: {
          status: 202,
          message: 'Time Block Deleted',
          timeId: _timeId
        }
      }).end()
  } catch (err) {
    console.error(err)

    res.status(500)
      .json({
        error: {
          status: 500,
          message: 'Internal Server Error'
        }
      }).end()
  }
}

// Collects all time blocks regardless of whether they have an assigned position and employee
const getTimeBlocksFromDB = async (startDate, endDate) => {
  return dbClient.select('TimeBlock.timeId', 'TimeBlock.timeStart', 'TimeBlock.timeEnd', 'TimeBlock.timeType', 'Position.positionName')
    .from('TimeBlock')
    .leftJoin('Position', 'Position.positionId', 'TimeBlock.positionId')
    .leftJoin('User', 'User.userId', 'TimeBlock.userId')
    .where('TimeBlock.timeEnd', '<=', endDate)
    .andWhere('TimeBlock.timeStart', '>=', startDate)
    .then(result => {
      return result
    })
}

// Creates/Modifies a TimeBlock in DB
const createModifyTimeBlockInDB = async (res, timeData) => {
  try {
    // Checks if the time block failed due to user permissions
    let failedWithoutError = false
    await dbClient.transaction(async trx => {
      // Checks the time id is not equal to zero
      // Zero indicates the time block was not created by a manager
      if (timeData.timeId !== 0) {
        // Checks the user permissions are manager or above
        if (checkManagerPermissions(timeData.userId)) {
          // Collects department data based on the manager
          const _deptId = await getDepartmentId(timeData, trx)
          await dbClient.insert({
            timeId: timeData?.timeId,
            timeStart: timeData.timeStart,
            timeEnd: timeData.timeEnd,
            timeType: timeData.timeType,
            positionId: timeData?.positionId,
            deptId: _deptId,
            userId: timeData.employeeId
          })
            .into('TimeBlock')
            .onConflict('timeId')
            .merge()
            .transacting(trx)
            .catch(err => { throw err })
        } else {
          failedWithoutError = true
        }
      } else {
        await dbClient.insert({
          timeId: timeData?.timeId,
          timeStart: timeData.timeStart,
          timeEnd: timeData.timeEnd,
          timeType: timeData.timeType,
          positionId: null,
          deptId: null,
          userId: timeData.userId
        })
          .into('TimeBlock')
          .onConflict('timeId')
          .merge()
          .transacting(trx)
          .catch(err => { throw err })
      }
    }).catch(err => { throw err })

    // Checks for change and/or successful user permissions
    if (failedWithoutError) {
      res.status(401)
        .json({
          error: {
            status: 401,
            message: 'Unauthorized'
          }
        })
        .end()
    } else {
      res.status(200)
        .json({
          success: {
            status: 200,
            message: 'Time Block Created or Modified'
          }
        }).end()
    }
  } catch (err) {
    console.error(err)
    res.status(500)
      .json({
        error: {
          status: 500,
          message: 'Internal Server Error'
        }
      }).end()
  }
}

// Removes a timeBlock in the DB based on timeId
const deleteTimeBlockInDB = async (_timeId) => {
  return dbClient.from('TimeBlock')
    .where({ timeId: _timeId })
    .del()
    .catch(err => { throw err })
}

// Checks the permission level of the user is manager or above
const checkManagerPermissions = async (_userId) => {
  const data = await dbClient.select('userPermissions')
    .from('User')
    .where('userId', '=', _userId)
    .then(result => {
      return result
    })

  return data.permission > 0
}

// Grabs department Id of a user
const getDepartmentId = (accountData, trx) => {
  return dbClient.select('deptId')
    .from('_userDept')
    .where('userId', '=', accountData.userId)
    .andWhere('isManager', '=', 1)
    .transacting(trx)
    .then(result => {
      return result[0].deptId
    })
}

module.exports = {
  collectTimeBlockData,
  createModifyTimeBlockData,
  deleteTimeBlockData
}
