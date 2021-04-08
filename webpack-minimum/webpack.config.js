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
    },
    optimization: {
      runtimeChunk: {
        name: 'runtime',
      },
    },
  };
};
