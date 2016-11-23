var path = require('path');

var config = {
	entry: './app/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '..', 'dist')
	},
	module: {
		loaders: [
			{test: /\.js$/,loader: 'babel-loader',exclude: /node_modules/}
		]
	}
}

module.exports = config;