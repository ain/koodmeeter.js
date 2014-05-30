/*! koodmeeter.js - v0.0.1 - 2014-05-30
* https://github.com/ain/koodmeeter.js
* Copyright © 2014 Ain Tohvri; Licensed GPL */
'use strict';
/* jshint undef: false */
(function () {
  describe('koodmeeter', function () {

    var koodmeeter;

    describe('init', function () {
      beforeEach(function() {
        koodmeeter = new KoodMeeter('adsfopasdf');
      });
      it('expected to construct object', function () {
        return expect(koodmeeter).to.be.an.object;
      });
      it('expected to throw error without password', function() {
        function test() {
          koodmeeter = new KoodMeeter();
        }
        return expect(test).to.throw(Error);
      });
      it('expected to set password from constructor', function() {
        koodmeeter = new KoodMeeter('lolo');
        return expect(koodmeeter.password).to.equal('lolo');
      });
      it('expected not to throw error on empty password', function() {
        function test() {
          koodmeeter = new KoodMeeter('');
        }
        return expect(test).to.not.throw(Error);
      });
      it('expected not to throw error on string "false" password', function() {
        function test() {
          koodmeeter = new KoodMeeter('false');
        }
        return expect(test).to.not.throw(Error);
      });
      it('expected not to throw error on string "undefined" password', function() {
        function test() {
          koodmeeter = new KoodMeeter('undefined');
        }
        return expect(test).to.not.throw(Error);
      });
      it('expected not to throw error on number 0 password', function() {
        function test() {
          koodmeeter = new KoodMeeter(0);
        }
        return expect(test).to.not.throw(Error);
      });
      it('expected to have default minimum chars', function() {
        koodmeeter = new KoodMeeter('adfasdfa');
        return expect(koodmeeter.options.minimumChars).to.equal(koodmeeter.defaults.minimumChars);
      });
      it('expected to have minimum chars of 10', function() {
        koodmeeter = new KoodMeeter('adfasdfa', {minimumChars: 10});
        return expect(koodmeeter.options.minimumChars).to.equal(10);
      });
    });

    describe('check', function () {
      beforeEach(function() {
        koodmeeter = new KoodMeeter('adfasdfa', {minimumChars: 6});
      });
      it('expected to return 0 on banned password, e.g. monkey', function () {
        koodmeeter = new KoodMeeter('monkey');
        return expect(koodmeeter.check()).to.equal(0);
      });
      it('expected to return 0 on empty string', function () {
        koodmeeter = new KoodMeeter('');
        return expect(koodmeeter.check()).to.equal(0);
      });
      it('expected to return level 0 on "asdf1"', function () {
        koodmeeter = new KoodMeeter('asdf1');
        return expect(koodmeeter.check()).to.equal(0);
      });
      it('expected to return level 1 on "asdf12"', function () {
        koodmeeter = new KoodMeeter('asdf12');
        return expect(koodmeeter.check()).to.equal(1);
      });
      it('expected to return level 2 on "asdf112"', function () {
        koodmeeter = new KoodMeeter('asdf112');
        return expect(koodmeeter.check()).to.equal(2);
      });
      it('expected to return level 3 on "asdf112-"', function () {
        koodmeeter = new KoodMeeter('asdf112-');
        return expect(koodmeeter.check()).to.equal(3);
      });
      it('expected to return level 4 on "asdf112-$"', function () {
        koodmeeter = new KoodMeeter('asdf112-$');
        return expect(koodmeeter.check()).to.equal(4);
      });
      it('expected to return level 5 on "asdf112-$55"', function () {
        koodmeeter = new KoodMeeter('asdf112-$55');
        return expect(koodmeeter.check()).to.equal(5);
      });
    });
  });
})();
