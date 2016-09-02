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

gulp.task('clean:client', function () {
    return del('dist/public/app');
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
    return gulp.src(['./client/**/*.{css,html}', './client/systemjs.config.js'])
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

    // Font awesome
    gulp.src('./node_modules/font-awesome/css/font-awesome.min.css').pipe(gulp.dest(libPath + '/font-awesome/css'));
    gulp.src('./node_modules/font-awesome/fonts/*').pipe(gulp.dest(libPath + '/font-awesome/fonts'));

    // Alertify
    gulp.src('./node_modules/alertify.js/dist/css/alertify.css').pipe(gulp.dest(libPath + '/alertify/css'));
    gulp.src('./node_modules/alertify.js/dist/js/alertify.js').pipe(gulp.dest(libPath + '/alertify/js'));

    // Bootstrap
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.*').pipe(gulp.dest(libPath + '/bootstrap/css'));
    gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js').pipe(gulp.dest(libPath + '/bootstrap/js'));
    gulp.src('./node_modules/bootstrap/dist/fonts/*').pipe(gulp.dest(libPath + '/bootstrap/fonts'));


    return merge(angular, rxjs);
});

gulp.task('build', function (callback) {
    // runSequence('clean', 'build:server', 'copy:libs', 'build:client', 'deploy', callback);
    runSequence('build:client', 'deploy', callback);
});

gulp.task('default', ['build']);