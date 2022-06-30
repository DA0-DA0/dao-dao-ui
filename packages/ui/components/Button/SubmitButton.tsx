import clsx from 'clsx'
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react'

enum SubmitVariant {
  Primary = 'primary',
  Secondary = 'secondary',
}

type SubmitProps = Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'type'> & {
  label: string
  variant?: `${SubmitVariant}`
}

function Submit(
  {
    disabled,
    className,
    label,
    variant = SubmitVariant.Primary,
    ...rest
  }: SubmitProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      className={clsx(
        'cursor-pointer rounded-md py-2 px-4 transition',
        {
          // Primary
          'link-text bg-btn text-light': variant === SubmitVariant.Primary,
          'hover:bg-dark active:bg-toast':
            variant === SubmitVariant.Primary && !disabled,
          // Secondary
          'link-text bg-primary': variant === SubmitVariant.Secondary,
          'hover:bg-btn-secondary-hover active:bg-btn-secondary-pressed':
            variant === SubmitVariant.Secondary && !disabled,
          // Shared
          'bg-btn-disabled': disabled,
        },
        className
      )}
      disabled={disabled}
      ref={ref}
      type="submit"
      value={label}
      {...rest}
    />
  )
}

export const SubmitButton = forwardRef(Submit)
