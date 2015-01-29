'use strict';

var Benchmark = require('benchmark');
var fs = require('fs');
var path = require('path');
global.exists = require('..');
global.dirname = path.join(__dirname, 'fixtures');

/* global exists, dirname */
new Benchmark.Suite()
.add('fs.existsSync lookup file in different directory', function() {
  var filepath = path.join(new Date().getTime() + '', 'a.js');
  fs.existsSync(filepath);
})
.add('exists-case not exists', function() {
  var filepath = path.join(new Date().getTime() + '', 'a.js');
  exists.sync(filepath);
})
.add('fs.existsSync lookup file in same directory', function() {
  var filepath = path.join(dirname, '' + Math.floor(Math.random() * 100));
  fs.existsSync(filepath);
})
.add('exists-case lookup file in same directory', function() {
  var filepath = path.join(dirname, '' + Math.floor(Math.random() * 100));
  exists.sync(filepath);
})
.on('error', function(err) {
  console.log(err.currentTarget[0].error.stack);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ 'async': true });
