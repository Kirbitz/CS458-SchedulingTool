const myApp = require('../../server/index')
const supertest = require('supertest')
const request = supertest(myApp)
const dbClient = require('../../server/api/dbClient')
const dataHelper = require('../../server/api/dataHelper')

jest.mock('../../server/api/dataHelper')

jest.mock('../../server/api/dbClient', () => ({
  select: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  then: jest.fn().mockReturnValue([{ credentialsId: 3, userPermissions: 1 }]),
  join: jest.fn().mockReturnThis()
}))

describe('testing loginCallBack from login.js', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(dataHelper, 'getJWTSecret').mockImplementation(() => { return 'hello' })
  })

  it('Logging in existing user', async () => {
    const response = await request.post('/api/login')
      .send({
        username: 'username',
        password: 'password'
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.userId).toEqual(3)
    expect(response.body.isManager).toEqual(1)
  })

  it('Logging in with existing username, wrong password', async () => {
    // applies to the rest of the tests as well
    jest.spyOn(dbClient, 'then').mockImplementationOnce(jest.fn().mockReturnValue([]))
    const response = await request.post('/api/login')
      .send({
        username: 'notUsername',
        password: 'notPassword'
      })

    expect(response.statusCode).toEqual(401)
    expect(response.body.error.status).toEqual(401)
    expect(response.body.error.message).toEqual('Unauthorized')
  })

  it('Logging in with wrong username, correct password', async () => {
    jest.spyOn(dbClient, 'then').mockImplementationOnce(jest.fn().mockReturnValue([]))
    const response = await request.post('/api/login')
      .send({
        username: 'badUsername',
        password: 'test'
      })

    expect(response.statusCode).toEqual(401)
    expect(response.body.error.status).toEqual(401)
    expect(response.body.error.message).toEqual('Unauthorized')
  })

  it('Log in with no credentials', async () => {
    jest.spyOn(dbClient, 'then').mockImplementationOnce(jest.fn().mockReturnValue([]))
    const response = await request.post('/api/login')

    expect(response.statusCode).toEqual(401)
  })
})
