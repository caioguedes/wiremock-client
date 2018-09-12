# WireMock Client

A node client for interfacing with WireMock's admin API

### Example
```$js
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
