import clsx from 'clsx'
import { ComponentType } from 'react'

import { Logo as DefaultLogo, LogoProps } from './Logo'

export interface LoaderProps {
  fill?: boolean
  size?: number | string
  className?: string
  Logo?: ComponentType<LogoProps>
}

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
    <div className="animate-spin-medium">
      <Logo size={size} />
    </div>
  </div>
)

export const PageLoader = ({ className, size = 64, ...props }: LoaderProps) => (
  <Loader
    className={clsx(
      // On mobile, the app container is not as tall as the whole screen
      // when just the loader is showing, so set minimum to screen height.
      'min-h-screen lg:min-h-min',
      className
    )}
    fill
    size={size}
    {...props}
  />
)
