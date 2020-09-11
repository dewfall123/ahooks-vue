const gulp = require('gulp');
const replace = require('gulp-replace');

async function transformToVue2() {
  await gulp
    .src('src/**')
    .pipe(replace(`'vue'`, `'@vue/composition-api'`))
    .pipe(replace(`'@dewfall/vhooks'`, `'@dewfall/vhooks-vue2'`))
    .pipe(gulp.dest('../vhooks-vue2/src'));
}

exports.default = gulp.series(transformToVue2);
