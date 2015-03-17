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

var nodemon_instance;

gulp.task('serve', ['babel'], function() {
  if (!nodemon_instance) {
    nodemon_instance = nodemon({
      script: './lib/app.js',
      // watch: './server/*/**.js',
      watch: '*',
      ext: 'js',
      ignore: ['./client', './lib']
    }).on('restart', function() {
      console.log('~~~ restart server ~~~');
    });
  } else {
    setTimeout(nodemon_instance.emit('restart'), 100);
  }
});

gulp.task('serve_watch', ['serve'], function() {
  return gulp.watch('src/**/*', ['serve']);
});


gulp.task('babel', function() {
  // del(['./lib'], function() {
  //   spawn("babel", ["./server", "--out-dir", "./lib"])
  // })
  var child = spawn("babel", ["./server", "--out-dir", "./lib"])
})

gulp.task('clean', function() {
  del(['./lib'], function() {
    spawn("babel", ["./server", "--out-dir", "./lib"])
  })
})


// gulp.task('es6', function() {
//
//   gulp.watch('server/**/**.js', function(e) {
//     // clean
//     del(['./lib'], function() {
//       // Finally execute your script below - here "ls -lA"
//       var child = spawn("babel", ["./server", "--out-dir", "./lib"]),
//         stdout = '',
//         stderr = '';
//
//       child.stdout.setEncoding('utf8');
//
//       child.stdout.on('data', function(data) {
//         stdout += data;
//         gutil.log(data);
//       });
//
//       child.stderr.setEncoding('utf8');
//       child.stderr.on('data', function(data) {
//         stderr += data;
//         gutil.log(gutil.colors.red(data));
//         // gutil.beep();
//       });
//
//       child.on('close', function(code) {
//         gutil.log("Done with exit code", code);
//       });
//     })
//   });
// });
//
// gulp.task('clean', function() {
//   del(['./lib'], function() {
//     spawn("babel", ["./server", "--out-dir", "./lib"])
//   })
// })
//
// gulp.task('babel', ['clean'], function() {
//   var child = spawn("babel", ["./server", "--out-dir", "./lib"])
// })
//
// gulp.task('develop', function() {
//   nodemon({
//       script: './lib/app.js',
//       ext: 'js',
//       ignore: ['./client', './lib']
//     })
//     .on('change', ['babel'])
//     .on('restart', function() {
//       console.log('restarted!')
//     })
// })