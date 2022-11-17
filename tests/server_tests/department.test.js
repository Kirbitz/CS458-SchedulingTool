const MyApp = require('../../server/index.js')
const request = require('supertest')(MyApp)
// const department = require('../server/department.js')

describe('Tests for department.js', () => {
  beforeAll(() => {
    // jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  it('Test for departmentGet function', async () => {
    // I don't know how to mock knex
    const response = await request.get('/getEmployees').send({
      deptId: '1'
    })
    expect(response.statusCode).toBe(200)
  })
})
