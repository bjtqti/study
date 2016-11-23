'use strict'
var webpack = require("webpack");
var WebpackDevServer = require('webpack-dev-server');
var config = require("./webpack.hmr.config.js");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
	publicPath: config.output.publicPath,
	inline: true,
	hot: true
});
server.listen(8080, function(err) {
	if (err) {
		console.log(err);
	}
	console.log('http://localhost:8080')
});