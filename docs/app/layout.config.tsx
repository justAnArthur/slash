import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import Image from "next/image"
import logo from "./icon.png"

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image src={logo} alt="Slash Logo" width={20} height={20} />
        Slash
      </>
    )
  }
}
