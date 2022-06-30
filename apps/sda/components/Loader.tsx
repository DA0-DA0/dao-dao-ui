import clsx from 'clsx'

import { Logo } from '@/components'

interface LoaderProps {
  size?: number | string
  fillScreen?: boolean
}

export const Loader = ({ size = 42, fillScreen }: LoaderProps) => (
  <div
    className={clsx('flex h-full w-full items-center justify-center', {
      // Don't fill the entire screen since header and footer take up some
      // space, and we don't want the page to scroll unnecessarily.
      'min-h-[80vh] min-w-[80vw]': fillScreen,
    })}
  >
    <div className="animate-spin-medium">
      <Logo size={size} />
    </div>
  </div>
)
