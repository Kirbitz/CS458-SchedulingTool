const MyApp = require('../server/index.js')
const request = require('supertest')
// const department = require('../server/department.js')

describe('Tests for department.js', () => {
  beforeAll(() => {
    // jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  it('Test for departmentGet function', async () => {
    // I don't know how to mock knex
    const response = await request(MyApp).get('/getEmployees').send({
      deptId: '1'
    })
    expect(false).toBe(true)
  })
})
