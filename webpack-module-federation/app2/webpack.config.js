const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

function resolve(_) {
  return path.resolve(__dirname, _);
}

module.exports = function () {
  return {
    mode: "development",
    entry: "./src/index.jsx",
    output: {
      path: resolve("dist"),
      filename: "[name].js",
    },
    stats: 'minimal',
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 3002,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: ["babel-loader"],
        },
      ],
    },
    devtool: 'eval-source-map',
    plugins: [
      new ModuleFederationPlugin({
        name: "app2",
        library: { type: "var", name: "app2" },
        filename: "remoteEntry.js",
        exposes: {
          "./Button": "./src/Button.jsx",
          "./Banner": "./src/Banner.jsx",
        },
        shared: { react: { singleton: true }, "react-dom": { singleton: true } },
      }),
      new HtmlWebpackPlugin({
        template: "template.html",
        title: "app1 title",
      }),
    ],
    optimization: {
      splitChunks: {
        name: false,
        cacheGroups: {
          vendor: {
            test: /\/node_modules\//,
            chunks: "initial",
            name: "vendor",
          },
        },
      },
    },
  };
};
