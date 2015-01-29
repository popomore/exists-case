'use strict';

var fs = require('fs');
var path = require('path');
var debug = require('debug')('exists-case');

var cache = {};

module.exports = function(filepath, callback) {
  filepath = path.resolve(filepath);
  var dirname = path.dirname(filepath);
  var basename = path.basename(filepath);
  callback || (callback = function() {});

  debug('cache %j', cache);

  if (cache[dirname]) {
    debug('use cache `%s`', dirname);
    return callback(check(cache[dirname], dirname, basename));
  }

  fs.readdir(dirname, function(err, files) {
    if (err) {
      return callback(false);
    }
    cache[dirname] = files;
    callback(check(files, dirname, basename));
  });
};

module.exports.sync = function(filepath) {
  filepath = path.resolve(filepath);
  var dirname = path.dirname(filepath);
  var basename = path.basename(filepath);

  debug('cache %j', cache);

  var files;
  if (cache[dirname]) {
    debug('use cache `%s`', dirname);
    files = cache[dirname];
  } else {
    try {
      files = cache[dirname] = fs.readdirSync(dirname);
    } catch(e) {
      return false;
    }
  }

  return check(files, dirname, basename);
};

function check(files, dirname, basename) {
  return files.some(function(file) {
    var result = file === basename;
    if (result) {
      debug('Got the right file `%s` from %j in %s', file, files, dirname);
    }
    return result;
  });
}
