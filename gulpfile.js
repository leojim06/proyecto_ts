"use strict";

const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');

gulp.task('clean', function () {
    return del('dist');
});

// Construcción del SERVER en la carpeta dist
gulp.task('build:server', function () {
    let tsProyect = ts.createProject('server/tsconfig.json');
    let tsResult = gulp.src('./server/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProyect))
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
});

// Construcción del CLIENT en la carpeta dist

// Construcción del proyecto completo

// copia los archivos necesarios a dist
gulp.task('deploy', function () {
    return gulp.src(['package.json'])
        .pipe(gulp.dest('dist'))
});

gulp.task('build', function (callback) {
    runSequence('clean', 'build:server', 'deploy', callback);
});

// Ejecutar servidor
gulp.task('nodemon', function () {
    nodemon({ script: 'dist/server.js' });
});

gulp.task('default', ['build', 'nodemon']);