module.exports = class MappingBuilder {

  constructor (method, url) {
    this.method = method
    this.url = url
    this.headers = {}
    this.cookies = {}
    this.queryParameters = {}
    this.bodyPatterns = []
  }

  build () {
    // request
    const mapping = {
      request: {
        method: this.method
      }
    }

    mapping.request[this.url.key] = this.url.value

    if (this.headers.length > 0) {
      mapping.request.headers = this.headers
    }

    if (this.cookies.length > 0) {
      mapping.request.cookies = this.cookies
    }

    if (this.queryParameters.length > 0) {
      mapping.request.queryParameters = this.queryParameters
    }

    if (this.bodyPatterns.length > 0) {
      mapping.request.bodyPatterns = this.bodyPatterns
    }

    // response
    if (this.response) {
      mapping.response = this.response.build()
    }

    return mapping
  }

  withHeader (key, value) {
    this.headers[key] = value
    return this
  }

  withCookie (key, value) {
    this.cookies[key] = value
    return this
  }

  withQueryParam (key, value) {
    this.queryParameters[key] = value
    return this
  }

  withRequestBody (bodyPattern) {
    this.bodyPatterns.push(bodyPattern)
    return this
  }

  willReturn (responseBuilder) {
    this.response = responseBuilder
    return this
  }

}
