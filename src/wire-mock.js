const HttpAdminInterface = require('./http-admin-interface')

const DEFAULT_PORT = 8080
const DEFAULT_HOST = 'localhost'

module.exports = class WireMock {
  constructor (host, port) {
    this.admin = new HttpAdminInterface(host || DEFAULT_HOST, port || DEFAULT_PORT)
  }

  register (builder) {
    return this.admin.createMapping(builder.build())
  }

  resetMappings () {
    return this.admin.resetMappings()
  }
}
