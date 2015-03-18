var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

gulp.task('default', function() {
  return gulp.src('client/app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('client/compiled'));
});

gulp.task('vendor', function() {
  return gulp.src('client/vendor/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('client/compiled'));
});


gulp.task('watch', function() {
  gulp.watch('client/app/**/*.js', ['default', 'vendor']);
});

// server

var spawn = require('child_process').spawn;
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var del = require('del');


var nodemon_instance

gulp.task('dev', function() {
  nodemon_instance = nodemon({
    script: './lib/app.js',
    verbose: true,
    ignore: ['*']
  }).on('restart', function() {
    console.log('~~~ restart server ~~~');
  });

  gulp.watch('./server/**/*', ['babel']);
})


gulp.task('babel', function() {
  // del(['./lib'], function() {
  //   spawn("babel", ["./server", "--out-dir", "./lib"])
  // });
  var child = spawn("babel", ["./server", "--out-dir", "./lib"]);
  nodemon_instance.emit('restart')
})

gulp.task('clean', function() {
  del(['./lib'], function() {
    // spawn("babel", ["./server", "--out-dir", "./lib"])
  })
})