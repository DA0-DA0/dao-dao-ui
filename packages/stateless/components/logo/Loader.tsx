import clsx from 'clsx'

import { LoaderProps } from '@dao-dao/types/stateless/Loader'

import { Logo } from './Logo'

export const Loader = ({
  fill = true,
  size = 42,
  invert,
  className,
}: LoaderProps) => (
  <div
    className={clsx(
      'flex flex-row items-center justify-center',
      { 'h-full w-full grow': fill },
      className
    )}
  >
    <Logo className="animate-spin-medium" invert={invert} size={size} />
  </div>
)

export const PageLoader = ({ size = 64, ...props }: LoaderProps) => (
  <Loader fill size={size} {...props} />
)
