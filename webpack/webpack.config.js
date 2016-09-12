var path = require("path");
var webpack = require('webpack');
 
module.exports = {
  entry: {
    app: ["./app/main.js"]
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
    filename: "bundle.js"
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