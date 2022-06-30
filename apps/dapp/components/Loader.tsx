import clsx from 'clsx'
import { FC } from 'react'

import { Logo } from '@dao-dao/ui'

interface LoaderProps {
  size?: number | string
  className?: string
}

export const Loader: FC<LoaderProps> = ({ size = 42, className }) => (
  <div
    className={clsx(
      'flex h-full w-full flex-row items-center justify-center',
      className
    )}
  >
    <div className="animate-spin">
      <Logo height={size} width={size} />
    </div>
  </div>
)

// On mobile, the container is not as tall as the whole screen, so
// set to screen height.
export const PageLoader: FC = () => (
  <Loader className="min-h-screen md:h-full" size={66} />
)
