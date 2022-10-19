const dotenv = require('dotenv')
dotenv.config()

// Database connection with knex
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DBEndpoint,
    port: process.env.DBport,
    user: process.env.DBUser,
    password: process.env.DBPassword,
    database: process.env.DBName
  }
})

// function is asynchronous to allow query to happen before trying to access results
const loginCallback = async (req, res) => {
  const loginData = req.body

  console.log(loginData)

  // Throw an error if no username or password passed in
  if (Object.keys(loginData).length === 0) {
    throw new Error('Username and password are required to log in')
  }

  // Query the database to see if the username/password combo exists
  const user = await knex.select('Credentials.credentialsId', '_UserDepartment.isManager')
    .from('Credentials')
    .join('User', 'Credentials.credentialsId', 'User.userId')
    .join('_UserDepartment', 'User.userId', '_UserDepartment.userId')
    .where('Credentials.credentialsUsername', '=', loginData.username)
    .andWhere('Credentials.credentialsPassword', '=', loginData.password)
    .then(result => {
      // Returns the an array of Rows
      return result
    })

  let resJson

  // There is no user with those login credentials
  if (user.length === 0) {
    // Respond with '401 Unauthorized'; User not logged in
    resJson = {
      error: {
        status: 401,
        message: 'Unauthorized'
      }
    }
  } else {
    // Successful login
    resJson = {
      userId: user[0].credentialsId,
      isManager: user[0].isManager
    }
  }

  // Send the JSON data and status code. Then end the response
  res.json(resJson).end()
}

module.exports = {
  loginCallback
}
