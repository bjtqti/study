  const path = require('path');


module.exports = {
    entry: './src/index.jsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    mode:'development',
    module: {
     	rules: [
	     	{
	     		test: /\.(js|jsx)$/,
	     		exclude: /node_modules/,
	     		loader: "babel-loader"
	     	},
	        { 
	         	test: /\.css$/,
	         	use: [
	          	'style-loader',
	           	'css-loader'
	         	]
	        }
     	]
    }
};