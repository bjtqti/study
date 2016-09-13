var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', "./app/main.js","./assets/style.css"]
  },
  devServer: { inline: true },
  module: {
     loaders: [{
         test: /\.js$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         query:{ "presets": [ "es2015" ] }
     },
     {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style', 'css')
      }
     ]
 },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js?[hash]"
  },
  plugins: [
        new ExtractTextPlugin("[name]-[hash].css"),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // }),
    ]
};