const myIndex = require('../../server/index.js')
const dbClient = require('../../server/api/dbClient')
const request = require('supertest')(myIndex)

jest.mock('knex')

const mockTrx = {
  where: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  into: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  then: jest.fn().mockReturnThis(),
  transacting: jest.fn().mockReturnThis()
}

jest.mock('../../server/api/dbClient', () => ({
  transaction: jest.fn(async (callback) => { await callback(mockTrx) }),
  select: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  then: jest.fn().mockReturnValue([{ userId: 3, userName: 'test' }]),
  join: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  into: jest.fn().mockReturnThis(),
  onConflict: jest.fn().mockReturnThis()
}))

describe('Tests for department.js', () => {
  beforeAll(() => {
    // jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  it('Test endpoint with supertest', async () => {
    const response = await request.get('/api/testDepartment')

    expect(response.statusCode).toBe(200)
    expect(response.body.test).toBe('good')
    expect(response.body.endpoint).toBe('department.js')
  })

  it('Test for getEmployeesByDepartment', async () => {
    // Set up mocking for this test
    jest.spyOn(dbClient, 'then').mockImplementationOnce(jest.fn().mockReturnValue([{ userId: 3, userName: 'test' }]))

    const response = await request.get('/api/getEmployees')
      .send({
        deptId: 1
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.userId).toBe(3)
    expect(response.body.userName).toBe('test')
  })

  it('Test for post employees', async () => {
    jest.spyOn(dbClient, 'insert').mockImplementationOnce(jest.fn().mockReturnValue([{ deptId: 7 }]))
    const response = await request.post('/api/postDepartment')
      .send({
        deptName: 'testDept',
        deptLocation: 'testLocation',
        deptHourCap: '5'
      })

    expect(response.statusCode).toBe(201)
    expect(response.body.deptId).toBe(7)
  })
})
