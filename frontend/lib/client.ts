import { hc } from "hono/client"
import type { AppType } from "../../backend/src/index"

export const client = hc<AppType>(`http://localhost:8787`, {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    return fetch(input, { ...init })
  },
})
