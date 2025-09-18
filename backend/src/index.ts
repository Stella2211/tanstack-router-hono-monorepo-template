import { Hono } from "hono"

const app = new Hono()

const routes = app
  .get("/", (c) => {
    return c.text("Hello Hono!")
  })
  .get("/users", (c) => {
    return c.json([
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ])
  })

export default app

export type AppType = typeof routes
