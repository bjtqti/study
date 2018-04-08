const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
  	entry: {
  		index:['react-hot-loader/patch','./client/index/index.jsx']
  	},
  	output: {
  		publicPath: "/dist/",
  		path: path.resolve(__dirname,"dist"),
    	filename: "[name]/[name].[hash:7].js"
  	},
  	module:{
	  	rules:[
	  		{ 
	  			test: /\.jsx?$/, 
	  			exclude: /node_modules/, 
	  			loader: ["babel-loader"]
	  		},
	  		{
	  			test:/\.css$/,
	  			use:['style-loader','css-loader']
	  		}
	  	]
  	},
  	devServer: {
	  	contentBase: "/dist/",
	  	port: 9000,
	  	hot:true
	},
	plugins:[
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template:'./view/index.html',
			chunks:['index']
		})
	]
};