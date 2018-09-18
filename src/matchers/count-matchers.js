function notNumeric (val) {
  return typeof val !== 'number' || Number.isNaN(val)
}

module.exports = {

  lessThan (expected) {
    return (actual) => {
      if (notNumeric(actual)) {
        return false
      }
      return expected > actual
    }
  },

  lessThanOrExactly (expected) {
    return (actual) => {
      if (notNumeric(actual)) {
        return false
      }
      return expected >= actual
    }
  },

  exactly (expected) {
    return (actual) => {
      if (notNumeric(actual)) {
        return false
      }
      return expected === actual
    }
  },

  moreThanOrExactly (expected) {
    return (actual) => {
      if (notNumeric(actual)) {
        return false
      }
      return expected <= actual
    }
  },

  moreThan (expected) {
    return (actual) => {
      if (notNumeric(actual)) {
        return false
      }
      return expected < actual
    }
  }

}
