var gulp = require('gulp');
var postcss = require('gulp-postcss');
//var watch = require('gulp-watch');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync');
var cssnext = require('cssnext');
var precss = require('precss');
var reload = browserSync.reload;

// var info = autoprefixer({ browsers: ['last 3 version'] }).info();
// console.log(info);

var config = {
	style : ['./css/*.css']
}

gulp.task('css',function(){
	var processors = [
		precss,
		cssnext,
		autoprefixer({browsers:['last 3 versions']})
	];
	return gulp.src(config.style)
		//.pipe(watch(config.style))
		.pipe(postcss(processors))
		.pipe(gulp.dest('./dest'))
		.pipe(reload({stream:true}))
});

gulp.task('server',['css'],function(){
	browserSync({
		server:{
			baseDir:'./'
		}
	});

	//gulp.watch(config.style,['css']);
	//gulp.watch("./*").on('change', browserSync.reload);
})

gulp.task('watch',function(){
	gulp.watch(config.style,function(){
		//
	})
})

gulp.task('default',['server'])