const rewire = require('rewire')

describe('HttpAdminInterface', () => {
  let HttpAdminInterface
  let rpSpy

  beforeEach(() => {
    rpSpy = jasmine.createSpy('rp')
    HttpAdminInterface = rewire('./http-admin-interface')
    HttpAdminInterface.__set__({
      rp: rpSpy
    })
  })

  describe('constructor', () => {
    it('should build a uri from the hostname and port', () => {
      const admin = new HttpAdminInterface('localhost', 8080)
      expect(admin.uri).toEqual('http://localhost:8080/__admin')
    })
  })

  describe('methods', () => {
    let admin

    beforeEach(() => {
      admin = new HttpAdminInterface('localhost', 8080)
    })

    it('should have a method for creating mappings', () => {
      const mapping = { test: 'mapping' }
      admin.createMapping(mapping)
      expect(rpSpy).toHaveBeenCalledWith({
        method: 'POST',
        url: `http://localhost:8080/__admin/mappings`,
        body: mapping,
        json: true
      })
    })

    it('should have a method for resetting mappings', () => {
      admin.resetMappings()
      expect(rpSpy).toHaveBeenCalledWith({
        method: 'POST',
        url: `http://localhost:8080/__admin/mappings/reset`
      })
    })
  })
})
