var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    //'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    //'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: 'static/'
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.IgnorePlugin(new RegExp("^(fs|path)$"))
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      }, {
        test: /\.scss?$/,
        loaders: ['style', 'css', 'sass'],
        include: __dirname,
        exclude: /node_modules\/[^font]/
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  }
};
