const myApp = require('../../server/index')
const supertest = require('supertest')
const request = supertest(myApp)
const dataHelper = require('../../server/api/dataHelper')
const createAccount = require('../../server/api/createAccount')
const dbClient = require('../../server/api/dbClient')

jest.mock('knex')
jest.mock('../../server/api/dataHelper')
jest.mock('../../server/api/createAccount')

jest.mock('../../server/api/dbClient', () => ({
  where: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  into: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  then: jest.fn().mockReturnValue(null),
  transacting: jest.fn().mockReturnThis()
}))

describe('Testing validateAccountCallback from validateAccount.js', () => {
  beforeAll(() => {
    jest.spyOn(dataHelper, 'verifyJWTAuthToken').mockImplementation(jest.fn(() => { }))
    jest.spyOn(createAccount, 'createAccountCallback').mockImplementation(jest.fn((req, res) => { res.status(201).end() }))
  })

  it('Successful account validation', async () => {
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

  it('Failed account validation', async () => {
    jest.spyOn(dbClient, 'then').mockImplementation(jest.fn().mockReturnValue(1))

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

    expect(response.statusCode).toBe(400)
  })
})
