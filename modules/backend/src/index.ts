import corsConfig from "@/src/lib/auth/cors.config"
import { handleBetterAuthRoute } from "@/src/lib/auth/handle-route"
import { authMiddleware } from "@/src/lib/auth/middleware"
import swaggerConfig from "@/src/lib/swagger.config"
import cors from "@elysiajs/cors"
import swagger from "@elysiajs/swagger"
import { Elysia } from "elysia"

export const app = new Elysia()
  .use(cors(corsConfig))
  .use(swagger(swaggerConfig))
  .get("/", () => "Hello Elysia! 🦊")
  .all("/api/auth/*", handleBetterAuthRoute)
  .group("", { beforeHandle: authMiddleware }, (app) =>
    app.get("/secured", () => "Hello from Auth 🔗 Elysia! 🦊")
  )
  .listen(Bun.env.PORT || 3000)

export type App = typeof app

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
