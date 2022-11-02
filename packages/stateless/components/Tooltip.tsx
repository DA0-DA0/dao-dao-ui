import {
  Tooltip as MaterialTooltip,
  TooltipProps as MaterialTooltipProps,
} from '@mui/material'

export interface TooltipProps extends Omit<MaterialTooltipProps, 'title'> {
  title: MaterialTooltipProps['title'] | undefined
}

export const Tooltip = ({
  title,
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
        tooltip:
          classes?.tooltip ??
          '!font-sans !text-xs !font-normal !text-text-body !bg-component-tooltip !rounded-md !border !border-border-primary',
      }}
      title={title}
      {...props}
    >
      {children}
    </MaterialTooltip>
  )
