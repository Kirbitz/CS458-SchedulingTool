const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken')

const verifyJWTAuthToken = (req, res) => {
  // Read the Authorization cookie
  const rawAuth = req.headers.Authorization
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

module.exports = {
  verifyJWTAuthToken
}
