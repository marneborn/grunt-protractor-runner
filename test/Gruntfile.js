/*
 * grunt-protractor-runner
 * https://github.com/teerapap/grunt-protractor-runner
 *
 * Copyright (c) 2013 Teerapap Changwichukarn
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  grunt.initConfig({

    protractor: {
      options: {
        keepAlive: false,
        args: {
          specs:["test/blankTest.js"]
        }
      },
      pathOvrDefault: {
        configFile:"./testConf.js",
        options: {}
      },
      pathOvrValid: {
        configFile:"./testConf.js",
        options: {
          protractorMainPath: require.resolve('protractor')
        }
      },
      pathOvrInvalid: {
        configFile:"./testConf.js",
        options: {
          // last two things are resolved away.
          protractorMainPath: path.resolve('areallybad','bad','path')
        }
      }

    }
  });

  grunt.loadTasks('../tasks');
};
