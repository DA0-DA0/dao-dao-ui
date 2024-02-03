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
            '!rounded-md !border !border-border-component-primary !bg-component-tooltip !p-1.5 !font-sans !text-xs !font-normal !text-text-component-primary',
          morePadding && '!p-2 xs:!p-3'
        ),
      }}
      enterTouchDelay={
        // Require 300ms hold time before showing tooltip on touch device.
        300
      }
      leaveTouchDelay={
        // Average reading speed is 200wpm, which is ~3.33 words per second. If
        // the tooltip is a string, calculate the number of expected words per
        // second and add a 25% buffer. Minimum 2 seconds. If not a
        // string, just default to 3 seconds. The user can always tap+hold to
        // keep it open.
        typeof title === 'string'
          ? Math.max(2, (title.length / 3.33) * 1.25) * 1000
          : 3000
      }
      title={title}
      {...props}
    >
      {children}
    </MaterialTooltip>
  )
