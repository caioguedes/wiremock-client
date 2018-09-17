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

    it('should have a method for resetting all the things', () => {
      admin.resetAll()
      expect(rpSpy).toHaveBeenCalledWith({
        method: 'POST',
        url: 'http://localhost:8080/__admin/reset'
      })
    })

    /*
     * MAPPINGS
     */
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

    /*
     * REQUESTS
     */
    it('should have a method for finding requests', () => {
      let requestMatcher = 'requestMatcher'
      admin.findRequestsMatching(requestMatcher)
      expect(rpSpy).toHaveBeenCalledWith({
        method: 'POST',
        url: `http://localhost:8080/__admin/requests/find`,
        body: requestMatcher,
        json: true
      })
    })

    it('should have a method for counting matching requests', () => {
      let requestMatcher = 'requestMatcher'
      admin.countRequestsMatching(requestMatcher)
      expect(rpSpy).toHaveBeenCalledWith({
        method: 'POST',
        url: `http://localhost:8080/__admin/requests/count`,
        body: requestMatcher,
        json: true
      })
    })

    it('should have a method for resetting requests', () => {
      admin.resetRequests()
      expect(rpSpy).toHaveBeenCalledWith({
        method: 'POST',
        url: `http://localhost:8080/__admin/requests/reset`
      })
    })
  })
})
