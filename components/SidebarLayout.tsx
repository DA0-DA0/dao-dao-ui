import { ReactNode } from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { Logo } from './Logo'
import Link from 'next/link'
import Nav from './Nav'

const PUBLIC_SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE

const SmallScreenNav = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <div className="p-6 sticky top-0 flex flex-row w-full justify-between border-b-300">
      <Link href="/starred">
        <a>
          <Logo height={38} width={38} alt={`${PUBLIC_SITE_TITLE} Logo`} />
        </a>
      </Link>

      <div className="lg:hidden" onClick={onMenuClick}>
        <MenuIcon height={38} width={38} />
      </div>
    </div>
  )
}

export function SidebarLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpened, setMenuOpened] = useState(false)

  return (
    <div>
      {/* Wide screen display */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-5">
          <Nav />
          <main className="col-start-2 col-span-4">{children}</main>
        </div>
      </div>
      {/* Tight screen display */}
      <div className="lg:hidden">
        {mobileMenuOpened ? (
          <div className="w-full h-full">
            <Nav onMenuClick={() => setMenuOpened(!mobileMenuOpened)} />
          </div>
        ) : (
          <div className="flex flex-col">
            <SmallScreenNav
              onMenuClick={() => setMenuOpened(!mobileMenuOpened)}
            />
            <main>{children}</main>
          </div>
        )}
      </div>
    </div>
  )
}
