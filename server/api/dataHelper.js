const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken')

const verifyJWTAuthToken = (req, res) => {
  // Read the Authorization header
  const rawAuth = req.headers.authorization.replace('Bearer ', '')
  return jwt.verify(rawAuth, getJWTSecret(),
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
        throw err
      }
      // add the userID to the request body
      req.body.userId = decodedAuth.userId
    })
}

const getJWTSecret = () => {
  return process.env.JWTSecret
}

module.exports = {
  verifyJWTAuthToken,
  getJWTSecret
}
