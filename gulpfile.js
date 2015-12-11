// 
// 依赖引入
// 
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
  	rev = require('gulp-rev'),
  	revCollector = require('gulp-rev-collector'),
  	runSequence = require('run-sequence'),
  	clean = require('gulp-clean'),
  	rimraf = require('rimraf');
      
var watch = require('gulp-watch');

// 
// 项目文件信息变量配置
// 

var src = 'src',
	dist = 'dist',
	revp = 'rev';

var jsSrc = src + '/js/**',
	jsDist = dist + '/js',
	jsRev = revp + '/js';

var imgSrc = src + '/img/**',
	imgDist = dist + '/img',
	imgRev = revp + '/img';

var cssSrc = src + '/css/**',
	cssDist = dist + '/css',
	cssRev = revp + '/css';

var htmlSrc = src + '/*.html',
	htmlDist = dist,
	htmlRev = revp + '/html',
	htmlDistSrc = dist + '/*.html';

// 
// release
// 

// js 生成版本号
gulp.task('revJs', function(){
  return gulp.src(jsSrc)
    .pipe(rev())
    .pipe(gulp.dest(jsDist))
    .pipe(rev.manifest())
    .pipe(gulp.dest(jsRev));
});

// img 生成版本号
gulp.task('revImg', function(){
  return gulp.src(imgSrc)
    .pipe(rev())
    .pipe(gulp.dest(imgDist))
    .pipe(rev.manifest())
    .pipe(gulp.dest(imgRev));
});

// css 生成版本号
gulp.task('revCss', function(){
  return gulp.src(cssSrc)
    .pipe(rev())
    .pipe(gulp.dest(cssDist))
    .pipe(rev.manifest())
    .pipe(gulp.dest(cssRev));
});

// html 生成版本号
gulp.task('revHtml', function(){
  return gulp.src(htmlSrc)
    .pipe(rev())
    .pipe(gulp.dest(htmlDist))
    .pipe(rev.manifest())
    .pipe(gulp.dest(htmlRev));
});

// html 更新引入文件版本
gulp.task('revCollectorHtml', function () {
  return gulp.src([revp + '/**', htmlDistSrc])
    .pipe(revCollector())
    .pipe(gulp.dest(htmlDist));
});

// css 更新引入文件版本
gulp.task('revCollectorCss', function () {
  return gulp.src([revp + '/**', cssDist + '/**'])
    .pipe(revCollector())
    .pipe(gulp.dest(cssDist));
});

// // 清空生产环境文件
// gulp.task('cleanDist', function() {
//   return gulp.src(dist, {
//       read: false
//     })
//     .pipe(clean());
// });

// // 清空版本信息对应文件
// gulp.task('cleanRev', function() {
//   return gulp.src(revp, {
//       read: false
//     })
//     .pipe(clean());
// });

// 删除生产环境文件夹
gulp.task('deleteDist', function (cb) {
	rimraf(dist, cb);
});

// 删除版本信息文件夹
gulp.task('deleteRev', function (cb) {
	rimraf(revp, cb);
});

// release任务
gulp.task('release', function (done) {
    runSequence(
    	['deleteDist', 'deleteRev'],
    	// ['cleanDist', 'cleanRev'],
        ['revJs', 'revImg', 'revCss', 'revHtml'],
        ['revCollectorCss', 'revCollectorHtml'],
    done);
});



// 
// debug
// 

gulp.task('default', ['debug']);

gulp.task('debug', function () {
    
    watch([jsSrc, cssSrc, imgSrc, htmlSrc], browserSync.reload);
    
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8080,
        startPath: src
    });
});
