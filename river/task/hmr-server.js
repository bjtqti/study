'use strict'
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.hot-update.js');
var env = require("./environment");

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo:true,
  inline:true,
  //contentBase:"http://localhost:3000/",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  historyApiFallback: true
}).listen(env.hmrPort, env.lanIP, function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('🌎 hmr-server Listening at %s:%d',env.lanIP,env.hmrPort);
});