const rewire = require('rewire')

describe('Buidlers', () => {

  let Builders

  let mappingSpy
  let responseSpy

  beforeEach(() => {
    mappingSpy = jasmine.createSpy('mappingSpy')
    mappingSpy.and.returnValue({mappingSpy: true})
    responseSpy = jasmine.createSpy('responseSpy')
    responseSpy.and.returnValue({responseBuilder: true})

    Builders = rewire('./builders')
    Builders.__set__({
      MappingBuilder: mappingSpy,
      ResponseBuilder: responseSpy
    })
  })

  it('should have a method for creating a GET mapping', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.get(urlPattern)).toEqual({mappingSpy: true})
    expect(mappingSpy).toHaveBeenCalledWith('GET', urlPattern)
  })

  it('should have a method for creating a POST mapping', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.post(urlPattern)).toEqual({mappingSpy: true})
    expect(mappingSpy).toHaveBeenCalledWith('POST', urlPattern)
  })

  it('should have a method for response', () => {
    expect(Builders.aResponse()).toEqual({responseBuilder: true})
  })

})
