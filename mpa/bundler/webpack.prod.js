const createBaseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const { entryMap } = require('./entry');

const APP_ENV = process.env['APP_ENV'];

module.exports = function () {
  return merge(createBaseConfig({ isProd: true }), {
    stats: 'minimal',
    mode: 'production',
    entry: entryMap,
    output: {
      publicPath: '/',
      filename: `[name]/index.[chunkhash:8].js`,
      chunkFilename: `[name]/index.[chunkhash:8].js`,
    },
    externals: {
      // prettier-ignore
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
    plugins: [
      new webpack.DefinePlugin({
        __APP_ENV__: JSON.stringify(APP_ENV),
      }),
      new MiniCssExtractPlugin({
        filename: '[name]/style.[contenthash:8].css',
        chunkFilename: '[name]/style.[contenthash:8].chunk.css',
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          cache: true,
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: false,
          },
        }),
      ],
      moduleIds: 'hashed',
      chunkIds: 'named',
      splitChunks: {
        name: false,
        cacheGroups: {
          vendor: {
            test: (module) => {
              return (
                /[\/]node_modules[\/]/.test(module.context) &&
                !/[\/]node_modules[\/](antd|rc-)/.test(module.context)
              );
            },
            chunks: 'initial',
            name: 'vendor', // 打包后的文件名，任意命名
          },
          antd: {
            test: (module) => {
              return /[\/]node_modules[\/](antd|rc-)/.test(module.context);
            },
            chunks: 'all',
            name: 'antd',
          },
          common: {
            chunks: 'all',
            name: 'common', // 任意命名
            minSize: 0, // 只要大小超出设置的这个数值，就生成一个新包
            minChunks: 2,
          },
        },
      },
      runtimeChunk: { name: 'runtime' },
    },
  });
};
