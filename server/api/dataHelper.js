const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken')

const verifyJWTAuthToken = (req) => {
  // Read the Authorization header
  const rawAuth = req.headers.cookie?.replace('token=', '') ?? req.headers.authorization?.replace('Bearer ', '')
  return jwt.verify(rawAuth, getJWTSecret(),
    (err, decodedAuth) => {
      // Session token not valid if there is an error or decodedAuth is undefined
      if (err || !decodedAuth) {
        throw new Error('Unauthorized', { thrown: err, cause: { error: { status: 401, message: 'Unauthorized' } } })
      }

      // add the userID to the request body
      req.body.userId = decodedAuth.userId
      req.body.isManager = decodedAuth.isManager
      req.body.deptId = decodedAuth.deptId
    })
}

const getJWTSecret = () => {
  return process.env.JWTSecret
}

const errorOccurred = (err, res) => {
  switch (err.message) {
    // Sends response with missing data message
    case 'Missing/Invalid Data':
      res.status(400)
        .json(err.cause)
        .end()
      break
    // Sends response with unauthorized message
    case 'Unauthorized':
      res.status(401)
        .json(err.cause)
        .end()
      break
    // Sends response with not found message
    case 'Not Found':
      res.status(404)
        .json(err.cause)
        .end()
      break
    // Sends response with 500 in the case of an unexpected error
    default:
      console.error(err)
      res.status(500)
        .json({
          error: {
            status: 500,
            message: 'Internal Server Error'
          }
        })
        .end()
  }
}

module.exports = {
  verifyJWTAuthToken,
  getJWTSecret,
  errorOccurred
}
