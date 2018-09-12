const WireMock = require('./wire-mock')

describe('WireMock', () => {
  describe('constructor', () => {
    it('should default host and port', () => {
      const wireMock = new WireMock()
      expect(wireMock.admin.uri).toEqual('http://localhost:8080/__admin')
    })
  })
})
