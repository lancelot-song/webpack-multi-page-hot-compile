var gulp = require("gulp"),
    imagemin = require("gulp-imagemin"),
    minifycss = require("gulp-minify-css"),
    browserSync = require("browser-sync"),      //监听
    jshint = require('gulp-jshint'),           //js检查
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    clean = require('gulp-clean'),             //清空文件夹
    tinylr = require('tiny-lr'),               //livereload
    server = tinylr(),
    port = 35729,
    webpack = require('gulp-webpack');

//创建监听
gulp.task("browser-sync", function() {
    browserSync({
        files: "build/*.html,build/css/*.css,build/**/*.js,build/*.js",
        server: {
            baseDir: "./"
        }
    });
});

//输出html
gulp.task("html",function(){
    var htmlSrc = "./lib/*.html",
        htmlDst = "./build";

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst));
});
 
 //输出css
gulp.task("css",function(){
    var cssSrc = ["./lib/css/*.css","./lib/js/**/*.css"],
        cssDst = "./build/css";

    gulp.src(cssSrc)
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst))
});

//输出js
gulp.task('js', function () {
    var jsSrc = ['./build/js/*.js','./build/js/*.min.js'],
        jsDst ='./build/js/';

    gulp.src(jsSrc)
        //.pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

//对.min.js直接输出
gulp.task('jsmin', function () {
    var jsSrc = ['./build/js/*.js','./build/js/*.min.js'],
        jsDst ='./build/js/';

    gulp.src(jsSrc)
        .pipe(gulp.dest(jsDst));
});

//输出压缩图片
gulp.task("images",function(){
    var imgSrc = "./lib/images/**.*",
        imgDst = "./build/images";

    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst))
});

//执行webpack
gulp.task('webpack', function () {
    var jsSrc = ['lib/js/*.js','!lib/js/*.min.js'],
        jsDst ='./build/';

    gulp.src(jsSrc)
        .pipe(webpack(require("./webpack.config.js")))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

//gulp默认执行
gulp.task('default', function(){
    gulp.start('html','css','images','js');
});
// 监听任务 运行语句 gulp watch
gulp.task('watch',["browser-sync"],function(){
    server.listen(port, function(err){
        if (err) {
            return console.log(err);
        }
        // gulp.watch('./lib/*.html', function(event){
        //     gulp.run('html');
        // })
        // gulp.watch(["./lib/css/*.css","./lib/js/**/*.css"], function(event){
        //     gulp.run('css');
        // })
    });
});