import { ReactNode } from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { Logo } from './Logo'
import Link from 'next/link'
import Nav from './Nav'
import { SITE_TITLE } from '../util/constants'

const SmallScreenNav = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <div className="p-2 sticky top-0 flex flex-row w-full justify-between">
      <Link href="/starred">
        <a>
          <Logo height={38} width={38} alt={`${SITE_TITLE} Logo`} />
        </a>
      </Link>
      <div className="text-error font-mono">Beta</div>

      <div className="lg:hidden cursor-pointer" onClick={onMenuClick}>
        <MenuIcon className="w-8" />
      </div>
    </div>
  )
}

export function SidebarLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpened, setMenuOpened] = useState(false)

  return (
    <div className="lg:grid lg:grid-cols-5 w-full h-full">
      <div className="hidden lg:block">
        <Nav />
      </div>
      <div className="lg:hidden">
        {mobileMenuOpened ? (
          <div className="fixed w-screen h-screen z-10 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 overflow-none">
            <Nav onMenuClick={() => setMenuOpened(!mobileMenuOpened)} />
          </div>
        ) : (
          <SmallScreenNav
            onMenuClick={() => setMenuOpened(!mobileMenuOpened)}
          />
        )}
      </div>
      <main
        className={`lg:col-start-2 lg:col-span-4 ${
          mobileMenuOpened ? 'w-screen h-screen overflow-hidden' : ''
        }`}
      >
        {children}
      </main>
    </div>
  )
}
