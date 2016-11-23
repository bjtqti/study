var path = require('path');
var webpack = require('webpack');
var config = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./app/page1/index.js'
	],
	output: {
		filename: 'bundle.js',
		publicPath:"/assets/",
		path: path.resolve(__dirname, '..', 'dist')
	},
	module: {
		loaders: [
			{test: /\.js$/,loader: 'babel-loader',exclude: /node_modules/},
			{test:/\.css$/,loader:'style!css',exclude:/node_modules/}
		]
	},
	watch:true,
	plugins:[
		new webpack.DefinePlugin({
		    'process.env.NODE_ENV': '"development"'
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}

module.exports = config;