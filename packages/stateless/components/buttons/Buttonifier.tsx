import clsx from 'clsx'

import { ButtonifierProps } from '@dao-dao/types'

import { Loader } from '../logo'

const defaultVariant = 'primary'
const defaultSize = 'default'

// Pulse for these variants instead of displaying loader.
const PULSE_LOADING_VARIANTS = 'underline' || 'none'

// Get props that should pass through the Buttonifier, such as native button
// props. Disable button if disabled or loading.
export const getPassthroughProps = <P extends ButtonifierProps>({
  variant: _variant,
  size: _size,
  contentContainerClassName: _contentContainerClassName,
  pressed: _pressed,
  hovering: _hovering,
  showBadge: _showBadge,
  className: _className,
  children: _children,
  center: _center,
  disabled,
  loading,
  ...props
}: P) => ({
  ...props,
  disabled: disabled || loading,
})

export const getButtonifiedClassNames = ({
  variant = defaultVariant,
  size = defaultSize,
  pressed,
  disabled,
  loading,
  className,
}: ButtonifierProps) => {
  const disabledOrLoading = disabled || loading

  return clsx(
    'relative block rounded-md transition-all focus:outline-2 focus:outline-background-button-disabled',

    // No cursor pointer if disabled or loading.
    disabledOrLoading && 'cursor-default',

    // Pulse if loading for a variant that we don't display the loader.
    loading && variant === PULSE_LOADING_VARIANTS && 'animate-pulse',

    // Let variants take color precedence over the text classes used here since
    // the variants are more specific, so just use the font text styling here.
    {
      // Sizes.
      'button-text py-[10px] px-[14px]': size === 'lg',
      'button-text-sm py-1 px-2': size === 'sm',
      'link-text py-[6px] px-[10px]': size === 'default',
    },

    // Primary variant
    variant === 'primary' && {
      // Default
      'bg-background-button text-text-button-primary hover:bg-background-button-hover active:bg-background-button-pressed':
        !disabledOrLoading,
      // Disabled
      'bg-background-button-disabled text-text-button-disabled':
        disabledOrLoading,
    },
    // Primary outline variant
    variant === 'primary_outline' && {
      'ring-2 ring-inset': true,
      // Default
      'text-background-button ring-background-button hover:bg-background-button-hover hover:text-text-button-primary hover:ring-0 active:bg-background-button-pressed active:text-text-button-primary active:ring-0':
        !disabledOrLoading,
      // Disabled
      'text-background-button-disabled ring-background-button-disabled':
        disabledOrLoading,
    },
    // Secondary variant
    variant === 'secondary' && {
      // Default
      'hover:bg-background-button-secondary-hover active:bg-background-button-secondary-pressed':
        !disabledOrLoading,
      // Default, not pressed
      'bg-background-button-secondary-default text-icon-primary':
        !disabledOrLoading && !pressed,
      // Disabled, not pressed
      'bg-background-button-secondary-disabled text-text-interactive-disabled':
        disabledOrLoading && !pressed,
      // Default or disabled, pressed
      'bg-background-interactive-active text-text-interactive-active': pressed,
    },
    // Ghost variant
    variant === 'ghost' && {
      // Default
      'hover:bg-background-interactive-hover active:bg-background-interactive-pressed':
        !disabledOrLoading,
      // Default, not pressed
      'bg-transparent text-text-secondary': !disabledOrLoading && !pressed,
      // Disabled, not pressed
      'bg-transparent text-text-interactive-disabled':
        disabledOrLoading && !pressed,
      // Default or disabled, pressed
      'bg-transparent text-text-brand': pressed,
    },
    // Underline variant
    (variant === 'underline' || variant === 'none') && {
      // Always no padding
      '!p-0': true,
      underline: variant === 'underline',
      // Default
      'transition-opacity hover:opacity-80 active:opacity-70':
        !disabledOrLoading,
      // Disabled
      'text-text-button-disabled': disabledOrLoading,
    },
    className
  )
}

export const ButtonifiedChildren = ({
  variant = defaultVariant,
  size = defaultSize,
  loading = false,
  contentContainerClassName,
  showBadge,
  children,
  center,
}: ButtonifierProps) => (
  <>
    <div
      className={clsx(
        'absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center',
        {
          // Match padding of container (by inheriting it) so the logo is the
          // same height as the text.
          'p-[inherit]': size !== 'lg',
          // The container padding makes the logo a bit small on lg size, so
          // manually override.
          'p-2': size === 'lg',
        }
      )}
    >
      {loading && variant !== PULSE_LOADING_VARIANTS && (
        <Loader invert={variant === 'primary'} size={24} />
      )}
    </div>
    <div
      className={clsx(
        // Add `relative` to allow children to be clickable. The absolute
        // container of the loading element above takes over touches if this is
        // not relative; adding relative puts them in the same stacking context.
        'relative flex h-full flex-row items-center gap-2',
        center && 'justify-center',
        {
          invisible: loading,
        },
        contentContainerClassName
      )}
    >
      {children}
    </div>

    {showBadge && (
      <div className="absolute top-[3px] right-[3px] box-content h-[6px] w-[6px] rounded-full border-[3px] border-background-base bg-icon-interactive-active"></div>
    )}
  </>
)
