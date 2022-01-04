const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  mode: 'development',

  output: {
    publicPath: 'http://localhost:8082/'
  },

  devtool: 'source-map',

  devServer: {
    port: 8082,
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "a",
      filename: "remoteEntry.js",
      remotes: {
        a: "a@http://localhost:8082/remoteEntry.js",
        portallegacy: 'portallegacy@http://localhost:8181/remoteEntry.js'
      },
      exposes: {
        "./Item": "./src/Item.js",
        "./Main": "./src/Main.js",
        "./App": "./src/App.js"
      },
      shared: {
        // ...deps,
        react: {
          singleton: true,
          // requiredVersion: deps.react,
        },
        // "react-dom": {
        //   singleton: true,
        //   requiredVersion: deps["react-dom"],
        // },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"]
  },
}