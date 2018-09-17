module.exports = {

  absent (absent) {
    return { absent }
  },

  binaryEqualTo (binaryEqualTo) {
    return { binaryEqualTo }
  },

  containing (contains) {
    return { contains }
  },

  equalTo (equalTo) {
    return { equalTo }
  },

  equalToIgnoreCase (equalTo) {
    return {
      equalTo,
      caseInsensitive: true
    }
  },

  equalToJson (equalToJson, ignoreArrayOrder, ignoreExtraElements) {
    let matcher = { equalToJson }

    if (ignoreArrayOrder) {
      matcher.ignoreArrayOrder = true
    }

    if (ignoreExtraElements) {
      matcher.ignoreExtraElements = true
    }

    return matcher
  },

  equalToXml (equalToXml) {
    return { equalToXml }
  },

  matchesJsonPath (matchesJsonPath) {
    return { matchesJsonPath }
  },

  matchingXPath (matchingXPath) {
    return { matchingXPath }
  },

  matches (matches) {
    return { matches }
  },

  notMatching (doesNotMatch) {
    return { doesNotMatch }
  }

}
