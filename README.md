# WireMock Client

[![Coverage Status](https://coveralls.io/repos/github/alexmbrown/wiremock-client/badge.svg)](https://coveralls.io/github/alexmbrown/wiremock-client)

A node client for interfacing with WireMock's admin API

**WARNING: THIS LIBRARY CURRENTLY EXPERIMENTAL AND IN A PRE-ALPHA STATE**

### Example
```javascript
const {
  aResponse,
  containsPattern,
  post,
  urlPathMatching,
  WireMock
} = require('wiremock-client')

const wireMock = new WireMock('localhost', 8080)
wireMock.resetMappings()

wireMock.register(
  post(urlPathMatching("/api/example"))
    .withRequestBody(containsPattern("token=auth"))
    .willReturn(
      aResponse()
        .withStatus(200)
        .withHeader('Content-Type', 'application/json')
        .withBody({test: true})
    )
).then(res => {
  console.log(res)
})

```
