const rewire = require('rewire')

describe('HttpAdminInterface', () => {
  let HttpAdminInterface
  let axiosSpy
  let response

  beforeEach(() => {
    response = 'response'
    axiosSpy = jasmine.createSpy('axios')
    axiosSpy.and.returnValue(Promise.resolve({
      data: response
    }))
    HttpAdminInterface = rewire('./http-admin-interface')
    HttpAdminInterface.__set__({
      axios: axiosSpy
    })
  })

  describe('constructor', () => {
    it('should build a uri from the hostname and port', () => {
      const admin = new HttpAdminInterface('http', 'localhost', 8080)
      expect(admin.uri).toEqual('http://localhost:8080/__admin')
    })
  })

  describe('methods', () => {
    let admin

    beforeEach(() => {
      admin = new HttpAdminInterface('http', 'localhost', 8080)
    })

    it('should have a method for resetting all the things', done => {
      admin.resetAll().then(res => {
        expect(res).toEqual(response)
        expect(axiosSpy).toHaveBeenCalledWith({
          method: 'post',
          url: 'http://localhost:8080/__admin/reset'
        })
        done()
      })
    })

    it('should have a method for checking if the server is up', done => {
      admin.healthcheck().then(res => {
        expect(res).toEqual(true)
        expect(axiosSpy).toHaveBeenCalledWith({
          method: 'get',
          url: 'http://localhost:8080/__admin/recordings/status'
        })
        done()
      })
    })

    it('should have a method for checking if the server is up', done => {
      axiosSpy.and.returnValue(Promise.reject(new Error()))
      admin.healthcheck().then(res => {
        expect(res).toEqual(false)
        expect(axiosSpy).toHaveBeenCalledWith({
          method: 'get',
          url: 'http://localhost:8080/__admin/recordings/status'
        })
        done()
      })
    })

    /*
     * MAPPINGS
     */
    it('should have a method for getting all stub mappings', done => {
      admin.listAllStubMappings().then(res => {
        expect(res).toEqual(response)
        expect(axiosSpy).toHaveBeenCalledWith({
          method: 'get',
          url: 'http://localhost:8080/__admin/mappings'
        })
        done()
      })
    })

    it('should have a method for getting a single stub mapping', done => {
      let uuid = 'uuid'
      admin.getStubMapping(uuid).then(res => {
        expect(res).toEqual(response)
        expect(axiosSpy).toHaveBeenCalledWith({
          method: 'get',
          url: `http://localhost:8080/__admin/mappings/${uuid}`
        })
        done()
      })
    })

    it('should have a method for creating mappings', done => {
      const mapping = { test: 'mapping' }
      admin.createMapping(mapping).then(res => {
        expect(res).toEqual(response)
        expect(axiosSpy).toHaveBeenCalledWith({
          method: 'post',
          url: 'http://localhost:8080/__admin/mappings',
          data: mapping
        })
        done()
      })
    })

    it('should have a method for resetting mappings', done => {
      admin.resetMappings().then(res => {
        expect(res).toEqual(response)
        expect(axiosSpy).toHaveBeenCalledWith({
          method: 'post',
          url: 'http://localhost:8080/__admin/mappings/reset'
        })
        done()
      })
    })

    /*
     * REQUESTS
     */
    it('should have a method for finding requests', done => {
      let requestMatcher = 'requestMatcher'
      admin.findRequestsMatching(requestMatcher).then(res => {
        expect(res).toEqual(response)
        expect(axiosSpy).toHaveBeenCalledWith({
          method: 'post',
          url: 'http://localhost:8080/__admin/requests/find',
          data: requestMatcher
        })
        done()
      })
    })

    it('should have a method for counting matching requests', done => {
      let requestMatcher = 'requestMatcher'
      admin.countRequestsMatching(requestMatcher).then(res => {
        expect(res).toEqual(response)
        expect(axiosSpy).toHaveBeenCalledWith({
          method: 'post',
          url: 'http://localhost:8080/__admin/requests/count',
          data: requestMatcher
        })
        done()
      })
    })

    it('should have a method for getting all requests', done => {
      admin.listAllRequests().then(res => {
        expect(res).toEqual(response)
        expect(axiosSpy).toHaveBeenCalledWith({
          method: 'get',
          url: 'http://localhost:8080/__admin/requests'
        })
        done()
      })
    })

    it('should have a method for resetting requests', done => {
      admin.resetRequests().then(res => {
        expect(res).toEqual(response)
        expect(axiosSpy).toHaveBeenCalledWith({
          method: 'post',
          url: 'http://localhost:8080/__admin/requests/reset'
        })
        done()
      })
    })

    /*
     * RECORDINGS
     */
    it('should have a method for getting the recording status', done => {
      admin.getRecordingStatus().then(res => {
        expect(res).toEqual(response)
        expect(axiosSpy).toHaveBeenCalledWith({
          method: 'get',
          url: 'http://localhost:8080/__admin/recordings/status'
        })
        done()
      })
    })
  })
})
