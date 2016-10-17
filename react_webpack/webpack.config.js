var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
	entry: path.resolve(__dirname, './app/main.jsx'),
	resolve: {
		extentions: ["", "js", "jsx"]
	},
	module: {
		loaders: [{
			test: /\.(es6|jsx)$/,
			exclude: nodeModulesPath,
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015','stage-2']
			}
		}]
	},
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'app.js',
	},
	plugins: [
		new webpack.NoErrorsPlugin()
	]
};