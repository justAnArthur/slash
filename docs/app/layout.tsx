import { RootProvider } from "fumadocs-ui/provider"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"

import "./global.css"
import type { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: {
    default: "Slash",
    template: "%s | Slash"
  },
  authors: [
    {
      name: "Artur Kozubov",
      url: "https://github.com/justAnArthur"
    },
    {
      name: "Artem Zaitsev",
      url: "https://github.com/Aldeimeter"
    }
  ]
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
