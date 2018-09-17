const rewire = require('rewire')

describe('Buidlers', () => {
  let Builders

  let mappingSpy
  let requestSpy
  let responseSpy

  beforeEach(() => {
    mappingSpy = jasmine.createSpy('mappingSpy')
    mappingSpy.and.returnValue({ mappingSpy: true })
    responseSpy = jasmine.createSpy('responseSpy')
    responseSpy.and.returnValue({ responseBuilder: true })
    requestSpy = jasmine.createSpy('requestSpy')
    requestSpy.and.returnValue({ requestBuilder: true })

    Builders = rewire('./builders')
    Builders.__set__({
      MappingBuilder: mappingSpy,
      ResponseBuilder: responseSpy,
      RequestPatternBuilder: requestSpy
    })
  })

  // GET
  it('should have a method for creating a GET mapping builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.get(urlPattern)).toEqual({ mappingSpy: true })
    expect(mappingSpy).toHaveBeenCalledWith('GET', urlPattern)
  })

  it('should have a method for creating a GET request pattern builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.getRequestedFor(urlPattern)).toEqual({ requestBuilder: true })
    expect(requestSpy).toHaveBeenCalledWith('GET', urlPattern)
  })

  // POST
  it('should have a method for creating a POST mapping builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.post(urlPattern)).toEqual({ mappingSpy: true })
    expect(mappingSpy).toHaveBeenCalledWith('POST', urlPattern)
  })

  it('should have a method for creating a POST request pattern builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.postRequestedFor(urlPattern)).toEqual({ requestBuilder: true })
    expect(requestSpy).toHaveBeenCalledWith('POST', urlPattern)
  })

  // PUT
  it('should have a method for creating a PUT mapping builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.put(urlPattern)).toEqual({ mappingSpy: true })
    expect(mappingSpy).toHaveBeenCalledWith('PUT', urlPattern)
  })

  it('should have a method for creating a PUT request pattern builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.putRequestedFor(urlPattern)).toEqual({ requestBuilder: true })
    expect(requestSpy).toHaveBeenCalledWith('PUT', urlPattern)
  })

  // DELETE
  it('should have a method for creating a DELETE mapping builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.delete(urlPattern)).toEqual({ mappingSpy: true })
    expect(mappingSpy).toHaveBeenCalledWith('DELETE', urlPattern)
  })

  it('should have a method for creating a DELETE request pattern builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.deleteRequestedFor(urlPattern)).toEqual({ requestBuilder: true })
    expect(requestSpy).toHaveBeenCalledWith('DELETE', urlPattern)
  })

  // PATCH
  it('should have a method for creating a PATCH mapping builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.patch(urlPattern)).toEqual({ mappingSpy: true })
    expect(mappingSpy).toHaveBeenCalledWith('PATCH', urlPattern)
  })

  it('should have a method for creating a PATCH request pattern builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.patchRequestedFor(urlPattern)).toEqual({ requestBuilder: true })
    expect(requestSpy).toHaveBeenCalledWith('PATCH', urlPattern)
  })

  // OPTIONS
  it('should have a method for creating a OPTIONS mapping builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.options(urlPattern)).toEqual({ mappingSpy: true })
    expect(mappingSpy).toHaveBeenCalledWith('OPTIONS', urlPattern)
  })

  it('should have a method for creating a OPTIONS request pattern builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.optionsRequestedFor(urlPattern)).toEqual({ requestBuilder: true })
    expect(requestSpy).toHaveBeenCalledWith('OPTIONS', urlPattern)
  })

  // HEAD
  it('should have a method for creating a HEAD mapping builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.head(urlPattern)).toEqual({ mappingSpy: true })
    expect(mappingSpy).toHaveBeenCalledWith('HEAD', urlPattern)
  })

  it('should have a method for creating a HEAD request pattern builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.headRequestedFor(urlPattern)).toEqual({ requestBuilder: true })
    expect(requestSpy).toHaveBeenCalledWith('HEAD', urlPattern)
  })

  // TRACE
  it('should have a method for creating a TRACE mapping builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.trace(urlPattern)).toEqual({ mappingSpy: true })
    expect(mappingSpy).toHaveBeenCalledWith('TRACE', urlPattern)
  })

  it('should have a method for creating a TRACE request pattern builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.traceRequestedFor(urlPattern)).toEqual({ requestBuilder: true })
    expect(requestSpy).toHaveBeenCalledWith('TRACE', urlPattern)
  })

  // ANY
  it('should have a method for creating a ANY mapping builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.any(urlPattern)).toEqual({ mappingSpy: true })
    expect(mappingSpy).toHaveBeenCalledWith('ANY', urlPattern)
  })

  it('should have a method for creating a ANY request pattern builder', () => {
    const urlPattern = 'urlPattern'
    expect(Builders.anyRequestedFor(urlPattern)).toEqual({ requestBuilder: true })
    expect(requestSpy).toHaveBeenCalledWith('ANY', urlPattern)
  })

  it('should have a method for response', () => {
    expect(Builders.aResponse()).toEqual({ responseBuilder: true })
  })
})
