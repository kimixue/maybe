var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var image = require("gulp-image");
var autoprefixer = require('gulp-autoprefixer');

// 合并js,css并压缩
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(autoprefixer())
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('mergecss', function () {
    gulp.src('app/css/eros.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('babeljs', () =>
    gulp.src('app/es6/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('app/js'))
);

gulp.task('image', function () {
    gulp.src('./images/*')
        .pipe(image())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['browserSync', 'sass', 'babeljs'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/es6/**/*.js', ['babeljs'], browserSync.reload); 
    gulp.watch('app/js/**/*.js', ['babeljs'], browserSync.reload); 
});

gulp.task('build', ['useref','mergecss']);

gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch', 'babeljs'],
        callback
    )
})