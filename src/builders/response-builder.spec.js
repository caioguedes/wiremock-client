const ResponseBuilder = require('./response-builder')

describe('ResponseBuilder', () => {
  let builder

  beforeEach(() => {
    builder = new ResponseBuilder()
  })

  it('should default headers to a blank object', () => {
    expect(builder.headers).toEqual({})
  })

  it('should have a method for setting the status', () => {
    expect(builder.withStatus(123) instanceof ResponseBuilder).toBeTruthy()
    expect(builder.status).toEqual(123)
  })

  it('should have a method for setting response headers', () => {
    const key = 'key'
    const value = 'value'
    expect(builder.withHeader(key, value) instanceof ResponseBuilder).toBeTruthy()
    expect(builder.headers).toEqual({
      key: 'value'
    })
  })

  it('should have a method for setting the response body', () => {
    let body = 'body'
    expect(builder.withBody(body) instanceof ResponseBuilder).toBeTruthy()
    expect(builder.body).toEqual(body)

    body = { test: true }
    expect(builder.withBody(body) instanceof ResponseBuilder).toBeTruthy()
    expect(builder.body).toEqual(JSON.stringify(body))
  })

  describe('build()', () => {
    it('should set the status', () => {
      builder.withStatus(123)
      expect(builder.build()).toEqual({
        status: 123
      })
    })

    it('should set the body', () => {
      builder.withStatus(123)
      builder.withBody('body')
      expect(builder.build()).toEqual({
        status: 123,
        body: 'body'
      })
    })

    it('should set the headers', () => {
      builder.withStatus(123)
      builder.withHeader('key', 'value')
      expect(builder.build()).toEqual({
        status: 123,
        headers: {
          key: 'value'
        }
      })
    })
  })
})
