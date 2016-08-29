"use strict";

const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');
const merge = require('merge-stream');

const libPath = './dist/public/libs';
const angularPath = libPath + '/@angular';
const rxjsPath = libPath + '/rxjs';
const mongoosePath = libPath + '/mongoose';
const cssPath = './dist/public/css';

gulp.task('clean', function () {
    return del('dist');
});

// Construcción del SERVER en la carpeta dist
gulp.task('build:server', function () {
    let tsProyect = ts.createProject('server/tsconfig.json');
    let tsResult = gulp.src('server/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProyect))
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
});

// Construcción del CLIENT en la carpeta dist
gulp.task('build:client', function () {
    let tsProyect = ts.createProject('client/tsconfig.json');
    let tsResult = gulp.src('client/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProyect))
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/public'))
});

// copia los archivos necesarios a dist
gulp.task('deploy', function () {
    return gulp.src(['./client/index.html', './client/systemjs.config.js'])
        .pipe(gulp.dest('dist/public'))
});

// copia de libraries a dist
gulp.task('copy:libs', function () {
    let angular = gulp.src('./node_modules/@angular/**/*.js', { base: './node_modules/@angular' })
        .pipe(gulp.dest(angularPath));

    let rxjs = gulp.src('./node_modules/rxjs/**/*.js', { base: 'node_modules/rxjs' })
        .pipe(gulp.dest(rxjsPath));

    let mongoose = gulp.src('./node_modules/mongoose/**/*.js', { base: 'node_modules/mongoose' })
        .pipe(gulp.dest(mongoosePath));

    gulp.src('./node_modules/core-js/client/shim.min.js').pipe(gulp.dest(libPath + '/core-js/client'))
    gulp.src('./node_modules/zone.js/dist/zone.js').pipe(gulp.dest(libPath + '/zone.js/dist'))
    gulp.src('./node_modules/reflect-metadata/Reflect.js').pipe(gulp.dest(libPath + '/reflect-metadata'))
    gulp.src('./node_modules/systemjs/dist/system.src.js').pipe(gulp.dest(libPath + '/systemjs/dist'))
    gulp.src('./node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest(libPath + '/jquery'));
    gulp.src('./node_modules/jquery/dist/jquery.min.map').pipe(gulp.dest(libPath + '/jquery'));

    return merge(angular, rxjs);
});

gulp.task('copy:bootstrap', function() {
    let bootstrap = './node_modules/bootstrap/dist';
    gulp.src(bootstrap + '/css/bootstrap.min.css').pipe(gulp.dest(cssPath));
    gulp.src(bootstrap + '/js/bootstrap.min.js').pipe(gulp.dest(libPath + '/bootstrap'));

});

gulp.task('build', function (callback) {
    runSequence('clean', 'build:server', 'copy:libs', 'copy:bootstrap', 'build:client', 'deploy', callback);
});

gulp.task('default', ['build']);