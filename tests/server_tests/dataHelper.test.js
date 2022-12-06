const dataHelper = require('../../server/api/dataHelper')

describe('Testing dataHelper functions', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(dataHelper, 'getJWTSecret').mockImplementation(() => { return 'hello' })
  })

  it('verifyJWTAuthToken: JWT should not verify', async () => {
    let err
    // using route as an easy way to test
    const req = { headers: { authorization: 'BadAuth' } }
    try {
      dataHelper.verifyJWTAuthToken(req)
    } catch (_err) {
      err = _err
    }

    expect(err).toBeInstanceOf(Error)
  })
})
