// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['qunit'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/angular/angular.js',
	  'app/bower_components/angular-route/angular-route.js',
	  'app/bower_components/qunit/build/release.js',
	  'app/bower_components/h.scoreKeeper/h.scoreKeeper.js',

	  'app/scripts/tableTennis/module.js',
	  'app/scripts/tableTennis/clash.js',
      'app/scripts/tableTennis/scoreProjector.js',

      'test/tableTennis/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
