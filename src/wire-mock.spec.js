const rewire = require('rewire')

describe('WireMock', () => {
  let WireMock

  let adminConstructorSpy
  let adminSpy

  beforeEach(() => {
    adminConstructorSpy = jasmine.createSpy('adminConstructor')
    adminSpy = jasmine.createSpyObj('admin', ['createMapping', 'resetMappings'])
    adminConstructorSpy.and.returnValue(adminSpy)

    WireMock = rewire('./wire-mock.js')
    WireMock.__set__({
      HttpAdminInterface: adminConstructorSpy
    })
  })

  describe('constructor', () => {
    it('should create admin interface with default host and port when neither is provided', () => {
      const wireMock = new WireMock()
      expect(adminConstructorSpy).toHaveBeenCalledWith('localhost', 8080)
      expect(wireMock.admin).toEqual(adminSpy)
    })

    it('should create admin interface with default port when only host is provided', () => {
      const host = 'non_default_localhost'
      const wireMock = new WireMock(host)
      expect(adminConstructorSpy).toHaveBeenCalledWith(host, 8080)
      expect(wireMock.admin).toEqual(adminSpy)
    })

    it('should create admin interface with the provided host and port', () => {
      const host = 'non_default_localhost'
      const port = 1234
      const wireMock = new WireMock(host, port)
      expect(adminConstructorSpy).toHaveBeenCalledWith(host, port)
      expect(wireMock.admin).toEqual(adminSpy)
    })
  })

  describe('methods', () => {
    let wireMock

    beforeEach(() => {
      wireMock = new WireMock()
    })

    it('should have a method for registering mappings', () => {
      const builderSpy = jasmine.createSpyObj('builder', ['build'])
      const buildResult = 'built mapping'
      builderSpy.build.and.returnValue(buildResult)
      wireMock.register(builderSpy)
      expect(builderSpy.build).toHaveBeenCalledWith()
      expect(adminSpy.createMapping).toHaveBeenCalledWith(buildResult)
    })

    it('should have a method for resetting mappings', () => {
      wireMock.resetMappings()
      expect(adminSpy.resetMappings).toHaveBeenCalledWith()
    })
  })
})
