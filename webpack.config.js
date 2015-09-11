var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    //'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    //'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc|path)$"))
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.scss?$/,
      loaders: ['style', 'css', 'sass'],
      exclude: /node_modules/,
      include: __dirname
    }]
  }
};
