const dbClient = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DBEndpoint,
    port: process.env.DBport,
    user: process.env.DBUser,
    password: process.env.DBPassword,
    database: process.env.DBName
  }
})

module.exports = dbClient
