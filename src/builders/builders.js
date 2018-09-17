const MappingBuilder = require('./mapping-builder')
const RequestPatternBuilder = require('./request-pattern-builder')
const ResponseBuilder = require('./response-builder')

const RequestMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD',
  TRACE: 'TRACE',
  ANY: 'ANY'
}

module.exports = {
  get: function (urlPattern) {
    return new MappingBuilder(RequestMethods.GET, urlPattern)
  },

  getRequestedFor (urlPattern) {
    return new RequestPatternBuilder(RequestMethods.GET, urlPattern)
  },

  post: function (urlPattern) {
    return new MappingBuilder(RequestMethods.POST, urlPattern)
  },

  postRequestedFor (urlPattern) {
    return new RequestPatternBuilder(RequestMethods.POST, urlPattern)
  },

  put: function (urlPattern) {
    return new MappingBuilder(RequestMethods.PUT, urlPattern)
  },

  putRequestedFor (urlPattern) {
    return new RequestPatternBuilder(RequestMethods.PUT, urlPattern)
  },

  delete: function (urlPattern) {
    return new MappingBuilder(RequestMethods.DELETE, urlPattern)
  },

  deleteRequestedFor (urlPattern) {
    return new RequestPatternBuilder(RequestMethods.DELETE, urlPattern)
  },

  patch: function (urlPattern) {
    return new MappingBuilder(RequestMethods.PATCH, urlPattern)
  },

  patchRequestedFor (urlPattern) {
    return new RequestPatternBuilder(RequestMethods.PATCH, urlPattern)
  },

  options: function (urlPattern) {
    return new MappingBuilder(RequestMethods.OPTIONS, urlPattern)
  },

  optionsRequestedFor (urlPattern) {
    return new RequestPatternBuilder(RequestMethods.OPTIONS, urlPattern)
  },

  head: function (urlPattern) {
    return new MappingBuilder(RequestMethods.HEAD, urlPattern)
  },

  headRequestedFor (urlPattern) {
    return new RequestPatternBuilder(RequestMethods.HEAD, urlPattern)
  },

  trace: function (urlPattern) {
    return new MappingBuilder(RequestMethods.TRACE, urlPattern)
  },

  traceRequestedFor (urlPattern) {
    return new RequestPatternBuilder(RequestMethods.TRACE, urlPattern)
  },

  any: function (urlPattern) {
    return new MappingBuilder(RequestMethods.ANY, urlPattern)
  },

  anyRequestedFor (urlPattern) {
    return new RequestPatternBuilder(RequestMethods.ANY, urlPattern)
  },

  aResponse: function () {
    return new ResponseBuilder()
  }
}
