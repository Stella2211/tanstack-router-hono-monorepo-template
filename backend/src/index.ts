import { Hono } from "hono"

const app = new Hono()

const route = app.get("/", (c) => {
  return c.text("Hello Hono!")
})

export default app

export type AppType = typeof route
