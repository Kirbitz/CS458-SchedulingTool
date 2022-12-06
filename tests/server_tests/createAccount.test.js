const myApp = require('../../server/index')
const supertest = require('supertest')
const request = supertest(myApp)

const jwt = require('jsonwebtoken')
const dbClient = require('../../server/api/dbClient.js')

const methods = require('../../server/api/createAccount.js')

const mockTrx = {
  where: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  into: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
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
  transacting: jest.fn().mockReturnThis()
}))

describe('Testing for createAccount.js', () => {
  beforeAll(() => {
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

  afterEach(() => {
  })

  it('CreateAccountCallback - Success 201', async () => {
    jest.spyOn(methods, 'checkUnique').mockImplementationOnce(() => { return null }).mockImplementationOnce(() => { return null })
    mockTrx.transacting.mockResolvedValue({})
    dbClient.andWhere.mockResolvedValue([{ deptId: 12 }])
    dbClient.transacting.mockResolvedValue({})
    const response = await request.post('/api/create_new_account')
      .send({
        username: 'jshmoe1234',
        password: "MyPet'sName1234!",
        newUserId: 123456,
        name: 'Joe Shmoe',
        hourCap: 20,
        isManager: 1
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(201)
    expect(response.body.success?.message).toContain('Created')
  })

  it.each`
  input
  ${{ username: 'jshmoe', password: 'MyPet\'sName1234!', newUserId: 123456, name: 'Joe Shmoe' }}
  ${{ username: 'jshmoe', password: 'MyPet\'sName1234!', newUserId: 123456, hourCap: 20 }}
  ${{ username: 'jshmoe', password: 'MyPet\'sName1234!', name: 'Joe Shmoe', hourCap: 20 }}
  ${{ username: 'jshmoe', newUserId: 123456, name: 'Joe Shmoe', hourCap: 20 }}
  ${{ password: 'MyPet\'sName1234!', newUserId: 123456, name: 'Joe Shmoe', hourCap: 20 }}
  `('CreateAccountCallback - Missing Data 400', async ({ input }) => {
    const response = await request.post('/api/create_new_account')
      .send(input)
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(400)
    expect(response.body.error?.message).toContain('Missing')
  })

  it('CreateAccountCallback - Duplication 400', async () => {
    dbClient.where.mockResolvedValue([true])
    const response = await request.post('/api/create_new_account')
      .send({
        username: 'jshmoe1234',
        password: "MyPet'sName1234!",
        newUserId: 123456,
        name: 'Joe Shmoe',
        hourCap: 20,
        isManager: 1
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(400)
    expect(response.body.error?.message).toContain('Non-Unique')
    expect(response.body.error?.fields?.length).toBe(2)
  })

  it('CreateAccountCallback - Unauthorized 401', async () => {
    const response = await request.post('/api/create_new_account')
      .send({
        username: 'jshmoe1234',
        password: "MyPet'sName1234!",
        newUserId: 123456,
        name: 'Joe Shmoe',
        hourCap: 20,
        isManager: 1
      })

    expect(response.statusCode).toBe(401)
    expect(response.body).toContain('Traitor')
  })

  it('CreateAccountCallback - Invalid Permission Level 401', async () => {
    const response = await request.post('/api/create_new_account')
      .send({
        username: 'jshmoe1234',
        password: "MyPet'sName1234!",
        newUserId: 123456,
        name: 'Joe Shmoe',
        hourCap: 20,
        isManager: 0
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(401)
    expect(response.body.error?.message).toBe('Invalid Authorization Level')
  })

  it('CreateAccountCallback - Internal Server Error 500', async () => {
    jest.spyOn(methods, 'checkUnique').mockImplementationOnce(() => { return null }).mockImplementationOnce(() => { return null })
    mockTrx.transacting.mockResolvedValue({})
    dbClient.transacting.mockRejectedValue({})
    const response = await request.post('/api/create_new_account')
      .send({
        username: 'jshmoe1234',
        password: "MyPet'sName1234!",
        newUserId: 123456,
        name: 'Joe Shmoe',
        hourCap: 20,
        isManager: 1
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(500)
    expect(response.body.error?.message).toBe('Internal Server Error')
  })
})
