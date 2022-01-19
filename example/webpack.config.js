/* eslint-disable */
var webpack = require('webpack');
const path = require('path');


module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: __dirname + '/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: 'http://localhost:8000/build'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname)
    },
    allowedHosts: 'auto',
    client: {
      progress: true
    },
    hot: true,
    port: 8000
  }
};
