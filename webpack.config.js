
const webpack = require('webpack')
const path = require('path')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const config = {

  entry: [
    './src/fetch-rails',
  ],

  output: {
    filename: 'fetch-rails.js',
    path: path.resolve('./lib'),
  },

  resolve: {
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /\.js?$/, loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new UglifyJSPlugin()
  ],
};

module.exports = config