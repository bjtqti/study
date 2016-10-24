var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanPlugin = require('clean-webpack-plugin');
var entry = require('./config.js');
module.exports = {
	entry: entry,
	resolve:{
        extentions:["","js"]
    },
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: nodeModulesPath,
			loader: 'babel-loader',
			query: {
				presets: ['react','es2015']
			}
		},{
            test: /\.styl/,
            exclude: [nodeModulesPath],
            loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!stylus')
        }]
	},
	output: {
		path: path.resolve(__dirname, './dest'),
		filename: '[name]-[hash:8].min.js',
	},
	plugins: [
		new CleanPlugin('builds'),
		new ExtractTextPlugin("./[name]-[hash:8].css"),
		new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
              comments: false
            },
            sourceMap: false
        })
	]
};