const path = require("path");

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
  };
};
