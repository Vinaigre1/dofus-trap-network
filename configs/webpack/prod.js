// production config
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "js/bundle.[contenthash].min.js",
    path: resolve(__dirname, "../../docs"),
    publicPath: "/dofus-trap-network/",
  },
  devtool: "source-map",
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: resolve(__dirname, "../../src/assets"), to: resolve(__dirname, "../../docs/assets") },
        { from: resolve(__dirname, "../../favicon.png"), to: resolve(__dirname, "../../docs/favicon.png") }
      ]
    })
  ]
});
