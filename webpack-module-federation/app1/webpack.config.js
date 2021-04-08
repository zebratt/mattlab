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
      port: 3001,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: ["babel-loader"],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "app1",
        remotes: {
          app2: `app2@//localhost:3002/remoteEntry.js`,
        },
        shared: {
          react: { singleton: true },
          "react-dom": { singleton: true },
        },
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
