const dotenv = require('dotenv')
dotenv.config()

const sjcl = require('sjcl') // sha256 for encrpytion
const jwt = require('jsonwebtoken')

// Database connection with knex
const dbClient = require('./dbClient')

const createAccountCallback = (req, res) => {
  // Read the Authorization header for verification
  // const rawAuth = req.header('Authorization')

  // // Verify the session token
  // const authIsVerified = jwt.verify(rawAuth, process.env.JWTSecret,
  //   (err, decodedAuth) => {
  //   // Session token not valid if there is an error or decodedAuth is undefined
  //     if (err || !decodedAuth) {
  //       return false
  //     }

  //     return true
  //   })

  // // Session token is not valid. Send the response and return
  // if (!authIsVerified) {
  //   res.status(401)
  //     .json({
  //       error: {
  //         status: 401,
  //         message: 'Unauthorized'
  //       }
  //     })
  //     .end()

  //   return
  // }

  let newAccountData = req.body

  
}

const createCredentialsRecord = (accountData) => {
  // Create a bit array
  const passwordBitArray = sjcl.hash.sha256.hash(accountData.password)
  // Create the password hash
  const passwordHash = sjcl.codec.hex.fromBits(passwordBitArray)

  return dbClient.insert({
    credentialsUsername: accountData.username,
    credentialsPassword: passwordHash
  })
    .into('Credentials')
    .then(result => {
      return result[0] // returns the number of rows inserted
    })
}

const getNewUserId = (accountData) => {
  return dbClient.select('credentialsId')
    .from('Credentials')
    .where('crededentialsUsername', '=', accountData.username)
    .then(result => {
      return result // returns the credentialsId
    })
}

const createUserRecord = (accountData) => {
  return dbClient.insert({
    userName: accountData.username,
    userPermissions: accountData.permissions,
    userHours: accountData.maxHours
  })
    .into('User')
    .then(result => {
      return result[0] // returns the number of rows inserted
    })
}

const getDepartmentId = (accountData) => {
  return dbClient.select('deptId')
    .from('_UserDepartment')
    .where('userId', '=', accountData.managerId)
    .andWhere('isManager', '=', '1')
    .then(result => {
      return result // returns the department ID
    })
}

const createUserDepartmentRecord = (accountData, _userId, _deptId) => {
  return dbClient.insert({
    userId: _userId,
    deptId: _deptId,
    isManager: accountData.isManager
  })
    .into('_UserDepartment')
    .then(result => {
      return result // returns the number of rows affected
    })
}

module.exports = {
  createAccountCallback,
  createCredentialsRecord,
  getNewUserId,
  createUserRecord,
  getDepartmentId,
  createUserDepartmentRecord
}
