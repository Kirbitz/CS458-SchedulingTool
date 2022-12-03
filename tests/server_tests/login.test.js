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

describe('Tests for login.js', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(dataHelper, 'getJWTSecret').mockImplementation(() => { return 'hello' })
  })

  it('LoginCallback - Success 200', async () => {
    dbClient.andWhere.mockResolvedValue([{ credentialsId: 3, userPermissions: 1 }])
    const response = await request.post('/api/login')
      .send({
        username: 'username',
        password: 'password'
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.userId).toEqual(3)
    expect(response.body.isManager).toEqual(1)
  })

  it.each`
  input
  ${{ username: 'username' }}
  ${{ password: 'password' }}
  `('LoginCallback - Missing Data 400', async ({ input }) => {
    const response = await request.post('/api/login')
      .send(input)

    expect(response.statusCode).toEqual(400)
    expect(response.body.error?.message).toContain('Missing')
  })

  it('LoginCallback - Not In DB 401', async () => {
    dbClient.andWhere.mockResolvedValue([])
    const response = await request.post('/api/login')
      .send({
        username: 'badUsername',
        password: 'test'
      })

    expect(response.statusCode).toEqual(401)
    expect(response.body.error?.message).toEqual('Unauthorized')
  })

  it('LoginCallback - Internal Server Error 500', async () => {
    dbClient.andWhere.mockRejectedValue({})
    const response = await request.post('/api/login')
      .send({
        username: 'badUsername',
        password: 'test'
      })

    expect(response.statusCode).toEqual(500)
    expect(response.body.error?.message).toEqual('Internal Server Error')
  })
})
