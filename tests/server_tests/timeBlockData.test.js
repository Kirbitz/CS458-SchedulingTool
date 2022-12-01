const myApp = require('../../server/index.js')
const supertest = require('supertest')
const request = supertest(myApp)

describe('Tests for timeBlockData', () => {
  it('CollectTimeBlockData - Pass', () => {
    expect(true).toBe(true)
  })
})
