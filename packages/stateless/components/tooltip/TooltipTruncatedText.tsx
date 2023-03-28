import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { concatAddressBoth } from '@dao-dao/utils'

import { Tooltip } from './Tooltip'

export type TooltipTruncatedTextProps = Omit<
  ComponentPropsWithoutRef<'p'>,
  'children'
> & {
  text: string
  maxLength?: number
}

export const TooltipTruncatedText = forwardRef<
  HTMLParagraphElement,
  TooltipTruncatedTextProps
>(function TooltipTruncatedText({ text, maxLength = 32, ...props }, ref) {
  const truncating = text.length > maxLength

  return (
    <Tooltip title={truncating ? text : undefined}>
      <p {...props} ref={ref}>
        {truncating ? concatAddressBoth(text, Math.floor(maxLength / 2)) : text}
      </p>
    </Tooltip>
  )
})
