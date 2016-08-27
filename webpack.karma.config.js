const webpack = require('webpack');

module.exports = {
  hot: false,
  output: {},
  entry: {},
  module: {
    loaders: [
      {
        test: /\.spec\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.js$/,
        exclude: /test\/|node_modules/,
        loaders: ['isparta']
      }]
  },
  plugins: []
};
