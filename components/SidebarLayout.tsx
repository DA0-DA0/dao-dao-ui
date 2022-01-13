import { ReactNode } from 'react'
import Nav from './Nav'

export function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-5">
      <Nav />
      <main className="col-start-2 col-span-4">{children}</main>
    </div>
  )
}
