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
      'flex flex-row justify-center items-center',
      { 'grow w-full h-full': fill },
      className
    )}
  >
    <Logo className="animate-spin-medium" size={size} />
  </div>
)

export const PageLoader = ({ className, size = 64, ...props }: LoaderProps) => (
  <Loader
    className={clsx('fixed top-0 right-0 bottom-0 left-0 z-50', className)}
    fill
    size={size}
    {...props}
  />
)
