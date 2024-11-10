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
      pages: path.resolve(__dirname, "./src/pages/"),
      providers: path.resolve(__dirname, "./src/providers/"),
      containers: path.resolve(__dirname, "./src/containers/"),
      components: path.resolve(__dirname, "./src/components/"),
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
      const user = {
        id: "1",
        name: "falsy"
      }
      const posts = []
      const comments = []

      devServer.app.use(require("express").json())

      devServer.app.get("/api/users", (req, res) => {
        setTimeout(() => {
          res.json(user)
        }, 1000)
      })

      devServer.app.get("/api/posts", (req, res) => {
        setTimeout(() => {
          res.json(posts)
        }, 1000)
      })

      devServer.app.post("/api/posts", (req, res) => {
        setTimeout(() => {
          posts.push({
            ...req.body,
            id: new Date().getTime(),
            author: user,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          res.json(true)
        }, 1000)
      })

      devServer.app.delete("/api/posts/:id", (req, res) => {
        setTimeout(() => {
          const index = posts.findIndex(
            (post) => post.id === Number(req.params.id)
          )
          posts.splice(index, 1)
          res.json(true)
        }, 1000)
      })

      devServer.app.get("/api/posts/:id/comments", (req, res) => {
        const postId = req.params.id
        const postComments = comments.filter(
          (comment) => comment.postId === postId
        )
        setTimeout(() => {
          res.json(postComments)
        }, 1000)
      })

      devServer.app.post("/api/posts/:id/comments", (req, res) => {
        const postId = req.params.id
        setTimeout(() => {
          comments.push({
            ...req.body,
            id: new Date().getTime(),
            postId,
            author: user,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          res.json(true)
        }, 1000)
      })

      return middlewares
    },
    historyApiFallback: true
  }
}
