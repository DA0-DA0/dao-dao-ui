import { InformationCircleIcon } from '@heroicons/react/outline'
import Tooltip, { TooltipProps } from '@reach/tooltip'
import { forwardRef } from 'react'

export type TooltipIconProps = Omit<TooltipProps, 'children'>

export const TooltipIcon = forwardRef<HTMLDivElement, TooltipIconProps>(
  function TooltipIcon(props, ref) {
    return (
      <Tooltip {...props} ref={ref}>
        <InformationCircleIcon className="h-4 w-4 shrink-0 cursor-help text-gray-500 hover:text-gray-400" />
      </Tooltip>
    )
  }
)
