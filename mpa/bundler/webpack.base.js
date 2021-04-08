const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { entries } = require('./entry');

function resolve(_) {
  return path.resolve(__dirname, '..', _);
}

function getStyleLoader(isProd) {
  return isProd
    ? {
        loader: MiniCssExtractPlugin.loader,
      }
    : {
        loader: 'style-loader',
      };
}

const { APP_ENV } = process.env;
const isProd = APP_ENV === 'production';

module.exports = function () {
  return {
    output: {
      path: resolve('dist'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': resolve('src'),
      },
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: [resolve('src')],
          use: ['babel-loader', path.resolve(__dirname, './hmr-loader.js')],
        },
        {
          test: /\.css$/,
          use: [
            getStyleLoader(isProd),
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            getStyleLoader(isProd),
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: false,
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: resolve('dist/img/[name].[hash:7].[ext]'),
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: resolve('dist/media/[name].[hash:7].[ext]'),
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: resolve('dist/fonts/[name].[hash:7].[ext]'),
          },
        },
      ],
    },
    plugins: [
      ...entries.map((entry) => {
        const name = entry.name;

        return new HtmlWebpackPlugin({
          template: 'ejs-compiled-loader?1=1!templates/index.ejs',
          inject: true,
          templateParameters: {
            __APP_ENV__: APP_ENV,
          },
          filename: `${name}/index.html`,
          chunks: ['commons', name],
        });
      }),
    ],
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  };
};
