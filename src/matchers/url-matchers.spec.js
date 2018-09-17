const Matchers = require('./url-matchers')

describe('Url Matchers', () => {
  it('urlMatching()', () => {
    const url = 'url'
    expect(Matchers.urlEqualTo(url)).toEqual({ url })
  })

  it('urlPattern()', () => {
    const urlPattern = 'urlPattern'
    expect(Matchers.urlMatching(urlPattern)).toEqual({ urlPattern })
  })

  it('urlPathMatching()', () => {
    const urlPath = 'urlPathMatching'
    expect(Matchers.urlPathEqualTo(urlPath)).toEqual({ urlPath })
  })

  it('urlPathMatching()', () => {
    const urlPathPattern = 'urlPathPattern'
    expect(Matchers.urlPathMatching(urlPathPattern)).toEqual({ urlPathPattern })
  })
})
