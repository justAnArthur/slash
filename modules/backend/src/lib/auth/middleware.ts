import type { Context } from "elysia"
import { auth } from "."

export const authMiddleware = async (context: Context) => {
  const session = await auth.api.getSession({
    headers: context.request.headers
  })

  if (!session) {
    context.set.status = 401
    return {
      success: "error",
      message: "Unauthorized Access: Token is missing"
    }
  }

  return {
    user: session.user,
    session: session.session
  }
}
