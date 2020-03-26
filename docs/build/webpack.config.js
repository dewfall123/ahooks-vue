const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins');

const srcpath = path.resolve(__dirname, '../src');
const outpath = path.resolve(srcpath, '../dist');
const entrypath = path.resolve(srcpath, './main.ts');
const vhookpath = path.resolve(srcpath, '../packages');

module.exports = (env = {}) => ({
  mode: env.prod ? 'production' : 'development',
  devtool: env.prod ? 'source-map' : 'cheap-module-source-map',
  entry: entrypath,
  output: {
    path: outpath,
    filename: '[name].[hash].js',
    publicPath: '/',
    chunkFilename: '[name].[hash].js',
  },
  resolve: {
    alias: {
      '@': srcpath,
      vue: '@vue/runtime-dom',
      'v-hooks': vhookpath,
    },
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
  },
  module: {
    rules: loaders,
  },
  plugins,
  devServer: {
    inline: true,
    hot: true,
    stats: 'minimal',
    contentBase: srcpath,
    overlay: true,
  },
});
