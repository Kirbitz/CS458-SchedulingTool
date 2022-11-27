const myIndex = require('../../server/index.js')
const dbClient = require('../../server/api/dbClient')
const { postDepartment } = require('../../server/api/department.js')
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
  onConflict: jest.fn(async (callback) => callback())
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
    expect(response.body[0].userId).toBe(3)
    expect(response.body[0].userName).toBe('test')
  })

  it('Test for postDepartment - Success', async () => {
    const response = await request.post('/api/postDepartment')
      .send({
        deptName: 'testDept',
        deptLocation: 'testLocation',
        deptHourCap: '5'
      })

    expect(response.statusCode).toBe(201)
    expect(response.body.message).toBe('Department created')
  })

  it('Test for postDepartment - Fail', async () => {
    jest.spyOn(postDepartment, 'insert').mockImplementation(() => {
      throw new Error('I am an error')
    })

    const response = await request.post('/api/postDepartment')
      .send({
        deptName: 'testDept',
        deptLocation: 'testLocation',
        deptHourCap: '5'
      })

    expect(response.statusCode).toBe(500)
  })

  it('Test for getDepartments', async () => {
    jest.spyOn(dbClient, 'then').mockImplementationOnce(jest.fn().mockReturnValue({
      deptId: 0,
      deptName: 'testDept',
      deptLocation: 'MSC',
      deptHourCap: 15
    }))
    const response = await request.get('/api/getDepartments')

    expect(response.statusCode).toBe(200)
    expect(response.body.deptId).toBe(0)
    expect(response.body.deptName).toBe('testDept')
    expect(response.body.deptLocation).toBe('MSC')
    expect(response.body.deptHourCap).toBe(15)
  })

  it('Test for postEmployee - Success', async () => {
    jest.spyOn(dbClient, 'then').mockImplementationOnce(jest.fn().mockReturnValue([5]))
    const response = await request.get('/api/postEmployee')
      .send({
        userName: 'Garrett Preston',
        userPermissions: 0,
        userId: '0705988',
        deptId: 1,
        isManager: 0
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toBe(5)
  })
})
