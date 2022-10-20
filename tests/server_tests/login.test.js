const request = require('supertest')
const myApp = require('../../server/index')

describe('testing loginCallBack from login.js', () => {
  it('Logging in existing user', async () => {
    const response = await request(myApp)
      .post('/login')
      .send({
        username: 'test',
        password: 'test'
      })

    expect(response.status).toEqual(200)
    expect(response.body.userId).toEqual(3)
    expect(response.body.isManager).toEqual(1)
  })

  it('Logging in with existing username, wrong password', async () => {
    const response = await request(myApp)
      .post('/login')
      .send({
        username: 'test',
        password: 'higuys'
      })

    expect(response.status).toEqual(401)
    expect(response.body.error.status).toEqual(401)
    expect(response.body.error.message).toEqual('Unauthorized')
  })

  it('Logging in with wrong username, correct password', async () => {
    const response = await request(myApp)
      .post('/login')
      .send({
        username: 'badUsername',
        password: 'test'
      })

    expect(response.status).toEqual(401)
    expect(response.body.error.status).toEqual(401)
    expect(response.body.error.message).toEqual('Unauthorized')
  })

  it('Log in with no credentials', async () => {
    const response = await request(myApp).post('/login')
    expect(response.status).toEqual(401)
  })
})
