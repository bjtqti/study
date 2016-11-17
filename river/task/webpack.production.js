var webpack = require('webpack'),
    path = require('path'),
    //del = require("del"),
    _ = require("lodash");

// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules_dir = path.resolve(__dirname, '../node_modules');
var env = require('./environment');

/*build const*/
var entry = {};
var commonChunks = [];

/*build pages*/
var moduleEntries = {},
    moduleEntryPath = "";
_.each(env.modules, function(moduleObj) {
    //del.sync(path.join(moduleObj.path, env.distFolder + '/*.*'));
    var moduleEntry = {};
    moduleEntryPath = moduleObj.path + "../";
    moduleEntry[moduleObj.name] = [moduleObj.entryJS, moduleObj.entryCSS];
    _.extend(moduleEntries, moduleEntry)
});

/*build vendors*/
//del.sync(env.vendorPath + "/" + env.distFolder + '/*.js');
_.each(env.vendors, function(vendor) {
    commonChunks.push(new webpack.optimize.CommonsChunkPlugin({
        name: vendor.name,
        filename: env.vendorPath + env.distFolder + vendor.name + "-[hash].js"
    }))
    entry[vendor.name] = vendor.entryJS;
});

/*add modules and vendors to entry point*/
_.extend(entry, moduleEntries);
// console.log("entry",entry)
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
            loader: 'babel-loader?optional=runtime'
        }, , {
            test: /\.html/,
            exclude: [node_modules_dir],
            loader: 'html'
        }, {
            test: /\.styl/,
            exclude: [node_modules_dir],
            loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!stylus')
        }, {
            test: /\.css/,
            exclude: [node_modules_dir],
            loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.(png|jpg)$/,
            exclude: [node_modules_dir],
            loader: 'url?limit=25000'
        }]
    },
    resolve: {
        extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js", ".json", ".coffee"]
    },
    output: {
        path: "./",
        filename: moduleEntryPath + "[name]/" + env.distFolder + "[name]-[hash].js",
        chunkFilename: moduleEntryPath + "[name]/" + env.distFolder + "[id]-[hash].chunk.js"
    },
    plugins: _.union([
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
              comments: false
            },
            sourceMap: false
        }),
        new ExtractTextPlugin(moduleEntryPath + "[name]/" + env.distFolder + "[name]-[hash].css")
    ], commonChunks)
}