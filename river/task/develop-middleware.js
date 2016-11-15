'use strict';
var config = require('./webpack.hot-update.js');
module.exports = function(app){
    var webpack = require("webpack"),
        webpackDevMiddleware = require("webpack-dev-middleware"),
        webpackHotMiddleware = require("webpack-hot-middleware");
    var bundler = webpack(config);
    app.use(webpackDevMiddleware(bundler, { 
        noInfo: true, 
        stats: {
            colors: true
        },
        hot: true,
        publicPath: config.output.publicPath 
    }))
    app.use(webpackHotMiddleware(bundler))
    return app
}


