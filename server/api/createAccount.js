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
    console.log(error)
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

const insertRows = (accountData) => {
  dbClient.transaction(async trx => {
    // Create a User record
    await createUserRecord(accountData, trx)

    // Create Credentials record
    await createCredentialsRecord(accountData, trx)

    // Grab the manager's departmentID
    const deptID = await getDepartmentId(accountData, trx)

    // Create a _UserDepartment record
    await createUserDepartmentRecord(accountData, deptID[0].deptId, trx)
  })
}

const createUserRecord = (accountData, trx) => {
  return dbClient.insert({
    userId: accountData.userid,
    userName: accountData.username,
    userPermissions: 0,
    userHourCap: accountData.hourCap
  })
    .into('User')
    .transacting(trx)
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

const getDepartmentId = (accountData, trx) => {
  return dbClient.select('deptId')
    .from('_UserDepartment')
    .where('userId', '=', accountData.managerId)
    .andWhere('isManager', '=', 1)
    .transacting(trx)
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
