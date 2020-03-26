const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadPlugin = require('preload-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const plugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"',
      BASE_URL: '"/"',
    },
  }),
  new CaseSensitivePathsPlugin(),
  new HtmlWebpackPlugin({
    title: 'docs',
    template: path.resolve(__dirname, '../../public/index.html'),
  }),
  new CopyPlugin([
    {
      from: path.resolve(__dirname, '../../public/'),
      to: path.resolve(__dirname, '../../dist/'),
      toType: 'dir',
      ignore: [
        '.DS_Store',
        {
          glob: 'index.html',
          matchBase: false,
        },
      ],
    },
  ]),
  // /* config.plugin('preload') */
  // new PreloadPlugin({
  //   rel: 'preload',
  //   include: 'initial',
  //   fileBlacklist: [/\.map$/, /hot-update\.js$/],
  // }),
  // /* config.plugin('prefetch') */
  // new PreloadPlugin({
  //   rel: 'prefetch',
  //   include: 'asyncChunks',
  // }),
];

module.exports = plugins;
