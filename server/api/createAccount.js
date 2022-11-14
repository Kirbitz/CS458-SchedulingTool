const dotenv = require('dotenv')
dotenv.config()

const sjcl = require('sjcl') // sha256 for encrpytion

// Database connection with knex
const dbClient = require('./dbClient')

const createAccountCallback = async (req, res) => {
  const newAccountData = req.body

  // If a query fails, all queries will be rolled back and error thrown
  try {
    await module.exports.insertRows(newAccountData)

    // User account successfully created
    res.status(201)
      .json({
        success: {
          status: 201,
          message: 'Created new account'
        }
      }).end()
  } catch (error) {
    // Some kind of error occured, though not unique constraints
    res.status(500)
      .json({
        error: {
          status: 500,
          message: 'Internal Server Error'
        }
      }).end()
  }
}

const insertRows = async (accountData) => {
  await dbClient.transaction(async trx => {
    // Grab the manager's departmentID
    const deptID = await getDepartmentId(accountData, trx)

    // Create a User record
    await createUserRecord(accountData, trx)

    // Create Credentials record
    await createCredentialsRecord(accountData, trx)

    console.log(deptID)

    // Create a _UserDepartment record
    await createUserDepartmentRecord(accountData, deptID[0].deptId, trx)
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

const getDepartmentId = (accountData, trx) => {
  return dbClient.select('deptId')
    .from('_UserDepartment')
    .where('userId', '=', accountData.managerId)
    .andWhere('isManager', '=', 1)
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
