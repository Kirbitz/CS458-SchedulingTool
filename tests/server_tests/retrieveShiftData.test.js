// error proof the server code

const myApp = require('../../server/index')
const supertest = require('supertest')
const request = supertest(myApp)
const dataHelper = require('../../server/api/dataHelper')

jest.mock('../../server/api/dbClient', () => ({
  where: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  join: jest.fn().mockReturnThis(),
  then: jest.fn().mockReturnValue([{ timeId: 1 }])
}))

jest.mock('knex')
jest.mock('../../server/api/dataHelper')

describe('Testing retrieveShiftData.js', () => {
  beforeAll(() => {
    jest.spyOn(dataHelper, 'verifyJWTAuthToken').mockImplementation(jest.fn(() => { }))
  })

  it('Successful retrieval of days', async () => {
    const response = await request.get('/api/day')
      .send({
        startDate: '2022-11-14 00:00:00',
        endDate: '2022-11-20 00:00:00'
      })

    expect(response.statusCode).toBe(200)
  })

  it('failed auth', async () => {
    jest.spyOn(dataHelper, 'verifyJWTAuthToken').mockImplementation((req, res) => {
      res.status(401)
        .json({
          error: {
            status: 401,
            message: 'Unauthorized'
          }
        })
        .end()
      throw new Error('I am an error')
    })

    const response = await request.get('/api/day')
      .send({
        startDate: '2022-11-14 00:00:00',
        endDate: '2022-11-20 00:00:00'
      })

    expect(response.statusCode).toBe(401)
  })
})
