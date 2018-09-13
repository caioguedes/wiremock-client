const HttpAdminInterface = require('./http-admin-interface')
const MappingBuilder = require('./builders/mapping-builder')

const DEFAULT_PORT = 8080
const DEFAULT_HOST = 'localhost'

module.exports = class WireMock {
  constructor (host, port) {
    this.admin = new HttpAdminInterface(host || DEFAULT_HOST, port || DEFAULT_PORT)
  }

  /*
   * MAPPINGS
   */
  // POST /mapping
  register (builder) {
    if (builder instanceof MappingBuilder) {
      return this.admin.createMapping(builder.build())
    }
    return this.admin.createMapping(builder)
  }

  // POST /mapping/reset
  resetMappings () {
    return this.admin.resetMappings()
  }
}
