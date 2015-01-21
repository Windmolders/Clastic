var gulp = require('gulp');

// include plug-ins
var concat = require('gulp-concat'),
    stripDebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    autoprefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    filesize = require('gulp-filesize'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    clean = require('gulp-clean'),
    livereload = require('gulp-livereload'),
    fs = require('fs'),
    notify = require("gulp-notify"),
    _ = require('lodash'),
    clastic = require('./src/Clastic/CoreBundle/Resources/scripts/Clastic.js'),
    gulpScript = require('./src/Clastic/CoreBundle/Resources/scripts/GulpScript.js');

global._ = _;
clastic();
gulpScript();

var paths = {
    'styles': {
        'app': [
            'web/vendor/multiselect/css/multi-select.css',
            'src/Clastic/*/Resources/public/styles/**.less',
            'src/Clastic/*/Resources/public/styles/*/*.less'
        ],
        'main': 'src/Clastic/*/Resources/public/styles/style.less'
    },
    'scripts': {
        'vendor': [
            'src/Clastic/*/Resources/public/scripts/**.config.js',
            'http://getbootstrap.com/assets/js/ie10-viewport-bug-workaround.js'
        ],
        'app': [
            'src/Clastic/*/Resources/public/scripts/**.js'
        ]
    },
    'templates': 'src/**/*.twig',
    'build': 'web/build/'
};

var sourceDir = 'src/Clastic';
var extraScripts = [];
fs.readdirSync(sourceDir).forEach(function (file) {
    var pathDefinitions = './' + sourceDir + '/' + file + '/clastic.js';
    if (fs.existsSync(pathDefinitions) && !fs.statSync(pathDefinitions).isDirectory()) {
        extraScripts = extraScripts.concat(require(pathDefinitions)(paths));
    }
});

extraScripts.sort(function(a, b) {
    return (a.options.weight < b.options.weight) ? -1 : 1;
});

extraScripts.forEach(function(script) {
    paths.scripts[script.type] = paths.scripts[script.type] || [];
    paths.scripts[script.type].push(script.src);
});

var errorHandler = notify.onError(function (err) {
    return "Error: " + err.message;
});

gulp.task('default', ['clean', 'build', 'watch']);

gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});

gulp.task('build', ['scripts', 'styles']);

gulp.task('watch', function() {
    gulp.watch(paths.scripts.vendor, ['scripts:vendor']);
    gulp.watch(paths.scripts.app, ['scripts:app']);

    gulp.watch(paths.styles.vendor, ['styles:vendor']);
    gulp.watch(paths.styles.app, ['styles:app']);

    livereload.listen();
    gulp.watch([paths.build + '**', paths.templates])
        .on('change', livereload.changed);
});

gulp.task('scripts', ['scripts:vendor', 'scripts:app']);

gulp.task('scripts:vendor', function() {
    gulp.src(paths.scripts.vendor)
        .pipe(concat('vendor.js'))
        //.pipe(stripDebug())
        //.pipe(uglify())
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest(paths.build))
        .pipe(filesize());
});

gulp.task('scripts:app', function() {
    gulp.src(paths.scripts.app)
        .pipe(concat('app.js'))
        //.pipe(stripDebug())
        .pipe(uglify())
        .on('error', errorHandler)
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(paths.build))
        .pipe(filesize());
});

// CSS concat, auto-prefix and minify
gulp.task('styles', ['styles:app']);

gulp.task('styles:app', function() {
    gulp.src(paths.styles.main)
        .pipe(less())
        .on('error', errorHandler)
        .pipe(concat('app.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS({
            keepSpecialComments: 0
        }))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest(paths.build))
        .pipe(filesize());
});
