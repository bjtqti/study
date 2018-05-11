const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NODE_MODULES = path.resolve('node_modules');

const config = {
	entry: {
	  	index:'./client/index/index.jsx'
	},
	output: {
	    path: path.resolve(__dirname, '../dist'),
	    filename: 'js/[name]-[hash:8].js'
	},
	mode:"development",
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
	devtool: 'inline-source-map',
	devServer: {
	  contentBase: path.join(__dirname, "../dist"),
	  compress: true,
	  open:true,
	  hot:true,
	  host:'0.0.0.0',
	  port: 9000
	},
	plugins: [
		new CleanWebpackPlugin(['dist'],{
			root:path.resolve(__dirname, '..')
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	   	new HtmlWebpackPlugin({
		  	template:'./public/index.html',
		  	inject: true,
		  	minify:false
		})
	]
};

module.exports = config;