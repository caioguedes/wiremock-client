const axios = require('axios')

function handleResponse (promise) {
  return promise.then(res => res.data)
}

module.exports = class HttpAdminInterface {
  constructor (host, port) {
    this.uri = `http://${host}:${port}/__admin`
  }

  resetAll () {
    return handleResponse(axios({
      method: 'post',
      url: `${this.uri}/reset`
    }))
  }

  /*
   * MAPPINGS
   */
  createMapping (mapping) {
    return handleResponse(axios({
      method: 'post',
      url: `${this.uri}/mappings`,
      data: mapping
    }))
  }

  getStubMapping (uuid) {
    return handleResponse(axios({
      method: 'get',
      url: `${this.uri}/mappings/${uuid}`
    }))
  }

  listAllStubMappings () {
    return handleResponse(axios({
      method: 'get',
      url: `${this.uri}/mappings`
    }))
  }

  resetMappings () {
    return handleResponse(axios({
      method: 'post',
      url: `${this.uri}/mappings/reset`
    }))
  }

  /*
   * REQUESTS
   */
  countRequestsMatching (requestPattern) {
    return handleResponse(axios({
      method: 'post',
      url: `${this.uri}/requests/count`,
      data: requestPattern
    }))
  }

  findRequestsMatching (requestPattern) {
    return handleResponse(axios({
      method: 'post',
      url: `${this.uri}/requests/find`,
      data: requestPattern
    }))
  }

  listAllRequests () {
    return handleResponse(axios({
      method: 'get',
      url: `${this.uri}/requests`
    }))
  }

  resetRequests () {
    return handleResponse(axios({
      method: 'post',
      url: `${this.uri}/requests/reset`
    }))
  }
}
