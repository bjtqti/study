var gulp = require('gulp');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

var config = {
	css : ['./css/*.css'],
	js:['js/numberpicker.js','js/flexible.js']
}

gulp.task('css',function(){
	return gulp.src(config.css)
		.pipe(autoprefixer({
			browsers:['last 2 versions','Android >= 4.0']
		}))
		.pipe(rename({suffix:'.min'}))
		.pipe(minify())
		.pipe(gulp.dest('dest/css'))
});

gulp.task('js',function(){
	gulp.src(config.js)
	  .pipe(rename({suffix:'.min'}))
	  .pipe(uglify())
	  .pipe(gulp.dest('dest/js'));
});

gulp.watch(config.style, ['css']);

gulp.task('default',['css','js'])