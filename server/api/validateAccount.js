const dotenv = require('dotenv')
dotenv.config()

const { createAccountCallback } = require('./createAccount.js')

const jwt = require('jsonwebtoken')

// Database connection with knex
const dbClient = require('./dbClient')

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

  let databaseResponse = await checkUnique(newAccountData, 'Credentials', 'credentialsUsername')

  if (databaseResponse) {
    badFields.push('Username')
  }

  databaseResponse = await checkUnique(newAccountData, 'Credentials', 'credentialsId')

  if (databaseResponse) {
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

const verifyJWTAuthToken = (req, res) => {
  // Read the Authorization cookie
  const rawAuth = req.header('Authorization')
  return jwt.verify(rawAuth, process.env.JWTSecret,
    (err, decodedAuth) => {
      // Session token not valid if there is an error or decodedAuth is undefined
      if (err || !decodedAuth) {
        res.status(401)
          .json({
            error: {
              status: 401,
              message: 'Unauthorized'
            }
          })
          .end()

        // throw the error
        throw err
      }
    })
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
  validateNewAccountCallback,
  verifyJWTAuthToken
}
