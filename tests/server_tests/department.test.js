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

  it('Test for getEmployeesByDepartmentCallback - Success', async () => {
    // mock for getDepartmentNameFromUserId
    jest.spyOn(dbClient, 'andWhere').mockImplementationOnce(jest.fn().mockReturnValue([{ deptName: 'Help Desk' }]))
    // mock for getDepartmentNameFromDepartmentId
    jest.spyOn(dbClient, 'where').mockImplementationOnce(jest.fn().mockReturnValue([{ userId: 3, userName: 'test' }]))
    // Set up mocking for the main query
    jest.spyOn(dbClient, 'then').mockImplementationOnce(jest.fn().mockReturnValue([{
      userId: 5,
      userName: 'TestGetEmployees'
    }]))

    const response = await request.get('/api/getEmployees')
      .send({})

    expect(response.statusCode).toBe(200)
    expect(response.body[0].userId).toBe(5)
    expect(response.body[0].userName).toBe('TestGetEmployees')
  })

  it('Test for getEmployeesByDepartmentCallback - fail', async () => {
    // Set up mocking for this test
    jest.spyOn(dbClient, 'from').mockImplementationOnce(jest.fn().mockReturnValue())
    jest.spyOn(dbClient, 'join').mockImplementation(() => {
      throw new Error('I am an error')
    })

    const response = await request.get('/api/getEmployees')
      .send({})

    expect(response.statusCode).toBe(500)
  })

  it('Test for deleteEmployee - success', async () => {
    jest.spyOn(dbClient, 'del').mockImplementation(jest.fn().mockReturnValue(1))
    const response = await request.delete('/api/deleteEmployee')
      .send({
        userId: 1,
        deptId: 14
      })

    expect(response.statusCode).toBe(202)
    expect(response.body.message).toBe('Employee deleted')
  })

  it('Test for deleteEmployee - not found', async () => {
    jest.spyOn(dbClient, 'del').mockImplementation(jest.fn().mockReturnValue(0))
    const response = await request.delete('/api/deleteEmployee')
      .send({
        employeeId: 2,
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
        userId: 3,
        deptId: 14
      })

    expect(response.statusCode).toBe(500)
    expect(response.body.error.message).toBe('Internal server error while deleting employee')
  })
})
