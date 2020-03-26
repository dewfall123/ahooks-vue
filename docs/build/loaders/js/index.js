module.exports = {
  test: /\.m?jsx?$/,
  exclude: /(node_modules|bower_components)/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@vue/cli-plugin-babel/preset'],
      },
    },
  ],
};
