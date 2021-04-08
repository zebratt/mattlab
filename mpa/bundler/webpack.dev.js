const createBaseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { entryMap, entries } = require('./entry');

module.exports = function ({ appEnv }) {
  return merge(createBaseConfig({ isProd: false }), {
    mode: 'development',
    entry: entryMap,
    output: {
      publicPath: '/',
    },
    devtool: 'source-map',
    devServer: {
      hot: true,
      overlay: true,
      quiet: true,
      inline: true,
      compress: true,
      disableHostCheck: true,
      clientLogLevel: 'none',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'ejs-compiled-loader?1=1!templates/dev.ejs',
        inject: true,
        templateParameters: {
          __APP_ENV__: appEnv,
          DEV_ENTRY: entries
        },
        filename: 'index.html',
        chunks: []
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        __APP_ENV__: JSON.stringify(appEnv),
      }),
    ],
  });
};
