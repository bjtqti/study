var config = require("./webpack.config.js");
var webpack = require("webpack");
var webpackDevServer = require('webpack-dev-server');
config.entry.app.unshift("webpack-dev-server/client?http://localhost:3000/", "webpack/hot/dev-server");
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
	hot: true,
	inline: true,
	// noInfo: true,
	publicPath: '/build/',
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000
	},
	// historyApiFallback: true
});
server.listen(3000, "localhost", function(err, res) {
	if (err) {
		console.log(err);
	}
	console.log('hmr-server Listening at http://%s:%d','localhost', 3000);
});