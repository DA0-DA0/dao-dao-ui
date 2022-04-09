import { ReactNode } from 'react'
import { useState } from 'react'

import Link from 'next/link'

import { MenuIcon } from '@heroicons/react/outline'

import { SITE_TITLE } from '../util/constants'
import { Logo } from './Logo'
import Nav from './Nav'

const SmallScreenNav = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <div className="p-6 pb-2 sticky top-0 flex flex-row w-full justify-between items-center text-lg">
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
    <div className="lg:grid lg:grid-cols-[264px_repeat(4,minmax(0,1fr))] w-full h-full">
      <div className="hidden lg:w-[264px] lg:block">
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
