'use strict';
var gulp = require("gulp"),
    nodemon = require("nodemon"),
    livereload = require("gulp-livereload");

gulp.task("start", function() {
    livereload.listen();
    nodemon({
        delay: "10ms",
        script: "app.js",
        execMap: {
            "js": "node"
        },
        env: {
            // "NODE_ENV": "production"
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
                livereload.reload();
            }
            process.stdout.write(chunk);
        });
        this.stderr.pipe(process.stderr);
    });
});