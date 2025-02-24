import type cors from "@elysiajs/cors"

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || []

function validateOrigin(request: Request) {
  return true

  // biome-ignore lint/correctness/noUnreachable: todo
  const origin = request.headers.get("origin") || ""
  return allowedOrigins.includes(origin)
}

export default {
  // origin: validateOrigin,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE", "PATCH"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true
} satisfies Parameters<typeof cors>[0]
