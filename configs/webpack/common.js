// shared config (dev and prod)
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      '@components': resolve(__dirname, "../../src/components"),
      '@classes': resolve(__dirname, "../../src/classes"),
      '@assets': resolve(__dirname, "../../src/assets"),
      '@json': resolve(__dirname, "../../src/json"),
      '@src': resolve(__dirname, "../../src")
    }
  },
  context: resolve(__dirname, "../../src"),
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.json$/,
        use: [
          { loader: resolve(__dirname, "./loaders/jsonLoader.js") }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html.ejs" })
  ],
};
