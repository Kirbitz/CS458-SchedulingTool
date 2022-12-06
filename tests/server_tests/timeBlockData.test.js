const myApp = require('../../server/index.js')
const supertest = require('supertest')
const request = supertest(myApp)

const jwt = require('jsonwebtoken')
const dbClient = require('../../server/api/dbClient.js')

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
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  into: jest.fn().mockReturnThis(),
  leftJoin: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  transacting: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  onConflict: jest.fn().mockReturnThis(),
  merge: jest.fn().mockReturnThis(),
  del: jest.fn().mockReturnThis()
}))

describe('Tests for timeBlockData.js', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  beforeEach(() => {
    jest.spyOn(jwt, 'verify').mockImplementation((data) => {
      if (data) {
        return true
      } else {
        throw new Error('Unauthorized', { cause: 'Traitor' })
      }
    })
  })

  it('CollectTimeBlockData - Success 200', async () => {
    const mResponse = { success: 'yeah' }
    dbClient.andWhere.mockResolvedValue(mResponse)
    const response = await request.get('/api/collect_time_blocks/2000-01-01/2000-01-01')
      .set('Authorization', 'abc123')

    expect(response.statusCode).toEqual(200)
    expect(response.body.success?.timeBlocks).toEqual(mResponse)
  })

  it('CollectTimeBlockData - Missing Data 400', async () => {
    const response = await request.get('/api/collect_time_blocks')
      .set('Authorization', 'abc123')

    expect(response.statusCode).toEqual(400)
    expect(response.body.error.message).toContain('Missing')
  })

  it('CollectTimeBlockData - Invalid Data 400', async () => {
    const response = await request.get('/api/collect_time_blocks/2000-13-01/2000-01-011')
      .set('Authorization', 'abc123')

    expect(response.statusCode).toEqual(400)
    expect(response.body.error.message).toContain('Invalid')
  })

  it('CollectTimeBlockData - Unauthorized 401', async () => {
    const response = await request.get('/api/collect_time_blocks/2000-12-01/2000-01-01')

    expect(response.statusCode).toEqual(401)
    expect(response.body).toBe('Traitor')
  })

  it('CollectTimeBlockData - Internal Server Error 500', async () => {
    dbClient.andWhere.mockRejectedValue({})
    const response = await request.get('/api/collect_time_blocks/2000-01-01/2000-01-01')
      .set('Authorization', 'abc123')

    expect(response.statusCode).toEqual(500)
    expect(response.body.error?.message).toEqual('Internal Server Error')
  })

  it.each`
  input
  ${{ timeStart: '2000-01-01 00:00:00', timeEnd: '2000-01-01 00:00:00T', timeType: 0, isManager: 0 }}
  ${{ timeStart: '2000-01-01Z00:00:00', timeEnd: '2000-01-01Z00:00:00T', timeType: 1, isManager: 1 }}
  `('CreateModifyTimeBlockData - Success 201', async ({ input }) => {
    mockTrx.transacting.mockResolvedValue({})
    dbClient.andWhere.mockResolvedValue([{ deptId: 21 }])
    dbClient.transacting.mockResolvedValue(12)
    const response = await request.post('/api/create_modify_time_blocks')
      .set('Authorization', 'abc123')
      .send(input)

    dbClient.where.mockClear()

    expect(response.statusCode).toEqual(201)
    expect(response.body.success?.message).toContain('Created or Modified')
  })

  it.each`
  input
  ${{ timeStart: '2222', timeEnd: '2222' }}
  ${{ timeEnd: '2222', timeType: 23 }}
  ${{ timeStart: '2222', timeType: 22 }}
  `('CreateModifyTimeBlockData - Missing Data 400', async ({ input }) => {
    const response = await request.post('/api/create_modify_time_blocks')
      .send(input)
      .set('Authorization', 'abc123')

    expect(response.statusCode).toEqual(400)
    expect(response.body.error.message).toContain('Missing')
  })

  it.each`
  input
  ${{ timeStart: '2000-01-01 00:00:00', timeEnd: '2000-01-01 00:00:00', timeType: '23' }}
  ${{ timeStart: '2000-13-01 00:00:00', timeEnd: '2000-01-01 00:00:00', timeType: 23 }}
  ${{ timeStart: '2000-01-01 00:00:00', timeEnd: '2000-01-41 00:00:00', timeType: 23 }}
  ${{ timeStart: '200-01-01 00:00:00', timeEnd: '2000-01-01 00:00:00', timeType: 23 }}
  ${{ timeStart: '20000-01-01 00:00:00', timeEnd: '2000-01-01 00:00:00', timeType: 23 }}
  `('CreateModifyTimeBlockData - Invalid Data 400', async ({ input }) => {
    const response = await request.post('/api/create_modify_time_blocks')
      .send(input)
      .set('Authorization', 'abc123')

    expect(response.statusCode).toEqual(400)
    expect(response.body.error.message).toContain('Invalid')
  })

  it('CreateModifyTimeBlockData - Unauthorized 401', async () => {
    const response = await request.post('/api/create_modify_time_blocks')
      .send({
        timeStart: '2000-01-01 00:00:00',
        timeEnd: '2000-01-01 00:00:00',
        timeType: 23
      })

    expect(response.statusCode).toEqual(401)
    expect(response.body).toBe('Traitor')
  })

  it('CreateModifyTimeBlockData - Invalid Permission Level 401', async () => {
    mockTrx.transacting.mockResolvedValue({})
    dbClient.where.mockResolvedValue({ permission: 0 })
    dbClient.transacting.mockResolvedValue(12)
    const response = await request.post('/api/create_modify_time_blocks')
      .send({
        timeStart: '2000-01-01 00:00:00',
        timeEnd: '2000-01-01 00:00:00',
        timeType: 1,
        positionId: 123
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toEqual(401)
    expect(response.body.error?.message).toBe('Invalid Authorization Level')
  })

  it('CreateModifyTimeBlockData - Internal Server Error 500', async () => {
    mockTrx.transacting.mockResolvedValue({})
    dbClient.where.mockResolvedValue({ permissions: 0 })
    dbClient.transacting.mockRejectedValue(12)
    const response = await request.post('/api/create_modify_time_blocks')
      .send({
        timeStart: '2000-01-01 00:00:00',
        timeEnd: '2000-01-01 00:00:00',
        timeType: 0
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(500)
    expect(response.body.error?.message).toBe('Internal Server Error')
  })

  it('DeleteTimeBlockData - Success 202', async () => {
    dbClient.where.mockResolvedValue({})
    const response = await request.delete('/api/delete_time_blocks')
      .send({
        timeId: 1
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(202)
    expect(response.body.success?.message).toContain('Deleted')
  })

  it('DeleteTimeBlockData - Missing Data 400', async () => {
    const response = await request.delete('/api/delete_time_blocks')
      .send({})
      .set('Authorization', 'abc123')

    expect(response.statusCode).toEqual(400)
    expect(response.body.error.message).toContain('Missing')
  })

  it('DeleteTimeBlockData - Invalid Data 400', async () => {
    const response = await request.delete('/api/delete_time_blocks')
      .send({
        timeId: 'asdf'
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toEqual(400)
    expect(response.body.error.message).toContain('Invalid')
  })

  it('DeleteTimeBlockData - Invalid Data 401', async () => {
    const response = await request.delete('/api/delete_time_blocks')
      .send({
        timeId: 21
      })

    expect(response.statusCode).toEqual(401)
    expect(response.body).toContain('Traitor')
  })

  it('DeleteTimeBlockData - Internal Server Error 500', async () => {
    dbClient.where.mockRejectedValueOnce({})
    const response = await request.delete('/api/delete_time_blocks')
      .send({
        timeId: 1
      })
      .set('Authorization', 'abc123')

    expect(response.statusCode).toBe(500)
    expect(response.body.error?.message).toEqual('Internal Server Error')
  })
})
