const MappingBuilder = require('./mapping-builder')

describe('MappingBuilder', () => {

  it('should have a method for constructing the builder', () => {
    const method = 'method'
    const url = 'url'
    const builder = new MappingBuilder(method, url)
    expect(builder.method).toEqual(method)
    expect(builder.url).toEqual(url)
    expect(builder.headers).toEqual({})
    expect(builder.cookies).toEqual({})
    expect(builder.queryParameters).toEqual({})
    expect(builder.bodyPatterns).toEqual([])
  })

  it('should have a method for setting the priority', () => {
    const priority = 123
    const builder = new MappingBuilder()
    expect(builder.atPriority(priority) instanceof MappingBuilder).toBeTruthy()
    expect(builder.priority).toEqual(priority)
  })

  it('should have a method for setting a header', () => {
    const key = 'key'
    const value = 'value'
    const builder = new MappingBuilder()
    expect(builder.withHeader(key, value) instanceof MappingBuilder).toBeTruthy()
    expect(builder.headers).toEqual({
      key: value
    })
  })

  it('should have a method for setting a cookie', () => {
    const key = 'key'
    const value = 'value'
    const builder = new MappingBuilder()
    expect(builder.withCookie(key, value) instanceof MappingBuilder).toBeTruthy()
    expect(builder.cookies).toEqual({
      key: value
    })
  })

  it('should have a method for setting a query params', () => {
    const key = 'key'
    const value = 'value'
    const builder = new MappingBuilder()
    expect(builder.withQueryParam(key, value) instanceof MappingBuilder).toBeTruthy()
    expect(builder.queryParameters).toEqual({
      key: value
    })
  })

  it('should have a method for setting a request body matchers', () => {
    const bodyPattern = 'bodyPattern'
    const builder = new MappingBuilder()
    expect(builder.withRequestBody(bodyPattern) instanceof MappingBuilder).toBeTruthy()
    expect(builder.bodyPatterns).toEqual([bodyPattern])
  })

  it('should have a method for attaching a response builder', () => {
    const responseBuilder = 'responseBuilder'
    const builder = new MappingBuilder()
    expect(builder.willReturn(responseBuilder) instanceof MappingBuilder).toBeTruthy()
    expect(builder.response).toEqual(responseBuilder)
  })

  describe('build()', () => {

    let builder

    beforeEach(() => {
      builder = new MappingBuilder('method', {
        key: 'urlKey',
        value: 'urlValue',
      })
    })

    it('should set the method', () => {
      expect(builder.build().request.method).toEqual('method')
    })

    it('should set the url', () => {
      expect(builder.build().request.urlKey).toEqual('urlValue')
    })

    it('should set priority', () => {
      expect(builder.atPriority(123).build().priority).toEqual(123)
    })

    it('should set headers', () => {
      expect(builder.withHeader('key', 'value').build().request.headers.key).toEqual('value')
    })

    it('should set cookies', () => {
      expect(builder.withCookie('key', 'value').build().request.cookies.key).toEqual('value')
    })

    it('should set query parameters', () => {
      expect(builder.withQueryParam('key', 'value').build().request.queryParameters.key).toEqual('value')
    })

    it('should set body patterns', () => {
      expect(builder.withRequestBody('bodyPattern').build().request.bodyPatterns).toEqual([ 'bodyPattern' ])
    })

    it('should build the response', () => {
      const responseSpy = jasmine.createSpyObj('responseBuilder', ['build'])
      responseSpy.build.and.returnValue('response')
      expect(builder.willReturn(responseSpy).build().response).toEqual('response')
    })

  })

})
