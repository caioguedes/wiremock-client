const Matchers = require('./matchers')

describe('Matchers', () => {
  it('absent()', () => {
    const absent = 'absent'
    expect(Matchers.absent(absent)).toEqual({absent})
  })

  it('containsPattern()', () => {
    const binaryEqualTo = 'binaryEqualTo'
    expect(Matchers.binaryEqualTo(binaryEqualTo)).toEqual({binaryEqualTo})
  })

  it('containsPattern()', () => {
    const contains = 'contains'
    expect(Matchers.containing(contains)).toEqual({contains})
  })

  it('equalTo()', () => {
    const equalTo = 'equalTo'
    expect(Matchers.equalTo(equalTo)).toEqual({equalTo})
  })

  it('equalToIgnoreCase()', () => {
    const equalTo = 'equalToIgnoreCase'
    expect(Matchers.equalToIgnoreCase(equalTo)).toEqual({
      equalTo,
      caseInsensitive: true
    })
  })

  describe('equalToJson', () => {

    it('equalToJson() no options', () => {
      const equalToJson = 'equalToJson'
      expect(Matchers.equalToJson(equalToJson)).toEqual({
        equalToJson
      })
    })

    it('equalToJson() with ignoreArrayOrder option', () => {
      const equalToJson = 'equalToJson'
      expect(Matchers.equalToJson(equalToJson, true)).toEqual({
        equalToJson,
        ignoreArrayOrder: true
      })
    })

    it('equalToJson() with ignoreExtraElements option', () => {
      const equalToJson = 'equalToJson'
      expect(Matchers.equalToJson(equalToJson, false, true)).toEqual({
        equalToJson,
        ignoreExtraElements: true
      })
    })
  })

  it('equalToXml()', () => {
    const equalToXml = 'equalToXml'
    expect(Matchers.equalToXml(equalToXml)).toEqual({equalToXml})
  })

  it('matchesJsonPath()', () => {
    const matchesJsonPath = 'matchesJsonPath'
    expect(Matchers.matchesJsonPath(matchesJsonPath)).toEqual({matchesJsonPath})
  })

  it('matchingXPath()', () => {
    const matchingXPath = 'matchingXPath'
    expect(Matchers.matchingXPath(matchingXPath)).toEqual({matchingXPath})
  })

  it('matches()', () => {
    const matches = 'matches'
    expect(Matchers.matches(matches)).toEqual({matches})
  })

  it('notMatching()', () => {
    const doesNotMatch = 'equalToXml'
    expect(Matchers.notMatching(doesNotMatch)).toEqual({doesNotMatch})
  })
})
