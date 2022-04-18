import { ReactNode } from 'react'
import { useState } from 'react'

import Link from 'next/link'

import { Logo } from '@dao-dao/ui'
import { SITE_TITLE } from '@dao-dao/utils'
import { MenuIcon } from '@heroicons/react/outline'

import Nav from './Nav'

const SmallScreenNav = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <div className="flex sticky top-0 flex-row justify-between items-center p-6 pb-2 w-full text-lg">
      <Link href="/starred">
        <a>
          <Logo alt={`${SITE_TITLE} Logo`} height={38} width={38} />
        </a>
      </Link>
      <div className="font-mono text-error">Beta</div>

      <div className="cursor-pointer lg:hidden" onClick={onMenuClick}>
        <MenuIcon className="w-8" />
      </div>
    </div>
  )
}

export function SidebarLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpened, setMenuOpened] = useState(false)

  return (
    <div className="w-full h-full lg:grid lg:grid-cols-[264px_repeat(4,minmax(0,1fr))]">
      <div className="hidden lg:block lg:w-[264px]">
        <Nav />
      </div>
      <div className="lg:hidden">
        {mobileMenuOpened ? (
          <div className="fixed z-10 w-screen h-screen bg-clip-padding bg-opacity-60 backdrop-blur-xl backdrop-filter overflow-none">
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
