import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  server: {
    port: 9000
  },
  resolve: {
    alias: {
      constants: path.resolve(__dirname, "./src/constants/"),
      domains: path.resolve(__dirname, "./src/domains/"),
      adapters: path.resolve(__dirname, "./src/adapters/"),
      di: path.resolve(__dirname, "./src/di/"),
      hooks: path.resolve(__dirname, "./src/frameworks/hooks/"),
      pages: path.resolve(__dirname, "./src/frameworks/pages/"),
      providers: path.resolve(__dirname, "./src/frameworks/providers/"),
      containers: path.resolve(__dirname, "./src/frameworks/containers/"),
      components: path.resolve(__dirname, "./src/frameworks/components/"),
      "styled-system": path.resolve(__dirname, "./styled-system/")
    },
    extensions: [".ts", ".tsx", ".js", ".mjs"]
  },
  plugins: [
    react(),
    {
      name: "mock-server",
      configureServer(server) {
        const user = { id: "1", name: "falsy" }
        const posts = []
        const comments = []

        server.middlewares.use((req, res, next) => {
          if (req.method === "GET" && req.url === "/api/users") {
            setTimeout(() => {
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify(user))
            }, 1000)
          } else if (req.method === "GET" && req.url === "/api/posts") {
            setTimeout(() => {
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify(posts))
            }, 1000)
          } else if (req.method === "POST" && req.url === "/api/posts") {
            let body = ""
            req.on("data", (chunk) => {
              body += chunk.toString()
            })
            req.on("end", () => {
              const post = {
                ...JSON.parse(body),
                id: new Date().getTime(),
                author: user,
                createdAt: new Date(),
                updatedAt: new Date()
              }
              posts.push(post)
              setTimeout(() => {
                res.setHeader("Content-Type", "application/json")
                res.end(JSON.stringify(true))
              }, 1000)
            })
          } else if (
            req.method === "DELETE" &&
            typeof req.url === "string" &&
            req.url.startsWith("/api/posts/")
          ) {
            const postId = Number(req.url.split("/").pop())
            const index = posts.findIndex((post) => post.id === postId)
            if (index !== -1) posts.splice(index, 1)
            setTimeout(() => {
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify(true))
            }, 1000)
          } else if (
            req.method === "GET" &&
            typeof req.url === "string" &&
            req.url.startsWith("/api/posts/") &&
            req.url.endsWith("/comments")
          ) {
            const postId = req.url.split("/")[3]
            const postComments = comments.filter(
              (comment) => comment.postId === postId
            )
            setTimeout(() => {
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify(postComments))
            }, 1000)
          } else if (
            req.method === "POST" &&
            typeof req.url === "string" &&
            req.url.startsWith("/api/posts/") &&
            req.url.endsWith("/comments")
          ) {
            let body = ""
            const postId = req.url.split("/")[3]
            req.on("data", (chunk) => {
              body += chunk.toString()
            })
            req.on("end", () => {
              const comment = {
                ...JSON.parse(body),
                id: new Date().getTime(),
                postId,
                author: user,
                createdAt: new Date(),
                updatedAt: new Date()
              }
              comments.push(comment)
              setTimeout(() => {
                res.setHeader("Content-Type", "application/json")
                res.end(JSON.stringify(true))
              }, 1000)
            })
          } else {
            next()
          }
        })
      }
    }
  ]
})
