var path = require("path");
var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', "./app/main.js"]
  },
  devServer: { inline: true },
  module: {
     loaders: [{
         test: /\.js$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         query:{ "presets": [ "es2015" ] }
     }]
 },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js?[hash]"
  },
  plugins: [
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