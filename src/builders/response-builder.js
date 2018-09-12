module.exports = class ResponseBuilder {
  constructor () {
    this.headers = {}
  }

  withStatus (status) {
    this.status = status
    return this
  }

  withHeader (key, value) {
    this.headers[key] = value
    return this
  }

  withBody (body) {
    this.body = typeof body === 'string' ? body : JSON.stringify(body)
    return this
  }

  build () {
    const response = {
      status: this.status

    }

    if (this.body) {
      response.body = this.body
    }

    if (this.headers.length > 0) {
      response.headers = this.headers
    }

    return response
  }
}
