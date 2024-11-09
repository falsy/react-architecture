const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"]
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".mjs"],
    alias: {
      constants: path.resolve(__dirname, "./src/constants/"),
      domains: path.resolve(__dirname, "./src/domains/"),
      adapters: path.resolve(__dirname, "./src/adapters/"),
      di: path.resolve(__dirname, "./src/di/"),
      hooks: path.resolve(__dirname, "./src/hooks/"),
      providers: path.resolve(__dirname, "./src/providers/"),
      containers: path.resolve(__dirname, "./src/containers/"),
      components: path.resolve(__dirname, "./src/components/"),
      pages: path.resolve(__dirname, "./src/pages/"),
      "styled-system": path.resolve(__dirname, "./styled-system/")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  devServer: {
    compress: true,
    port: 9000,
    setupMiddlewares: (middlewares, devServer) => {
      return middlewares
    },
    historyApiFallback: true
  }
}
