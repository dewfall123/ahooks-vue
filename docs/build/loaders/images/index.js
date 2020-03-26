module.exports = {
  test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 4096,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
          },
        },
      },
    },
  ],
};
