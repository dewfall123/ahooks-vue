const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'v-hooks': path.resolve(__dirname, 'packages/'),
      },
    },
  },

  chainWebpack: config => {
    const vueRule = config.module.rule('vue').test(/\.vue$/);

    const mdRule = config.module.rule('markdown').test(/\.md$/);
    mdRule
      .use('vue-loader')
      .loader('vue-loader')
      .options({
        compilerOptions: {
          preserveWhitespace: true
        },
      })
      .end()
      .use('markdown-loader')
      .loader(require.resolve('@vuepress/markdown-loader'))
      .options({ sourceDir: './' })
      .end();
  },
};
