// development config
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const commonConfig = require("./common");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    hot: true, // enable HMR on the server
    historyApiFallback: true, // fixes error 404-ish errors when using react router :see this SO question: https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new ReactRefreshPlugin(),
    new CopyPlugin({
      patterns: [
        { from: resolve(__dirname, "../../src/assets"), to: resolve(__dirname, "../../dist/assets") },
        { from: resolve(__dirname, "../../favicon.png"), to: resolve(__dirname, "../../dist/favicon.png") }
      ]
    })
  ],
});
