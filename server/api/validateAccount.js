const dotenv = require('dotenv')
dotenv.config()

const { createAccountCallback } = require('./createAccount.js')

// Database connection with knex
const dbClient = require('./dbClient')
const { verifyJWTAuthToken } = require('./dataHelper')

const validateNewAccountCallback = async (req, res) => {
  // Verify the session token
  try {
    verifyJWTAuthToken(req, res)
  } catch (err) {
    // The Auth token could not be verified
    return
  }

  const newAccountData = req.body

  // a bit spaghetti, but I'd rather it be simple to call on the front end
  newAccountData.credentialsId = newAccountData.userid
  newAccountData.credentialsUsername = newAccountData.username

  const badFields = []

  const databaseResponse1 = await checkUnique(newAccountData, 'Credentials', 'credentialsUsername')
  const databaseResponse2 = await checkUnique(newAccountData, 'Credentials', 'credentialsId')

  if (databaseResponse1) {
    badFields.push('Username')
  }

  if (databaseResponse2) {
    badFields.push('User ID')
  }

  if (badFields.length) {
    res.status(400)
      .json({
        error: {
          status: 400,
          message: 'Bad Request - Non-Unique Fields',
          fields: badFields
        }
      }).end()

    return
  }

  createAccountCallback(req, res)
}

const checkUnique = (data, table, field) => {
  return dbClient.select(field)
    .from(table)
    .where(field, '=', data[field])
    .then(result => {
      // returns the field if a match was found
      // Should be empty to validate
      return result[0]
    })
}

module.exports = {
  validateNewAccountCallback
}
