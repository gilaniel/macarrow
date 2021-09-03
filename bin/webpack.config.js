const path = require("path");

const pathModules = path.resolve(__dirname);
const ENV = process.env.NODE_ENV || "development";

const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    main: "../src/index.js",
  },

  output: {
    path: path.resolve(__dirname, "../build/"),
    filename: "[name].[contenthash].js",
  },
  mode: ENV,
  resolve: {
    modules: [pathModules, "node_modules"],
  },
  devServer: {
    contentBase: path.join(__dirname, '../build'),
    // static: {
    //   directory: path.join(__dirname, '../build'),
    // },
    port: 9000,
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          esModule: false
        }
      },
    ],
  },
  stats: {
    children: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, "../build/") + "index.html",
      template: path.join(__dirname, "../src/") + "index.html",
      inject: true,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: ENV === "production",
    minimizer: [new TerserPlugin()],
  },
  devtool: "source-map",
};
