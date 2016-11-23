 
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var config = require('./config.js');
//config.home.push("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
module.exports = {
    entry: config,
    module: {
       loaders: [{
           test: /\.js$/,
           exclude: /node_modules/,
           loader: 'babel-loader'
       },
       {
          test: /\.css/,
          loader: ExtractTextPlugin.extract('style', 'css')
        }
       ]
   },
  output: {
    path: "build",
    publicPath: "/dist/",
    filename: "js/[name].js"
  },
  plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
};