const RequestPatternBuilder = require('./request-pattern-builder')

describe('RequestPatternBuilder', () => {
  it('should have a method for constructing the builder', () => {
    const method = 'method'
    const url = 'url'
    const builder = new RequestPatternBuilder(method, url)
    expect(builder.method).toEqual(method)
    expect(builder.url).toEqual(url)
    expect(builder.headers).toEqual({})
    expect(builder.cookies).toEqual({})
    expect(builder.queryParameters).toEqual({})
    expect(builder.bodyPatterns).toEqual([])
  })

  it('should have a method for setting a url matcher', () => {
    const url = 'url'
    const builder = new RequestPatternBuilder()
    expect(builder.withUrl(url) instanceof RequestPatternBuilder).toBeTruthy()
    expect(builder.url).toEqual({
      url: url
    })
  })

  it('should have a method for setting a basic auth matcher', () => {
    const username = 'username'
    const password = 'password'
    const builder = new RequestPatternBuilder()
    expect(builder.withBasicAuth(username, password) instanceof RequestPatternBuilder).toBeTruthy()
    expect(builder.basicAuthCredentials).toEqual({
      username,
      password
    })
  })

  it('should have a method for adding a header matcher', () => {
    const key = 'key'
    const value = 'value'
    const builder = new RequestPatternBuilder()
    expect(builder.withHeader(key, value) instanceof RequestPatternBuilder).toBeTruthy()
    expect(builder.headers).toEqual({
      key: value
    })
  })

  it('should have a method for adding a header matcher to verify a header is absent', () => {
    const key = 'key'
    const value = 'value'
    const builder = new RequestPatternBuilder()
    expect(builder.withoutHeader(key, value) instanceof RequestPatternBuilder).toBeTruthy()
    expect(builder.headers).toEqual({
      key: { absent: undefined }
    })
  })

  it('should have a method for adding a cookie matcher', () => {
    const key = 'key'
    const value = 'value'
    const builder = new RequestPatternBuilder()
    expect(builder.withCookie(key, value) instanceof RequestPatternBuilder).toBeTruthy()
    expect(builder.cookies).toEqual({
      key: value
    })
  })

  it('should have a method for adding a query parameter matcher', () => {
    const key = 'key'
    const value = 'value'
    const builder = new RequestPatternBuilder()
    expect(builder.withQueryParam(key, value) instanceof RequestPatternBuilder).toBeTruthy()
    expect(builder.queryParameters).toEqual({
      key: value
    })
  })

  it('should have a method for adding a request body matchers', () => {
    const bodyPattern = 'bodyPattern'
    const builder = new RequestPatternBuilder()
    expect(builder.withRequestBody(bodyPattern) instanceof RequestPatternBuilder).toBeTruthy()
    expect(builder.bodyPatterns).toEqual([bodyPattern])
  })

  describe('build()', () => {
    let builder

    beforeEach(() => {
      builder = new RequestPatternBuilder('method', { url: 'urlPattern' })
    })

    it('should set the method', () => {
      expect(builder.build().method).toEqual('method')
    })

    it('should set the url', () => {
      expect(builder.build().url).toEqual('urlPattern')
    })

    it('should set basic auth username and password', () => {
      let requestPattern = builder.withBasicAuth('username', 'password').build()
      expect(requestPattern.basicAuthCredentials.username).toEqual('username')
      expect(requestPattern.basicAuthCredentials.password).toEqual('password')
    })

    it('should set headers', () => {
      expect(builder.withHeader('key', 'value').build().headers.key).toEqual('value')
    })

    it('should set cookies', () => {
      expect(builder.withCookie('key', 'value').build().cookies.key).toEqual('value')
    })

    it('should set query parameters', () => {
      expect(builder.withQueryParam('key', 'value').build().queryParameters.key).toEqual('value')
    })

    it('should set body patterns', () => {
      expect(builder.withRequestBody('bodyPattern').build().bodyPatterns).toEqual([ 'bodyPattern' ])
    })
  })
})
