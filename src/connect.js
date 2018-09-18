const HttpAdminInterface = require('./http-admin-interface')
const MappingBuilder = require('./builders/mapping-builder')
const RequestPatternBuilder = require('./builders/request-pattern-builder')
const { moreThanOrExactly } = require('./matchers')

const DEFAULT_PORT = 8080
const DEFAULT_HOST = 'localhost'

module.exports = function connect (host, port) {
  const admin = new HttpAdminInterface(host || DEFAULT_HOST, port || DEFAULT_PORT)

  return {
    // POST /reset
    resetAll () {
      return admin.resetAll()
    },

    /*
     * MAPPINGS
     */
    // GET /mappings
    allStubMappings () {
      return admin.listAllStubMappings()
    },

    getStubMapping (uuid) {
      return admin.getStubMapping(uuid)
    },

    // POST /mappings
    register (mappingBuilder) {
      if (mappingBuilder instanceof MappingBuilder) {
        return admin.createMapping(mappingBuilder.build())
      }
      return admin.createMapping(mappingBuilder)
    },

    // POST /mappings/reset
    resetMappings () {
      return admin.resetMappings()
    },

    /*
     * REQUESTS
     */
    allRequests () {
      return admin.listAllRequests()
    },

    find (requestBuilder) {
      if (requestBuilder instanceof RequestPatternBuilder) {
        return admin.findRequestsMatching(requestBuilder.build())
      }
      return admin.findRequestsMatching(requestBuilder)
    },

    verifyThat (requestBuilder, countMatcher = moreThanOrExactly(1)) {
      if (requestBuilder instanceof RequestPatternBuilder) {
        return admin.findRequestsMatching(requestBuilder.build()).then(res => {
          return Array.isArray(res.requests) && countMatcher(res.requests.length)
        })
      }
      return admin.findRequestsMatching(requestBuilder).then(res => {
        return Array.isArray(res.requests) && countMatcher(res.requests.length)
      })
    },

    // POST /requests/reset
    resetRequests () {
      return admin.resetRequests()
    }
  }
}
