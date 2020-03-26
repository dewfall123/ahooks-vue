const use = [
  {
    loader: 'vue-style-loader',
    options: {
      sourceMap: false,
      shadowMode: false,
    },
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: false,
      importLoaders: 2,
      modules: true,
    },
  },
  {
    loader: 'postcss-loader',
  },
];

module.exports = [
  {
    test: /\.css$/,
    use,
  },
];
