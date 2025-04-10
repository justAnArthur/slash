import { createMDX } from "fumadocs-mdx/next"

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"]
  },
  typescript: {
    ignoreBuildErrors: true
  },
  redirects: () => [
    {
      source: "/",
      destination: "/docs",
      permanent: false
    }
  ]
}

export default withMDX(config)
