import { KeyboardDoubleArrowRight } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode, useState } from 'react'

import { IconButton } from '../IconButton'
import { ProfileImage } from '../profile'
import { Footer } from './Footer'

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
        className="absolute top-6 right-4 z-10 shadow-dp4 hover:opacity-80 active:opacity-70 transition cursor-pointer xl:hidden"
        imageUrl={profileImageUrl}
        onClick={() => setResponsiveVisible((v) => !v)}
        size="xs"
      />

      <div
        className={clsx(
          // General
          'flex flex-col items-stretch p-6 pt-0 w-full bg-background-base transition-all duration-[225ms] sm:w-96',
          // Responsive
          'absolute top-0 bottom-0 z-30 shadow-dp8',
          responsiveVisible
            ? 'right-0 opacity-100'
            : '-right-full opacity-0 sm:-right-96',
          // Large
          'xl:relative xl:left-0 xl:shrink-0 xl:shadow-none xl:opacity-100'
        )}
      >
        {/* Show responsive close button. */}
        <div className="box-border flex overflow-hidden flex-row justify-end items-start py-6 pr-1 -mr-3 h-20 transition-all xl:py-0 xl:mt-0 xl:max-h-0">
          <IconButton
            Icon={KeyboardDoubleArrowRight}
            // Match ProfileImage rounding.
            circular
            onClick={() => setResponsiveVisible(false)}
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
