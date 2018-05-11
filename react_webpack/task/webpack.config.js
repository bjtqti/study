const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const NODE_MODULES = path.resolve('node_modules');
const outputPath = path.resolve(__dirname, '../dist');
const config = {
	entry: {
	  	index:'./client/index/index.jsx'
	},
	output: {
	    path: outputPath,
	    filename: 'js/[name]-[hash:8].js'
	},
	mode:"production",
	module:{
		rules:[
			{
		        test: /\.(jsx?)$/,
		        loader: 'babel-loader',
		        exclude:[NODE_MODULES]
		    },
		    {
		    	test:/\.(styl|css)$/,
		    	use: [
				    'style-loader',
				    { loader: 'css-loader', 
				    	options: { 
					    	import:true,
	                        importLoaders: 2 
	                    } 
                    },
				    { loader: 'postcss-loader'},
				    'stylus-loader'
				]
		    },
		    {
		    	test:/\.(png|jpg|svg|gif)$/,
		    	loader:'file-loader',
		    	options:{
		    		outputPath:'images/'
		    	}
		    }
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'],{
			root:path.resolve(__dirname, '..')
		}),
		new webpack.DefinePlugin({
	       'process.env.NODE_ENV': JSON.stringify('production')
	    }),
		new UglifyJSPlugin(),
	   	new HtmlWebpackPlugin({
	  		template:'./public/index.html',
	  		minify:false
	    })
	]
};

module.exports = config;