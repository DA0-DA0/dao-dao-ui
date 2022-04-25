import clsx from 'clsx'

import { Logo } from '@/components'

interface LoaderProps {
  size?: number
  fillScreen?: boolean
}

export const Loader = ({ size = 42, fillScreen }: LoaderProps) => (
  <div
    className={clsx('flex justify-center items-center w-full h-full', {
      'min-w-[80vw] min-h-[80vh]': fillScreen,
    })}
  >
    <div className="animate-spin">
      <Logo height={size} width={size} />
    </div>
  </div>
)
