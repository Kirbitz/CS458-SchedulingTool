const dotenv = require('dotenv')
dotenv.config()

const sjcl = require('sjcl') // sha256 for encrpytion
// const jwt = require('jsonwebtoken')

// Database connection with knex
const dbClient = require('./dbClient')

const createAccountCallback = async (req, res) => {
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

  const newAccountData = req.body

  try {
    await module.exports.insertRows(newAccountData)
    res.json({
      success: {
        status: 201,
        message: 'Created new account'
      }
    })
  } catch (error) {
    console.log(error)
    res.json({
      error: {
        status: 500,
        message: 'Internal Server Error'
      }
    })
  }
}

const insertRows = async (accountData) => {
  await dbClient.transaction(async trx => {
    // Grab the manager's departmentID
    const deptID = await getDepartmentId(accountData)

    // Create a User record
    await createUserRecord(accountData, trx)

    // Create Credentials record
    await createCredentialsRecord(accountData, trx)

    // Create a _UserDepartment record
    await createUserDepartmentRecord(accountData, deptID, trx)
  })
}

const createCredentialsRecord = (accountData, trx) => {
  // Create a bit array
  const passwordBitArray = sjcl.hash.sha256.hash(accountData.password)
  // Create the password hash
  const passwordHash = sjcl.codec.hex.fromBits(passwordBitArray)

  return dbClient.insert({
    credentialsId: accountData.userid,
    credentialsUsername: accountData.username,
    credentialsPassword: passwordHash
  })
    .into('Credentials')
    .transacting(trx)
}

const createUserRecord = (accountData, trx) => {
  return dbClient.insert({
    userId: accountData.userid,
    userName: accountData.username,
    userPermissions: accountData.permissions,
    userHours: accountData.maxHours
  })
    .into('User')
    .transacting(trx)
}

const getDepartmentId = (accountData) => {
  return dbClient.select('deptId')
    .from('_UserDepartment')
    .where('userId', '=', accountData.managerId)
    .andWhere('isManager', '=', '1')
    .then(result => {
      return result[0].deptId // return the department id
    })
}

const createUserDepartmentRecord = (accountData, _deptId, trx) => {
  return dbClient.insert({
    userId: accountData.userid,
    deptId: _deptId,
    isManager: accountData.permissions
  })
    .into('_UserDepartment')
    .transacting(trx)
}

module.exports = {
  createAccountCallback,
  insertRows
}
