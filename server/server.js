const dotenv = require('dotenv')
dotenv.config()

const app = require('./index.js')
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
