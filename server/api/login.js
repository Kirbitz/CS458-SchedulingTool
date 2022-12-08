const sjcl = require('sjcl') // sha256 for encryption
const jwt = require('jsonwebtoken')
const { serialize } = require('cookie')

// Database connection with knex
const dbClient = require('./dbClient')
const { getJWTSecret } = require('./dataHelper')

// function is asynchronous to allow query to happen before trying to access results
const loginCallback = async (req, res) => {
  try {
    const loginData = req.body

    // Throw an error if no username or password passed in
    if (!loginData.username || !loginData.password) {
      throw new Error('Missing/Invalid', { cause: { error: { status: 400, message: 'Missing Required Data' } } })
    }

    // Query the database to see if the username/password combo exists
    const user = await checkUsernamePassword(loginData.username, loginData.password)

    // There is no user with those login credentials
    if (user.length === 0) {
      // Incorrect login info; User not logged in
      // Send status code 401 and JSON, then end the response
      throw new Error('Unauthorized', { cause: { error: { status: 401, message: 'Unauthorized' } } })
    }

    const token = await signToken(user[0].credentialsId, user[0].userPermissions)

    const serialized = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 5 * 60 * 60,
      path: '/'
    })

    // Successful login
    // Send status code 200 and JSON, then end the response
    res.status(200)
      .set('Authorization', token)
      .setHeader('Set-Cookie', serialized)
      .json({
        userId: user[0].credentialsId,
        isManager: user[0].userPermissions
      })
      .end()
  } catch (err) {
    switch (err.message) {
      // Data is either missing or invalid
      case 'Missing/Invalid':
        res.status(400)
          .json(err.cause)
        break
      // User doe not exist in database
      case 'Unauthorized':
        res.status(401)
          .json(err.cause)
        break
      default:
        console.error(err)
        // Some kind of error occurred, though not unique constraints
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
}

const checkUsernamePassword = async (username, password) => {
  // create a bit array
  const passwordBitArray = sjcl.hash.sha256.hash(password)
  // create the password hash
  const passwordHash = sjcl.codec.hex.fromBits(passwordBitArray)

  return dbClient.select('Credentials.credentialsId', 'User.userPermissions')
    .from('Credentials')
    .join('User', 'Credentials.credentialsId', 'User.userId')
    .where('Credentials.credentialsUsername', '=', username)
    .andWhere('Credentials.credentialsPassword', '=', passwordHash)
    .then(result => {
      return result // Returns an array of Rows
    })
    .catch(err => { throw err })
}

const signToken = (_userId, _isManager) => {
  return jwt.sign( // Sign a token to be stored in Authorization header
    { // Things used to sign the token
      userId: _userId,
      isManager: _isManager
    },
    getJWTSecret(),
    { expiresIn: 5 * 60 * 60 }) // Token valid for 5 hours
}

module.exports = {
  loginCallback
}
