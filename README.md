# WireMock Client

[![npm version](https://badge.fury.io/js/wiremock-client.svg)](https://badge.fury.io/js/wiremock-client)
[![Build Status](https://travis-ci.org/alexmbrown/wiremock-client.svg?branch=master)](https://travis-ci.org/alexmbrown/wiremock-client)
[![Coverage Status](https://coveralls.io/repos/github/alexmbrown/wiremock-client/badge.svg?branch=master)](https://coveralls.io/github/alexmbrown/wiremock-client?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/ed209ea9824605912120/maintainability)](https://codeclimate.com/github/alexmbrown/wiremock-client/maintainability)

A node client for interfacing with WireMock's admin API

**WARNING: THIS LIBRARY CURRENTLY EXPERIMENTAL AND IN A PRE-ALPHA STATE**

### Example
```javascript
const {
  aResponse,
  containsPattern,
  post,
  urlPathMatching,
  WireMock,
  equalTo
} = require('wiremock-client')

const wireMock = new WireMock('localhost', 8080)
wireMock.resetMappings().then(() => wireMock.register(
     post(urlPathMatching("/api/example"))
       .withRequestBody(containsPattern("token=auth"))
       .willReturn(
         aResponse()
           .withStatus(200)
           .withHeader('Content-Type', equalTo('application/json'))
           .withBody({test: true})
       )
   )
)


```

## Features

### Matchers

#### Url Matchers

These matchers are used for matching request urls

##### Url Matching
```
urlMatching (url)
```
---

urlPattern (pattern)

---

urlPathMatching (path)

---
```
urlPathPattern (pattern)
```
---

#### Global Matchers

containsPattern(pattern)
equalTo(value)

### Mappings
Stub mappings


Get all stub mapping
 
```
wireMock.getStubMapping(uuid) 
```
---
Create new stub mapping
 
```
wireMock.register(mappingBuilder|mapping)
```
---
Delete all mapping
 
```
wireMock.removeMappings()
```
---
Delete all mapping
 
```
wireMock.removeMappings()
```
---
Reset stub mappings 

---
Get a single stub mapping

---
Delete a stub mapping

---
Save all persistent stub mappings to the backing store

---
Find stubs by matching on their metadata

---
Remove stubs by matching on their metadata

---


### Requests
### Recordings
### scenarios
### Near Misses
### Settings
### Shutdown


