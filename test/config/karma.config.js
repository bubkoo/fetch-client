// Karma configuration
// Generated on Sat Aug 27 2016 00:57:17 GMT+0800 (CST)

var customLaunchers = require('./launchers.js');

module.exports = function (config) {


  var environment = process.env.NODE_ENV || 'development';
  var reporters   = ['spec', 'coverage'];
  var browsers    = Object.keys(customLaunchers);

  customLaunchers = null;
  browsers        = ['PhantomJS'];
  reporters.push('coveralls');

  // if (environment === 'travis-ci') {
  //
  //   reporters.push('coveralls', 'saucelabs');
  //
  // } else {
  //
  //   customLaunchers = null;
  //   browsers        = ['PhantomJS'];
  // }

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai', 'es6-shim'],

    // list of files / patterns to load in the browser
    files: [
      // each file acts as entry point for the webpack configuration
      './node_modules/babel-polyfill/dist/polyfill.js',
      './test/spec/index.spec.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './test/spec/*.spec.js': ['webpack']
    },

    coverageReporter: {
      reporters: [
        {
          type: 'lcov',
          dir: './test/coverage',
          subdir: '.'
        },
        { type: 'text-summary' }
      ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: reporters,

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    captureTimeout: 120000,
    customLaunchers: customLaunchers,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: browsers,


    webpack: {
      module: {
        loaders: [{
          test: /\.spec\.js?$/,
          exclude: /node_modules/,
          loader: 'babel'
        }, {
          test: /\.js$/,
          exclude: /test\/|node_modules/,
          loaders: ['isparta']
        }]
      }
    },


    webpackMiddleware: {
      noInfo: true // please don't spam the console when running in karma
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,


    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
