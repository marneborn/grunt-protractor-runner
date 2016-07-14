'use strict';

var child = require('child_process'),
    path = require('path');

function exec (cmd, done) {
  child.exec(cmd, function (err, stdout, stderr) {
    done(err, stderr || stdout);
  });
}

function success (str) {
  return str.indexOf('Done, without errors.') >= 0;
}

exports.pathOvr = {
  valid: function (test) {
    var cmd = 'grunt --gruntfile test/Gruntfile.js protractor:pathOvrValid';
    var result = exec(cmd, function (err, result) {
      test.ok(err === null, 'Shouldn\'t have thrown an error');
      test.ok(success(result), 'Protractor should run fine with a valid pointer to protractor');
      test.done();
    });
  },
  invalid: function (test) {
    var cmd = 'grunt --gruntfile test/Gruntfile.js protractor:pathOvrInvalid';
    var badpath = ['', 'areallybad', 'bin', 'protractor'].join('\\'+path.sep);
    var re = new RegExp('Cannot find module .*'+badpath+'\'');
    exec(cmd, function (err, result) {
      test.ok(err !== null, 'Should have thrown an error');
      test.ok(result.match(re), 'Protractor should fail because the pointer to protractor is invalid');
      test.done();
    });
  }
};
