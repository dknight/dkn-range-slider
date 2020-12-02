process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
  config.set({
    port: 9876,
    files: [
      'src/**/*.js',
      'test/**/*.js'
    ],
    preprocessors: {
      'src/**/*.js': ['coverage']
    },
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
    colors: true,
    frameworks: ['mocha', 'chai', 'sinon'],
    reporters: ['progress', 'coverage'],
    browsers: ['ChromeHeadless'],
    coverageReporter: {
      reporters: [
        {type: 'text'},
        {type: 'html', dir: './coverage'}
      ]
    }
  });
}