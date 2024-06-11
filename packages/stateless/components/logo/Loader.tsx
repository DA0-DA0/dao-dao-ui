import clsx from 'clsx'

import { LoaderProps } from '@dao-dao/types/components/Loader'

import { Logo } from './Logo'

export const Loader = ({
  fill = true,
  size = 36,
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

export const SmallLoader = ({
  fill = false,
  size = 24,
  ...props
}: LoaderProps) => <Loader fill={fill} size={size} {...props} />

export const PageLoader = ({
  fill = true,
  size = 64,
  ...props
}: LoaderProps) => <Loader fill={fill} size={size} {...props} />
