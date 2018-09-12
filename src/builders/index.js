const MappingBuilder = require('./mapping-builder')
const ResponseBuilder = require('./response-builder')

module.exports = require('./matchers')

Object.assign(module.exports, {

  post: function (urlPattern) {
    return new MappingBuilder('POST', urlPattern)
  },

  aResponse: function () {
    return new ResponseBuilder()
  }

})
