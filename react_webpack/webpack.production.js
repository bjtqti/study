var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
	entry: path.resolve(__dirname, './app/main.jsx'),
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
		}]
	},
	output: {
		path: path.resolve(__dirname, './dest'),
		filename: 'app.min.js',
	},
	plugins: [
		new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        }),
        new webpack.optimize.DedupePlugin(),
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