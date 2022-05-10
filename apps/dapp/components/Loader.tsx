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
    <div className="animate-spin">
      <Logo height={size} width={size} />
    </div>
  </div>
)
