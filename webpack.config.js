const path = require('path');

module.exports = {
  mode : 'development',
  entry: ['./views/js/style.js', './views/js/window-controll.js'],
  output: {
    path: path.resolve(__dirname, 'views'),
    filename: 'index.js',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  watch : true,
};