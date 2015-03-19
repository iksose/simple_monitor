// Karma configuration
// Generated on Wed Mar 18 2015 15:18:18 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    // this is overwritten by the gulp plugin
    files: [
      'client/compiled/vendor.js',
      'client/compiled/all.js',
      'client/compiled/tests.js',
      //location of templates
      'client/app/**/**/*.html',
      'client/app/**/**/**/*.html'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      //location of templates
      'client/app/**/**/**/*.html': ['ng-html2js']
    },
    ngHtml2JsPreprocessor: {
      // stripPrefix: 'client/',
      moduleName: 'templates'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};