const myApp = require('../../server/index')
const supertest = require('supertest')
const request = supertest(myApp)
const login = require('../../server/login')

describe('testing loginCallBack from login.js', () => {
  beforeAll(() => {
    jest.spyOn(login, 'checkUsernamePassword')
      .mockImplementation((username, password) => {
        if (username === 'username' && password === 'password') {
          return [{
            credentialsId: 3,
            isManager: 1
          }]
        } else {
          return []
        }
      })

    jest.spyOn(login, 'signToken')
      .mockImplementation((userId) => {
        return 'mockeToken'
      })
  })

  it('Logging in existing user', async () => {
    const response = await request.post('/login')
      .send({
        username: 'username',
        password: 'password'
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.userId).toEqual(3)
    expect(response.body.isManager).toEqual(1)
  })

  it('Logging in with existing username, wrong password', async () => {
    const response = await request.post('/login')
      .send({
        username: 'notUsername',
        password: 'notPassword'
      })

    expect(response.statusCode).toEqual(401)
    expect(response.body.error.status).toEqual(401)
    expect(response.body.error.message).toEqual('Unauthorized')
  })

  it('Logging in with wrong username, correct password', async () => {
    const response = await request.post('/login')
      .send({
        username: 'badUsername',
        password: 'test'
      })

    expect(response.statusCode).toEqual(401)
    expect(response.body.error.status).toEqual(401)
    expect(response.body.error.message).toEqual('Unauthorized')
  })

  it('Log in with no credentials', async () => {
    const response = await request.post('/login')

    expect(response.statusCode).toEqual(401)
  })
})
