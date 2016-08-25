var gulp    = require('gulp'),
browserSync = require('browser-sync').create(),
     reload = browserSync.reload;

var opts = {
    src: './src/',
    dist: './dist/',
    jsFiles: ['src/js/util.js', 'src/js/script.js'],
    watchFiles: ['src/*.html', 'src/css/*.css', 'src/js/*.js']
};

// 开发

// scss 编译到 css，加前缀，并实时更新
gulp.task('scss', function() {
    var  maps = require('gulp-sourcemaps'),
         sass = require('gulp-sass'),
      postcss = require('gulp-postcss'),
 autoprefixer = require('autoprefixer');

    return gulp.src(opts.src + 'scss/*.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions', 'not ie <= 8'] }) ]))
        .pipe(maps.write())
        .pipe(gulp.dest(opts.src + 'css/'))
        .pipe(reload({stream: true}));
});

gulp.task('server', ['scss'], function() {
    browserSync.init({
        files: opts.watchFiles,
        server: {
            baseDir: opts.src
        }
    });
    gulp.watch(opts.src + 'scss/**/*.scss', ['scss']);
    gulp.watch(opts.src + 'js/*.js').on('change', reload);
    gulp.watch(opts.src + '*.html').on('change', reload);
});

gulp.task('default', ['server']);

// 部署

gulp.task('html', function() {
    var useref = require('gulp-useref'),
       minhtml = require('gulp-htmlmin');
    return gulp.src(opts.src + '*.html')
        .pipe(useref())
        .pipe(minhtml({collapseWhitespace: true}))
        .pipe(gulp.dest(opts.dist));
});

gulp.task('css', function() {
    var csso = require('gulp-csso');
    return gulp.src(opts.src + 'css/*')
               .pipe(csso())
               .pipe(gulp.dest(opts.dist + 'css'))
});

gulp.task('js', function() {
    var uglify = require('gulp-uglify'),
        concat = require('gulp-concat');
    return gulp.src(opts.jsFiles)
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(opts.dist + 'js'));
});

gulp.task('assets', function(){
    return gulp.src([
            opts.src + 'images/**/*',
            opts.src + 'fonts/**/*'
        ], {base: opts.src})
        .pipe(gulp.dest(opts.dist));
});

gulp.task('build', ['html', 'css', 'js', 'assets']);

// 发布

gulp.task('deploy', function() {
    var pages = require('gulp-gh-pages');
    return gulp.src(opts.dist + "**/*")
        .pipe(pages());
});