const dotenv = require('dotenv')
dotenv.config()

const dbConfig = {
  client: 'mysql2',
  connection: {
    host: process.env.DBEndpoint,
    port: process.env.DBPort,
    user: process.env.DBUser,
    password: process.env.DBPassword,
    database: process.env.DBName
  }
}

module.exports = dbConfig
