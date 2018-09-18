const rewire = require('rewire')

describe('HttpAdminInterface', () => {
  let HttpAdminInterface
  let axiosSpy

  beforeEach(() => {
    axiosSpy = jasmine.createSpy('rp')
    HttpAdminInterface = rewire('./http-admin-interface')
    HttpAdminInterface.__set__({
      axios: axiosSpy
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
      expect(axiosSpy).toHaveBeenCalledWith({
        method: 'post',
        url: 'http://localhost:8080/__admin/reset'
      })
    })

    /*
     * MAPPINGS
     */
    it('should have a method for creating mappings', () => {
      const mapping = { test: 'mapping' }
      admin.createMapping(mapping)
      expect(axiosSpy).toHaveBeenCalledWith({
        method: 'post',
        url: `http://localhost:8080/__admin/mappings`,
        data: mapping
      })
    })

    it('should have a method for resetting mappings', () => {
      admin.resetMappings()
      expect(axiosSpy).toHaveBeenCalledWith({
        method: 'post',
        url: `http://localhost:8080/__admin/mappings/reset`
      })
    })

    /*
     * REQUESTS
     */
    it('should have a method for finding requests', () => {
      let requestMatcher = 'requestMatcher'
      admin.findRequestsMatching(requestMatcher)
      expect(axiosSpy).toHaveBeenCalledWith({
        method: 'post',
        url: `http://localhost:8080/__admin/requests/find`,
        data: requestMatcher
      })
    })

    it('should have a method for counting matching requests', () => {
      let requestMatcher = 'requestMatcher'
      admin.countRequestsMatching(requestMatcher)
      expect(axiosSpy).toHaveBeenCalledWith({
        method: 'post',
        url: `http://localhost:8080/__admin/requests/count`,
        data: requestMatcher
      })
    })

    it('should have a method for resetting requests', () => {
      admin.resetRequests()
      expect(axiosSpy).toHaveBeenCalledWith({
        method: 'post',
        url: `http://localhost:8080/__admin/requests/reset`
      })
    })
  })
})
