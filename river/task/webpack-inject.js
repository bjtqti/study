var gulp = require("gulp"),
    inject = require("gulp-inject"),
    injectString = require("gulp-inject-string"),
    // mapstream = require("map-stream"),
    path = require("path"),
    fs = require("fs"),
    // del = require("del"),
    _ = require("lodash");

var env = require("./environment");
var hmrBasePath = "{{baseURL}}:"+env.hmrPort
var reloaderBasePath = "{{baseURL}}:"+env.reloaderPort

gulp.task("develop-webpack", function() {
    _.each(env.modules, function(moduleObj) {
        var injectTarget = moduleObj.html,
            injectedPath = path.dirname(injectTarget),
            cssFiles = [],
            jsFiles = [],
            // vendorCSSFile = path.join(env.vendorPath, env.buildFolder + moduleObj.vendor + '.css'),
            // moduleCSSFile = path.join(moduleObj.path, env.buildFolder + '/*.css'),
            vendorJSFile = path.join(env.vendorPath, env.buildFolder + moduleObj.vendor + '.js'),
            moduleJSFile = path.join(moduleObj.path, env.buildFolder + '*.js');
        jsFiles.push(vendorJSFile);
        jsFiles.push(moduleJSFile);
        var sources = gulp.src(jsFiles, {
            read: false
        });
        gulp.src(injectTarget).pipe(inject(sources, {
            relative: true,
            empty:true,
            transform: function(filepath) {
                console.log(filepath)
                var vendorPattern = new RegExp(".+" + moduleObj.vendor),
                    buildPattern = new RegExp(".+" + env.buildFolder);
                // filepath = filepath.replace(prefixPattern, './');
                if (vendorPattern.test(filepath) === true) {
                    if (path.extname(filepath) === ".js") {
                        filepath = filepath.replace(buildPattern, hmrBasePath+env.hmrPath);
                    }
                } else if (vendorPattern.test(filepath) === false) {
                    if (path.extname(filepath) === ".js") {
                        filepath = filepath.replace(buildPattern, hmrBasePath+env.hmrPath);
                    }
                }
                return inject.transform.apply(inject.transform, arguments);
            }

        }))
        .pipe(injectString.replace('<script src="'+reloaderBasePath+'/bs/browser-sync-client.js"></script>\n',""))
        .pipe(injectString.before("<script",'<script src="'+reloaderBasePath+'/bs/browser-sync-client.js"></script>\n'))
        .pipe(gulp.dest(injectedPath));
    });
});

function bundledTime(){
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const date = dateObj.getDate()
    const hour = dateObj.getHours()
    const minute = dateObj.getMinutes()
    return ""+year+month+date+hour+minute
}

gulp.task("deploy-webpack", function() {
    _.each(env.modules, function(moduleObj) {
        var injectTarget = moduleObj.html,
            injectedPath = path.dirname(injectTarget),
            cssFiles = [],
            jsFiles = [],
            vendorCSSFile = path.join(env.vendorPath, env.distFolder + moduleObj.vendor + '-*.css'),
            // extensionCssFile = path.join(env.extensions.path, '/' + env.extensions.distFolder + '/' + moduleObj.name + '-*.css'),
            moduleCSSFile = path.join(moduleObj.path, env.distFolder + '*.css'),
            vendorJSFile = path.join(env.vendorPath, env.distFolder + moduleObj.vendor + '-*.js'),
            moduleJSFile = path.join(moduleObj.path, env.distFolder + '*.js');
        cssFiles.push(vendorCSSFile);
        cssFiles.push(moduleCSSFile);
        jsFiles.push(vendorJSFile);
        jsFiles.push(moduleJSFile);
        // console.log(jsFiles)
        var sources = gulp.src(_.union(cssFiles, jsFiles), {
            read: false
        });
        gulp.src(injectTarget).pipe(inject(sources, {
            relative: true,
            transform: function(filepath) {
                // console.log(filepath);
                filepath = filepath.replace(/^\.{2}\//g, '/');
                return inject.transform.apply(inject.transform, arguments);
            }
        }))
        .pipe(injectString.replace('<script src="'+reloaderBasePath+'/bs/browser-sync-client.js"></script>\n',""))
        .pipe(injectString.replace('<meta name="bundledAt" content="\d{12}">',""))
        .pipe(injectString.before("</head>",'<meta name="bundledAt" content="'+bundledTime()+'">\n')).pipe(gulp.dest(injectedPath));
    });
});