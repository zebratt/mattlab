const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function resolve(_) {
  return path.resolve(__dirname, _);
}

module.exports = function () {
  return {
    mode: "development",
    devtool: "eval-source-map",
    entry: [resolve("src/index.js")],
    output: {
      path: resolve("dist"),
      filename: "[name].js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
      }),
    ],
    devServer: {
      contentBase: resolve("dist"),
      port: 3000,
      host: "0.0.0.0",
      disableHostCheck: true,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          lodash: {
            test: /[\\/]node_modules[\\/]lodash/,
            enforce: true, // ignore size limitations
            chunks: "all", // this chunk can be shared between any sync or async modules
          },
        },
      },
      runtimeChunk: {
        name: "runtime",
      },
    },
  };
};
