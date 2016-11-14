var path = require("path"),
    os = require("os"),
    _ = require("lodash");
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
    var entryHtml = [];
    _.each(moduleObj.html, function(pageHtml) {
        entryHtml.push(env.pagePath + pageHtml);
    });
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

var getLanIP = function(){
    var interfaces = os.networkInterfaces();
    var IPv4 = '127.0.0.1';
    for (var key in interfaces) {
      interfaces[key].forEach(function(details){
        if (details.family == 'IPv4' && /^en\d{1}$/.test(key) == true) {
            IPv4 = details.address;
        }
      });
    }
    return IPv4;
}
var lanIP = getLanIP()
env.lanIP = lanIP
env.reloaderPort = process.env.RELOADER_PORT || 7000;
env.hmrPort = process.env.HMR_PORT || 5000;
env.hmrBasePath = "http://"+lanIP+":"+env.hmrPort
env.reloaderBasePath = "http://"+lanIP+":"+env.reloaderPor

module.exports = env;
