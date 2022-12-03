const sjcl = require('sjcl') // sha256 for encryption

// Database connection with knex
const dbClient = require('./dbClient')
const { verifyJWTAuthToken } = require('./dataHelper')

const createAccountCallback = async (req, res) => {
  // If a query fails, all queries will be rolled back and error thrown
  try {
    const newAccountData = req.body

    // Verifies the user is logged in
    verifyJWTAuthToken(req)

    // Verifies the user has permissions to create a new account
    if (newAccountData.isManager <= 0) {
      throw new Error('Unauthorized', { cause: { error: { status: 401, message: 'Invalid Authorization Level' } } })
    }

    // Checks that required data is provided
    if (!newAccountData.username || !newAccountData.password || !newAccountData.newUserId || !newAccountData.name || !newAccountData.hourCap) {
      throw new Error('Missing/Invalid', { cause: { error: { status: 400, message: 'Missing Required Data' } } })
    }

    // a bit spaghetti, but I'd rather it be simple to call on the front end
    newAccountData.credentialsId = newAccountData.newUserId
    newAccountData.credentialsUsername = newAccountData.username

    const badFields = []

    const databaseResponse1 = await module.exports.checkUnique(newAccountData, 'Credentials', 'credentialsUsername')
    const databaseResponse2 = await module.exports.checkUnique(newAccountData, 'Credentials', 'credentialsId')

    if (databaseResponse1) {
      badFields.push('Username')
    }

    if (databaseResponse2) {
      badFields.push('User ID')
    }

    // Throws error if data is not unique
    if (badFields.length) {
      throw new Error('Missing/Invalid', {
        cause:
        {
          error:
          {
            status: 400,
            message: 'Bad Request - Non-Unique Fields',
            fields: badFields
          }
        }
      })
    }

    // Attempts to insert new account into database
    await insertRows(newAccountData)

    // User account successfully created
    res.status(201)
      .json({
        success: {
          status: 201,
          message: 'Created new account'
        }
      }).end()
  } catch (err) {
    switch (err.message) {
      // Data is either missing or invalid
      case 'Missing/Invalid':
        res.status(400)
          .json(err.cause)
        break
      // User is not authorized to create new account
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

const insertRows = async (accountData) => {
  await dbClient.transaction(async trx => {
    // Create a User record
    await createUserRecord(accountData, trx)

    // Create Credentials record
    await createCredentialsRecord(accountData, trx)

    // Grab the manager's departmentID
    const deptID = await getDepartmentId(accountData)

    // Create a _UserDepartment record
    await createUserDepartmentRecord(accountData, deptID, trx)
  }).catch(err => { throw err })
}

const createUserRecord = (accountData, trx) => {
  return dbClient.insert({
    userId: accountData.newUserId,
    userName: accountData.username,
    userPermissions: 0,
    userHourCap: accountData.hourCap
  })
    .into('User')
    .transacting(trx)
    .catch(err => { throw err })
}

const createCredentialsRecord = (accountData, trx) => {
  // Create a bit array
  const passwordBitArray = sjcl.hash.sha256.hash(accountData.password)
  // Create the password hash
  const passwordHash = sjcl.codec.hex.fromBits(passwordBitArray)

  return dbClient.insert({
    credentialsId: accountData.newUserId,
    credentialsUsername: accountData.username,
    credentialsPassword: passwordHash
  })
    .into('Credentials')
    .transacting(trx)
    .catch(err => { throw err })
}

const getDepartmentId = (accountData) => {
  return dbClient.select('deptId')
    .from('_userDept')
    .where('userId', '=', accountData.userId)
    .andWhere('isManager', '=', 1)
    .then(result => {
      return result[0].deptId
    })
    .catch(err => { throw err })
}

const createUserDepartmentRecord = (accountData, _deptId, trx) => {
  return dbClient.insert({
    userId: accountData.newUserId,
    deptId: _deptId,
    isManager: 0
  })
    .into('_userDept')
    .transacting(trx)
    .catch(err => { throw err })
}

const checkUnique = (data, table, field) => {
  return dbClient.select(field)
    .from(table)
    .where(field, '=', data[field])
    .then(result => {
      // returns the field if a match was found
      // Should be empty to validate
      return result[0]
    })
    .catch(err => { throw err })
}

module.exports = {
  createAccountCallback,
  checkUnique
}
