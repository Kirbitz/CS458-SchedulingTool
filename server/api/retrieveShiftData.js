const dotenv = require('dotenv')
dotenv.config()

// *****commented out so we don't need to worry about security for now*****
// const { verifyJWTAuthToken } = require('./dataHelper')
// *****commented out so we don't need to worry about security for now*****

// Database connection with knex
const dbClient = require('./dbClient')

// retrieve the set of timeBlocks for a specific day
const retrieveShiftData = async (req, res) => {
  // ***these vars are hardcoded but will come from the front end date picker later***
  const dateFrom = '2022-11-17 00:00:00'
  const dateTo = '2022-11-18 00:00:00'

  console.log('retrieveShift Called')
  // *****commented out so we don't need to worry about security for now*****
  // try {
  //   verifyJWTAuthToken(req, res)
  // } catch (err) {
  // return dbClient.select('*').from(+'TimeBlock')
  // }
  // *****commented out so we don't need to worry about security for now*****
  const testingConnect = await dbClient.select('timeId', 'timeStart', 'timeEnd', 'timeType', 'positionId', 'deptId')
    .from('TimeBlock')
    .where('timeStart', '>=', dateFrom)
    .where('timeEnd', '<', dateTo)
    .then(result => { return result })
  // console.log(testingConnect)
  res.send(testingConnect)

// const user = await module.exports.
}

//
// const funct = async (req, res) => {
//   dbClient.select()
// }

module.exports = {
  retrieveShiftData
}
