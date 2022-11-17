const myApp = require('../../server/index')
const supertest = require('supertest')
const request = supertest(myApp)

const dataHelper = require('../../server/api/dataHelper')
const login = require('../../server/api/login')

jest.mock('../../server/api/login')

describe('Testing dataHelper functions', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(dataHelper, 'getJWTSecret').mockImplementation(() => { return 'hello' })
  })

  it('verifyJWTAuthToken: JWT should not verify', async () => {
    // using route as an easy way to test
    jest.spyOn(login, 'loginCallback').mockImplementation((req, res) => {
      res.cookie('Authorization', 'badAuth')
      dataHelper.verifyJWTAuthToken(req, res)
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
