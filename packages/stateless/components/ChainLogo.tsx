import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'

import { getImageUrlForChainId } from '@dao-dao/utils'

export type ChainLogoProps = ComponentProps<'div'> & {
  chainId: string
}

export const ChainLogo = forwardRef<HTMLDivElement, ChainLogoProps>(
  function ChainLogo({ chainId, className, style, ...props }, ref) {
    return (
      <div
        className={clsx('h-5 w-5 bg-contain bg-center bg-no-repeat', className)}
        ref={ref}
        style={{
          ...style,
          backgroundImage: `url(${getImageUrlForChainId(chainId)})`,
        }}
        {...props}
      ></div>
    )
  }
)
