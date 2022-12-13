const myIndex = require('../../server/index.js')
const dbClient = require('../../server/api/dbClient')
const jwt = require('jsonwebtoken')
const request = require('supertest')(myIndex)

jest.mock('knex')

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

  it('SearchEmployeesCallback - Success 200', async () => {
    // Set up mocking
    dbClient.orWhereILike.mockResolvedValue([{ userId: 3, userName: 'test' }])

    const response = await request.get('/api/searchEmployees/test')
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(200)
  })

  it('SearchEmployeesCallback - Invalid Data 400', async () => {
    // No mocking needed
    const response = await request.get('/api/searchEmployees/1234-sadjn_.')
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(400)
    expect(response.body.error?.message).toBe('Invalid Search Data')
  })

  it('SearchEmployeesCallback - Unauthorized 401', async () => {
    // No mocking needed
    const response = await request.get('/api/searchEmployees/1234')

    expect(response.statusCode).toBe(401)
    expect(response.body).toBe('Traitor')
  })

  it('SearchEmployeesCallback - Internal Server Error 500', async () => {
    // Set up mocking
    dbClient.orWhereILike.mockRejectedValue([{ userId: 3, userName: 'test' }])

    const response = await request.get('/api/searchEmployees/test')
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(500)
    expect(response.body.error?.message).toBe('Internal Server Error')
  })

  it('GetEmployeesByDepartmentCallback - Success 200', async () => {
    // mock for getDepartmentNameFromDepartmentId
    jest.spyOn(dbClient, 'select').mockImplementationOnce(jest.fn().mockReturnValue('TestDeptName'))
    // Set up mocking for the main query
    jest.spyOn(dbClient, 'then').mockImplementationOnce(jest.fn().mockReturnValue([{
      userId: 5,
      userName: 'TestGetEmployees'
    }]))

    const response = await request.get('/api/getEmployees')
      .send({})
      .set('Authorization', 'abc123')

    console.log('Response for getEmployees', response.body)

    expect(response.statusCode).toBe(200)
    expect(response.body.depEmployees[0].userId).toBe(5)
    expect(response.body.depEmployees[0].userName).toBe('TestGetEmployees')
  })

  it('GetEmployeesByDepartmentCallback - Unauthorized 401', async () => {
    const response = await request.get('/api/getEmployees')
      .send({})

    console.log('Response for getEmployees', response.body)

    expect(response.statusCode).toBe(401)
    expect(response.body).toBe('Traitor')
  })

  it('GetEmployeesByDepartmentCallback - Internal Server Error 500', async () => {
    // Set up mocking for this test
    jest.spyOn(dbClient, 'from').mockImplementationOnce(jest.fn().mockReturnValue())
    jest.spyOn(dbClient, 'join').mockImplementation(() => {
      throw new Error('I am an error')
    })

    const response = await request.get('/api/getEmployees')
      .send({})
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(500)
    expect(response.body.error?.message).toBe('Internal Server Error')
  })

  it('AddEmployeeToDepartmentCallback - Success 201', async () => {
    jest.spyOn(dbClient, 'into').mockImplementation(jest.fn().mockReturnValue(1))

    const response = await request.post('/api/addEmployee')
      .send({
        deptId: 1,
        depEmployees: [{
          userId: 1
        }]
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(201)
    expect(response.body.message).toBe('Employee placed into department')
  })

  it('AddEmployeeToDepartmentCallback - Missing Data 400', async () => {
    const response = await request.post('/api/addEmployee')
      .send({
        deptId: 1
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(400)
    expect(response.body.error?.message).toBe('Missing Required Data')
  })

  it('AddEmployeeToDepartmentCallback - Invalid Data 400', async () => {
    const response = await request.post('/api/addEmployee')
      .send({
        deptId: 1,
        depEmployees: [
        ]
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(400)
    expect(response.body.error?.message).toBe('Required Data is Invalid')
  })

  it('AddEmployeeToDepartmentCallback - Unauthorized 401', async () => {
    const response = await request.post('/api/addEmployee')
      .send({
        deptId: 1,
        depEmployees: [
        ]
      })

    expect(response.statusCode).toBe(401)
    expect(response.body).toBe('Traitor')
  })

  it('AddEmployeeToDepartmentCallback - Internal Server Error 500', async () => {
    dbClient.into.mockRejectedValue('I am an error')

    const response = await request.post('/api/addEmployee')
      .send({
        deptId: 1,
        depEmployees: [{
          userId: 1
        }]
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(500)
    expect(response.body.error.message).toBe('Internal Server Error')
  })

  it('DeleteEmployeeFromDeptCallback - Success 202', async () => {
    jest.spyOn(dbClient, 'del').mockImplementation(jest.fn().mockReturnValue(1))

    const response = await request.delete('/api/deleteEmployee')
      .send({
        deptId: 1,
        depEmployees: [{
          userId: 1
        }]
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(202)
    expect(response.body.message).toBe('Employee deleted')
  })

  it('DeleteEmployeeFromDeptCallback - Missing Data 400', async () => {
    const response = await request.delete('/api/deleteEmployee')
      .send({
        deptId: 1
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(400)
    expect(response.body.error?.message).toBe('Missing Required Data')
  })

  it('DeleteEmployeeFromDeptCallback - Invalid Data 400', async () => {
    const response = await request.delete('/api/deleteEmployee')
      .send({
        deptId: 1,
        depEmployees: []
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(400)
    expect(response.body.error?.message).toBe('Required Data is Invalid')
  })

  it('DeleteEmployeeFromDeptCallback - Unauthorized 401', async () => {
    const response = await request.delete('/api/deleteEmployee')
      .send({
        deptId: 1,
        depEmployees: []
      })

    expect(response.statusCode).toBe(401)
    expect(response.body).toBe('Traitor')
  })

  it('DeleteEmployeeFromDeptCallback - Not Found 404', async () => {
    dbClient.del.mockResolvedValue(0)

    const response = await request.delete('/api/deleteEmployee')
      .send({
        deptId: 1,
        depEmployees: [{
          userId: 1
        }]
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(404)
    expect(response.body.error?.message).toBe('No employee with that id found')
  })

  it('DeleteEmployeeFromDeptCallback - Internal Server Error 500', async () => {
    dbClient.del.mockRejectedValue('deleteEmployee error')

    const response = await request.delete('/api/deleteEmployee')
      .send({
        deptId: 1,
        depEmployees: [{
          userId: 1
        }]
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(500)
    expect(response.body.error.message).toBe('Internal Server Error')
  })
})
