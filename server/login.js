const dotenv = require('dotenv')
dotenv.config()

const sjcl = require('sjcl') // sha256 for encryption
const jwt = require('jsonwebtoken')

// Database connection with knex
const dbClient = require('./dbClient')

// function is asynchronous to allow query to happen before trying to access results
const loginCallback = async (req, res) => {
  let loginData = req.body

  // Throw an error if no username or password passed in
  if (Object.keys(loginData).length === 0) {
    loginData = {
      username: '',
      password: ''
    }
  }

  // Query the database to see if the username/password combo exists
  const user = await module.exports.checkUsernamePassword(loginData.username, loginData.password)

  // There is no user with those login credentials
  if (user.length === 0) {
    // Incorrect login info; User not logged in
    // Send status code 401 and JSON, then end the response
    res.status(401)
      .json({
        error: {
          status: 401,
          message: 'Unauthorized'
        }
      })
      .end()
    return
  }

  // The user has correct credentials
  // Sign a token to be stored in Authorization header
  const token = await jwt.sign(
    { userId: user[0].credentialsId },
    process.env.JWTSecret,
    { expiresIn: 5 * 60 * 60 }) // Token valid for 5 hours

  // Successful login
  // Send status code 200 and JSON, then end the response
  res.status(200)
    .set('Authorization', token)
    .json({
      userId: user[0].credentialsId,
      isManager: user[0].isManager
    })
    .end()
}

const checkUsernamePassword = async (username, password) => {
  // create a bit array
  const passwordBitArray = sjcl.hash.sha256.hash(password)
  // create the password hash
  const passwordHash = sjcl.codec.hex.fromBits(passwordBitArray)

  return await dbClient.select('Credentials.credentialsId', '_UserDepartment.isManager')
    .from('Credentials')
    .join('User', 'Credentials.credentialsId', 'User.userId')
    .join('_UserDepartment', 'User.userId', '_UserDepartment.userId')
    .where('Credentials.credentialsUsername', '=', username)
    .andWhere('Credentials.credentialsPassword', '=', passwordHash)
    .then(result => {
      return result // Returns an array of Rows
    })
}

module.exports = {
  loginCallback,
  checkUsernamePassword
}
