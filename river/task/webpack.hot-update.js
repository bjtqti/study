var webpack = require('webpack'),
    path = require('path'),
    _ = require("lodash");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules_dir = path.resolve(__dirname, '../node_modules');
var env = require('./environment');

/*build const*/
var entry = {};
var commonChunks = [];

_.each(env.modules, function(moduleObj) {
    var moduleEntry = {};
    moduleEntry[moduleObj.name] = [
        // 'webpack-dev-server/client?http://localhost:5000',
        "webpack-hot-middleware/client",
        // 'webpack/hot/dev-server',
        // "webpack/hot/only-dev-server",
        moduleObj.entryJS,
        moduleObj.entryCSS
    ];
    _.extend(entry, moduleEntry);
});

/*build vendors*/
_.each(env.vendors, function(vendor) {
    commonChunks.push(new webpack.optimize.CommonsChunkPlugin({
        name: vendor.name,
        // filename:env.vendorPath + env.buildFolder + vendor.name + ".js"
    }))
    entry[vendor.name] = vendor.entryJS;
});

module.exports = {
    entry: entry,
    module: {
        loaders: [{
            test: /\.json/,
            exclude: [node_modules_dir],
            loader: 'json'
        }, {
            test: /\.(es6|jsx)$/,
            exclude: [node_modules_dir],
            //loader: "react-hot!babel?stage=2"
            loader: 'babel-loader'
            // query: babelrc
        }, , {
            test: /\.html/,
            exclude: [node_modules_dir],
            loader: 'html'
        }, {
            test: /\.styl/,
            exclude: [node_modules_dir],
            // loader: ExtractTextPlugin.extract('style', 'css!sass!autoprefixer')
            loader: 'style!css!autoprefixer!stylus'
        }, {
            test: /\.css/,
            exclude: [node_modules_dir],
            // loader: ExtractTextPlugin.extract('style', 'css!autoprefixer')
            loader: 'style!css'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.(png|jpg)$/,
            exclude: [node_modules_dir],
            loader: 'url?limit=25000'
        }]
    },
    devtool: "#eval-source-map",
    watch:true,
    resolve: {
        extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js", ".json", ".coffee"]
    },
    output: {
        path: path.join(__dirname, "../client"),
        filename: "[name].js",
        chunkFilename: "[id].chunk.js",
        publicPath: env.hmrPath
    },
    plugins: _.union([
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
        // new ExtractTextPlugin("[name].css")
    ], commonChunks)
}