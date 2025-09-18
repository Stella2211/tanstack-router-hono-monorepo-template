import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { client } from "lib/client"

export const Route = createFileRoute("/users")({
  component: RouteComponent,
})

function RouteComponent() {
  const query = useSuspenseQuery({
    queryKey: ["users"],
    async queryFn() {
      const response = await client.users.$get()
      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }
      return await response.json() // 型: { id: number, name: string, email: string }[]
    },
  })
  return (
    <div>
      {query.data.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
