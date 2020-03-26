module.exports = {
  test: /\.ts$/,
  exclude: /(node_modules|bower_components)/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@vue/cli-plugin-babel/preset'],
      },
    },
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        appendTsSuffixTo: [/\.vue$/],
        happyPackMode: false,
      },
    },
  ],
};
