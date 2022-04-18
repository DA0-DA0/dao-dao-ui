import { forwardRef } from 'react'

import { InformationCircleIcon } from '@heroicons/react/outline'
import Tooltip, { TooltipProps } from '@reach/tooltip'

export type TooltipIconProps = Omit<TooltipProps, 'children'>

export const TooltipIcon = forwardRef<HTMLDivElement, TooltipIconProps>(
  function TooltipIcon(props, ref) {
    return (
      <Tooltip {...props} ref={ref}>
        <InformationCircleIcon className="mb-1 w-4 h-4 text-gray-500 hover:text-gray-400 cursor-help" />
      </Tooltip>
    )
  }
)
