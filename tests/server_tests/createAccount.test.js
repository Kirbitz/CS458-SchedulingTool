const myApp = require('../../server/index')
const supertest = require('supertest')
const request = supertest(myApp)
const dataHelper = require('../../server/api/dataHelper')
const createAccount = require('../../server/api/createAccount')
const validateAccount = require('../../server/api/validateAccount')

jest.mock('knex')
jest.mock('../../server/api/dataHelper')
jest.mock('../../server/api/validateAccount')

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
  where: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  into: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  then: jest.fn().mockReturnThis(),
  transacting: jest.fn().mockReturnThis()
}))

describe('Testing createAccountCallback from createAccount.js', () => {
  beforeAll(() => {
    jest.spyOn(dataHelper, 'verifyJWTAuthToken').mockImplementation(jest.fn(() => { }))
    jest.spyOn(validateAccount, 'validateNewAccountCallback').mockImplementation(jest.fn((req, res) => { createAccount.createAccountCallback(req, res) }))
  })

  it('Successful account creation', async () => {
    const response = await request.post('/api/create_new_account')
      .send({
        username: 'jshmoe1234',
        password: "MyPet'sName1234!",
        userid: 123456,
        name: 'Joe Shmoe',
        permissions: 0,
        maxHours: 20,
        managerId: 2
      })

    expect(response.statusCode).toBe(201)
  })

  // it('Failed account creation. Successful Auth validation. Unique username and ID', async () => {
  //   jest.spyOn(createAccount, 'insertRows').mockImplementation(() => {
  //     throw new Error('I am an error')
  //   })

  //   const response = await request.post('/api/create_new_account')
  //     .send({
  //       username: 'jshmoe1234',
  //       password: "MyPet'sName1234!",
  //       userid: 123456,
  //       name: 'Joe Shmoe',
  //       permissions: 0,
  //       maxHours: 20,
  //       managerId: 2
  //     })

  //   expect(response.statusCode).toBe(500)
  // })
})
