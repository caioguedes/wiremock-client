const rewire = require('rewire')
const MappingBuilder = require('./builders/mapping-builder')
const RequestPatternBuilder = require('./builders/request-pattern-builder')

describe('WireMock', () => {
  let WireMock

  let adminConstructorSpy
  let adminSpy

  beforeEach(() => {
    adminConstructorSpy = jasmine.createSpy('adminConstructor')
    adminSpy = jasmine.createSpyObj('admin', [
      'createMapping',
      'findRequestsMatching',
      'getRecordingStatus',
      'getStubMapping',
      'healthcheck',
      'listAllStubMappings',
      'listAllRequests',
      'resetAll',
      'resetMappings',
      'resetRequests'
    ])
    adminConstructorSpy.and.returnValue(adminSpy)

    WireMock = rewire('./connect.js')
    WireMock.__set__({
      HttpAdminInterface: adminConstructorSpy
    })
  })

  describe('constructor', () => {
    it('should create admin interface with default host and port when neither is provided', () => {
      WireMock()
      expect(adminConstructorSpy).toHaveBeenCalledWith('localhost', 8080)
    })

    it('should create admin interface with default port when only host is provided', () => {
      const host = 'non_default_localhost'
      WireMock(host)
      expect(adminConstructorSpy).toHaveBeenCalledWith(host, 8080)
    })

    it('should create admin interface with the provided host and port', () => {
      const host = 'non_default_localhost'
      const port = 1234
      WireMock(host, port)
      expect(adminConstructorSpy).toHaveBeenCalledWith(host, port)
    })
  })

  describe('methods', () => {
    let wireMock

    beforeEach(() => {
      wireMock = new WireMock()
    })

    // healthcheck()
    it('should have a method for checking the health of a mock', done => {
      let resolve = 'resolve'
      adminSpy.healthcheck.and.returnValue(Promise.resolve(resolve))
      wireMock.healthcheck().then(result => {
        expect(result).toEqual(resolve)
        expect(adminSpy.healthcheck).toHaveBeenCalledWith()
        done()
      })
    })

    // resetAll()
    it('should have a method for resetting all the things', done => {
      let resolve = 'resolve'
      adminSpy.resetAll.and.returnValue(Promise.resolve(resolve))
      wireMock.resetAll().then(result => {
        expect(result).toEqual(resolve)
        expect(adminSpy.resetAll).toHaveBeenCalledWith()
        done()
      })
    })

    /*
     * MAPPINGS
     */
    // allStubMappings
    it('should have a method for getting all stub mappings', done => {
      let resolve = 'resolve'
      adminSpy.listAllStubMappings.and.returnValue(Promise.resolve(resolve))
      wireMock.allStubMappings().then(result => {
        expect(result).toEqual(resolve)
        expect(adminSpy.listAllStubMappings).toHaveBeenCalledWith()
        done()
      })
    })

    // getStubMapping
    it('should have a method for getting a single stub mapping by uuid', done => {
      let resolve = 'resolve'
      let uuid = 'uuid'
      adminSpy.getStubMapping.and.returnValue(Promise.resolve(resolve))
      wireMock.getStubMapping(uuid).then(result => {
        expect(result).toEqual(resolve)
        expect(adminSpy.getStubMapping).toHaveBeenCalledWith(uuid)
        done()
      })
    })

    // register
    it('should have a method for registering mappings using a mapping builder', done => {
      let resolve = 'resolve'
      const builder = new MappingBuilder()
      let buildResult = 'builtMapping'
      let buildSpy = spyOn(builder, 'build').and.returnValue(buildResult)
      adminSpy.createMapping.and.returnValue(Promise.resolve(resolve))
      wireMock.register(builder).then(result => {
        expect(result).toEqual(resolve)
        expect(buildSpy).toHaveBeenCalledWith()
        expect(adminSpy.createMapping).toHaveBeenCalledWith(buildResult)
        done()
      })
    })

    it('should have a method for registering a mappings object', done => {
      let resolve = 'resolve'
      const mapping = {}
      adminSpy.createMapping.and.returnValue(Promise.resolve(resolve))
      wireMock.register(mapping).then(result => {
        expect(result).toEqual(resolve)
        expect(adminSpy.createMapping).toHaveBeenCalledWith(mapping)
        done()
      })
    })

    // reset
    it('should have a method for resetting mappings', done => {
      let resolve = 'resolve'
      adminSpy.resetMappings.and.returnValue(Promise.resolve(resolve))
      wireMock.resetMappings().then(result => {
        expect(result).toEqual(resolve)
        expect(adminSpy.resetMappings).toHaveBeenCalledWith()
        done()
      })
    })

    /*
    * REQUESTS
    */
    // allRequests
    it('should have a method for getting all requests', done => {
      let resolve = 'resolve'
      adminSpy.listAllRequests.and.returnValue(Promise.resolve(resolve))
      wireMock.allRequests().then(result => {
        expect(result).toEqual(resolve)
        expect(adminSpy.listAllRequests).toHaveBeenCalledWith()
        done()
      })
    })

    // find
    it('should have a method for finding requests using a request pattern builder', done => {
      let resolve = 'resolve'
      const builder = new RequestPatternBuilder()
      let buildResult = 'builtRequestPattern'
      let buildSpy = spyOn(builder, 'build').and.returnValue(buildResult)
      adminSpy.findRequestsMatching.and.returnValue(Promise.resolve(resolve))
      wireMock.find(builder).then(result => {
        expect(result).toEqual(resolve)
        expect(buildSpy).toHaveBeenCalledWith()
        expect(adminSpy.findRequestsMatching).toHaveBeenCalledWith(buildResult)
        done()
      })
    })

    it('should have a method for finding requests with a request pattern object', done => {
      let resolve = 'resolve'
      const requestPattern = {}
      adminSpy.findRequestsMatching.and.returnValue(Promise.resolve(resolve))
      wireMock.find(requestPattern).then(result => {
        expect(result).toEqual(resolve)
        expect(adminSpy.findRequestsMatching).toHaveBeenCalledWith(requestPattern)
        done()
      })
    })

    // verifyThat
    it('should have a method for verifying requests with a request pattern builder', done => {
      const builder = new RequestPatternBuilder()
      let buildResult = 'builtRequestPattern'
      let buildSpy = spyOn(builder, 'build').and.returnValue(buildResult)
      adminSpy.findRequestsMatching.and.returnValue(Promise.resolve({ requests: [{}] }))
      let countMatcherSpy = jasmine.createSpy('countMatcher')
      countMatcherSpy.and.returnValue(true)
      wireMock.verifyThat(builder, countMatcherSpy).then(result => {
        expect(result).toBeTruthy()
        expect(buildSpy).toHaveBeenCalledWith()
        expect(countMatcherSpy).toHaveBeenCalledWith(1)
        expect(adminSpy.findRequestsMatching).toHaveBeenCalledWith(buildResult)
        done()
      })
    })

    it('should have a method for verifying requests with a request pattern object', done => {
      const requestPattern = {}
      adminSpy.findRequestsMatching.and.returnValue(Promise.resolve({ requests: [{}] }))
      let countMatcherSpy = jasmine.createSpy('countMatcher')
      countMatcherSpy.and.returnValue(true)
      wireMock.verifyThat(requestPattern, countMatcherSpy).then(result => {
        expect(result).toBeTruthy()
        expect(adminSpy.findRequestsMatching).toHaveBeenCalledWith(requestPattern)
        done()
      })
    })

    // reset
    it('should have a method for resetting mappings', () => {
      wireMock.resetRequests()
      expect(adminSpy.resetRequests).toHaveBeenCalledWith()
    })

    /*
     * RECORDINGS
     */
    // getRecordingStatus
    it('should have a method getting the recording status', done => {
      let resolve = 'resolve'
      adminSpy.getRecordingStatus.and.returnValue(Promise.resolve(resolve))
      wireMock.recordingStatus().then(result => {
        expect(result).toEqual(resolve)
        expect(adminSpy.getRecordingStatus).toHaveBeenCalledWith()
        done()
      })
    })
  })
})
