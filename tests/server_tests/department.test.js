const myIndex = require('../../server/index.js')
// const department = require('../../server/api/department.js')
const request = require('supertest')(myIndex)

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
    jest.mock('../../server/api/dbClient', () => ({
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      then: jest.fn().mockReturnValue([{ userId: 3, userName: 'test' }]),
      join: jest.fn().mockReturnThis()
    }))

    const response = await request.get('/api/getEmployees')
      .send({
        deptId: 1
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.userId).toBe(3)
    expect(response.body.userName).toBe('test')
  })
})
