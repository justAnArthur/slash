import type { ElysiaSwaggerConfig } from "@elysiajs/swagger"
import { description, name, version } from "@/package.json"

export default {
  documentation: {
    info: {
      title: name,
      description,
      version
    }
  }
} satisfies ElysiaSwaggerConfig
