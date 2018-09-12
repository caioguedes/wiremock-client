const rp = require('request-promise')

module.exports = class HttpAdminInterface {

  constructor (host, port) {
    this.uri = `http://${host}:${port}/__admin`
  }

  createMapping (mapping) {
    return rp({
      method: 'POST',
      url: `${this.uri}/mappings`,
      body: mapping,
      json: true
    })
  }

  resetMappings () {
    return rp.post(`${this.uri}/mappings/reset`)
  }


}
