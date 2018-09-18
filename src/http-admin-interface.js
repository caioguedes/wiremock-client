const axios = require('axios')

module.exports = class HttpAdminInterface {
  constructor (host, port) {
    this.uri = `http://${host}:${port}/__admin`
  }

  resetAll () {
    return axios({
      method: 'post',
      url: `${this.uri}/reset`
    })
  }

  /*
   * MAPPINGS
   */
  createMapping (mapping) {
    return axios({
      method: 'post',
      url: `${this.uri}/mappings`,
      data: mapping
    })
  }

  getStubMapping (uuid) {
    return axios({
      method: 'get',
      url: `${this.uri}/mappings/${uuid}`,
    })
  }

  listAllStubMappings () {
    return axios({
      method: 'get',
      url: `${this.uri}/mappings`,
    })
  }

  resetMappings () {
    return axios({
      method: 'post',
      url: `${this.uri}/mappings/reset`
    })
  }

  /*
   * REQUESTS
   */
  countRequestsMatching (requestPattern) {
    return axios({
      method: 'post',
      url: `${this.uri}/requests/count`,
      data: requestPattern
    })
  }

  findRequestsMatching (requestPattern) {
    return axios({
      method: 'post',
      url: `${this.uri}/requests/find`,
      data: requestPattern
    })
  }

  listAllRequests () {
    return axios({
      method: 'get',
      url: `${this.uri}/requests`
    })
  }

  resetRequests () {
    return axios({
      method: 'post',
      url: `${this.uri}/requests/reset`
    })
  }
}
