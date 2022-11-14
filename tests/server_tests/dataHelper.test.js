const dotenv = require('dotenv')
dotenv.config()

const myApp = require('../../server/index')
const supertest = require('supertest')
const request = supertest(myApp)

const { verifyJWTAuthToken } = require('../../server/api/dataHelper')
const login = require('../../server/api/login')

jest.mock('../../server/api/login')

describe('Testing dataHelper functions', () => {
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
  })

  afterEach(() => {
    process.env = env
  })

  it('JWT should not verify', async () => {
    jest.spyOn(login, 'loginCallback').mockImplementation((req, res) => {
      res.cookie('Authorization', 'badAuth')
      verifyJWTAuthToken(req, res)
    })

    process.env.JWTSecret = 'testSecret'

    const response = await request.post('/api/login')
      .send({
        username: 'username',
        password: 'password'
      })

    expect(response.statusCode).toBe(401)
  })
})
