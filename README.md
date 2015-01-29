# exists-case

Wrap fs.exists for case sensitivity

---

[![NPM version](https://img.shields.io/npm/v/exists-case.svg?style=flat)](https://npmjs.org/package/exists-case)
[![Build Status](https://img.shields.io/travis/popomore/exists-case.svg?style=flat)](https://travis-ci.org/popomore/exists-case)
[![Build Status](https://img.shields.io/coveralls/popomore/exists-case?style=flat)](https://coveralls.io/r/popomore/exists-case)
[![NPM downloads](http://img.shields.io/npm/dm/exists-case.svg?style=flat)](https://npmjs.org/package/exists-case)

## Install

```
$ npm install exists-case -g
```

## Usage

```
var exists = require('exists-case');
// try to test Package.json in cwd
exists('Package.json', function(result) {
  result.should.be.false;
});
```

Same as sync way

```
var exists = require('exists-case');
// try to test Package.json in cwd
exists.sync('Package.json').should.be.false;
```

## LISENCE

Copyright (c) 2015 popomore. Licensed under the MIT license.
