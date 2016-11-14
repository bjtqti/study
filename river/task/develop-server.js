'use strict';
var gulp = require("gulp"),
    os = require("os"),
    nodemon = require("nodemon"),
    webpack = require('webpack'),
    browserSync = require("browser-sync"),
    env = require("./environment"),
    config = require('./webpack.hot-update.js');

var bundler = webpack(config);

gulp.task("nodemon", function() {
    nodemon({
        delay: "200ms",
        script: "app.js",
        execMap: {
            "js": "node --debug"
        },
        env: {
            "HMR_ENABLED": true
        },
        verbose: true,
        stdout: false,
        // ignore: [".git","node_modules","client","shared","task"],
        watch: [
            "server/controller","server/mock", "server/lib", "server/*.js", "view",
            // "shared/chunk/**/*.jsx","shared/chunk/**/*.es6"
        ],
        ext: "js html json es6 jsx"
    }).on("readable", function(data) {
        this.stdout.on('data', function(chunk) {
            if (/server listening at/.test(chunk)) {
                browserSync.reload({
                    stream: false
                })
            }
            process.stdout.write(chunk);
        });
        this.stderr.pipe(process.stderr);
    });
});

var bundler = webpack(config);

gulp.task("start", ["nodemon"], function() {
    var listenPort = process.env.LISTEN_PORT || 3000;
    browserSync({
        proxy: {
            target: "http://localhost:" + listenPort,
        },
        port: env.reloaderPort,
        files: "view/*.html",
        online: false,
        logLevel: "info",
        notify: true,
        open: false,
        // reloadOnRestart:true,
        browser: "google chrome",
        socket:{
            clientPath:"/bs",
        },
        scriptPath:function(path,port,options){
            path = path.replace(/browser-sync-client(\.\d+)+/,"browser-sync-client")
            return "http://localhost:" + env.reloaderPort + path
        }
    }, function() {
        console.log('🌎 browserSync Listening at %d', env.reloaderPort);
    })
})