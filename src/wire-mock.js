const HttpAdminInterface = require('./http-admin-interface')
const MappingBuilder = require('./builders/mapping-builder')
const RequestPatternBuilder = require('./builders/request-pattern-builder')
const { moreThanOrExactly } = require('./matchers')
const DEFAULT_PORT = 8080
const DEFAULT_HOST = 'localhost'

module.exports = class WireMock {
  constructor (host, port) {
    this.admin = new HttpAdminInterface(host || DEFAULT_HOST, port || DEFAULT_PORT)
  }

  // POST /reset
  resetAll () {
    return this.admin.resetAll()
  }

  /*
   * MAPPINGS
   */
  // POST /mapping
  register (mappingBuilder) {
    if (mappingBuilder instanceof MappingBuilder) {
      return this.admin.createMapping(mappingBuilder.build())
    }
    return this.admin.createMapping(mappingBuilder)
  }

  // POST /mapping/reset
  resetMappings () {
    return this.admin.resetMappings()
  }

  /*
   * REQUESTS
   */
  find (requestBuilder) {
    if (requestBuilder instanceof RequestPatternBuilder) {
      return this.admin.findRequestsMatching(requestBuilder.build())
    }
    return this.admin.findRequestsMatching(requestBuilder)
  }

  verifyThat (requestBuilder, countMatcher = moreThanOrExactly(1)) {
    if (requestBuilder instanceof RequestPatternBuilder) {
      return this.admin.findRequestsMatching(requestBuilder.build()).then(res => {
        return Array.isArray(res.requests) && countMatcher(res.requests.length)
      })
    }
    return this.admin.findRequestsMatching(requestBuilder).then(res => {
      return Array.isArray(res.requests) && countMatcher(res.requests.length)
    })
  }

  // POST /requests/reset
  resetRequests () {
    return this.admin.resetRequests()
  }
}
