/*! koodmeeter.js - v0.0.1 - 2014-05-30
* https://github.com/ain/koodmeeter.js
* Copyright © 2014 Ain Tohvri; Licensed GPL */
/* exported KoodMeeter */
var KoodMeeter = (function() {
  'use strict';

  var bannedPasswords = [
    '123456',
    '12345',
    '123456789',
    'password',
    'iloveyou',
    'princess',
    'rockyou',
    '1234567',
    '12345678',
    'abc123',
    'nicole',
    'daniel',
    'babygirl',
    'monkey',
    'jessica',
    'lovely',
    'michael',
    'ashley',
    '654321',
    'qwerty',
    'password1',
    'welcome',
    'welcome1',
    'password2',
    'password01',
    'password3',
    'p@ssw0rd',
    'passw0rd',
    'password4',
    'password123',
    'summer09',
    'password6',
    'password7',
    'password9',
    'password8',
    'welcome2',
    'welcome01',
    'winter12',
    'spring2012',
    'summer12',
    'summer2012'
  ];

  var axioms = [
    {
      re: /[a-z]/,
      score: 1
    },
    {
      re: /[A-Z]/,
      score: 5
    },
    {
      re: /([a-z].*[A-Z])|([A-Z].*[a-z])/,
      score: 2
    },
    {
      re: /(.*[0-9].*[0-9].*[0-9])/,
      score: 7
    },
    {
      re: /.[!@#$%^&*?_~]/,
      score: 5
    },
    {
      re: /(.*[!@#$%^&*?_~].*[!@#$%^&*?_~])/,
      score: 7
    },
    {
      re: /([a-zA-Z0-9].*[!@#$%^&*?_~])|([!@#$%^&*?_~].*[a-zA-Z0-9])/,
      score: 3
    },
    {
      re: /(.)\1+$/,
      score: 2
    }
  ];

  var levels = [0, 1, 2, 3, 4, 5];

  var scores = [10, 15, 25, 45];

  var defaults = {
    minimumChars: 6
  };

  function merge(source, target) {
    for (var option in target) {
      if (source[option] !== undefined) {
        target[option] = source[option];
      }
    }
    return target;
  }

  function calculateDiffIncrement(diff) {
    var score = 0;
    if (diff < 0) {
      score -= 100;
    }
    else if (diff >= 5) {
      score += 18;
    }
    else if (diff >= 3) {
      score += 12;
    }
    else if (diff === 2) {
      score += 6;
    }
    return score;
  }

  function KoodMeeter(password, options) {
    if (typeof password === 'undefined') {
      throw new Error('No password!');
    }
    this.password = password;
    this.score = 0;
    this.defaults = defaults;
    this.options = options ? merge(options, defaults) : defaults;
  }

  KoodMeeter.prototype.check = function() {
    if (this.banned()) {
      return 0;
    }
    var index = 0;
    var length = this.password.length;
    var scoresDupe = scores.slice(0);
    var diff = length - this.options.minimumChars;
    var score = calculateDiffIncrement(diff);

    for (var i = 0, l = axioms.length, axiom; i < l; i++) {
      axiom = axioms[i];
      if (this.password.match(axiom.re)) {
        score += axiom.score;
      }
    }
    score += length;
    if (score < 0 && score > -199) {
      index = 0;
    }
    else {
      scoresDupe.push(score);
      scoresDupe.sort(function (a, b) {
        return a - b;
      });
      index = scoresDupe.indexOf(score) + 1;
    }
    return typeof levels[index] !== 'undefined' ? levels[index] : levels[levels.length - 1];
  };

  KoodMeeter.prototype.banned = function() {
    return bannedPasswords.indexOf(this.password) !== -1;
  };

  return KoodMeeter;

})();
