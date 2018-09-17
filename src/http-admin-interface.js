const rp = require('request-promise')

module.exports = class HttpAdminInterface {
  constructor (host, port) {
    this.uri = `http://${host}:${port}/__admin`
  }

  resetAll () {
    return rp({
      method: 'POST',
      url: `${this.uri}/reset`
    })
  }

  /*
   * MAPPINGS
   */
  createMapping (mapping) {
    return rp({
      method: 'POST',
      url: `${this.uri}/mappings`,
      body: mapping,
      json: true
    })
  }

  resetMappings () {
    return rp({
      method: 'POST',
      url: `${this.uri}/mappings/reset`
    })
  }

  /*
   * REQUESTS
   */
  findRequestsMatching (requestPattern) {
    return rp({
      method: 'POST',
      url: `${this.uri}/requests/find`,
      body: requestPattern,
      json: true
    })
  }

  countRequestsMatching (requestPattern) {
    return rp({
      method: 'POST',
      url: `${this.uri}/requests/count`,
      body: requestPattern,
      json: true
    })
  }

  resetRequests () {
    return rp({
      method: 'POST',
      url: `${this.uri}/requests/reset`
    })
  }
}
