var webpackConfig = require("./webpack.develop.js");
var testPort = process.env.FRONTEND_TEST_PORT || 6000;

module.exports = function(config) {
    config.set({
        basePath: "../",
        frameworks: ['mocha', "sinon", "phantomjs-shim"],
        files: [
            'client/__tests__/**/*.es6',
            'client/__tests__/**/*.json'
        ],
        preprocessors: {
            'client/__tests__/**/*.es6': ['webpack', 'sourcemap'],
            'client/__tests__/**/*.json': ['json_fixtures'],
            'shared/**/*.jsx': ['webpack', 'sourcemap'],
            'shared/**/*.es6': ['webpack', "coverage", 'sourcemap']
        },
        jsonFixturesPreprocessor: {
            stripPrefix: "client/__tests__/",
            variableName: '__initialstate__'
        },
        webpack: {
            resolve: webpackConfig.resolve,
            module: webpackConfig.module
        },
        webpackMiddleware: {
            noInfo: true
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'lcovonly',
            dir: 'client/__coverage__/'
        },
        phantomjsLauncher: {
            exitOnResourceError: true
        },
        port: testPort,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};