const myApp = require('../../server/index')
const supertest = require('supertest')
const request = supertest(myApp)

const jwt = require('jsonwebtoken')
const dbClient = require('../../server/api/dbClient.js')

jest.mock('../../server/api/dbClient', () => ({
  dbClient: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  into: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  leftJoin: jest.fn().mockReturnThis(),
  join: jest.fn().mockReturnThis(),
  whereLike: jest.fn().mockReturnThis(),
  then: jest.fn().mockReturnValue([]),
  update: jest.fn().mockReturnValue([])
}))

describe('Testing for shiftViewGETCallback', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(jwt, 'verify').mockImplementation((data) => {
      if (data) {
        return true
      } else {
        throw new Error('Unauthorized', { cause: 'Traitor' })
      }
    })
  })

  beforeEach(() => {
    dbClient.then.mockReturnValueOnce([
      {
        timeId: 1,
        timeStart: '2022-12-06 01:00:00',
        timeEnd: '2022-12-06 23:00:00',
        positionName: 'Grill',
        userId: 1,
        userName: 'Joe Schmoe'
      }
    ])

    dbClient.then.mockReturnValueOnce([
      {
        userName: 'Joe Schmoe',
        userId: 1
      }
    ])
  })

  it('ShiftVewGETCallback - Success 200', async () => {
    const response = await request.get('/api/shift_view')
      .send({
        date: '2022-12-06 00:00:00',
        positionId: 1
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(200)
  })

  it('ShiftVewGETCallback - Status 400 Missing/Invalid', async () => {
    const response = await request.get('/api/shift_view')
      .send({
        positionId: 1
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(400)
  })

  it('ShiftVewGETCallback - Status 401 Unauthorized', async () => {
    const response = await request.get('/api/shift_view')
      .send({
        date: '2022-12-06 00:00:00',
        positionId: 1
      })

    expect(response.statusCode).toBe(401)
  })

  it('ShiftVewGETCallback - Status 500 Server Error', async () => {
    dbClient.select.mockImplementation(() => {
      throw new Error('hi')
    })

    const response = await request.get('/api/shift_view')
      .send({
        date: '2022-12-06 00:00:00',
        positionId: 1
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(500)
  })

  it('ShiftViewPOSTCallback - Success 200', async () => {
    const response = await request.post('/api/shift_view')
      .send({
        records: [
          {
            timeBlockId: 1,
            employeeId: 3
          }
        ],
        isManager: 1
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(200)
  })

  it('ShiftViewPOSTCallback - Status 400 Bad Data', async () => {
    const response = await request.post('/api/shift_view')
      .send({
        records: [
          {
            timeBlockId: 1
          }
        ],
        isManager: 1
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(400)
  })

  it('ShiftViewPOSTCallback - Status 401 Unauthorized', async () => {
    const response = await request.post('/api/shift_view')
      .send({
        records: [
          {
            timeBlockId: 1,
            employeeId: 1
          }
        ],
        isManager: 0
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(401)
  })

  it('ShiftViewPOSTCallback - Status 500 Server Error', async () => {
    dbClient.update.mockImplementation(() => {
      throw new Error('hi')
    })

    const response = await request.post('/api/shift_view')
      .send({
        records: [
          {
            timeBlockId: 1,
            employeeId: 1
          }
        ],
        isManager: 1
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(500)
  })

  it('ShiftViewPOSTCallback - Status 400 Records Empty', async () => {
    const response = await request.post('/api/shift_view')
      .send({
        records: [],
        isManager: 1
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(400)
  })
})
