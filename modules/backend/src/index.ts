import chatRoutes from "@/src/api/chats/chats.api"
import userRoutes from "@/src/api/users/users.api"
import { handleBetterAuthRoute } from "@/src/lib/auth/handle-route"
import { authMiddleware } from "@/src/lib/auth/middleware"
import corsConfig from "@/src/lib/cors.config"
import loggerConfig from "@/src/lib/logger.config"
import opentelemetryConfig from "@/src/lib/opentelemetry.config"
import swaggerConfig from "@/src/lib/swagger.config"
import cors from "@elysiajs/cors"
import { opentelemetry } from "@elysiajs/opentelemetry"
import swagger from "@elysiajs/swagger"
import { logger } from "@tqman/nice-logger"
import { Elysia } from "elysia"

export const app = new Elysia({
  serve: { hostname: Bun.env.HOSTNAME || "localhost" }
})
  .use(logger(loggerConfig))
  .use(swagger(swaggerConfig))
  .use(opentelemetry(opentelemetryConfig))
  .use(cors(corsConfig))
  .get("/", () => "Hello Elysia! 🦊")
  .all("/api/auth/*", handleBetterAuthRoute)
  .group("", { beforeHandle: authMiddleware }, (app) =>
    app
      .get("/secured", () => "Secured 🔗🦊", {
        detail: {
          description: "This is a secured route"
        }
      })
      .use(userRoutes)
      .use(chatRoutes)
  )
  .listen(Bun.env.PORT || 3000)

export type App = typeof app

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
