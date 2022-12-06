const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken')

const verifyJWTAuthToken = (req) => {
  // Read the Authorization header
  const rawAuth = req.headers.Authorization ?? req.headers.authorization?.replace('Bearer ', '')
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

module.exports = {
  verifyJWTAuthToken,
  getJWTSecret
}
