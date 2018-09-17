const {
  absent,
  urlEqualTo
} = require('../matchers')

module.exports = class RequestPatternBuilder {
  constructor (method, url) {
    this.method = method
    this.url = url
    this.headers = {}
    this.cookies = {}
    this.queryParameters = {}
    this.bodyPatterns = []
  }

  build () {
    const requestPattern = {
      method: this.method
    }

    Object.assign(requestPattern, this.url)

    if (Object.keys(this.headers).length > 0) {
      requestPattern.headers = this.headers
    }

    if (Object.keys(this.cookies).length > 0) {
      requestPattern.cookies = this.cookies
    }

    if (Object.keys(this.queryParameters).length > 0) {
      requestPattern.queryParameters = this.queryParameters
    }

    if (this.bodyPatterns.length > 0) {
      requestPattern.bodyPatterns = this.bodyPatterns
    }

    if (this.basicAuthCredentials) {
      requestPattern.basicAuthCredentials = this.basicAuthCredentials
    }

    return requestPattern
  }

  withUrl (url) {
    this.url = urlEqualTo(url)
    return this
  }

  withHeader (key, value) {
    this.headers[key] = value
    return this
  }

  withoutHeader (key) {
    this.headers[key] = absent()
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

  withBasicAuth (username, password) {
    this.basicAuthCredentials = { username, password }
    return this
  }

  withRequestBody (bodyPattern) {
    this.bodyPatterns.push(bodyPattern)
    return this
  }
}
