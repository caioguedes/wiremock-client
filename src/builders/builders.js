const MappingBuilder = require('./mapping-builder')
const ResponseBuilder = require('./response-builder')

module.exports = {
  get: function (urlPattern) {
    return new MappingBuilder('GET', urlPattern)
  },

  post: function (urlPattern) {
    return new MappingBuilder('POST', urlPattern)
  },

  put: function (urlPattern) {
    return new MappingBuilder('PUT', urlPattern)
  },

  delete: function (urlPattern) {
    return new MappingBuilder('DELETE', urlPattern)
  },

  patch: function (urlPattern) {
    return new MappingBuilder('PATCH', urlPattern)
  },

  options: function (urlPattern) {
    return new MappingBuilder('OPTIONS', urlPattern)
  },

  head: function (urlPattern) {
    return new MappingBuilder('HEAD', urlPattern)
  },

  trace: function (urlPattern) {
    return new MappingBuilder('TRACE', urlPattern)
  },

  any: function (urlPattern) {
    return new MappingBuilder('ANY', urlPattern)
  },

  aResponse: function () {
    return new ResponseBuilder()
  }
}
