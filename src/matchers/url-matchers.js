module.exports = {

  urlEqualTo (url) {
    return { url }
  },

  urlMatching (urlPattern) {
    return { urlPattern }
  },

  urlPathEqualTo (urlPath) {
    return { urlPath }
  },

  urlPathMatching (urlPathPattern) {
    return { urlPathPattern }
  }

}
