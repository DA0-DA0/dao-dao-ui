import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'

import { getImageUrlForChainId } from '@dao-dao/utils'

export type ChainLogoProps = ComponentProps<'div'> & {
  chainId: string
  size?: number
}

export const ChainLogo = forwardRef<HTMLDivElement, ChainLogoProps>(
  function ChainLogo({ chainId, className, style, size = 20, ...props }, ref) {
    return (
      <div
        className={clsx('bg-contain bg-center bg-no-repeat', className)}
        ref={ref}
        style={{
          ...style,
          width: size,
          height: size,
          backgroundImage: `url(${getImageUrlForChainId(chainId)})`,
        }}
        {...props}
      ></div>
    )
  }
)
