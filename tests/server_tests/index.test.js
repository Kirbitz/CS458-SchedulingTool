const myApp = require('../../server/index.js')
const request = require('supertest')
describe('app testing Base Address Tests', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn())
  })

  it('Connecting to the base address', async () => {
    const response = await request(myApp).get('/')
    expect(response.statusCode).toBe(200)
  })

  it('Connecting to unexpected route', async () => {
    const response = await request(myApp).get('/sansundertale')

    expect(response.statusCode).toBe(404)
  })

  it.each`
  input
  ${'/dashboard'}
  ${'/master-schedule'}
  ${'/employee-schedule'}
  ${'/staff'}
  ${'/department'}
  ${'/settings'}
  `('Connecting to accepted addresses', async ({ input }) => {
    const response = await request(myApp).get(input)

    expect(response.statusCode).toBe(200)
  })
})
