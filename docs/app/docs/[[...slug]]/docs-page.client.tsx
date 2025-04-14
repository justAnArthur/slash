"use client"

import type { ReactNode } from "react"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle
} from "fumadocs-ui/page"

export function DocsPageClient({
  toc,
  full,
  footer,
  title,
  description,
  children
}: { children: ReactNode } & Record<string, any>) {
  return (
    <DocsPage toc={toc} full={full} footer={footer}>
      <DocsTitle>{title}</DocsTitle>
      <DocsDescription>{description}</DocsDescription>
      <DocsBody>{children}</DocsBody>
    </DocsPage>
  )
}
