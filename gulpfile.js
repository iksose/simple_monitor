var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var karma = require('gulp-karma');
var gutil = require('gutil');

var locations = {
  js: 'client/app/**/*.js',
  tests: 'client/app/**/spec.js'
}

gulp.task('default', function() {
  return gulp.src([locations.js, "!" + locations.tests])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('client/compiled'));
});

gulp.task('concat_tests', function() {
  return gulp.src([locations.tests])
    .pipe(concat('tests.js'))
    .pipe(gulp.dest('client/compiled'));
})

gulp.task('vendor', function() {
  return gulp.src('client/vendor/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('client/compiled'));
});


gulp.task('watch', function() {
  gulp.watch(locations.js, ['default', 'vendor', 'test']);
});

var testFiles = [
  'client/compiled/vendor.js',
  'client/compiled/all.js',
  'client/compiled/tests.js',
  'client/app/**/**/*.html'
]

gulp.task('test', ['concat_tests'], function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', gutil.log);
  // .on('error', function(err) {
  //   // Make sure failed tests cause gulp to exit non-zero
  //   throw err;
  // });
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