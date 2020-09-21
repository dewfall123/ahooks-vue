/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const replace = require('gulp-replace');
const del = require('del');

async function delVue2Src() {
  await del(['../vhooks-vue2/src/**'], {
    force: true,
  });
}

// 需要手动改写的Hooks
const DiffHooks = ['useUrlState'];

async function transformToVue2() {
  await gulp
    .src([`src/**`, ...DiffHooks.map(i => `!src/hooks/${i}/`)])
    .pipe(replace(`'vue'`, `'@vue/composition-api'`))
    .pipe(replace(`'@dewfall/vhooks'`, `'@dewfall/vhooks-vue2'`))
    .pipe(
      replace(
        `// vue2-import-slot\n`,
        `import VueCompositionAPI from '@vue/composition-api';\nimport Vue from 'vue';\n`,
      ),
    )
    .pipe(
      replace(
        `// vue2-beforeAll-slot\n`,
        `beforeAll(() => {\n\t\tVue.use(VueCompositionAPI);\n\t});\n`,
      ),
    )
    .pipe(gulp.dest('../vhooks-vue2/src'));
}

async function copyFiles() {
  const copyFiles = ['./jest.config.js'];
  copyFiles.forEach(async f => {
    await gulp.src(f).pipe(gulp.dest('../vhooks-vue2/src'));
  });
}

// async function delHooksNotSupportVue2() {
//   await del(['../vhooks-vue2/src/hooks/useUrlState/**'], {
//     force: true,
//   });
// }

exports.default = gulp.series(
  delVue2Src,
  transformToVue2,
  copyFiles,
  // delHooksNotSupportVue2,
);
