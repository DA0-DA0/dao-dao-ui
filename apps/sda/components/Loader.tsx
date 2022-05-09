import clsx from 'clsx'

import { Logo } from '@/components'

interface LoaderProps {
  size?: number | string
  fillScreen?: boolean
}

export const Loader = ({ size = 42, fillScreen }: LoaderProps) => (
  <div
    className={clsx('flex justify-center items-center w-full h-full', {
      // Don't fill the entire screen since header and footer take up some
      // space, and we don't want the page to scroll unnecessarily.
      'min-w-[80vw] min-h-[80vh]': fillScreen,
    })}
  >
    <div className="animate-spin">
      <Logo size={size} />
    </div>
  </div>
)
