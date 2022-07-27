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
      'flex flex-row justify-center items-center w-full h-full',
      className
    )}
  >
    <div className="animate-spin-medium">
      <Logo height={size} width={size} />
    </div>
  </div>
)

// On mobile, the container is not as tall as the whole screen, so
// set to screen height.
export const PageLoader: FC = () => (
  <Loader className="min-h-screen md:h-full" size={66} />
)
