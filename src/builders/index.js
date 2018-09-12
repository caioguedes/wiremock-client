const MappingBuilder = require('./mapping-builder')
const ResponseBuilder = require('./response-builder')

module.exports = require('./matchers')

Object.assign(module.exports, {

  get: function (urlPattern) {
    return new MappingBuilder('GET', urlPattern)
  },

  post: function (urlPattern) {
    return new MappingBuilder('POST', urlPattern)
  },

  aResponse: function () {
    return new ResponseBuilder()
  }

})
