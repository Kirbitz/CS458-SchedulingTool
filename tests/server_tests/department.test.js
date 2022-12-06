const myIndex = require('../../server/index.js')
const dbClient = require('../../server/api/dbClient')
const dataHelper = require('../../server/api/dataHelper')
const request = require('supertest')(myIndex)

jest.mock('knex')
jest.mock('../../server/api/dataHelper')

jest.mock('../../server/api/dbClient', () => ({
  select: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  whereIn: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  whereILike: jest.fn().mockReturnThis(),
  orWhereILike: jest.fn().mockReturnThis(),
  then: jest.fn().mockReturnValue(),
  join: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  into: jest.fn().mockReturnThis(),
  onConflict: jest.fn(async (callback) => callback()),
  del: jest.fn().mockReturnThis()
}))

describe('Tests for department.js', () => {
  beforeEach(() => {
    // jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(dataHelper, 'verifyJWTAuthToken').mockImplementation(jest.fn(() => {}))
  })

  it('Test for searchEmployees - Success', async () => {
    // Set up mocking
    jest.spyOn(dbClient, 'orWhereILike').mockImplementationOnce(jest.fn().mockReturnValue([{ userId: 3, userName: 'test' }]))

    const response = await request.get('/api/searchEmployees/test')

    expect(response.statusCode).toBe(200)
  })

  it('Test for searchEmployees - Invalid Search', async () => {
    // No mocking needed
    const response = await request.get('/api/searchEmployees/1234-sadjn_.')

    expect(response.statusCode).toBe(400)
  })

  it('Test for searchEmployees - Fail', async () => {
    // Set up mocking
    jest.spyOn(dbClient, 'orWhereILike').mockImplementation(() => {
      throw new Error('I am an error')
    })

    const response = await request.get('/api/searchEmployees/test')

    expect(response.statusCode).toBe(500)
  })

  it('Test for getEmployeesByDepartment - Success', async () => {
    // Set up mocking for this test
    jest.spyOn(dbClient, 'then').mockImplementationOnce(jest.fn().mockReturnValue([5]))
    jest.spyOn(dbClient, 'then').mockImplementationOnce(jest.fn().mockReturnValue([{ userId: 3, userName: 'test' }]))

    const response = await request.get('/api/getEmployees')
      .send({})

    expect(response.statusCode).toBe(200)
    expect(response.body[0].userId).toBe(3)
    expect(response.body[0].userName).toBe('test')
  })

  it('Test for getEmployeesByDepartment - fail', async () => {
    // Set up mocking for this test
    jest.spyOn(dbClient, 'then').mockImplementationOnce(jest.fn().mockReturnValue())
    jest.spyOn(dbClient, 'join').mockImplementation(() => {
      throw new Error('I am an error')
    })

    const response = await request.get('/api/getEmployees')
      .send({})

    expect(response.statusCode).toBe(500)
  })

  it('Test for postDepartment - Success', async () => {
    jest.spyOn(dbClient, 'insert').mockReturnValue([15])
    const response = await request.post('/api/postDepartment')
      .send({
        deptName: 'testDept',
        deptLocation: 'testLocation',
        deptHourCap: '5'
      })

    expect(response.statusCode).toBe(201)
    expect(response.body.message).toBe('Department created with ID: 15')
    expect(response.body.deptId).toBe(15)
  })

  it('Test for postDepartment - Fail', async () => {
    jest.spyOn(dbClient, 'insert').mockImplementation(() => {
      throw new Error('I am an error')
    })

    const response = await request.post('/api/postDepartment')
      .send({
        deptName: 'testDept',
        deptLocation: 'testLocation',
        deptHourCap: '5'
      })

    expect(response.statusCode).toBe(500)
    expect(response.body.error.message).toBe('Internal server error while creating department')
  })

  it('Test for getDepartments', async () => {
    jest.spyOn(dbClient, 'from').mockImplementationOnce(jest.fn().mockReturnValue({
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

  it('Test for deleteEmployee - success', async () => {
    jest.spyOn(dbClient, 'del').mockImplementation(jest.fn().mockReturnValue(1))
    const response = await request.delete('/api/deleteEmployee')
      .send({
        userId: 40,
        deptId: 14
      })

    expect(response.statusCode).toBe(202)
    expect(response.body.message).toBe('Employee deleted')
  })

  it('Test for deleteEmployee - not found', async () => {
    jest.spyOn(dbClient, 'del').mockImplementation(jest.fn().mockReturnValue(0))
    const response = await request.delete('/api/deleteEmployee')
      .send({
        employeeId: 40,
        deptId: 14
      })

    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('No employee with that id found')
  })

  it('Test for deleteEmployee - fail', async () => {
    jest.spyOn(dbClient, 'del').mockImplementation(() => {
      throw new Error('I am an error')
    })

    const response = await request.delete('/api/deleteEmployee')
      .send({
        userId: 40,
        deptId: 14
      })

    expect(response.statusCode).toBe(500)
    expect(response.body.error.message).toBe('Internal server error while deleting employee')
  })
})
