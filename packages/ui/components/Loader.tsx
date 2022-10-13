import clsx from 'clsx'

import { LoaderProps } from '@dao-dao/tstypes/ui/Loader'
export * from '@dao-dao/tstypes/ui/Loader'

import { Logo as DefaultLogo } from './Logo'

export const Loader = ({
  fill = true,
  size = 42,
  className,
  Logo = DefaultLogo,
}: LoaderProps) => (
  <div
    className={clsx(
      'flex flex-row items-center justify-center',
      { 'h-full w-full grow': fill },
      className
    )}
  >
    <Logo className="animate-spin-medium" size={size} />
  </div>
)

export const PageLoader = ({ size = 64, ...props }: LoaderProps) => (
  <Loader fill size={size} {...props} />
)
