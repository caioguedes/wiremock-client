const Matchers = require('./matchers')

describe('Matchers', () => {
  it('containsPattern()', () => {
    const pattern = 'pattern'
    expect(Matchers.containsPattern(pattern)).toEqual({
      contains: pattern
    })
  })

  it('equalTo()', () => {
    const value = 'value'
    expect(Matchers.equalTo(value)).toEqual({
      equalTo: value
    })
  })

  describe('url matchers', () => {
    it('urlMatching()', () => {
      const url = 'url'
      expect(Matchers.urlMatching(url)).toEqual({
        key: 'url',
        value: url
      })
    })

    it('urlPattern()', () => {
      const url = 'urlPattern'
      expect(Matchers.urlPattern(url)).toEqual({
        key: 'urlPattern',
        value: url
      })
    })

    it('urlPathMatching()', () => {
      const url = 'urlPathMatching'
      expect(Matchers.urlPathMatching(url)).toEqual({
        key: 'urlPath',
        value: url
      })
    })

    it('urlPathMatching()', () => {
      const url = 'urlPathPattern'
      expect(Matchers.urlPathPattern(url)).toEqual({
        key: 'urlPathPattern',
        value: url
      })
    })
  })
})
