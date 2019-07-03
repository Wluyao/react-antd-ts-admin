const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:6].js',
    chunkFilename: 'js/[name].[contenthash:6].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:6].css",
      chunkFilename: "css/[name].[contenthash:6].css"
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          enforce: true,
          priority: 10,
        },
        common: {
          minChunks: 2,
          name: 'common',
          chunks: 'async',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        },
        styles: {
          name: 'styles',
          test: /\.(le|c)ss$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [ {
      test: /\.(le|c)ss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', {
       loader: 'less-loader',
        options: { javascriptEnabled: true }
      }, {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            path.resolve(__dirname, '../src/styles/variable.less'),
            path.resolve(__dirname, '../src/styles/mixin.less')
          ]
        }
      }]
    }]
  },
})
