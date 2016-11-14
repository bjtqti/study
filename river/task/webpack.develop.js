var webpack = require('webpack'),
    path = require('path'),
    _ = require("lodash");

// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules_dir = path.resolve(__dirname, '../node_modules');
var env = require('./environment');

var entry = {};
var commonChunks = [];

/*build modules*/
var moduleEntries = {},
    moduleEntryPath = "";
_.each(env.modules, function(moduleObj) {
    var moduleEntry = {};
    moduleEntryPath = moduleObj.path + "../";
    moduleEntry[moduleObj.name] = [moduleObj.entryJS, moduleObj.entryCSS];
    _.extend(moduleEntries, moduleEntry)
});

/*build vendors*/
_.each(env.vendors, function(vendor) {
    commonChunks.push(new webpack.optimize.CommonsChunkPlugin({
        name: vendor.name,
        filename: env.vendorPath + env.buildFolder + vendor.name + ".js"
    }))
    entry[vendor.name] = vendor.entryJS;
});

_.extend(entry, moduleEntries)
// console.log('modules',env.modules)
// console.log("entry", entry, moduleEntryPath);
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
            loader: 'babel-loader'
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
        extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js", ".json"]
    },
    output: {
        path: "./",
        filename: moduleEntryPath + "[name]/" + env.buildFolder + "[name].js",
        chunkFilename: moduleEntryPath + "[name]/" + env.buildFolder + "[id].chunk.js",
    },
    plugins: _.union([
        new ExtractTextPlugin(moduleEntryPath + "[name]/" + env.buildFolder + "[name].css")
    ], commonChunks)
}
