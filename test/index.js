'use strict';

require('should');
var fs = require('fs');
var join = require('path').join;
var spy = require('spy');
var pedding = require('pedding');
var exists = require('..');

var fixtures = join(__dirname, 'fixtures');

describe('exists-case', function() {

  describe('async', function() {

    it('should check fullpath', function(done) {
      done = pedding(4, done);

      var filepath = join(fixtures, 'CamelCase.js');
      fs.exists(filepath, function(exists) {
        exists.should.be.true;
        done();
      });
      exists(filepath, function(exists) {
        exists.should.be.true;
        done();
      });

      filepath = join(fixtures, 'camelCase.js');
      fs.exists(filepath, function() {
        // different results on cross platform
        // exists.should.be.true;
        done();
      });
      exists(filepath, function(exists) {
        exists.should.be.false;
        done();
      });
    });

    it('should check relative path', function(done) {
      done = pedding(4, done);

      fs.exists('package.json', function(exists) {
        exists.should.be.true;
        done();
      });
      exists('package.json', function(exists) {
        exists.should.be.true;
        done();
      });

      fs.exists('Package.json', function() {
        // different results on cross platform
        // exists.should.be.true;
        done();
      });
      exists('Package.json', function(exists) {
        exists.should.be.false;
        done();
      });
    });

    it('should check no existing directory', function(done) {
      done = pedding(2, done);
      var filepath = join(fixtures, 'no', 'exist', 'directory');

      fs.exists(filepath, function(exists) {
        exists.should.be.false;
        done();
      });
      exists(filepath, function(exists) {
        exists.should.be.false;
        done();
      });
    });

    it('should read cache on second time', function(done) {
      var readdir = spy(fs, 'readdir');
      exists('package.json', function(exists) {
        readdir.called.should.be.false;
        exists.should.be.true;
        readdir.restore();
        done();
      });
    });

    // for coverage
    it('should run without callback', function(done) {
      exists('package.json');
      setTimeout(done, 1000);
    });
  });

  describe('sync', function() {

    it('should check fullpath', function() {
      var filepath = join(fixtures, 'CamelCase.js');
      fs.existsSync(filepath).should.be.true;
      exists.sync(filepath).should.be.true;

      filepath = join(fixtures, 'camelCase.js');
      // different results on cross platform
      // fs.existsSync(filepath).should.be.true;
      exists.sync(filepath).should.be.false;
    });

    it('should check relative path', function() {
      fs.existsSync('package.json').should.be.true;
      exists.sync('package.json').should.be.true;

      // different results on cross platform
      // fs.existsSync('Package.json').should.be.true;
      exists.sync('Package.json').should.be.false;
    });

    it('should check no existing directory', function() {
      var filepath = join(fixtures, 'no', 'exist', 'directory');
      fs.existsSync(filepath).should.be.false;
      exists.sync(filepath).should.be.false;
    });

    it('should read cache on second time', function() {
      var readdir = spy(fs, 'readdirSync');
      exists.sync('package.json').should.be.true;
      readdir.called.should.be.false;
      readdir.restore();
    });
  });
});
