module.exports = {

  containsPattern (pattern) {
    return {
      contains: pattern
    }
  },

  equalTo (value) {
    return {
      equalTo: value
    }
  },

  /*
   * URL
   */
  urlMatching (url) {
    return {
      key: 'url',
      value: url
    }
  },

  urlPattern (pattern) {
    return {
      key: 'urlPattern',
      value: pattern
    }
  },

  urlPathMatching (path) {
    return {
      key: 'urlPath',
      value: path
    }
  },

  urlPathPattern (pattern) {
    return {
      key: 'urlPathPattern',
      value: pattern
    }
  }

}
