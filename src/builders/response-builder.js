module.exports = class ResponseBuilder {
  constructor () {
    this.headers = {}
  }

  build () {
    const response = {
      status: this.status
    }

    if (this.body) {
      response.body = this.body
    }

    if (Object.keys(this.headers).length > 0) {
      response.headers = this.headers
    }

    if (this.fault) {
      response.fault = this.fault
    }

    // delay
    if (this.chunkedDribbleDelay) {
      response.chunkedDribbleDelay = this.chunkedDribbleDelay
    }

    if (this.fixedDelayMilliseconds) {
      response.fixedDelayMilliseconds = this.fixedDelayMilliseconds
    }

    if (this.delayDistribution) {
      response.delayDistribution = this.delayDistribution
    }

    return response
  }

  withFault (fault) {
    this.fault = fault
    return this
  }

  withBody (body) {
    this.body = typeof body === 'string' ? body : JSON.stringify(body)
    return this
  }

  withHeader (key, value) {
    this.headers[key] = value
    return this
  }

  /*
   * Delay
   */
  withRandomChunkedDribbleDelay (numberOfChunks, totalDuration) {
    this.chunkedDribbleDelay = {
      numberOfChunks,
      totalDuration
    }
    return this
  }

  withFixedDelay (fixedDelayMilliseconds) {
    this.fixedDelayMilliseconds = fixedDelayMilliseconds
    return this
  }

  withLogNormalRandomDelay (median, sigma) {
    this.delayDistribution = {
      type: 'lognormal',
      median,
      sigma
    }
    return this
  }

  withUniformRandomDelay (lower, upper) {
    this.delayDistribution = {
      type: 'uniform',
      lower,
      upper
    }
    return this
  }

  withStatus (status) {
    this.status = status
    return this
  }
}
