# koodmeeter.js <img src="http://benschwarz.github.io/bower-badges/badge@2x.png" width="130" height="30">

[![Build Status](http://img.shields.io/travis/ain/koodmeeter.js.svg)](https://travis-ci.org/ain/koodmeeter.js)

koodmeeter (codemeter) is a password strength score tool.

### Usage example

```javascript
var minimumCharacters = 8;
var koodmeeter = new KoodMeeter('mypassword', minimumCharacters);
# Logs password strength level from 0-5
console.log(koodmeeter.check());
```