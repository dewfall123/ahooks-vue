const path = require('path')

module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    resolve: {
      alias: {
        // 'vue3-hooks': path.resolve(__dirname, '../src'),
      }
    }
  }
};
