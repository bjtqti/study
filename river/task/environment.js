var path = require("path"),
    _ = require("lodash");;
var env = {
    buildFolder: "build/",
    distFolder: "dist/",
    vendorPath: "./client/vendor/",
    pagePath: "./view/",
    hmrPath: "/hmr/"
};

var moduleConfig = require('./config/module.json'),
    modules = [];
_.each(moduleConfig, function(moduleObj, moduleName) {
    var entryJS = moduleObj.entryJS !== undefined ? moduleObj.entryJS :
        moduleObj.path + moduleName + ".jsx";
    var entryCSS = moduleObj.entryCSS !== undefined ? moduleObj.entryCSS :
        moduleObj.path + "stylesheet/" + moduleName + ".styl";
    var entryHtml =moduleObj.html;
 
    // console.log('entryHtmls',entryHtml)
    var module = _.extend(moduleObj, {
        name: moduleName,
        entryCSS: entryCSS,
        entryJS: entryJS,
        html: entryHtml
    });
    // console.log(module);
    modules.push(module);
})
env.modules = modules;
// console.log('modules',modules);

var vendorConfig = require('./config/vendor.json'),
    vendors = [];
_.each(vendorConfig, function(vendorJS, vendorName) {
    var vendor = {
        name: vendorName,
        entryJS: vendorJS,
        // entryCSS:vendorObj.css
        // entry:_.union(vendorObj.js,vendorObj.css)
    };
    vendors.push(vendor);
});
env.vendors = vendors;

module.exports = env;
