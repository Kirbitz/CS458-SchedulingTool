const dotenv = require('dotenv')
dotenv.config()

const { verifyJWTAuthToken } = require('./dataHelper')

// Database connection with knex
const dbClient = require('./dbClient')

// retrieve the set of timeBlocks for a specific day
const retrieveShiftData = async (req, res) => {
  // ***these vars are hardcoded but will come from the front end date picker later***
  const dateFrom = req.body.startDate
  const dateTo = req.body.endDate

  // const dateFrom = '2022-11-14 00:00:00'
  // const dateTo = '2022-11-20 00:00:00'
  try {
    verifyJWTAuthToken(req, res)
  } catch (err) {
    return
  }

  // ** consider user id which is set in verify auth
  const testingConnect = await dbClient.select('timeId',
    'timeStart',
    'timeEnd',
    'timeType',
    'positionName',
    'deptName',
    'deptLocation',
    'deptHourCap')
    .from('TimeBlock')
    .join('Position', 'TimeBlock.positionId', 'Position.positionId')
    .join('Department', 'TimeBlock.deptId', 'Department.deptId')
    .where('timeStart', '>=', dateFrom)
    .where('timeEnd', '<', dateTo)
    .then(result => { return result })

  const days = new Map()
  testingConnect.forEach((value) => {
    // console.log(key, value)
    // parse the date out of the time start part of the time block
    // console.log(value.timeStart)
    // only insert dates that do not already exist in the map
    if (!days.get(value.timeStart)) {
      // create the object that we want to put into the map
      // console.log(value)
      days.set(value.timeStart, value)
    }
    // example of getting data out of the map
    // console.log(' Days in map: ' + days.get(value.timeStart).positionName)
  })

  res.status(200).send(testingConnect)

// const user = await module.exports.
}

//
// const funct = async (req, res) => {
//   dbClient.select()
// }

module.exports = {
  retrieveShiftData
}
