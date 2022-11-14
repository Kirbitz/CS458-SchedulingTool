const dotenv = require('dotenv')
dotenv.config()

const dbClient = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DBEndpoint,
    port: process.env.DBport,
    user: process.env.DBUsername,
    password: process.env.DBPassword,
    database: process.env.DBName
  },
  useNullAsDefault: true
})

module.exports = dbClient
