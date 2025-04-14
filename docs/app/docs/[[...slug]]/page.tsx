import { source } from "@/lib/source"
import defaultMdxComponents from "fumadocs-ui/mdx"
import { notFound } from "next/navigation"
import { DocsPageClient } from "@/app/docs/[[...slug]]/docs-page.client"

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const MDX = page.data.body

  return (
    <DocsPageClient
      toc={page.data.toc}
      full={page.data.full}
      footer={{ enabled: true }}
      title={page.data.title}
      description={page.data.description}
    >
      {/*@ts-ignore*/}
      <MDX components={{ ...defaultMdxComponents }} />
    </DocsPageClient>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description
  }
}
