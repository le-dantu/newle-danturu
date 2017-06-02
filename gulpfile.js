var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var minify = require('gulp-minify');

var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('src/css/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('www/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('pug', function(){
  return gulp.src('src/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('www'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('media', function() {
  return gulp.src('src/res/**/*')
  .pipe(gulp.dest('www/res'))
});

gulp.task('js', function() {
  return gulp.src('src/js/**/*')
  .pipe(gulp.dest('www/js'))
});

gulp.task('compress', function() {
  gulp.src('src/js/*.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'www'
    },
    ghostMode: {
    clicks: true,
    forms: true,
    scroll: false
    },
    open: false,
    reloadOnRestart: false,
    notify: false,
    reloadDelay: 2000,
    
  })
})
gulp.task('default', ['compress']);
gulp.task('watch', ['sass', 'pug', 'media', 'js', 'browserSync'], function (){
  gulp.watch('src/css/*.scss', ['sass']);
  gulp.watch('src/pug/**/*.pug', ['pug']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/res/**/*', ['media']);
})
