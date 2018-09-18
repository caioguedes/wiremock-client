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

  resetMappings () {
    return axios({
      method: 'post',
      url: `${this.uri}/mappings/reset`
    })
  }

  /*
   * REQUESTS
   */
  findRequestsMatching (requestPattern) {
    return axios({
      method: 'post',
      url: `${this.uri}/requests/find`,
      data: requestPattern
    })
  }

  countRequestsMatching (requestPattern) {
    return axios({
      method: 'post',
      url: `${this.uri}/requests/count`,
      data: requestPattern
    })
  }

  resetRequests () {
    return axios({
      method: 'post',
      url: `${this.uri}/requests/reset`
    })
  }
}
