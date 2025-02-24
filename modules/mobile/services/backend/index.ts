import { treaty } from "@elysiajs/eden"
import type { App } from "@slash/backend/src"

export const backend = treaty<App>(process.env.BACKEND_URL!)
