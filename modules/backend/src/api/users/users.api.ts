import db from "@/src/db/connection"
import { user } from "@/src/db/schema.auth"
import { auth } from "@/src/lib/auth"
import { and, eq, like, ne } from "drizzle-orm"
import Elysia from "elysia"
import type { Context } from "elysia"
const PAGE_SIZE = 10

export default new Elysia({ prefix: "/users" })
  .get(
    "/search",
    async ({
      query,
      request
    }: {
      query: { q: string; page: number; pageSize: number }
      request: Context["request"]
    }) => {
      const { q, page = 1, pageSize = 5 } = query
      const session = await auth.api.getSession({
        headers: request.headers
      })
      const currentUserId = session?.user.id as string

      const offset = (Number(page) - 1) * pageSize

      // TODO: fetch last messages for existing chats
      return db
        .select({ id: user.id, name: user.name, image: user.image })
        .from(user)
        .where(and(like(user.name, `%${q}%`), ne(user.id, currentUserId)))
        .limit(pageSize)
        .offset(offset)
    }
  )
  .get(":id", async ({ params }: { params: { id: string } }) => {
    const { id } = params
    try {
      const [userToReturn] = await db
        .select({ id: user.id, name: user.name, image: user.image })
        .from(user)
        .where(eq(user.id, id))
      if (!userToReturn) {
        return {
          status: 404,
          message: "User not found"
        }
      }
      return userToReturn
    } catch (error) {
      console.error("Error fetching chat:", error)
      return {
        status: 500,
        message: "Internal server error"
      }
    }
  })
