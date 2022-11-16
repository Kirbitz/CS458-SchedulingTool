const dotenv = require('dotenv')
dotenv.config()

const { verifyJWTAuthToken } = require('./dataHelper')

// Database connection with knex
const dbClient = require('./dbClient')

// selecting data from the database
const retrieveShiftData = async (req, res) => {
  console.log('retrieveShift Called')
  // try {
  //   verifyJWTAuthToken(req, res)
  // } catch (err) {
  // return dbClient.select('*').from(+'TimeBlock')
  // }
  const testingConnect = await dbClient.select('userId').from('User').then(result => { return result })
  console.log(testingConnect)
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
