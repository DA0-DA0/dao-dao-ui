import {
  Tooltip as MaterialTooltip,
  TooltipProps as MaterialTooltipProps,
} from '@mui/material'
import clsx from 'clsx'

export interface TooltipProps extends Omit<MaterialTooltipProps, 'title'> {
  title: MaterialTooltipProps['title'] | undefined
  morePadding?: boolean
}

export const Tooltip = ({
  title,
  morePadding,
  arrow,
  children,
  classes,
  ...props
}: TooltipProps) =>
  !title ? (
    <>{children}</>
  ) : (
    <MaterialTooltip
      arrow={arrow ?? true}
      classes={{
        ...classes,
        arrow: classes?.arrow ?? '!text-component-tooltip',
        tooltip: clsx(
          classes?.tooltip ??
            '!rounded-md !border !border-border-component-primary !bg-component-tooltip !font-sans !text-xs !font-normal !text-text-component-primary',
          morePadding && '!p-3'
        ),
      }}
      enterTouchDelay={
        // Makes it much easier to click on the tooltip on mobile.
        0
      }
      title={title}
      {...props}
    >
      {children}
    </MaterialTooltip>
  )
