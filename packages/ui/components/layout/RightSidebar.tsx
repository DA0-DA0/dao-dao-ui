import { KeyboardDoubleArrowRight } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode, useState } from 'react'

import { Footer } from '../Footer'
import { IconButton } from '../IconButton'
import { ProfileImage } from '../profile'

export interface RightSidebarProps {
  wallet: ReactNode
  children: ReactNode
  profileImageUrl?: string
}

export const RightSidebar = ({
  wallet,
  children,
  profileImageUrl,
}: RightSidebarProps) => {
  const [responsiveVisible, setResponsiveVisible] = useState(false)

  return (
    <>
      <ProfileImage
        className="absolute top-4 right-4 shadow-dp8 hover:opacity-80 active:opacity-70 transition cursor-pointer xl:hidden"
        imageUrl={profileImageUrl}
        onClick={() => setResponsiveVisible((v) => !v)}
        size="sm"
      />

      <div
        className={clsx(
          // General
          'flex flex-col items-stretch p-6 pt-0 w-full bg-background-base transition-all sm:w-96',
          // Responsive
          'absolute top-0 bottom-0 z-10 shadow-dp8',
          responsiveVisible ? 'right-0' : '-right-full sm:-right-96',
          // Large
          'xl:relative xl:left-0 xl:shrink-0 xl:shadow-none'
        )}
      >
        {/* Show responsive close button. */}
        <div className="overflow-hidden self-end p-1 -mr-3 h-28 transition-all sm:h-auto xl:max-h-0">
          <IconButton
            Icon={KeyboardDoubleArrowRight}
            // Match ProfileImage rounding.
            className="mt-3 rounded-xl"
            onClick={() => setResponsiveVisible(false)}
            size="lg"
            variant="secondary"
          />
        </div>

        {wallet}

        <div className="overflow-y-scroll py-1 pr-4 mt-1 -mr-4 styled-scrollbar">
          <div>{children}</div>

          <div className="mt-7">
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}
