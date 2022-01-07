import Link from 'next/link'
import { ReactNode } from 'react'
import Logo from 'components/Logo'
import Nav from './Nav'

const PUBLIC_SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE

export function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-5">
      <Nav />
      <main className="col-start-2 col-span-4 pl-6">{children}</main>
    </div>
  )
}
