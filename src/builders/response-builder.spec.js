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

  it('should have a method for setting random delay with chucked dribbles', () => {
    const numberOfChunks = 123
    const totalDuration = 456
    expect(builder.withRandomChunkedDribbleDelay(numberOfChunks, totalDuration) instanceof ResponseBuilder).toBeTruthy()
    expect(builder.chunkedDribbleDelay).toEqual({
      numberOfChunks,
      totalDuration
    })
  })

  it('should have a method for setting fixed delay', () => {
    const fixedDelayMilliseconds = 123
    expect(builder.withFixedDelay(fixedDelayMilliseconds) instanceof ResponseBuilder).toBeTruthy()
    expect(builder.fixedDelayMilliseconds).toEqual(fixedDelayMilliseconds)
  })

  it('should have a method for setting normal random delay', () => {
    const median = 123
    const sigma = 456
    expect(builder.withLogNormalRandomDelay(median, sigma) instanceof ResponseBuilder).toBeTruthy()
    expect(builder.delayDistribution).toEqual({
      type: 'lognormal',
      median,
      sigma
    })
  })

  it('should have a method for setting uniform random delay', () => {
    const lower = 123
    const upper = 456
    expect(builder.withUniformRandomDelay(lower, upper) instanceof ResponseBuilder).toBeTruthy()
    expect(builder.delayDistribution).toEqual({
      type: 'uniform',
      lower,
      upper
    })
  })

  it('should have a method for setting a fault', () => {
    const fault = 'fault'
    expect(builder.withFault(fault) instanceof ResponseBuilder).toBeTruthy()
    expect(builder.fault).toEqual(fault)
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

    it('should set the fault', () => {
      builder.withStatus(123)
      let fault = 'fault'
      builder.withFault(fault)
      expect(builder.build()).toEqual({
        status: 123,
        fault
      })
    })

    it('should set the chunked dribble delay', () => {
      builder.withStatus(123)
      let numberOfChunks = 456
      let totalDuration = 789
      builder.withRandomChunkedDribbleDelay(numberOfChunks, totalDuration)
      expect(builder.build()).toEqual({
        status: 123,
        chunkedDribbleDelay: {
          numberOfChunks,
          totalDuration
        }
      })
    })

    it('should set the fixed delay', () => {
      builder.withStatus(123)
      let fixedDelayMilliseconds = 456
      builder.withFixedDelay(fixedDelayMilliseconds)
      expect(builder.build()).toEqual({
        status: 123,
        fixedDelayMilliseconds
      })
    })

    it('should set the log normal random delay', () => {
      builder.withStatus(123)
      let median = 456
      let sigma = 789
      builder.withLogNormalRandomDelay(median, sigma)
      expect(builder.build()).toEqual({
        status: 123,
        delayDistribution: {
          type: 'lognormal',
          median,
          sigma
        }
      })
    })

    it('should set the uniform random delay', () => {
      builder.withStatus(123)
      let lower = 456
      let upper = 789
      builder.withUniformRandomDelay(lower, upper)
      expect(builder.build()).toEqual({
        status: 123,
        delayDistribution: {
          type: 'uniform',
          lower,
          upper
        }
      })
    })
  })
})
