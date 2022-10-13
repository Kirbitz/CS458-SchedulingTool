const myApp = require('../server/index.js')
const request = require('supertest')
describe("app testing Base Address Tests", () => {
  it("Connecting to the base address", async () => {
    const response = await request(myApp).get('/')
    expect(response.statusCode).toBe(200)
  })
})
